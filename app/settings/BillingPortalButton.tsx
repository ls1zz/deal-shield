'use client'

import { useState } from 'react'

interface BillingPortalButtonProps {
  customerId: string | null
  variant?: 'primary' | 'secondary' | 'warning'
}

export default function BillingPortalButton({ customerId, variant = 'primary' }: BillingPortalButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenPortal = async () => {
    if (!customerId) {
      alert('No customer ID found. Please contact support.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session')
      }

      // Redirect to Stripe Customer Portal
      window.location.href = data.url
    } catch (error: any) {
      console.error('Error opening billing portal:', error)
      alert(error.message || 'Failed to open billing portal. Please try again.')
      setIsLoading(false)
    }
  }

  const buttonStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    warning: 'bg-amber-600 text-white hover:bg-amber-700'
  }

  return (
    <button
      onClick={handleOpenPortal}
      disabled={isLoading || !customerId}
      className={`px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${buttonStyles[variant]}`}
    >
      {isLoading ? 'Loading...' : 'Manage Billing'}
    </button>
  )
}