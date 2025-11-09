import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function PrivateJetFraudArticle() {
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
              Industry Insights
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Private Jet Fraud: What Brokers Need to Know
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 25, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>7 min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                The private aviation industry faces unique fraud challenges. With aircraft transactions ranging from $2 million to over $75 million, sophisticated fraudsters target this market with schemes specifically designed to exploit the complexities of aircraft ownership, registration, and international transfers. Understanding these risks is essential for protecting yourself and your clients.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Scale of Aviation Fraud</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Aircraft fraud costs the industry hundreds of millions annually. Unlike automotive or real estate fraud, aviation scams are particularly devastating due to transaction sizes and the international nature of aircraft sales. A single fraudulent jet transaction can result in losses exceeding $10 million.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Common Aviation Fraud Types</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Non-existent aircraft:</strong> Fraudsters list aircraft that don't exist or aren't available for sale</li>
                  <li><strong>Stolen identity sales:</strong> Impersonation of legitimate aircraft owners or brokers</li>
                  <li><strong>Title washing:</strong> Aircraft with liens or damage history presented as clean</li>
                  <li><strong>Phantom maintenance:</strong> Falsified maintenance records and inspection reports</li>
                  <li><strong>Fake escrow:</strong> Fraudulent escrow companies controlled by scammers</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Critical Verification Steps for Aircraft Transactions</h2>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. FAA Registration Verification</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Every U.S.-registered aircraft has a registration number (N-number) that must be verified through official FAA databases. This is your first and most important verification step.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Essential FAA Checks</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Aircraft Registry:</strong> Confirm the N-number matches the aircraft make, model, and serial number. Verify current registered owner name and address.
                  </li>
                  <li>
                    <strong>Airworthiness Certificate:</strong> Ensure valid certificate exists. Check for Standard or Special category designation.
                  </li>
                  <li>
                    <strong>Registration Status:</strong> Verify active status. Check for any pending applications, suspensions, or revocations.
                  </li>
                  <li>
                    <strong>Owner History:</strong> Review chain of title. Multiple recent transfers can indicate problems.
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Access the FAA registry at <span className="font-mono text-sm">registry.faa.gov</span>. Never rely solely on seller-provided documentation. Always verify directly with official databases.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Lien and Encumbrance Search</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Aircraft liens are recorded with the FAA's Aircraft Registry in Oklahoma City. An aircraft with undisclosed liens cannot be legally transferred with clear title, regardless of what the seller claims.
              </p>

              <div className="bg-purple-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Lien Search Requirements</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">What to Search:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Recorded liens and security interests</li>
                      <li>Pending lien releases</li>
                      <li>Court orders or judgments against the aircraft</li>
                      <li>Unpaid maintenance or storage liens</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Professional Services:</p>
                    <p>Use specialized aircraft title companies for comprehensive searches. Cost: typically $500-$1,500. Essential for transactions over $500,000.</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Seller Identity Verification</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Impersonation fraud is common in aviation. Fraudsters claim to represent corporate flight departments or wealthy individuals, using stolen credentials and forged authorization documents.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Verification Checklist</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <div>
                      <strong>Match registered owner:</strong> FAA registration must show seller as current owner. If selling on behalf of owner, verify written authorization with original signatures.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <div>
                      <strong>Corporate sellers:</strong> Verify company exists through state business registries. Confirm person you're dealing with has authority to sell company assets. Request corporate resolution authorizing sale.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <div>
                      <strong>Physical verification:</strong> Meet in person or via video call. Verify ID documents. Tour the aircraft with the seller present.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <div>
                      <strong>Background checks:</strong> For high-value transactions, conduct professional background checks on sellers and their companies.
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Maintenance Record Authentication</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Aircraft maintenance records significantly impact value and airworthiness. Fraudsters forge logbooks, create fake inspection records, and falsify equipment lists to inflate aircraft value or hide damage history.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Red Flags in Maintenance Records</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Perfect records:</strong> No aircraft has perfect maintenance history. Suspiciously clean records may be fabricated.</li>
                  <li><strong>Recent entries only:</strong> Complete logbooks should show full history from delivery. Missing historical records are concerning.</li>
                  <li><strong>Different handwriting suddenly:</strong> Abrupt changes in documentation style suggest forgery.</li>
                  <li><strong>Unverifiable shops:</strong> Maintenance performed by shops that don't exist or can't be contacted.</li>
                  <li><strong>Missing AD compliance:</strong> Airworthiness Directives must be complied with and documented. Missing AD records are serious issues.</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Always verify maintenance with the shops that performed the work. Contact them directly using phone numbers found independently, not provided by the seller.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Pre-Purchase Inspection Essentials</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                A comprehensive pre-purchase inspection by a qualified A&P mechanic or specialized aircraft inspection service is non-negotiable for aircraft purchases. This inspection can reveal issues that cost hundreds of thousands to repair.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Pre-Purchase Inspection Should Include</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Airframe inspection:</strong> Structural integrity, corrosion assessment, damage history</li>
                  <li><strong>Engine analysis:</strong> Borescope inspection, oil analysis, compression tests</li>
                  <li><strong>Avionics check:</strong> All systems tested, software versions verified</li>
                  <li><strong>AD compliance review:</strong> Verification all Airworthiness Directives completed</li>
                  <li><strong>Records audit:</strong> Complete maintenance history verification</li>
                  <li><strong>Test flight:</strong> All systems operational under flight conditions</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Cost: $5,000-$25,000 depending on aircraft type and complexity. Essential for any aircraft purchase. Never waive this inspection to speed up closing.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Escrow and Payment Protection</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Aircraft escrow fraud has cost buyers millions. Fake escrow companies, compromised wire instructions, and fraudulent account details are common tactics.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Escrow Best Practices</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Use Specialized Aviation Escrow:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Select established companies with aviation experience</li>
                      <li>Verify escrow company credentials independently</li>
                      <li>Confirm proper licensing and bonding</li>
                      <li>Never use escrow companies suggested solely by seller</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Wire Transfer Security:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Verify wire instructions via phone call to known contact</li>
                      <li>Never use phone numbers or emails provided in wire instructions</li>
                      <li>Send small test wire first ($100-$500)</li>
                      <li>Confirm receipt before sending full amount</li>
                      <li>Use callback verification for any changes to wire instructions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">International Aircraft Transactions</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Cross-border aircraft sales introduce additional complexity and fraud risk. Different registration systems, currency exchanges, and legal frameworks create opportunities for fraud.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">International Transaction Considerations</h4>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <strong>Foreign Registration Verification:</strong> Research the aircraft registry of the country where the aircraft is registered. Verification processes vary significantly by country. Some registries have limited online access requiring local legal assistance.
                  </div>
                  <div>
                    <strong>Import/Export Regulations:</strong> Verify compliance with both countries' aviation regulations. Some aircraft types face import restrictions. Export certificates of airworthiness may be required.
                  </div>
                  <div>
                    <strong>Currency and Payment:</strong> Large currency exchanges can expose you to fraud. Use reputable forex services. Consider escrow accounts that handle currency conversion. Never wire funds to personal foreign accounts.
                  </div>
                  <div>
                    <strong>Legal Representation:</strong> Engage aviation attorneys in both jurisdictions. Local legal knowledge is essential for navigating foreign regulations and protecting your interests.
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Broker Verification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                When working through brokers, verify their credentials and reputation. Fraudulent "brokers" often insert themselves into transactions to collect deposits or divert funds.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Verify Aircraft Brokers</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Check membership in professional organizations (NBAA, IADA)</li>
                  <li>Verify business registration and licensing</li>
                  <li>Confirm physical office location and established presence</li>
                  <li>Review their aircraft listings and transaction history</li>
                  <li>Search for reviews and reputation in aviation forums</li>
                  <li>Verify insurance and professional liability coverage</li>
                  <li>Request and check references from past clients</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Warning Signs to Never Ignore</h2>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Immediate Red Flags</h4>
                <ul className="space-y-3 text-gray-700">
                  <li><strong>Pressure to close quickly:</strong> Legitimate aircraft sales take time for proper due diligence. Urgency indicates problems.</li>
                  <li><strong>Price significantly below market:</strong> Unless there's documented damage or major systems issues, deep discounts are suspicious.</li>
                  <li><strong>Seller avoids meeting:</strong> Never buy an aircraft without physical inspection and meeting the seller.</li>
                  <li><strong>Documentation inconsistencies:</strong> Names not matching, dates out of sequence, missing pages all indicate fraud.</li>
                  <li><strong>Reluctance to provide records:</strong> Complete records should be readily available for legitimate sales.</li>
                  <li><strong>Offshore entities:</strong> Sales through offshore companies with no clear business purpose add risk and complexity.</li>
                  <li><strong>Unverifiable references:</strong> All shops, brokers, and professionals should be independently verifiable.</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Due Diligence Checklist</h2>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <h4 className="font-semibold text-gray-900 mb-4">Essential Verification Steps</h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>FAA registration verification (N-number, owner, status)</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Comprehensive lien and title search</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Seller identity and authority verification</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Maintenance records review and verification</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Pre-purchase inspection by qualified A&P mechanic</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Airworthiness Directive compliance verification</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Test flight with all systems operational</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Escrow company verification and setup</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Aviation attorney review of all documents</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Broker credentials and reference checks</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Insurance verification and quote for coverage</span>
                  </div>
                  <div className="flex items-start">
                    <input type="checkbox" className="mt-1 mr-3" disabled />
                    <span>Background checks on seller and broker</span>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Bottom Line</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Aircraft fraud is sophisticated and evolving. The combination of high transaction values, international complexity, and technical specialization creates opportunities for fraud that don't exist in other markets. Protection requires diligent verification of every aspect of the transaction.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The cost of comprehensive due diligence—typically $10,000 to $35,000 for a complete aircraft transaction—is negligible compared to the millions at risk. Every verification step can be completed in days, not weeks, and the protection provided is invaluable.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Trust in aviation transactions must be built on verification. Check everything independently. Use qualified professionals. Never let urgency or convenience compromise your due diligence. The moment you skip a verification step, you become vulnerable to the very fraud these protections prevent.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verify Aircraft Transactions
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield helps verify sellers, ownership, and documentation in minutes
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