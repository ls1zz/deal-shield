import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ScrollReveal, ScrollRevealGrid } from './components/ScrollReveal'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Premium Header */}
      <header className="absolute top-0 w-full backdrop-blur-md bg-transparent z-50 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] sm:h-[72px]">
            <Link href="/" className="flex items-center group">
              <img 
                src="/dealshield-logo.png" 
                alt="Shield Your Deal" 
                className="w-8 h-8 sm:w-9 sm:h-9 transform transition group-hover:scale-105"
              />
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <a href="#features" className="relative px-4 py-2 text-[15px] text-gray-700 hover:text-gray-900 transition font-medium rounded-lg group">
                <span>Features</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a href="#document-verification" className="relative px-4 py-2 text-[15px] text-gray-700 hover:text-gray-900 transition font-medium rounded-lg group">
                <span>Document verification</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              <a href="#pricing" className="relative px-4 py-2 text-[15px] text-gray-700 hover:text-gray-900 transition font-medium rounded-lg group">
                <span>Pricing</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
              
              <div className="w-px h-6 bg-gray-200 mx-2" />
              
              {user ? (
                <Link
                  href="/dashboard"
                  className="ml-3 px-5 py-2.5 bg-[#635BFF] text-white text-[15px] rounded-lg hover:bg-[#5851EA] transition font-medium shadow-sm"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-[15px] text-gray-700 hover:text-gray-900 transition font-medium rounded-lg hover:bg-gray-50"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/pricing"
                    className="ml-3 px-5 py-2.5 bg-[#635BFF] text-white text-[15px] rounded-lg hover:bg-[#5851EA] transition font-medium shadow-sm"
                  >
                    Get started
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Single Unified Section with Continuous Gradient */}
      <main className="relative">
        {/* Light Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 via-pink-50 to-indigo-50" />
        
        {/* Winding Snake Gradient */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[5%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-12" />
          <div className="absolute top-[25%] right-[5%] w-[55%] h-[15%] bg-gradient-to-l from-purple-400/40 via-pink-400/40 to-transparent rounded-full blur-3xl transform -rotate-6" />
          <div className="absolute top-[45%] left-[5%] w-[60%] h-[15%] bg-gradient-to-r from-pink-400/40 via-indigo-400/40 to-transparent rounded-full blur-3xl transform rotate-3" />
          <div className="absolute top-[65%] right-[8%] w-[55%] h-[15%] bg-gradient-to-l from-indigo-400/40 via-blue-400/40 to-transparent rounded-full blur-3xl transform -rotate-9" />
          <div className="absolute top-[85%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-6" />
        </div>

        {/* Hero Content */}
        <div className="relative pt-32 pb-24 px-8 min-h-[90vh] flex items-center">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2.5 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-8 shadow-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[13px] font-medium text-gray-700 tracking-tight">Complete confidentiality guaranteed</span>
                </div>

                <h1 className="text-[64px] lg:text-[76px] font-bold text-gray-900 mb-6 tracking-[-0.04em] leading-[0.95]">
                  Close deals with
                  <br />
                  <span className="bg-gradient-to-r from-[#635BFF] via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                    confidence
                  </span>
                </h1>
                
                <p className="text-[20px] text-gray-600 mb-10 leading-[1.6] max-w-[580px]">
                  Instantly investigate companies, individuals, and verify documents across 9 government registries. Know exactly who you're dealing with before you sign anything.
                </p>

                <div className="flex items-center space-x-4 mb-8">
                  {user ? (
                    <Link
                      href="/analyze"
                      className="group px-8 py-4 bg-[#635BFF] text-white text-[16px] rounded-xl hover:bg-[#5851EA] transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2"
                    >
                      <span>Start investigation</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/pricing"
                        className="group px-8 py-4 bg-[#635BFF] text-white text-[16px] rounded-xl hover:bg-[#5851EA] transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center space-x-2"
                      >
                        <span>Start free trial</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <Link
                        href="#how-it-works"
                        className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 text-[16px] rounded-xl hover:bg-white transition-all font-medium border border-gray-200 shadow-sm hover:shadow-md inline-flex items-center space-x-2"
                      >
                        <span>How it works</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </>
                  )}
                </div>

                <div className="flex items-start space-x-3 mb-12 max-w-[580px]">
                  <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-[15px] font-semibold text-gray-800 mb-1">Bank-grade encryption. Zero data sharing.</p>
                    <p className="text-[14px] text-gray-600 leading-relaxed">Your investigations are completely confidential and never shared with third parties.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[14px] text-gray-500">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">SOC 2 Type II Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">256-bit encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium">GDPR & CCPA compliant</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block relative">
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 animate-pulse border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#635BFF] to-purple-600 rounded-xl flex items-center justify-center">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            <span className="blur-[3px] select-none">Walsh Assets</span> Ltd
                          </h3>
                          <p className="text-sm text-gray-500">
                            Company #<span className="blur-[3px] select-none">12345678</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm font-medium text-emerald-700">LOW RISK</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Risk Score</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-emerald-500 rounded-full" />
                          </div>
                          <span className="text-sm font-semibold text-emerald-600">25/100</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Founded</p>
                          <p className="font-semibold text-gray-900">2019</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          <p className="font-semibold text-gray-900">Active</p>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-600 font-medium mb-1">✓ Document verified</p>
                        <p className="text-xs text-blue-700">All parties cleared</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-pulse animation-delay-2000 border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-emerald-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">9 registries checked</span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-xl p-4 animate-pulse animation-delay-4000 border border-gray-100">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-900">Report in 42s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Features */}
        <div id="features" className="relative py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-[52px] font-bold text-gray-900 mb-4 tracking-[-0.02em]">
                  Everything you need
                </h2>
                <p className="text-[20px] text-gray-600 max-w-[600px] mx-auto leading-relaxed">
                  Complete due diligence platform with automated risk analysis and real-time monitoring
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid staggerDelay={150} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Company verification</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Search UK Companies House, US SEC, Singapore ACRA and 6 more registries instantly</p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Document verification</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Verify LOI, NDA, NCNDA, and Proof of Funds documents before signing</p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Risk analytics</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Track risk trends, get alerts on high-priority deals, and monitor risk distribution</p>
              </div>
              
              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Business metrics</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Calculate time saved, track deal velocity, and measure monthly usage patterns</p>
              </div>
            </ScrollRevealGrid>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Document Verification Section */}
        <div id="document-verification" className="relative py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-[52px] font-bold text-gray-900 mb-4 tracking-[-0.02em]">
                  Verify before you sign
                </h2>
                <p className="text-[20px] text-gray-600 max-w-[700px] mx-auto leading-relaxed">
                  Fraudulent LOIs and shell companies are everywhere in luxury transactions. Verify every party before sharing sensitive documents or wiring funds.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Verify Received Documents */}
              <ScrollReveal>
                <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                  <div className="flex items-center gap-3 mb-6">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="text-[22px] font-semibold text-gray-900">Verify received documents</h3>
                      <p className="text-[14px] text-gray-600">Check parties on LOI, NDA, NCNDA</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-pink-50 border border-pink-100 min-h-[88px] flex items-center">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-gray-900">Proof of Funds</div>
                          <div className="text-[13px] text-gray-600">Verify financial capacity</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 min-h-[88px] flex items-center">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-gray-900">NDA / NCNDA</div>
                          <div className="text-[13px] text-gray-600">Verify signing parties</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 min-h-[88px] flex items-center">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-gray-900">Letter of Intent</div>
                          <div className="text-[13px] text-gray-600">Verify buyer/seller legitimacy</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Verify Before Sending */}
              <ScrollReveal>
                <div className="group p-8 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                  <div className="flex items-center gap-3 mb-6">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <div>
                      <h3 className="text-[22px] font-semibold text-gray-900">Before you send</h3>
                      <p className="text-[14px] text-gray-600">Verify recipients before sharing</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-pink-50 border border-pink-100 min-h-[88px] flex items-center">
                      <div className="flex items-center gap-3 w-full">
                        <svg className="w-5 h-5 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-[13px] text-gray-900 leading-relaxed">
                          <strong className="font-semibold">Pro tip:</strong> Fraudulent LOIs are common in luxury transactions. Always verify all parties before signing.
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 min-h-[88px] flex items-center">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-gray-900">Verify escrow agent</div>
                          <div className="text-[13px] text-gray-600">Confirm escrow legitimacy</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 min-h-[88px] flex items-center">
                      <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-gray-900">Verify counterparty</div>
                          <div className="text-[13px] text-gray-600">Check entity before sharing LOI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Stats Section */}
        <div className="relative py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-[48px] font-bold text-gray-900 mb-4 tracking-[-0.02em]">
                  Trusted by brokers worldwide
                </h2>
                <p className="text-[19px] text-gray-700 max-w-[600px] mx-auto leading-relaxed">
                  Every investigation is encrypted, confidential, and automatically deleted on your command
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid staggerDelay={200} className="grid md:grid-cols-4 gap-12 text-center mb-16">
              <div className="group cursor-default">
                <div className="text-[48px] font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">9+</div>
                <div className="text-gray-700 font-medium">Government registries</div>
              </div>
              <div className="group cursor-default">
                <div className="text-[48px] font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">60s</div>
                <div className="text-gray-700 font-medium">Average investigation</div>
              </div>
              <div className="group cursor-default">
                <div className="text-[48px] font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">1.8h</div>
                <div className="text-gray-700 font-medium">Time saved per report</div>
              </div>
              <div className="group cursor-default">
                <div className="text-[48px] font-bold mb-2 bg-gradient-to-r from-pink-500 to-emerald-500 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-110">100%</div>
                <div className="text-gray-700 font-medium">Confidential</div>
              </div>
            </ScrollRevealGrid>

            {/* Security Trust Bar */}
            <ScrollReveal>
              <div className="py-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <div className="text-[15px] font-bold text-gray-900">SOC 2 Type II</div>
                      <div className="text-[13px] text-gray-600">Audited security</div>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-gray-300"></div>

                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <div className="text-[15px] font-bold text-gray-900">256-bit Encryption</div>
                      <div className="text-[13px] text-gray-600">Military-grade security</div>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-gray-300"></div>

                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <div className="text-[15px] font-bold text-gray-900">GDPR & CCPA</div>
                      <div className="text-[13px] text-gray-600">Privacy compliant</div>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-12 bg-gray-300"></div>

                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                    <div>
                      <div className="text-[15px] font-bold text-gray-900">Zero Data Sharing</div>
                      <div className="text-[13px] text-gray-600">Never sold or shared</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Dashboard Preview Section */}
        <div className="relative py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-[52px] font-bold text-gray-900 mb-4 tracking-[-0.02em]">
                  Your command center
                </h2>
                <p className="text-[20px] text-gray-600 max-w-[700px] mx-auto leading-relaxed">
                  Monitor all investigations, track risk trends, and access business metrics from your powerful dashboard
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid staggerDelay={150} className="grid md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Risk analytics</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Track 30-day risk trends with visual charts, monitor risk distribution, and get real-time alerts on high-priority deals</p>
              </div>

              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Business metrics</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Calculate time saved vs. manual DD, track monthly usage patterns, and monitor deal velocity with 7-day averages</p>
              </div>

              <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm hover:bg-white/60 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gray-900 mb-3 tracking-[-0.01em]">Report history</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Access all past investigations with quick filters, recently investigated entities, and comprehensive search across all reports</p>
              </div>
            </ScrollRevealGrid>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="relative py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-[52px] font-bold text-gray-900 mb-4 tracking-[-0.02em]">
                  How it works
                </h2>
                <p className="text-[20px] text-gray-600 max-w-[600px] mx-auto leading-relaxed">
                  From deal info to professional report in 60 seconds
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid staggerDelay={200} className="grid md:grid-cols-3 gap-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000" />
                <div className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-blue-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6">1</div>
                  <h3 className="text-[22px] font-semibold text-gray-900 mb-3 tracking-tight">Paste deal info</h3>
                  <p className="text-[16px] text-gray-600 leading-relaxed">Copy deal details, party names, or upload documents. No special formatting needed.</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000" />
                <div className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-indigo-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6">2</div>
                  <h3 className="text-[22px] font-semibold text-gray-900 mb-3 tracking-tight">Automated investigation</h3>
                  <p className="text-[16px] text-gray-600 leading-relaxed">System extracts entities and searches 9 registries automatically. Get risk scores and alerts instantly.</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition duration-1000" />
                <div className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-6">3</div>
                  <h3 className="text-[22px] font-semibold text-gray-900 mb-3 tracking-tight">Get report</h3>
                  <p className="text-[16px] text-gray-600 leading-relaxed">Professional report with risk score, recommendations, and full audit trail. Export as PDF.</p>
                </div>
              </div>
            </ScrollRevealGrid>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Confidentiality Guarantee Section */}
        <div className="relative py-32 px-8">
          <div className="max-w-[1100px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <svg className="w-20 h-20 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-[52px] font-bold text-gray-900 mb-6 tracking-[-0.02em]">
                  Your privacy is our priority
                </h2>
                <p className="text-[20px] text-gray-700 max-w-[750px] mx-auto leading-relaxed mb-4">
                  Every investigation is encrypted, anonymized, and stored with military-grade security. Your searches remain completely confidential—never shared, sold, or accessed by anyone but you.
                </p>
                <p className="text-[17px] text-emerald-700 font-semibold max-w-[700px] mx-auto">
                  Delete any report permanently with one click. No questions asked.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid staggerDelay={150} className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold text-gray-900 mb-3">End-to-end encryption</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">256-bit AES encryption. Same standard used by banks and government agencies.</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold text-gray-900 mb-3">Zero data sharing</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">We never sell, share, or monetize your data. Your investigations are for your eyes only.</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-5 transform group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-[19px] font-semibold text-gray-900 mb-3">Full data control</h3>
                <p className="text-[15px] text-gray-700 leading-relaxed">Delete reports instantly and permanently. You control what stays and what goes.</p>
              </div>
            </ScrollRevealGrid>

            <ScrollRevealGrid staggerDelay={150} className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-emerald-200 hover:bg-white/60 transition-all hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <svg className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-[16px] text-gray-900 font-semibold mb-2">SOC 2 Type II Certified</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      Independently audited security controls. Annual penetration testing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-blue-200 hover:bg-white/60 transition-all hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <svg className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-[16px] text-gray-900 font-semibold mb-2">GDPR & CCPA Compliant</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      Full compliance with global privacy regulations. Your rights protected.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollRevealGrid>

            <ScrollReveal>
              <div className="p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200 hover:bg-white/60 transition-all hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <svg className="w-7 h-7 text-gray-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-[16px] text-gray-900 font-semibold mb-2">No third-party access</p>
                    <p className="text-[15px] text-gray-700 leading-relaxed">
                      Your data never leaves our secure infrastructure. We don't use external analytics, tracking, or advertising networks. What you investigate stays between you and Shield Your Deal.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Pricing */}
        <div id="pricing" className="relative py-32 px-8">
          <div className="max-w-[1200px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-20">
                <h2 className="text-[52px] font-bold text-gray-900 mb-4 tracking-[-0.02em]">
                  Simple, transparent pricing
                </h2>
                <p className="text-[20px] text-gray-600 max-w-[600px] mx-auto leading-relaxed">
                  All plans include 9 global registries, document verification, and automated analysis. Complete confidentiality guaranteed.
                </p>
              </div>
            </ScrollReveal>

            <ScrollRevealGrid staggerDelay={150} className="grid md:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-indigo-100 hover:border-indigo-200 transition-all hover:shadow-2xl hover:scale-105 duration-300 shadow-inner flex flex-col">
                <div className="mb-8">
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Starter</h3>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-[48px] font-bold text-gray-900 tracking-tight">$0</span>
                      <span className="text-gray-600 text-[17px] ml-2">for 7 days</span>
                    </div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-[24px] font-semibold text-gray-700">$199</span>
                      <span className="text-gray-500 text-[15px] ml-1">/month after trial</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[14px] font-medium text-gray-600">10 reports/month</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['10 due diligence reports per month', 'Automated risk assessment', 'Access to 9 global registries', 'Email support'].map((item, i) => (
                    <li key={i} className="flex items-center text-[15px] text-gray-700">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <Link href="/pricing" className="block w-full py-3.5 text-center bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium text-[15px] hover:scale-105">
                    Start 7-Day Free Trial
                  </Link>
                  <p className="text-[13px] text-center mt-3 font-medium text-gray-600">
                    Free for 7 days • Cancel anytime
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#635BFF] to-purple-600 p-8 rounded-3xl shadow-2xl relative transform scale-105 hover:scale-110 transition-all duration-300 flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-[#635BFF] px-4 py-1.5 rounded-full text-[13px] font-semibold shadow-lg animate-pulse">
                  Most Popular
                </div>
                <div className="mb-8">
                  <h3 className="text-[17px] font-semibold text-white mb-1">Professional</h3>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-[48px] font-bold text-white tracking-tight">$0</span>
                      <span className="text-blue-100 text-[17px] ml-2">for 7 days</span>
                    </div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-[24px] font-semibold text-white/80">$599</span>
                      <span className="text-blue-100 text-[15px] ml-1">/month after trial</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[14px] font-medium text-blue-100">50 reports/month</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['50 due diligence reports per month', 'Automated risk assessment', 'Access to 9 global registries', 'Priority email support', 'Advanced analytics'].map((item, i) => (
                    <li key={i} className="flex items-center text-[15px] text-white">
                      <svg className="w-5 h-5 text-emerald-300 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <Link href="/pricing" className="block w-full py-3.5 text-center bg-white text-[#635BFF] rounded-xl hover:bg-gray-50 transition-all font-medium text-[15px] shadow-lg hover:scale-105">
                    Start 7-Day Free Trial
                  </Link>
                  <p className="text-[13px] text-center mt-3 font-medium text-white/90">
                    Free for 7 days • Cancel anytime
                  </p>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-3xl border border-indigo-100 hover:border-indigo-200 transition-all hover:shadow-2xl hover:scale-105 duration-300 shadow-inner flex flex-col">
                <div className="mb-8">
                  <h3 className="text-[17px] font-semibold text-gray-900 mb-1">Enterprise</h3>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-[48px] font-bold text-gray-900 tracking-tight">$0</span>
                      <span className="text-gray-600 text-[17px] ml-2">for 7 days</span>
                    </div>
                    <div className="flex items-baseline mt-1">
                      <span className="text-[24px] font-semibold text-gray-700">$1,999</span>
                      <span className="text-gray-500 text-[15px] ml-1">/month after trial</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[14px] font-medium text-gray-600">Unlimited reports</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {['Unlimited due diligence reports', 'Automated risk assessment', 'Access to 9 global registries', 'Priority phone & email support', 'Advanced analytics', 'Custom integrations', 'Dedicated account manager'].map((item, i) => (
                    <li key={i} className="flex items-center text-[15px] text-gray-700">
                      <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <div>
                  <Link href="/pricing" className="block w-full py-3.5 text-center bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium text-[15px] hover:scale-105">
                    Start 7-Day Free Trial
                  </Link>
                  <p className="text-[13px] text-center mt-3 font-medium text-gray-600">
                    Free for 7 days • Cancel anytime
                  </p>
                </div>
              </div>
            </ScrollRevealGrid>
          </div>
        </div>

        {/* Divider */}
        <div className="relative w-full flex justify-center">
          <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
        </div>

        {/* Final CTA */}
        <ScrollReveal>
          <div className="relative py-32 px-8">
            <div className="max-w-[900px] mx-auto text-center">
              <h2 className="text-[56px] font-bold mb-6 tracking-[-0.02em] leading-tight text-gray-900">
                Ready to verify your next deal?
              </h2>
              <p className="text-[20px] text-gray-700 mb-10 leading-relaxed max-w-[600px] mx-auto">
                Join brokers closing high-value deals with confidence. Start your free trial today.
              </p>
              <Link
                href={user ? "/analyze" : "/pricing"}
                className="group inline-flex items-center space-x-2 px-10 py-5 bg-[#635BFF] text-white text-[17px] rounded-xl hover:bg-[#5851EA] transition-all font-semibold shadow-2xl hover:scale-105"
              >
                <span>{user ? "Start investigation" : "Start free trial"}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="mt-8 text-[15px] text-gray-600">
                No credit card required • 7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </ScrollReveal>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-gray-400 py-16 px-8 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/dealshield-logo.png" 
                  alt="Shield Your Deal" 
                  className="w-7 h-7"
                />
                <span className="text-[16px] font-semibold text-white">Shield Your Deal</span>
              </div>
              <p className="text-[14px] text-gray-400 leading-relaxed">
                Confidential due diligence for luxury transactions.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4 text-[14px]">Product</h5>
              <ul className="space-y-3 text-[14px]">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#document-verification" className="hover:text-white transition">Document verification</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4 text-[14px]">Company</h5>
              <ul className="space-y-3 text-[14px]">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-4 text-[14px]">Legal</h5>
              <ul className="space-y-3 text-[14px]">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-[13px] text-gray-500">
            <p>&copy; 2025 Shield Your Deal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}