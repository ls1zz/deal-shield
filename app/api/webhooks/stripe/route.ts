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

// Webhook secret for signature verification
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Map Stripe price IDs to subscription tiers
const PRICE_TO_TIER: Record<string, { tier: string; limit: number }> = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: { tier: 'starter', limit: 10 },
  [process.env.STRIPE_PROFESSIONAL_PRICE_ID!]: { tier: 'professional', limit: 50 },
  [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: { tier: 'enterprise', limit: 9999 },
};

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  console.log('✅ Webhook received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Get subscription details
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;
        
        // In the new flow, the user might not exist yet in our system
        // because they haven't created their account
        // The subscription will be linked when they create their account
        // via the /api/link-subscription endpoint
        
        // However, we can still log this for tracking
        console.log(`✅ Checkout completed for customer ${customerId}, subscription ${subscriptionId}`);
        console.log('   Waiting for user to create account...');

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0].price.id;
        
        const tierInfo = PRICE_TO_TIER[priceId];
        
        if (!tierInfo) {
          console.error('❌ Unknown price ID:', priceId);
          break;
        }

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!profile) {
          console.log('⚠️ No user found for customer:', customerId, '(might not have created account yet)');
          break;
        }

        // Update subscription
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_tier: tierInfo.tier,
            reports_limit: tierInfo.limit,
            subscription_status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('id', profile.id);

        if (error) {
          console.error('❌ Supabase update error:', error);
        } else {
          console.log(`✅ User ${profile.id} subscription updated to ${tierInfo.tier}`);
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!profile) {
          console.error('❌ No user found for customer:', customerId);
          break;
        }

        // Downgrade to starter
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_tier: 'starter',
            reports_limit: 10,
            subscription_status: 'canceled',
            stripe_subscription_id: null,
          })
          .eq('id', profile.id);

        if (error) {
          console.error('❌ Supabase update error:', error);
        } else {
          console.log(`✅ User ${profile.id} subscription canceled, downgraded to starter`);
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!profile) {
          console.log('⚠️ No user found for customer:', customerId, '(might be first invoice before account creation)');
          break;
        }

        // Reset monthly report count on successful payment (new billing period)
        const { error } = await supabase
          .from('profiles')
          .update({
            reports_count: 0,
            subscription_status: 'active',
          })
          .eq('id', profile.id);

        if (error) {
          console.error('❌ Supabase update error:', error);
        } else {
          console.log(`✅ User ${profile.id} reports_count reset for new billing period`);
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        // Find user by Stripe customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (!profile) {
          console.error('❌ No user found for customer:', customerId);
          break;
        }

        // Mark as past due
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'past_due',
          })
          .eq('id', profile.id);

        if (error) {
          console.error('❌ Supabase update error:', error);
        } else {
          console.log(`⚠️ User ${profile.id} payment failed, marked as past_due`);
        }

        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ Error processing webhook:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}