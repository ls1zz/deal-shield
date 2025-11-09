import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover'
})

// Map price IDs to tiers and limits
const PLAN_CONFIG: { [key: string]: { tier: string; limit: number } } = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: { tier: 'starter', limit: 10 },
  [process.env.STRIPE_PROFESSIONAL_PRICE_ID!]: { tier: 'professional', limit: 50 },
  [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: { tier: 'enterprise', limit: 999999 }
}

export async function POST(request: Request) {
  try {
    const { subscriptionId, newPriceId, newTier } = await request.json()

    if (!subscriptionId || !newPriceId || !newTier) {
      return NextResponse.json(
        { error: 'Subscription ID, new price ID, and tier are required' },
        { status: 400 }
      )
    }

    // Get current user
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify this subscription belongs to the user
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_subscription_id, subscription_tier')
      .eq('id', user.id)
      .single()

    if (profile?.stripe_subscription_id !== subscriptionId) {
      return NextResponse.json(
        { error: 'Subscription not found or unauthorized' },
        { status: 403 }
      )
    }

    // Get the subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    // Get the current subscription item
    const subscriptionItemId = subscription.items.data[0].id

    // Determine if this is an upgrade or downgrade
    const currentPlan = PLAN_CONFIG[subscription.items.data[0].price.id]
    const newPlan = PLAN_CONFIG[newPriceId]
    const isUpgrade = newPlan.limit > currentPlan.limit
    const isTrialing = subscription.status === 'trialing'

    // Build update params
    const updateParams: Stripe.SubscriptionUpdateParams = {
      items: [
        {
          id: subscriptionItemId,
          price: newPriceId
        }
      ],
      // For upgrades: prorate and charge immediately (unless in trial)
      // For downgrades: apply at next billing period
      proration_behavior: isUpgrade ? 'create_prorations' : 'none'
    }

    // Only change billing cycle anchor if NOT in trial and upgrading
    if (isUpgrade && !isTrialing) {
      updateParams.billing_cycle_anchor = 'now'
    }

    // If in trial and upgrading, end the trial now
    if (isTrialing && isUpgrade) {
      updateParams.trial_end = 'now'
    }

    // Update the subscription with the new price
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, updateParams)

    // Update user profile in Supabase
    await supabase
      .from('profiles')
      .update({
        subscription_tier: newTier,
        reports_limit: newPlan.limit,
        // If upgrading, reset count so they get new limits immediately
        ...(isUpgrade && { reports_count: 0 }),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)

    return NextResponse.json({
      success: true,
      message: `Subscription ${isUpgrade ? 'upgraded' : 'downgraded'} successfully`,
      subscription: {
        id: updatedSubscription.id,
        tier: newTier,
        limit: newPlan.limit,
        isUpgrade
      }
    })
  } catch (error: any) {
    console.error('Error changing subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to change subscription' },
      { status: 500 }
    )
  }
}