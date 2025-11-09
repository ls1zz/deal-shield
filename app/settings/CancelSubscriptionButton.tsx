'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CancelSubscriptionButtonProps {
  subscriptionId: string | null
}

export default function CancelSubscriptionButton({ subscriptionId }: CancelSubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    if (!subscriptionId) {
      alert('No subscription found')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel subscription')
      }

      // Success - refresh the page to show updated status
      alert('Subscription canceled successfully. You\'ll have access until the end of your billing period.')
      router.refresh()
      setShowConfirmation(false)
    } catch (error: any) {
      console.error('Error canceling subscription:', error)
      alert(error.message || 'Failed to cancel subscription. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!subscriptionId) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition font-medium"
      >
        Cancel Subscription
      </button>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Cancel Subscription?
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period, but won't be charged again.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-amber-800">
                ⚠️ After cancellation:
              </p>
              <ul className="text-sm text-amber-800 mt-2 space-y-1 ml-4 list-disc">
                <li>You'll lose access to premium features</li>
                <li>Your investigation history will be preserved</li>
                <li>You can reactivate anytime</li>
              </ul>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
              >
                Keep Subscription
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
              >
                {isLoading ? 'Canceling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}