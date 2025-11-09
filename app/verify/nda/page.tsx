import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/app/dashboard/SignOutButton'
import NDAUploadForm from './NDAUploadForm'

export default async function NDAVerificationPage() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/sign-in')
  }

  // Fetch user's NDA verifications
  const { data: verifications } = await supabase
    .from('document_verifications')
    .select('*')
    .eq('user_id', user.id)
    .eq('document_type', 'NDA')
    .order('created_at', { ascending: false })
    .limit(10)

  const recentVerifications = verifications || []

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

        <div className="relative max-w-[1400px] mx-auto px-8 pt-32 pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[14px] text-gray-600 mb-6">
            <Link href="/dashboard" className="hover:text-[#635BFF] transition">Dashboard</Link>
            <span>→</span>
            <Link href="/dashboard" className="hover:text-[#635BFF] transition">Document Verification</Link>
            <span>→</span>
            <span className="text-gray-900 font-medium">NDA/NCNDA</span>
          </div>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-[48px] font-bold text-gray-900 tracking-[-0.02em] leading-tight mb-3">
              Verify NDA/NCNDA
            </h1>
            <p className="text-[18px] text-gray-600 leading-relaxed">
              Upload NDA or NCNDA documents to verify signing parties, check standard clauses, and detect fraud indicators
            </p>
          </div>

          {/* Security Notice - Professional with Shield Badges */}
          <div className="mb-12 p-8 rounded-xl bg-white border border-gray-200 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <svg className="w-10 h-10 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-[20px] font-bold text-gray-900 mb-1">
                  Enterprise-Grade Security
                </h3>
                <p className="text-[15px] text-gray-600">
                  Your documents are processed with bank-level encryption and never stored permanently
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">Real-time Processing</div>
                  <div className="text-[13px] text-gray-600">Documents analyzed immediately in memory</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">Auto-Delete</div>
                  <div className="text-[13px] text-gray-600">Files removed when you close this page</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">Zero Retention</div>
                  <div className="text-[13px] text-gray-600">Only analysis results are saved, never documents</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">End-to-End Encryption</div>
                  <div className="text-[13px] text-gray-600">256-bit encryption during processing</div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Check Section */}
          <div className="mb-12 p-8 rounded-xl bg-white border border-gray-200 shadow-sm">
            <h2 className="text-[20px] font-bold text-gray-900 mb-6">
              What we verify in your NDA/NCNDA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Party Legitimacy</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Verify identity and legitimacy of all signing parties</div>
              </div>
              
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Standard Clauses</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Check for essential confidentiality and non-circumvention terms</div>
              </div>
              
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Fraud Detection</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Identify suspicious terms, missing clauses, and red flags</div>
              </div>
              
              <div className="flex flex-col items-start">
                <svg className="w-9 h-9 text-[#635BFF] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-[16px] font-semibold text-gray-900 mb-2">Risk Assessment</div>
                <div className="text-[14px] text-gray-600 leading-relaxed">Overall fraud risk score and detailed recommendations</div>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="mb-12">
            <NDAUploadForm userId={user.id} />
          </div>

          {/* Recent Verifications */}
          {recentVerifications.length > 0 && (
            <div>
              <h2 className="text-[28px] font-bold text-gray-900 mb-6 tracking-[-0.01em]">Recent NDA verifications</h2>
              <div className="space-y-3">
                {recentVerifications.map((verification) => (
                  <Link
                    key={verification.id}
                    href={`/verify/nda/${verification.id}`}
                    className="block p-5 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 group"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-[15px] font-semibold text-gray-900 group-hover:text-[#635BFF] transition">
                            {verification.document_name || 'NDA Document'}
                          </div>
                          {verification.risk_level && (
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[12px] font-semibold ${
                              verification.risk_level === 'LOW' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                              verification.risk_level === 'MEDIUM' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                              verification.risk_level === 'HIGH' ? 'text-orange-700 bg-orange-50 border-orange-200' :
                              'text-red-700 bg-red-50 border-red-200'
                            }`}>
                              {verification.risk_level}
                            </div>
                          )}
                        </div>
                        <p className="text-[14px] text-gray-600 leading-relaxed line-clamp-1 mb-2">
                          {verification.summary || 'Verification completed'}
                        </p>
                        <div className="text-[13px] text-gray-500">
                          {new Date(verification.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-[#635BFF] group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}