import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CancelSubscriptionButton from './CancelSubscriptionButton'
import ChangePlanButton from './ChangePlanButton'
import BillingPortalButton from './BillingPortalButton'

export default async function SettingsPage() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/sign-in')
  }

  // Fetch user profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError) {
    console.error('Error loading profile:', profileError)
  }

  // Tier information
  const plans = {
    starter: {
      name: 'Starter',
      price: 199,
      priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
      reports: 10,
      features: ['10 investigations per month', 'Basic risk assessment', 'PDF exports', 'Email support']
    },
    professional: {
      name: 'Professional',
      price: 599,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID!,
      reports: 50,
      features: ['50 investigations per month', 'Advanced risk analysis', 'Priority PDF exports', 'Priority email support', 'Historical data access']
    },
    enterprise: {
      name: 'Enterprise',
      price: 1999,
      priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
      reports: 'Unlimited',
      features: ['Unlimited investigations', 'Premium risk intelligence', 'Custom reporting', 'Dedicated account manager', 'API access', 'Team collaboration']
    }
  }

  const currentTier = profile?.subscription_tier || 'starter'
  const currentPlan = plans[currentTier as keyof typeof plans]
  const subscriptionStatus = profile?.subscription_status || 'active'
  const isTrialing = subscriptionStatus === 'trialing'
  const isCanceled = subscriptionStatus === 'canceled'
  const isPastDue = subscriptionStatus === 'past_due'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src="/dealshield-logo.png" alt="Deal Shield" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Account Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-gray-900 font-medium">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-gray-900 font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Account Created</label>
                  <p className="text-gray-900 font-medium">
                    {new Date(profile?.created_at || '').toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Billing Portal Quick Access */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Payment Management</h3>
              <p className="text-sm text-blue-800 mb-4">
                Update your payment method, view invoices, and manage billing details.
              </p>
              <BillingPortalButton customerId={profile?.stripe_customer_id} />
            </div>
          </div>

          {/* Right Column - Subscription Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Plan Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Current Plan</h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-gray-900">{currentPlan.name}</span>
                    {isTrialing && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                        Free Trial
                      </span>
                    )}
                    {isCanceled && (
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                        Canceled
                      </span>
                    )}
                    {isPastDue && (
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
                        Payment Failed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">
                    ${currentPlan.price}/month • {currentPlan.reports} reports
                  </p>
                </div>
              </div>

              {/* Plan Features */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Plan Features</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Billing Info */}
              {profile?.current_period_end && !isCanceled && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Next billing date</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(profile.current_period_end).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-gray-900 font-medium">${currentPlan.price}</p>
                    </div>
                  </div>
                </div>
              )}

              {isCanceled && profile?.current_period_end && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">
                    Your subscription has been canceled. You'll have access until{' '}
                    <strong>
                      {new Date(profile.current_period_end).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </strong>
                  </p>
                </div>
              )}

              {isPastDue && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-amber-800 mb-3">
                    ⚠️ Your payment failed. Please update your payment method to continue using Deal Shield.
                  </p>
                  <BillingPortalButton customerId={profile?.stripe_customer_id} variant="warning" />
                </div>
              )}

              {/* Action Buttons */}
              {!isCanceled && !isPastDue && (
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <BillingPortalButton customerId={profile?.stripe_customer_id} variant="secondary" />
                  <CancelSubscriptionButton subscriptionId={profile?.stripe_subscription_id} />
                </div>
              )}
            </div>

            {/* Available Plans */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                {isCanceled ? 'Reactivate Your Subscription' : 'Change Plan'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(plans).map(([tier, plan]) => {
                  const isCurrentPlan = tier === currentTier && !isCanceled
                  const isUpgrade = plan.price > currentPlan.price
                  const isDowngrade = plan.price < currentPlan.price

                  return (
                    <div
                      key={tier}
                      className={`relative rounded-lg border-2 p-6 ${
                        isCurrentPlan
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      {isCurrentPlan && (
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                            Current
                          </span>
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {plan.reports === 'Unlimited' ? 'Unlimited' : plan.reports} investigations/month
                      </p>

                      <ul className="space-y-2 mb-6">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {isCurrentPlan ? (
                        <button
                          disabled
                          className="w-full py-2 px-4 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed"
                        >
                          Current Plan
                        </button>
                      ) : (
                        <ChangePlanButton
                          currentPriceId={currentPlan.priceId}
                          newPriceId={plan.priceId}
                          newTier={tier}
                          subscriptionId={profile?.stripe_subscription_id}
                          customerId={profile?.stripe_customer_id}
                          isUpgrade={isUpgrade}
                          isCanceled={isCanceled}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}