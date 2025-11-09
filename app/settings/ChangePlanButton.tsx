'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ChangePlanButtonProps {
  currentPriceId: string
  newPriceId: string
  newTier: string
  subscriptionId: string | null
  customerId: string | null
  isUpgrade: boolean
  isCanceled: boolean
}

export default function ChangePlanButton({
  currentPriceId,
  newPriceId,
  newTier,
  subscriptionId,
  customerId,
  isUpgrade,
  isCanceled
}: ChangePlanButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleChangePlan = async () => {
    setIsLoading(true)

    try {
      // If subscription is canceled, create a new checkout session
      if (isCanceled) {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            priceId: newPriceId,
            customerId // Reuse existing customer
          })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create checkout session')
        }

        // Redirect to Stripe checkout
        window.location.href = data.url
        return
      }

      // Otherwise, update existing subscription
      const response = await fetch('/api/change-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscriptionId,
          newPriceId,
          newTier
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change plan')
      }

      // Success - refresh the page to show updated plan
      alert(`Plan ${isUpgrade ? 'upgraded' : 'downgraded'} successfully!`)
      router.refresh()
      setShowConfirmation(false)
    } catch (error: any) {
      console.error('Error changing plan:', error)
      alert(error.message || 'Failed to change plan. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const tierNames: { [key: string]: string } = {
    starter: 'Starter',
    professional: 'Professional',
    enterprise: 'Enterprise'
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className={`w-full py-2 px-4 rounded-lg font-medium transition ${
          isUpgrade
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        {isCanceled ? 'Reactivate' : isUpgrade ? 'Upgrade' : 'Downgrade'}
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isCanceled ? 'Reactivate Subscription?' : isUpgrade ? 'Upgrade Plan?' : 'Downgrade Plan?'}
            </h3>
            
            {isCanceled ? (
              <p className="text-gray-700 mb-6">
                You'll be redirected to checkout to reactivate your subscription to the <strong>{tierNames[newTier]}</strong> plan.
              </p>
            ) : (
              <>
                <p className="text-gray-700 mb-6">
                  {isUpgrade ? (
                    <>
                      You're upgrading to the <strong>{tierNames[newTier]}</strong> plan. 
                      You'll be charged a prorated amount for the remainder of your billing period, 
                      and your new limits will be available immediately.
                    </>
                  ) : (
                    <>
                      You're downgrading to the <strong>{tierNames[newTier]}</strong> plan. 
                      Your new limits will take effect at the start of your next billing period. 
                      You'll keep your current limits until then.
                    </>
                  )}
                </p>

                {isUpgrade && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-800">
                      ✅ Your new investigation limits will be available immediately after upgrade.
                    </p>
                  </div>
                )}

                {!isUpgrade && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-800">
                      ⚠️ Changes take effect on your next billing date. You'll keep current limits until then.
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePlan}
                disabled={isLoading}
                className={`flex-1 px-4 py-2 rounded-lg transition font-medium disabled:opacity-50 ${
                  isUpgrade
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              >
                {isLoading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}