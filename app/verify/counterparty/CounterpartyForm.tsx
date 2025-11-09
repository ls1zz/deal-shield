'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CounterpartyFormProps {
  userId: string
}

export default function CounterpartyForm({ userId }: CounterpartyFormProps) {
  const router = useRouter()
  const [entityName, setEntityName] = useState('')
  const [entityType, setEntityType] = useState<'company' | 'individual'>('company')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!entityName.trim()) {
      setError('Please enter a company or individual name')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/verify/counterparty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          entityName: entityName.trim(),
          entityType,
          additionalInfo: additionalInfo.trim()
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to verify counterparty')
      }

      const data = await response.json()
      
      // Redirect to results page
      router.push(`/verify/counterparty/${data.verificationId}`)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify counterparty')
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Form Card */}
      <div className="p-8 rounded-2xl bg-white/85 backdrop-blur-sm border border-purple-100/50 shadow-inner">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Entity Type Selection */}
          <div>
            <label className="block text-[14px] font-semibold text-gray-700 mb-3">
              What are you verifying?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEntityType('company')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  entityType === 'company'
                    ? 'border-[#635BFF] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className={`w-8 h-8 mx-auto mb-2 ${entityType === 'company' ? 'text-[#635BFF]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className={`text-[15px] font-semibold ${entityType === 'company' ? 'text-[#635BFF]' : 'text-gray-700'}`}>
                  Company
                </div>
              </button>

              <button
                type="button"
                onClick={() => setEntityType('individual')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  entityType === 'individual'
                    ? 'border-[#635BFF] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <svg className={`w-8 h-8 mx-auto mb-2 ${entityType === 'individual' ? 'text-[#635BFF]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div className={`text-[15px] font-semibold ${entityType === 'individual' ? 'text-[#635BFF]' : 'text-gray-700'}`}>
                  Individual
                </div>
              </button>
            </div>
          </div>

          {/* Entity Name Input */}
          <div>
            <label htmlFor="entityName" className="block text-[14px] font-semibold text-gray-700 mb-2">
              {entityType === 'company' ? 'Company name' : 'Full name'}
            </label>
            <input
              type="text"
              id="entityName"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value)}
              placeholder={entityType === 'company' ? 'e.g., Acme Corporation Ltd' : 'e.g., John Smith'}
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
              placeholder="e.g., Location, industry, representative name, website, etc."
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
            disabled={isProcessing || !entityName.trim()}
            className="w-full py-4 bg-[#635BFF] text-white text-[16px] rounded-lg hover:bg-[#5851EA] transition font-semibold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Verify {entityType}</span>
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
            <strong className="font-semibold">How it works:</strong> We'll search public records, company registries, and online sources to verify the legitimacy and background of the entity you're considering doing business with.
          </p>
        </div>
      </div>
    </div>
  )
}