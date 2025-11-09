import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function AIMADueDiligenceArticle() {
  return (
    <div className="min-h-screen bg-white">
      {/* Background with winding gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 via-pink-50 to-indigo-50" />
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          <div className="absolute top-2/3 right-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-8000" />
        </div>
      </div>

      {/* Header */}
      <header className="relative border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/dealshield-logo.png"
                alt="Deal Shield"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gray-900">Deal Shield</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="/#verification" className="text-gray-600 hover:text-gray-900 transition-colors">
                Document Verification
              </Link>
              <Link href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-colors font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-[#635BFF] hover:text-[#5349E6] mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
              Technology
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              M&A Due Diligence in 60 Seconds
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 18, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>6 min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Traditional M&A due diligence takes weeks or months and costs tens of thousands of dollars. AI-powered tools can now perform initial screening in seconds. But understanding what automated tools can and cannot do is critical for using them effectively without creating new risks.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Traditional M&A Due Diligence Timeline</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Mergers and acquisitions typically involve extensive due diligence processes that consume significant time and resources before parties feel comfortable closing deals.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Standard M&A Due Diligence Process</h4>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">Phase 1:</span>
                    <div>
                      <strong>Preliminary screening (2-5 days):</strong> Initial review of target company information, basic corporate searches, and preliminary valuation.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">Phase 2:</span>
                    <div>
                      <strong>Information gathering (1-2 weeks):</strong> Request and receive financial statements, contracts, corporate documents, and other materials.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">Phase 3:</span>
                    <div>
                      <strong>Financial due diligence (2-4 weeks):</strong> Quality of earnings analysis, working capital review, debt analysis, and financial projections validation.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">Phase 4:</span>
                    <div>
                      <strong>Legal due diligence (2-4 weeks):</strong> Contract review, litigation searches, intellectual property verification, regulatory compliance assessment.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">Phase 5:</span>
                    <div>
                      <strong>Operational due diligence (1-3 weeks):</strong> Customer verification, supplier assessment, technology evaluation, HR review.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">Phase 6:</span>
                    <div>
                      <strong>Final analysis and decision (1-2 weeks):</strong> Integration planning, final valuation, negotiation of purchase agreement.
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total timeline:</span>
                    <span className="font-bold text-lg text-[#635BFF]">6-16 weeks</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-semibold text-gray-900">Typical cost:</span>
                    <span className="font-bold text-lg text-[#635BFF]">$50,000 - $250,000+</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                This timeline assumes a cooperative seller and no major issues discovered. Complex deals or uncooperative parties can extend due diligence to six months or longer.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Automated Tools Can Do</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                AI-powered due diligence platforms excel at aggregating public information, identifying patterns, and flagging obvious red flags. These capabilities dramatically accelerate initial screening phases.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Corporate Registry Searches</h3>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Instant Corporate Verification</h4>
                <p className="text-gray-700 mb-4">
                  Automated systems can search multiple corporate registries simultaneously, providing comprehensive corporate existence verification in seconds rather than days.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Entity existence:</strong> Confirm company is registered and active in claimed jurisdiction</li>
                  <li><strong>Ownership structure:</strong> Identify directors, officers, and shareholders from public filings</li>
                  <li><strong>Corporate history:</strong> Review formation date, name changes, and corporate structure evolution</li>
                  <li><strong>Good standing:</strong> Verify current status, confirm no dissolution proceedings</li>
                  <li><strong>Registered agent:</strong> Confirm official contact information and legal service address</li>
                  <li><strong>Multi-jurisdiction search:</strong> Search across multiple states or countries simultaneously</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Public Records Aggregation</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                AI systems can aggregate information from thousands of public databases that would take analysts days or weeks to search manually.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Automated Public Record Searches</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Litigation history:</strong> Federal and state court records, arbitration notices, regulatory proceedings</li>
                  <li><strong>Regulatory filings:</strong> SEC filings, patent applications, trademark registrations</li>
                  <li><strong>News and media:</strong> Press releases, news articles, industry publications</li>
                  <li><strong>Professional licenses:</strong> Business licenses, professional certifications, permits</li>
                  <li><strong>Property records:</strong> Real estate ownership, liens, mortgages</li>
                  <li><strong>Bankruptcy searches:</strong> Federal bankruptcy court records</li>
                  <li><strong>Sanctions screening:</strong> OFAC, UN, EU sanctions lists</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">News and Litigation Monitoring</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Natural language processing allows AI systems to analyze thousands of news articles and legal documents, identifying relevant information that might indicate risk.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">AI-Powered Analysis Capabilities</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Sentiment analysis:</strong> Identify negative news trends or reputation issues</li>
                  <li><strong>Pattern recognition:</strong> Detect unusual transaction patterns or suspicious relationships</li>
                  <li><strong>Entity extraction:</strong> Identify key people, places, and organizations mentioned in documents</li>
                  <li><strong>Timeline construction:</strong> Build chronologies of corporate events and controversies</li>
                  <li><strong>Relationship mapping:</strong> Identify connections between entities that may not be obvious</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Financial Data Extraction</h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                AI can extract financial data from documents and public filings, performing basic calculations and identifying inconsistencies far faster than manual review.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Requires Human Expertise</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                While AI accelerates data gathering and initial analysis, critical aspects of due diligence require human judgment, industry expertise, and contextual understanding that current AI systems cannot replicate.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Financial Statement Analysis Depth</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">What Accountants Provide That AI Cannot</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Quality of earnings assessment:</strong> Understanding whether reported earnings are sustainable or result from one-time events, accounting manipulation, or unsustainable business practices.
                  </li>
                  <li>
                    <strong>Working capital analysis:</strong> Determining appropriate working capital levels based on industry norms and growth projections, identifying hidden working capital needs.
                  </li>
                  <li>
                    <strong>Revenue recognition evaluation:</strong> Assessing whether revenue recognition policies are appropriate and consistently applied, identifying potential revenue quality issues.
                  </li>
                  <li>
                    <strong>Normalized EBITDA calculation:</strong> Making informed judgments about which expenses are truly one-time versus recurring, industry-specific adjustments.
                  </li>
                  <li>
                    <strong>Accounting policy assessment:</strong> Evaluating whether accounting policies are conservative or aggressive relative to industry standards.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Legal Document Interpretation</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                AI can flag problematic clauses or missing documents, but experienced attorneys bring essential judgment to contract review and risk assessment.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Legal Expertise Requirements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Contract risk assessment:</strong> Understanding practical implications of contractual terms and unusual provisions</li>
                  <li><strong>Litigation evaluation:</strong> Assessing actual risk and potential exposure from pending litigation</li>
                  <li><strong>Regulatory compliance:</strong> Determining whether operations comply with complex industry-specific regulations</li>
                  <li><strong>Intellectual property validity:</strong> Evaluating strength and enforceability of patents, trademarks, and copyrights</li>
                  <li><strong>Change of control provisions:</strong> Identifying hidden accelerated payment or termination triggers in contracts</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cultural Fit and Management Assessment</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                AI cannot assess management quality, organizational culture, or integration challenges—factors that often determine M&A success or failure.
              </p>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Management capabilities:</strong> Evaluating leadership team competence, track record, and ability to execute strategic plans requires in-person meetings and reference checks.</p>
                <p><strong>Cultural compatibility:</strong> Understanding whether target company culture will mesh with acquirer culture is critical but highly subjective and context-dependent.</p>
                <p><strong>Employee retention risk:</strong> Assessing likelihood of key employee departures post-acquisition requires understanding compensation structures, morale, and competitive opportunities.</p>
                <p><strong>Customer relationships:</strong> Determining strength and stability of customer relationships often requires direct customer contact and industry knowledge.</p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Strategic Value Determination</h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                The ultimate question in M&A—is this acquisition strategically valuable?—requires human judgment about markets, competition, and strategic positioning that AI cannot provide.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Hybrid Approach</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                The most effective due diligence combines AI-powered initial screening with deep human expertise where it matters most. This hybrid approach provides speed and thoroughness.
              </p>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <h4 className="font-semibold text-gray-900 mb-6">Optimal Hybrid Workflow</h4>
                <div className="space-y-6">
                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong className="text-gray-900">Stage 1: Automated Screening (Day 1)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                      <li>Corporate registry verification across all relevant jurisdictions</li>
                      <li>Sanctions screening and adverse media searches</li>
                      <li>Litigation and bankruptcy searches</li>
                      <li>Initial financial data extraction from public filings</li>
                      <li>News aggregation and sentiment analysis</li>
                      <li>Ownership structure mapping</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-600"><strong>Output:</strong> Comprehensive screening report flagging any red flags for human review</p>
                  </div>

                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong className="text-gray-900">Stage 2: Professional Review (Days 2-7)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                      <li>Accountants review financial statements and perform quality of earnings analysis</li>
                      <li>Attorneys review material contracts and assess legal risks</li>
                      <li>Industry experts evaluate operational capabilities and market position</li>
                      <li>Management team conducts site visits and meets key personnel</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-600"><strong>Output:</strong> Detailed professional opinions on financial, legal, and operational risks</p>
                  </div>

                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong className="text-gray-900">Stage 3: Strategic Decision (Days 7-14)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                      <li>Leadership team synthesizes findings</li>
                      <li>Integration planning begins</li>
                      <li>Final valuation and offer price determination</li>
                      <li>Negotiation of purchase agreement terms</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-600"><strong>Output:</strong> Go/no-go decision with clear rationale and risk mitigation plans</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Time and Cost Savings</h2>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Hybrid Approach Economics</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-gray-900">Traditional DD (full manual):</strong>
                      <span className="text-lg font-bold text-gray-700">6-16 weeks, $50K-$250K</span>
                    </div>
                    <ul className="text-sm text-gray-600 list-disc pl-6">
                      <li>Every step performed manually by professionals</li>
                      <li>Significant time spent on data gathering and basic searches</li>
                      <li>High hourly rates applied to routine tasks</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-gray-900">Automated initial screening only:</strong>
                      <span className="text-lg font-bold text-gray-700">1-2 days, $500-$2K</span>
                    </div>
                    <ul className="text-sm text-gray-600 list-disc pl-6">
                      <li>Fast initial insights but lacks depth</li>
                      <li>Misses nuanced risks and strategic issues</li>
                      <li>High risk of missing critical problems</li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center mb-2">
                      <strong className="text-gray-900">Hybrid approach (recommended):</strong>
                      <span className="text-lg font-bold text-[#635BFF]">2-4 weeks, $15K-$75K</span>
                    </div>
                    <ul className="text-sm text-gray-700 list-disc pl-6">
                      <li>AI handles routine data gathering in minutes</li>
                      <li>Professionals focus on high-value analysis</li>
                      <li>Faster decisions without sacrificing quality</li>
                      <li>60-75% time reduction, 40-70% cost reduction</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Accuracy Considerations</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding the accuracy limitations of AI systems is essential for using them appropriately without creating false confidence.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">False Positive Rates</h3>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">What AI Gets Wrong</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Name confusion:</strong> AI may flag unrelated entities with similar names, especially common names or names with multiple variations</li>
                  <li><strong>Context misunderstanding:</strong> Negative news about industry or geography may be incorrectly associated with target company</li>
                  <li><strong>Outdated information:</strong> AI databases may contain stale information not updated after issues are resolved</li>
                  <li><strong>Litigation over-weighting:</strong> All litigation flagged equally without understanding materiality or merit</li>
                  <li><strong>Pattern false positives:</strong> Unusual but legitimate business practices may trigger fraud indicators</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                False positives require human review to separate real risks from benign findings. Experienced professionals quickly identify when AI has flagged non-issues.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What AI Misses</h3>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Private information:</strong> AI only searches public records. Private agreements, undisclosed relationships, and internal company issues are invisible to automated tools.</p>
                <p><strong>Recent developments:</strong> Information lag means very recent events may not yet appear in searchable databases.</p>
                <p><strong>Nuanced risks:</strong> Subtle warning signs that experienced professionals would catch may not trigger AI pattern recognition.</p>
                <p><strong>Industry-specific issues:</strong> Specialized knowledge about industry-specific risks, regulatory changes, or market dynamics requires human expertise.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Implementation Tips for M&A Professionals</h2>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Best Practices for Using AI in M&A</h4>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>1. Use AI for initial go/no-go decisions:</strong> Automated screening quickly identifies deal-breakers before investing in expensive professional due diligence.</li>
                  <li><strong>2. Generate focused professional scope:</strong> Use AI results to direct attorneys and accountants to highest-risk areas requiring deep analysis.</li>
                  <li><strong>3. Verify all critical AI findings:</strong> Never rely solely on automated results for material decisions. Verify important flags through independent sources.</li>
                  <li><strong>4. Maintain professional relationships:</strong> AI doesn't replace your attorneys, accountants, and advisors—it makes them more efficient and effective.</li>
                  <li><strong>5. Document your process:</strong> Show that automated tools supplemented rather than replaced proper due diligence if deals later face scrutiny.</li>
                  <li><strong>6. Train your team:</strong> Ensure deal teams understand both the capabilities and limitations of AI tools they're using.</li>
                </ol>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Future of AI in Due Diligence</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                AI capabilities in due diligence will continue advancing. Natural language processing improvements will enable better contract analysis. Machine learning will improve pattern recognition for fraud detection. Integration with more data sources will expand what can be automatically searched.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                However, the fundamental reality remains: AI excels at data aggregation and pattern recognition, while humans excel at judgment, contextual understanding, and strategic thinking. The most effective due diligence will continue combining both.
              </p>

              <p className="text-gray-700 leading-relaxed">
                The question isn't whether to use AI or human expertise—it's how to optimally combine them. Organizations that master this hybrid approach will complete more deals, faster, with better outcomes than those relying solely on traditional methods or naively trusting AI to handle everything.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Accelerate Your Due Diligence
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield provides automated initial screening across 9 registries in 60 seconds
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-3 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/dealshield-logo.png"
                  alt="Deal Shield"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold">Deal Shield</span>
              </div>
              <p className="text-gray-400 text-sm">
                Close deals with confidence
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#verification" className="text-gray-400 hover:text-white transition-colors">Document Verification</Link></li>
                <li><Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Deal Shield Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}