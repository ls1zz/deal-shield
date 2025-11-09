import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/app/dashboard/SignOutButton'

export default async function EscrowAgentResultsPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const supabase = await createClient()
  
  // CRITICAL: Await params in Next.js 15
  const { id } = await params
  
  // Get current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/sign-in')
  }

  // Fetch verification results
  const { data: verification, error } = await supabase
    .from('document_verifications')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (error || !verification) {
    redirect('/verify/escrow-agent')
  }

  const analysisData = verification.analysis_data as any

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-[#635BFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-base">DS</span>
              </div>
              <span className="text-[17px] font-semibold text-gray-900">DealShield</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link href="/verify/escrow-agent" className="px-5 py-2.5 text-gray-700 text-[15px] rounded-lg hover:bg-gray-100 transition font-medium">
                New Verification
              </Link>
              <Link href="/dashboard" className="px-5 py-2.5 text-gray-700 text-[15px] rounded-lg hover:bg-gray-100 transition font-medium">
                Dashboard
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Document Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-[40px] font-bold text-gray-900 mb-2">{verification.document_name}</h1>
              <p className="text-[15px] text-gray-600">
                {new Date(verification.created_at).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
            
            <div className={`px-6 py-3 rounded-lg font-bold text-[16px] ${
              verification.risk_level === 'LOW' ? 'text-emerald-700 bg-emerald-50' :
              verification.risk_level === 'MEDIUM' ? 'text-amber-700 bg-amber-50' :
              verification.risk_level === 'HIGH' ? 'text-orange-700 bg-orange-50' :
              'text-red-700 bg-red-50'
            }`}>
              {verification.risk_level} RISK
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
            <h2 className="text-[16px] font-bold text-gray-900 mb-2">Summary</h2>
            <p className="text-[14px] text-gray-700">{verification.summary}</p>
          </div>
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* License Verification */}
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[18px] font-bold text-gray-900 mb-4">License Verification</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Status</div>
                <div className={`inline-block px-3 py-1 rounded-lg text-[12px] font-semibold ${
                  analysisData?.licenseVerification?.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 
                  analysisData?.licenseVerification?.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {analysisData?.licenseVerification?.status || 'UNKNOWN'}
                </div>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Findings</div>
                <p className="text-[13px] text-gray-600">{analysisData?.licenseVerification?.findings || 'No findings'}</p>
              </div>
              {analysisData?.licenseVerification?.recommendations && analysisData.licenseVerification.recommendations.length > 0 && (
                <div>
                  <div className="text-[13px] font-semibold text-gray-600 mb-1">Recommendations</div>
                  <ul className="text-[13px] text-gray-600 list-disc list-inside space-y-1">
                    {analysisData.licenseVerification.recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Business Registration */}
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[18px] font-bold text-gray-900 mb-4">Business Registration</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Status</div>
                <div className={`inline-block px-3 py-1 rounded-lg text-[12px] font-semibold ${
                  analysisData?.businessRegistration?.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 
                  analysisData?.businessRegistration?.status === 'FAILED' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {analysisData?.businessRegistration?.status || 'UNKNOWN'}
                </div>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Findings</div>
                <p className="text-[13px] text-gray-600">{analysisData?.businessRegistration?.findings || 'No findings'}</p>
              </div>
              {analysisData?.businessRegistration?.recommendations && analysisData.businessRegistration.recommendations.length > 0 && (
                <div>
                  <div className="text-[13px] font-semibold text-gray-600 mb-1">Recommendations</div>
                  <ul className="text-[13px] text-gray-600 list-disc list-inside space-y-1">
                    {analysisData.businessRegistration.recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Track Record & Reviews */}
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[18px] font-bold text-gray-900 mb-4">Track Record & Reviews</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Status</div>
                <div className={`inline-block px-3 py-1 rounded-lg text-[12px] font-semibold ${
                  analysisData?.trackRecord?.status === 'GOOD' ? 'bg-emerald-100 text-emerald-700' : 
                  analysisData?.trackRecord?.status === 'POOR' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {analysisData?.trackRecord?.status || 'UNKNOWN'}
                </div>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Findings</div>
                <p className="text-[13px] text-gray-600">{analysisData?.trackRecord?.findings || 'No findings'}</p>
              </div>
              {analysisData?.trackRecord?.recommendations && analysisData.trackRecord.recommendations.length > 0 && (
                <div>
                  <div className="text-[13px] font-semibold text-gray-600 mb-1">Recommendations</div>
                  <ul className="text-[13px] text-gray-600 list-disc list-inside space-y-1">
                    {analysisData.trackRecord.recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Red Flags */}
          <div className="p-6 rounded-xl bg-white border border-gray-200">
            <h3 className="text-[18px] font-bold text-gray-900 mb-4">Red Flags</h3>
            <div className="space-y-3">
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Status</div>
                <div className={`inline-block px-3 py-1 rounded-lg text-[12px] font-semibold ${
                  analysisData?.redFlags?.status === 'NONE' ? 'bg-emerald-100 text-emerald-700' : 
                  analysisData?.redFlags?.status === 'MAJOR' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {analysisData?.redFlags?.status || 'UNKNOWN'}
                </div>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-gray-600 mb-1">Findings</div>
                <p className="text-[13px] text-gray-600">{analysisData?.redFlags?.findings || 'No findings'}</p>
              </div>
              {analysisData?.redFlags?.recommendations && analysisData.redFlags.recommendations.length > 0 && (
                <div>
                  <div className="text-[13px] font-semibold text-gray-600 mb-1">Recommendations</div>
                  <ul className="text-[13px] text-gray-600 list-disc list-inside space-y-1">
                    {analysisData.redFlags.recommendations.map((rec: string, idx: number) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Risk Score Visualization */}
        <div className="p-6 rounded-xl bg-white border border-gray-200 mb-8">
          <h3 className="text-[18px] font-bold text-gray-900 mb-4">Overall Risk Assessment</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    (verification.risk_score || 0) < 30 ? 'bg-emerald-500' :
                    (verification.risk_score || 0) < 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${verification.risk_score || 0}%` }}
                />
              </div>
              <span className="text-[20px] font-bold text-gray-900">{verification.risk_score || 0}/100</span>
            </div>
            
            {analysisData?.overallRisk?.summary && (
              <p className="text-[14px] text-gray-600">{analysisData.overallRisk.summary}</p>
            )}

            {/* Critical Issues */}
            {analysisData?.overallRisk?.criticalIssues && analysisData.overallRisk.criticalIssues.length > 0 && (
              <div>
                <div className="text-[13px] font-semibold text-red-700 mb-2">⚠️ Critical Issues</div>
                <ul className="text-[13px] text-red-600 list-disc list-inside space-y-1">
                  {analysisData.overallRisk.criticalIssues.map((issue: string, idx: number) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {analysisData?.overallRisk?.warnings && analysisData.overallRisk.warnings.length > 0 && (
              <div>
                <div className="text-[13px] font-semibold text-amber-700 mb-2">⚡ Warnings</div>
                <ul className="text-[13px] text-amber-600 list-disc list-inside space-y-1">
                  {analysisData.overallRisk.warnings.map((warning: string, idx: number) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Positives */}
            {analysisData?.overallRisk?.positives && analysisData.overallRisk.positives.length > 0 && (
              <div>
                <div className="text-[13px] font-semibold text-emerald-700 mb-2">✓ Positive Indicators</div>
                <ul className="text-[13px] text-emerald-600 list-disc list-inside space-y-1">
                  {analysisData.overallRisk.positives.map((positive: string, idx: number) => (
                    <li key={idx}>{positive}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/verify/escrow-agent" className="px-6 py-3 bg-[#635BFF] text-white text-[15px] rounded-lg hover:bg-[#5851EA] transition font-medium">
            Verify Another Escrow Agent
          </Link>
          <Link href="/dashboard" className="px-6 py-3 bg-white text-gray-700 text-[15px] rounded-lg hover:bg-gray-100 transition font-medium border border-gray-300">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}