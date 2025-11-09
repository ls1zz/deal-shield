'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface EscrowAgentFormProps {
  userId: string
}

export default function EscrowAgentForm({ userId }: EscrowAgentFormProps) {
  const router = useRouter()
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!companyName.trim()) {
      setError('Please enter an escrow company name')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/verify/escrow-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          companyName: companyName.trim(),
          location: location.trim(),
          licenseNumber: licenseNumber.trim(),
          additionalInfo: additionalInfo.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to verify escrow agent')
      }

      const data = await response.json()
      
      // Redirect to results page
      router.push(`/verify/escrow-agent/${data.verificationId}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify escrow agent')
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Form Card */}
      <div className="p-8 rounded-2xl bg-white/85 backdrop-blur-sm border border-purple-100/50 shadow-inner">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Name Input (Required) */}
          <div>
            <label htmlFor="companyName" className="block text-[14px] font-semibold text-gray-700 mb-2">
              Escrow company name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., ABC Escrow Services Ltd"
              className="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition"
              disabled={isProcessing}
              required
            />
          </div>

          {/* Location Input (Optional) */}
          <div>
            <label htmlFor="location" className="block text-[14px] font-semibold text-gray-700 mb-2">
              Location <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., London, UK or California, USA"
              className="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition"
              disabled={isProcessing}
            />
          </div>

          {/* License Number Input (Optional) */}
          <div>
            <label htmlFor="licenseNumber" className="block text-[14px] font-semibold text-gray-700 mb-2">
              License number <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="licenseNumber"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="e.g., ESC-12345 or state license number"
              className="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition"
              disabled={isProcessing}
            />
          </div>

          {/* Additional Info (Optional) */}
          <div>
            <label htmlFor="additionalInfo" className="block text-[14px] font-semibold text-gray-700 mb-2">
              Additional information <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g., Website URL, phone number, agent name, transaction type, etc."
              rows={3}
              className="w-full px-4 py-3 text-[15px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent transition resize-none"
              disabled={isProcessing}
            />
            <p className="text-[13px] text-gray-500 mt-2">
              Adding more details helps us provide a more accurate verification
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || !companyName.trim()}
            className="w-full py-4 bg-[#635BFF] text-white text-[16px] rounded-lg hover:bg-[#5851EA] transition font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying escrow agent...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Verify escrow agent</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-200">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-[16px] font-semibold text-red-900 mb-1">Verification failed</h4>
              <p className="text-[14px] text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-[13px] text-blue-800 leading-relaxed">
            <strong className="font-semibold">How it works:</strong> We'll search escrow registries, business records, licensing databases, and online reviews to verify the legitimacy and reputation of the escrow company.
          </p>
        </div>
      </div>
    </div>
  )
}