import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/app/dashboard/SignOutButton'
import EscrowAgentForm from './EscrowAgentForm'

export default async function EscrowAgentVerificationPage() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 w-full backdrop-blur-md bg-transparent z-50 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 flex items-center justify-center transform transition group-hover:scale-105">
                <img src="/dealshield-logo.png" alt="Deal Shield" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Deal Shield</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className="px-5 py-2.5 text-gray-700 text-[15px] rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 via-pink-50 to-indigo-50" />
        
        {/* Winding Snake Gradient */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[5%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-12" />
          <div className="absolute top-[25%] right-[5%] w-[55%] h-[15%] bg-gradient-to-l from-purple-400/40 via-pink-400/40 to-transparent rounded-full blur-3xl transform -rotate-6" />
          <div className="absolute top-[45%] left-[5%] w-[60%] h-[15%] bg-gradient-to-r from-pink-400/40 via-indigo-400/40 to-transparent rounded-full blur-3xl transform rotate-3" />
          <div className="absolute top-[65%] right-[8%] w-[55%] h-[15%] bg-gradient-to-l from-indigo-400/40 via-blue-400/40 to-transparent rounded-full blur-3xl transform -rotate-9" />
          <div className="absolute top-[85%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-6" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-8 pt-32 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[14px] text-gray-600 mb-6">
            <Link href="/dashboard" className="hover:text-[#635BFF] transition">Dashboard</Link>
            <span>→</span>
            <Link href="/dashboard" className="hover:text-[#635BFF] transition">Document Verification</Link>
            <span>→</span>
            <span className="text-gray-900 font-medium">Verify Escrow Agent</span>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-[48px] font-bold text-gray-900 tracking-[-0.02em] leading-tight mb-3">
              Verify Escrow Agent
            </h1>
            <p className="text-[18px] text-gray-600 leading-relaxed">
              Verify escrow companies and agents before entrusting them with your funds
            </p>
          </div>

          {/* Warning Box */}
          <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
            <div className="flex items-start gap-4">
              <svg className="w-8 h-8 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-[18px] font-bold text-orange-900 mb-2">
                  ⚠️ Protect yourself from escrow fraud
                </h3>
                <p className="text-[15px] text-orange-800 leading-relaxed">
                  Always verify escrow agents <strong>before</strong> sending funds. Fraudulent escrow companies are common in high-value transactions, especially luxury goods, real estate, and business acquisitions.
                </p>
              </div>
            </div>
          </div>

          {/* What We Check */}
          <div className="mb-8 p-8 rounded-xl bg-white border border-gray-200 shadow-sm">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">
              What we verify
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">License Verification</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Verify escrow license and registration with regulatory bodies</div>
              </div>
              
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Business Registration</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Confirm legitimate business entity with proper registration</div>
              </div>
              
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Track Record & Reviews</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Assess reputation, experience, and client reviews</div>
              </div>
              
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Red Flags</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Detect fraud patterns, complaints, and suspicious activity</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <EscrowAgentForm userId={user.id} />
        </div>
      </main>
    </div>
  )
}