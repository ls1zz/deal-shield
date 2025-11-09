import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia',
  typescript: true,
});

// Price IDs for each tier
export const STRIPE_PRICES = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  professional: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
};
