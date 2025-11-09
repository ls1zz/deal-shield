import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function DataRetentionArticle() {
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
              Security
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why 72-Hour Data Retention Matters
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 20, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                In an era where data breaches dominate headlines and privacy regulations grow stricter, data minimization has become a critical security strategy. Deal Shield's 72-hour data retention policy isn't just about compliance—it's a fundamental architectural decision that reduces risk, protects privacy, and builds trust.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Data Minimization Principle</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Data minimization is a core principle of modern privacy law and security practice: collect only what you need, keep it only as long as necessary, and delete it when its purpose is fulfilled. This principle appears in GDPR, CCPA, and virtually every modern privacy framework.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Why Minimization Matters</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>You can't lose what you don't have:</strong> Data that's been deleted can't be stolen in a breach. Every day data persists is another day of exposure risk.
                  </li>
                  <li>
                    <strong>Regulatory compliance:</strong> Privacy laws increasingly penalize excessive data retention. Demonstrable minimization reduces regulatory risk.
                  </li>
                  <li>
                    <strong>Trust building:</strong> Users trust services that demonstrably protect their privacy. Minimal retention is a competitive advantage.
                  </li>
                  <li>
                    <strong>Reduced liability:</strong> Less stored data means less potential liability in litigation, regulatory investigations, or breach scenarios.
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Reduced Attack Surface</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Every piece of stored data represents potential attack surface. The longer data persists, the more opportunities attackers have to compromise it through system vulnerabilities, social engineering, or insider threats.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Statistics on Data Breach Exposure</h3>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Data Breach Realities</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Average cost of a data breach: $4.45 million (IBM 2023 Cost of a Data Breach Report)</li>
                  <li>Average time to identify and contain a breach: 277 days</li>
                  <li>83% of organizations have had more than one data breach</li>
                  <li>Cost per record containing sensitive personal information: $165</li>
                  <li>Breaches involving stored but unnecessary data: 67% more expensive</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Consider this: if your database is breached and contains data from the past year, attackers access 365 days of sensitive information. If your retention is 72 hours, breach exposure is limited to just three days of data. The difference in breach impact is substantial.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Time-Based Risk Reduction</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Risk Over Time</h4>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>72-hour retention (Deal Shield):</span>
                    <span className="font-semibold text-emerald-600">3 days exposure</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>30-day retention (common):</span>
                    <span className="font-semibold text-yellow-600">30 days exposure</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>1-year retention:</span>
                    <span className="font-semibold text-orange-600">365 days exposure</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Indefinite retention (many services):</span>
                    <span className="font-semibold text-red-600">Unlimited exposure</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold">Risk reduction (72hr vs. indefinite):</span>
                    <span className="font-bold text-[#635BFF]">99.9%+</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Compliance Advantages</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Privacy regulations worldwide have embraced data minimization as a fundamental requirement. Organizations that demonstrate genuine minimization practices benefit from reduced regulatory scrutiny and lower compliance costs.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">GDPR Data Minimization Requirements</h3>

              <div className="bg-purple-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">GDPR Article 5(1)(c) - Data Minimization</h4>
                <p className="text-gray-700 mb-4">
                  Personal data must be "adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed."
                </p>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <strong>What this means in practice:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Collect only data directly needed for stated purposes</li>
                      <li>Retain data only as long as necessary for those purposes</li>
                      <li>Delete or anonymize data when purpose is fulfilled</li>
                      <li>Regular review and deletion of unnecessary data</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <strong>Penalties for violations:</strong>
                    <p className="mt-2">Up to €20 million or 4% of global annual turnover, whichever is higher. Demonstrable minimization practices significantly reduce regulatory risk.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">CCPA Limited Retention Benefits</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                The California Consumer Privacy Act requires businesses to disclose how long they retain personal information. Shorter retention periods demonstrate respect for consumer privacy and can be a competitive advantage in privacy-conscious markets.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">CCPA Compliance Benefits</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Simplified deletion requests:</strong> When retention is already minimal, responding to consumer deletion requests is straightforward.</li>
                  <li><strong>Reduced disclosure requirements:</strong> Less retained data means simpler privacy notices and data inventories.</li>
                  <li><strong>Lower breach notification costs:</strong> If a breach occurs, fewer affected consumers means lower notification costs and reduced liability.</li>
                  <li><strong>Competitive positioning:</strong> CCPA gives consumers rights to know what data is collected. Minimal collection and retention is attractive to privacy-conscious consumers.</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Privacy Protection in Sensitive Transactions</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Due diligence investigations are inherently sensitive. They involve confidential business information, personal financial details, and transaction structures that parties want to keep private. The shorter data persists, the better protected these sensitive details remain.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Confidentiality Concerns</h3>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">What's at Stake in Due Diligence Data</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Transaction details:</strong> Purchase prices, deal structures, and party identities that competitors would value. Indefinite storage increases risk of competitive intelligence leaks.
                  </li>
                  <li>
                    <strong>Financial information:</strong> Bank details, proof of funds, and financial capacity information that could facilitate identity theft or fraud if compromised.
                  </li>
                  <li>
                    <strong>Personal details:</strong> Names, addresses, corporate affiliations, and business relationships that parties expect to remain confidential.
                  </li>
                  <li>
                    <strong>Investigative results:</strong> Risk assessments and red flags that could damage reputations if disclosed, even when investigations are routine.
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                With 72-hour retention, even if an attacker compromises systems, they access only the most recent investigations. Historical investigations—which often contain more complete information as deals progress—are already deleted and thus protected from unauthorized access.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Operational Security Benefits</h2>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Reducing Insider Threat Exposure</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Insider threats—whether from malicious employees or compromised accounts—are a significant security concern. Data that exists for years provides insiders with extensive opportunities for unauthorized access or exfiltration. Limited retention dramatically reduces this exposure window.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Insider Threat Statistics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Insider threats account for 34% of all data breaches</li>
                  <li>Average cost of insider threat incident: $15.38 million annually per organization</li>
                  <li>Time to contain insider incident: 85 days on average</li>
                  <li>60% of insider incidents involve employees with elevated access</li>
                  <li>Privileged user abuse is the most costly type of insider threat</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                With minimal retention, even if an insider gains unauthorized access, the scope of accessible data is inherently limited. This architectural control is more reliable than access controls alone, which can fail due to misconfiguration or privilege escalation.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limiting Legal Discovery Obligations</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                In litigation or regulatory investigations, companies must produce relevant documents and data through discovery. The more data you retain, the more expensive and risky discovery becomes.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Discovery Cost Reduction</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Review costs:</strong> Legal document review costs $1-$3 per document. Less retained data means lower review costs in litigation.</li>
                  <li><strong>Production complexity:</strong> Searching years of data for relevant documents is expensive and time-consuming. 72-hour retention limits discovery scope dramatically.</li>
                  <li><strong>Privileged material risk:</strong> Larger data sets increase risk of accidentally producing privileged or sensitive materials.</li>
                  <li><strong>Compliance burden:</strong> Responding to subpoenas or regulatory requests is faster and cheaper when data retention is minimal.</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Deal Shield's Implementation</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Deal Shield's 72-hour retention policy is implemented through automated deletion systems that permanently remove data 72 hours after investigation completion. Users also have manual deletion options for immediate removal.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Gets Deleted</h3>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Automatically Deleted After 72 Hours</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Investigation reports and risk assessments</li>
                  <li>Uploaded documents (LOIs, NDAs, POFs, etc.)</li>
                  <li>Search queries and entity names</li>
                  <li>Extracted data from public registries</li>
                  <li>Analysis results and recommendations</li>
                  <li>Any personal or company information searched</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What's Retained</h3>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Retained for Compliance and Operations</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Aggregated analytics:</strong> Anonymous usage statistics (e.g., "100 investigations performed this month") with no personal or transaction details.
                  </li>
                  <li>
                    <strong>Audit logs:</strong> Security logs showing system access patterns (no content) retained for 90 days for security monitoring and compliance.
                  </li>
                  <li>
                    <strong>Billing records:</strong> Financial transaction records retained per legal requirements (7 years) but without investigation content.
                  </li>
                  <li>
                    <strong>Account information:</strong> User account details, subscription status, and preferences. Users can delete accounts at any time.
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                This separation ensures compliance with financial and security regulations while maximizing privacy protection for sensitive investigation data.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Comparison: 72 Hours vs. Indefinite Storage</h2>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <h4 className="font-semibold text-gray-900 mb-6">Security & Privacy Impact</h4>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">72-Hour Retention (Deal Shield)</h5>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Minimal breach exposure (3 days of data)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>GDPR/CCPA minimization compliance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Limited legal discovery obligations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Reduced insider threat window</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Maximum transaction confidentiality</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Lower compliance costs</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Indefinite Retention (Many Services)</h5>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span>Unlimited breach exposure (all historical data)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span>Potential minimization violations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span>Extensive discovery obligations in litigation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span>Ongoing insider threat exposure</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span>Higher confidentiality risks</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">✗</span>
                          <span>Higher compliance and breach costs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Industry Best Practices</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Progressive technology companies and security-conscious organizations are adopting aggressive data minimization strategies. The trend is clear: retention periods are shrinking as organizations recognize that stored data is a liability, not an asset.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Best Practice Recommendations</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Assess retention necessity:</strong> For each data type, determine the minimum retention period required for business operations and compliance. Default to deletion rather than retention.
                  </li>
                  <li>
                    <strong>Automate deletion:</strong> Manual deletion policies fail due to human error and organizational inertia. Automated deletion ensures consistent policy enforcement.
                  </li>
                  <li>
                    <strong>Separate operational and compliance data:</strong> Keep data necessary for legal compliance (financial records, audit logs) separate from operational data that can be deleted quickly.
                  </li>
                  <li>
                    <strong>Provide user deletion controls:</strong> Give users ability to delete their data immediately rather than waiting for automated deletion cycles.
                  </li>
                  <li>
                    <strong>Document retention rationale:</strong> For any data retained beyond immediate use, document the business or legal justification. This demonstrates compliance and forces thoughtful retention decisions.
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Bottom Line</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                In cybersecurity, less is more. Every piece of data stored is a potential liability—subject to breach, insider threat, legal discovery, and regulatory scrutiny. The 72-hour retention policy isn't a limitation; it's a strategic advantage that fundamentally reduces risk while demonstrating genuine commitment to privacy.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                For users conducting sensitive due diligence, 72-hour retention provides confidence that their investigations won't create permanent records that could be compromised years later. For Deal Shield, it reduces operational risk, compliance burden, and breach exposure.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Data minimization isn't just good compliance—it's good security architecture. When evaluating any service that handles sensitive information, ask how long data is retained and why. Services that can't provide clear, minimal retention periods are carrying unnecessary risk that ultimately becomes your risk if you're their customer.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Investigate with Confidence
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Your investigations are automatically deleted after 72 hours—maximum privacy, minimum risk
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