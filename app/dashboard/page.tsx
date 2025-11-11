'use client'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/app/dashboard/SignOutButton'
import DeleteReportButton from './DeleteReportButton'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [reports, setReports] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = await createClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        redirect('/sign-in')
        return
      }

      setUser(user)

      const { data: reportsData } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      const allReports = reportsData || []

      // Auto-delete reports older than 72 hours
      const seventyTwoHoursAgo = new Date()
      seventyTwoHoursAgo.setHours(seventyTwoHoursAgo.getHours() - 72)
      
      const reportsToDelete = allReports.filter(r => new Date(r.created_at) < seventyTwoHoursAgo)
      
      let activeReports = allReports
      
      if (reportsToDelete.length > 0) {
        await supabase
          .from('reports')
          .delete()
          .in('id', reportsToDelete.map(r => r.id))
        
        activeReports = allReports.filter(r => new Date(r.created_at) >= seventyTwoHoursAgo)
      }

      setReports(activeReports)
      setLoading(false)
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#635BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Calculate metrics
  const totalReports = reports.length
  const criticalRisk = reports.filter(r => r.risk_level === 'CRITICAL').length
  const highRisk = reports.filter(r => r.risk_level === 'HIGH').length
  const mediumRisk = reports.filter(r => r.risk_level === 'MEDIUM').length
  const lowRisk = reports.filter(r => r.risk_level === 'LOW').length

  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weekReports = reports.filter(r => new Date(r.created_at) >= weekAgo)

  const highPriorityAlerts = weekReports
    .filter(r => r.risk_level === 'HIGH' || r.risk_level === 'CRITICAL')
    .slice(0, 5)

  const blockedDeals = criticalRisk
  const verifiedSafeDeals = lowRisk
  const needsReview = highRisk + mediumRisk
  const estimatedSaved = blockedDeals * 100000
  const dealQualityScore = totalReports > 0 ? Math.round((lowRisk / totalReports) * 100) : 0
  const recentReports = reports.slice(0, 5)

  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const last30DaysReports = reports
    .filter(r => new Date(r.created_at) >= thirtyDaysAgo)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

  const timeSavedHours = Math.round(weekReports.length * 1.8)

  const riskColors = {
    LOW: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    MEDIUM: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    HIGH: 'text-purple-700 bg-purple-50 border-purple-200',
    CRITICAL: 'text-[#635BFF] bg-purple-50 border-purple-200'
  }

  const riskDots = {
    LOW: 'bg-emerald-500',
    MEDIUM: 'bg-indigo-500',
    HIGH: 'bg-purple-500',
    CRITICAL: 'bg-[#635BFF]'
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full backdrop-blur-md bg-white/95 z-50 border-b border-gray-200/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] sm:h-[72px]">
            <Link href="/" className="flex items-center group">
              <img 
                src="/dealshield-logo.png" 
                alt="Shield Your Deal" 
                className="w-8 h-8 sm:w-9 sm:h-9 transform transition group-hover:scale-105"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/analyze"
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#635BFF] text-white text-[14px] sm:text-[15px] rounded-lg hover:bg-[#5851EA] transition font-medium shadow-sm"
              >
                New investigation
              </Link>
              <Link
                href="/settings"
                className="px-4 sm:px-5 py-2 sm:py-2.5 text-gray-700 text-[14px] sm:text-[15px] rounded-lg hover:bg-gray-100 transition font-medium border border-gray-300"
              >
                Edit Profile
              </Link>
              <SignOutButton />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              <Link
                href="/analyze"
                className="block px-4 py-3 bg-[#635BFF] text-white text-[15px] rounded-lg hover:bg-[#5851EA] transition font-medium text-center"
              >
                New investigation
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-3 text-gray-700 text-[15px] rounded-lg hover:bg-gray-50 transition font-medium border border-gray-300 text-center"
              >
                Edit Profile
              </Link>
              <div className="pt-2">
                <SignOutButton />
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative pt-[64px] sm:pt-[72px]">
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

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Page Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-gray-900 mb-2 tracking-[-0.02em]">
              Your <span className="bg-gradient-to-r from-[#635BFF] via-purple-600 to-pink-600 bg-clip-text text-transparent">dashboard</span>
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-gray-600 leading-relaxed">
              Risk intelligence and fraud prevention insights
            </p>
          </div>

          {/* Auto-delete notice */}
          {totalReports > 0 && (
            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-[13px] sm:text-[14px] text-blue-800">
                  <strong className="font-semibold">Security Notice:</strong> All investigations are automatically deleted after 72 hours for your security and privacy.
                </div>
              </div>
            </div>
          )}

          {/* Hero Stats - Most Impactful Metrics */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 sm:mb-6 tracking-[-0.01em]">This week</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Blocked Fraud */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-[13px] sm:text-[14px] font-medium text-gray-700">High-risk alerts</div>
                </div>
                <div className="text-[40px] sm:text-[48px] font-bold bg-gradient-to-r from-[#635BFF] to-purple-600 bg-clip-text text-transparent">{weekReports.filter(r => r.risk_level === 'HIGH' || r.risk_level === 'CRITICAL').length}</div>
                <p className="text-[12px] sm:text-[13px] text-gray-600 mt-1">Potential fraud blocked</p>
              </div>
              
              {/* Verified Safe */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-[13px] sm:text-[14px] font-medium text-gray-700">Verified safe</div>
                </div>
                <div className="text-[40px] sm:text-[48px] font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{weekReports.filter(r => r.risk_level === 'LOW').length}</div>
                <p className="text-[12px] sm:text-[13px] text-gray-600 mt-1">Safe to proceed with confidence</p>
              </div>
              
              {/* Time Saved */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-105 shadow-inner">
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-[13px] sm:text-[14px] font-medium text-gray-700">Time saved</div>
                </div>
                <div className="text-[40px] sm:text-[48px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{timeSavedHours}h</div>
                <p className="text-[12px] sm:text-[13px] text-gray-600 mt-1">vs manual due diligence</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex justify-center mb-12 sm:mb-16">
            <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
          </div>

          {/* Actionable Insights */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900 mb-4 sm:mb-6 tracking-[-0.01em]">Risk intelligence</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Fraud Prevention Value */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">Potential fraud prevented</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#635BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-[30px] sm:text-[36px] font-bold text-gray-900 mb-1">
                  {blockedDeals > 0 ? `$${(estimatedSaved / 1000000).toFixed(1)}M` : '$0'}
                </div>
                <div className="text-[12px] sm:text-[13px] text-gray-600">
                  {blockedDeals} critical risk {blockedDeals === 1 ? 'deal' : 'deals'} blocked
                </div>
              </div>

              {/* Deal Quality Score */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">Deal quality score</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-[30px] sm:text-[36px] font-bold text-gray-900 mb-1">{dealQualityScore}%</div>
                <div className="text-[12px] sm:text-[13px] text-gray-600">
                  Low-risk investigations
                </div>
              </div>

              {/* Needs Review */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] sm:text-[14px] font-medium text-gray-700">Needs review</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="text-[30px] sm:text-[36px] font-bold text-gray-900 mb-1">{needsReview}</div>
                <div className="text-[12px] sm:text-[13px] text-gray-600">
                  Medium/high risk requiring attention
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex justify-center mb-12 sm:mb-16">
            <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
          </div>

          {/* Recent Alerts & Risk Trend Row */}
          <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Recent Alerts */}
            <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-[-0.01em]">Recent alerts</h3>
                {highPriorityAlerts.length > 0 && (
                  <span className="px-2 sm:px-2.5 py-1 bg-purple-50 text-[#635BFF] text-[11px] sm:text-[12px] font-semibold rounded-lg border border-purple-200">
                    {highPriorityAlerts.length} {highPriorityAlerts.length === 1 ? 'alert' : 'alerts'}
                  </span>
                )}
              </div>
              
              {highPriorityAlerts.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[13px] sm:text-[14px] text-gray-600">No high-priority alerts</p>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 mt-1">All clear this week</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-2.5">
                  {highPriorityAlerts.map((report) => (
                    <Link
                      key={report.id}
                      href={`/reports/${report.id}`}
                      className="block p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 hover:border-purple-300 transition-all group/alert"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${report.risk_level === 'CRITICAL' ? 'bg-[#635BFF]' : 'bg-indigo-500'} animate-pulse`} />
                            <span className="text-[12px] sm:text-[13px] font-semibold text-gray-900">
                              {report.risk_level} RISK
                            </span>
                            <span className="text-[11px] sm:text-[12px] text-gray-500">
                              Score: {report.risk_score}
                            </span>
                          </div>
                          <p className="text-[12px] sm:text-[13px] text-gray-700 line-clamp-1">
                            {report.executive_summary}
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-gray-500 mt-1">
                            {new Date(report.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover/alert:text-[#635BFF] transition flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Risk Trend */}
            <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-[18px] sm:text-[20px] font-bold text-gray-900 tracking-[-0.01em]">Risk trend</h3>
                <span className="text-[11px] sm:text-[12px] text-gray-500 font-medium">Last 30 days</span>
              </div>
              
              {last30DaysReports.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-[13px] sm:text-[14px] text-gray-600">No data yet</p>
                  <p className="text-[12px] sm:text-[13px] text-gray-500 mt-1">Run investigations to see trends</p>
                </div>
              ) : (
                <div>
                  {/* Line Chart */}
                  <div className="relative h-32 sm:h-40 bg-gradient-to-b from-gray-50 to-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 border border-gray-100">
                    <svg className="absolute inset-3 sm:inset-4" viewBox="0 0 400 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#635BFF" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#635BFF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Area under line */}
                      <path
                        d={(() => {
                          const points = last30DaysReports.slice(-12)
                          const width = 400
                          const height = 120
                          const step = width / Math.max(points.length - 1, 1)
                          
                          let path = points.map((report, i) => {
                            const x = i * step
                            const y = height - (report.risk_score / 100) * height
                            return `${i === 0 ? 'M' : 'L'} ${x},${y}`
                          }).join(' ')
                          
                          const lastX = (points.length - 1) * step
                          path += ` L ${lastX},${height} L 0,${height} Z`
                          return path
                        })()}
                        fill="url(#areaGradient)"
                      />
                      
                      {/* Line */}
                      <path
                        d={(() => {
                          const points = last30DaysReports.slice(-12)
                          const width = 400
                          const height = 120
                          const step = width / Math.max(points.length - 1, 1)
                          
                          return points.map((report, i) => {
                            const x = i * step
                            const y = height - (report.risk_score / 100) * height
                            return `${i === 0 ? 'M' : 'L'} ${x},${y}`
                          }).join(' ')
                        })()}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    
                    {/* Data point dots */}
                    <div className="absolute inset-3 sm:inset-4 flex items-stretch">
                      {last30DaysReports.slice(-12).map((report, idx, arr) => {
                        const height = (report.risk_score / 100) * 100
                        const step = 100 / Math.max(arr.length - 1, 1)
                        const dotColor = 
                          report.risk_level === 'CRITICAL' ? 'bg-[#635BFF] shadow-lg shadow-purple-500/50' :
                          report.risk_level === 'HIGH' ? 'bg-purple-500 shadow-lg shadow-purple-500/50' :
                          report.risk_level === 'MEDIUM' ? 'bg-indigo-500 shadow-lg shadow-indigo-500/50' :
                          'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                        
                        return (
                          <Link
                            key={report.id}
                            href={`/reports/${report.id}`}
                            className="absolute w-2 h-2 rounded-full hover:scale-150 transition-transform group/dot"
                            style={{
                              left: `${idx * step}%`,
                              bottom: `${height}%`,
                              transform: 'translate(-50%, 50%)'
                            }}
                            title={`${report.risk_level} - Score: ${report.risk_score}`}
                          >
                            <div className={`w-full h-full rounded-full ${dotColor} border-2 border-white`} />
                          </Link>
                        )
                      })}
                    </div>
                    
                    {/* Grid lines */}
                    <div className="absolute inset-x-3 sm:inset-x-4 top-3 sm:top-4 bottom-3 sm:bottom-4 flex flex-col justify-between pointer-events-none">
                      {[100, 75, 50, 25].map((val) => (
                        <div key={val} className="flex items-center">
                          <span className="text-[9px] sm:text-[10px] text-gray-400 w-5 sm:w-6 -ml-6 sm:-ml-7">{val}</span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg border border-emerald-200/50">
                      <div className="text-[18px] sm:text-[20px] font-bold text-emerald-700">
                        {last30DaysReports.filter(r => r.risk_level === 'LOW').length}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-600 font-medium">Low risk</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-lg border border-indigo-200/50">
                      <div className="text-[18px] sm:text-[20px] font-bold text-indigo-700">
                        {last30DaysReports.filter(r => r.risk_level === 'MEDIUM' || r.risk_level === 'HIGH').length}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-indigo-600 font-medium">Med/High</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-200/50">
                      <div className="text-[18px] sm:text-[20px] font-bold text-[#635BFF]">
                        {last30DaysReports.filter(r => r.risk_level === 'CRITICAL').length}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-purple-600 font-medium">Critical</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex justify-center mb-12 sm:mb-16">
            <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
          </div>

          {/* Document Verification Hub */}
          <div className="mb-12 sm:mb-16">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900 tracking-[-0.01em] mb-2">Document verification</h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600">Verify parties and documents before signing</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Verify Received Documents */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-[16px] sm:text-[18px] font-semibold text-gray-900">Verify received documents</h3>
                    <p className="text-[12px] sm:text-[13px] text-gray-600">Check LOI, NDA, NCNDA parties</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href="/verify/loi"
                    className="block p-3 sm:p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 hover:border-blue-300 transition-all group/doc"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] sm:text-[14px] font-semibold text-gray-900 mb-1">Letter of Intent (LOI)</div>
                        <div className="text-[11px] sm:text-[12px] text-gray-600">Verify buyer/seller legitimacy</div>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover/doc:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  <Link
                    href="/verify/nda"
                    className="block p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 hover:border-purple-300 transition-all group/doc"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] sm:text-[14px] font-semibold text-gray-900 mb-1">NDA / NCNDA</div>
                        <div className="text-[11px] sm:text-[12px] text-gray-600">Verify signing parties</div>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover/doc:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  <Link
                    href="/verify/pof"
                    className="block p-3 sm:p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 hover:border-emerald-300 transition-all group/doc"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] sm:text-[14px] font-semibold text-gray-900 mb-1">Proof of Funds</div>
                        <div className="text-[11px] sm:text-[12px] text-gray-600">Verify financial capacity</div>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 group-hover/doc:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Verify Before Sending */}
              <div className="group p-5 sm:p-6 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 shadow-inner">
                <div className="flex items-center gap-2 sm:gap-3 mb-4">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <div>
                    <h3 className="text-[16px] sm:text-[18px] font-semibold text-gray-900">Before you send</h3>
                    <p className="text-[12px] sm:text-[13px] text-gray-600">Verify recipients before sharing</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href="/verify/counterparty"
                    className="block p-3 sm:p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 hover:border-orange-300 transition-all group/doc"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] sm:text-[14px] font-semibold text-gray-900 mb-1">Verify counterparty</div>
                        <div className="text-[11px] sm:text-[12px] text-gray-600">Check entity before sharing LOI</div>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 group-hover/doc:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  <Link
                    href="/verify/escrow-agent"
                    className="block p-3 sm:p-4 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 hover:border-amber-300 transition-all group/doc"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] sm:text-[14px] font-semibold text-gray-900 mb-1">Verify escrow agent</div>
                        <div className="text-[11px] sm:text-[12px] text-gray-600">Confirm escrow legitimacy</div>
                      </div>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 group-hover/doc:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  <div className="p-3 sm:p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-[11px] sm:text-[12px] text-indigo-700 leading-relaxed">
                        <strong className="font-semibold">Pro tip:</strong> Always verify all parties before signing or sending sensitive documents.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full flex justify-center mb-12 sm:mb-16">
            <div className="w-2/3 h-0.5 bg-gray-300/50"></div>
          </div>

          {/* Recent Investigations */}
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-[22px] sm:text-[24px] lg:text-[28px] font-bold text-gray-900 tracking-[-0.01em]">Recent investigations</h2>
              {reports.length > 5 && (
                <Link href="/reports" className="text-[13px] sm:text-[14px] text-[#635BFF] hover:text-[#5851EA] font-medium">
                  View all →
                </Link>
              )}
            </div>

            {reports.length === 0 ? (
              <div className="p-8 sm:p-12 lg:p-16 text-center bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-inner">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 sm:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-[18px] sm:text-[20px] font-semibold text-gray-900 mb-2">No investigations yet</h3>
                <p className="text-[14px] sm:text-[16px] text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed px-4">
                  Get started by running your first investigation to verify companies and individuals
                </p>
                <Link
                  href="/analyze"
                  className="group inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#635BFF] text-white text-[15px] sm:text-[16px] rounded-xl hover:bg-[#5851EA] transition-all font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <span>New investigation</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentReports.map((report) => {
                  const riskLevel = report.risk_level as keyof typeof riskColors
                  return (
                    <div
                      key={report.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white/85 backdrop-blur-sm hover:bg-white/95 hover:shadow-xl transition-all duration-300 border border-purple-100/50 group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
                        <Link href={`/reports/${report.id}`} className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <div className="text-[14px] sm:text-[15px] font-semibold text-gray-900 group-hover:text-[#635BFF] transition">
                              #{report.id.slice(0, 8)}
                            </div>
                            <div className={`inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg border text-[11px] sm:text-[12px] font-semibold ${riskColors[riskLevel]} shadow-sm`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${riskDots[riskLevel]}`} />
                              {report.risk_level}
                            </div>
                            <div className="text-[12px] sm:text-[13px] text-gray-500">
                              Score: <span className="font-semibold text-gray-700">{report.risk_score}</span>
                            </div>
                          </div>
                          <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed line-clamp-2 mb-2">
                            {report.executive_summary}
                          </p>
                          <div className="text-[12px] sm:text-[13px] text-gray-500">
                            {new Date(report.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                            {' • '}
                            <span className="text-indigo-600 font-medium">
                              Expires in {Math.ceil((72 - (Date.now() - new Date(report.created_at).getTime()) / (1000 * 60 * 60)))}h
                            </span>
                          </div>
                        </Link>
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <Link
                            href={`/reports/${report.id}`}
                            className="p-2 text-gray-400 hover:text-[#635BFF] transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                          <DeleteReportButton reportId={report.id} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}