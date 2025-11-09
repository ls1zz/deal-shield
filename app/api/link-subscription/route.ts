// app/api/link-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Map Stripe price IDs to subscription tiers
const PRICE_TO_TIER: Record<string, { tier: string; limit: number }> = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: { tier: 'starter', limit: 10 },
  [process.env.STRIPE_PROFESSIONAL_PRICE_ID!]: { tier: 'professional', limit: 50 },
  [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: { tier: 'enterprise', limit: 9999 },
};

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionId } = await request.json();

    if (!userId || !sessionId) {
      return NextResponse.json(
        { error: 'User ID and Session ID are required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 400 }
      );
    }

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const priceId = subscription.items.data[0].price.id;

    // Map price ID to tier and limit
    const tierInfo = PRICE_TO_TIER[priceId];

    if (!tierInfo) {
      console.error('Unknown price ID:', priceId);
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    // Update user profile in Supabase with subscription details
    const { error } = await supabase
      .from('profiles')
      .update({
        subscription_tier: tierInfo.tier,
        reports_limit: tierInfo.limit,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        subscription_status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json(
        { error: 'Failed to link subscription' },
        { status: 500 }
      );
    }

    // Update Stripe subscription metadata with user ID
    await stripe.subscriptions.update(subscriptionId, {
      metadata: {
        userId: userId,
      },
    });

    // Also update customer metadata
    await stripe.customers.update(customerId, {
      metadata: {
        userId: userId,
      },
    });

    console.log(`✅ Linked subscription for user ${userId} to tier ${tierInfo.tier}`);

    return NextResponse.json({
      success: true,
      tier: tierInfo.tier,
      limit: tierInfo.limit,
    });
  } catch (error) {
    console.error('Link subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to link subscription' },
      { status: 500 }
    );
  }
}