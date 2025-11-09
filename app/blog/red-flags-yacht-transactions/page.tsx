import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function YachtRedFlagsArticle() {
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
              Fraud Prevention
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              5 Red Flags in Luxury Yacht Transactions
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>November 1, 2025</span>
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
                The superyacht market represents one of the most lucrative—and risk-prone—sectors in luxury transactions. With vessels regularly selling for $10 million to over $500 million, fraudsters have developed increasingly sophisticated schemes to exploit buyers, sellers, and brokers. Understanding these red flags can protect you from devastating financial losses.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">1. Seller Refuses Face-to-Face Meetings or Video Calls</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                In legitimate yacht sales, sellers are typically proud owners who want to showcase their vessel. When a seller consistently avoids video calls, refuses in-person meetings, or only communicates through intermediaries, this is a major warning sign.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <p className="text-gray-800 font-semibold mb-2">⚠️ Common Excuses to Watch For:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>"I'm traveling abroad and can't meet"</li>
                  <li>"My lawyer handles all communications"</li>
                  <li>"The yacht is currently in international waters"</li>
                  <li>"I prefer to maintain my privacy until we have a signed agreement"</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Why this matters:</strong> Scammers often don't own the yacht they're "selling." They've stolen photos and documentation from legitimate listings. A video call showing the yacht's current condition and the seller's familiarity with the vessel is essential verification.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">2. Pressure to Wire Deposit Without Proper Documentation</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Fraudulent sellers create artificial urgency to bypass standard due diligence. They'll claim multiple interested buyers, limited-time pricing, or imminent relocation of the vessel to pressure immediate deposits.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Standard Yacht Purchase Timeline:</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">1.</span>
                    <span><strong>Initial offer and acceptance</strong> - Non-binding letter of intent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">2.</span>
                    <span><strong>Survey and sea trial</strong> - Professional marine survey (7-14 days)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">3.</span>
                    <span><strong>Title verification</strong> - Confirm clean title, no liens (5-10 days)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">4.</span>
                    <span><strong>Purchase agreement</strong> - Legally binding contract with contingencies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">5.</span>
                    <span><strong>Deposit to escrow</strong> - Never directly to seller</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] mr-3">6.</span>
                    <span><strong>Closing and title transfer</strong> - Through reputable marine escrow company</span>
                  </li>
                </ol>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Any seller who wants to skip these steps or demands payment before completing surveys and title verification is operating outside industry norms. Legitimate sellers understand these protections benefit both parties.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">3. Ownership Documentation Inconsistencies</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Yacht ownership documentation should be pristine and verifiable. Red flags in documentation include:
              </p>

              <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                <li><strong>Recent ownership transfers:</strong> The yacht has changed hands multiple times in the past year, especially between different countries or shell companies</li>
                <li><strong>Flag registry mismatches:</strong> Documentation shows the yacht registered in one country, but seller claims it's flagged elsewhere</li>
                <li><strong>Lien confusion:</strong> Seller is vague about existing liens or claims "everything is clear" without providing formal lien releases</li>
                <li><strong>Copy-quality documents:</strong> All paperwork is photocopies or scans; seller claims originals are "with the lawyer" or "on the yacht"</li>
                <li><strong>Name discrepancies:</strong> The name on ownership documents doesn't match the person you're negotiating with, with weak explanations like "I'm buying it for my company"</li>
              </ul>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <p className="text-gray-800 font-semibold mb-2">✓ What Legitimate Documentation Looks Like:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Original certificate of registry from the flag state</li>
                  <li>Bill of sale from previous transaction (if recent purchase)</li>
                  <li>Official lien release documents from financial institutions</li>
                  <li>Valid deletion certificate if transferring from previous registry</li>
                  <li>Builder's certificate for new vessels</li>
                  <li>Documentation matching the person/entity you're dealing with</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">4. Price Too Good to Be True</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Yacht valuations are well-established through multiple databases, recent sales comps, and professional appraisers. A vessel priced significantly below market value should trigger immediate investigation.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pricing Red Flags:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">⚠</span>
                    <span><strong>15-30% below comparable sales:</strong> Unless there's documented damage or major systems failure, this discount is suspicious</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">⚠</span>
                    <span><strong>"Motivated seller" with vague reasons:</strong> "Need quick sale" without explaining why (estate sale, business closure, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">⚠</span>
                    <span><strong>Recent price drops:</strong> Listed at market rate, then suddenly dropped 20-40% within days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3">⚠</span>
                    <span><strong>"Discount for quick close":</strong> Offering substantial reduction if you skip due diligence or pay immediately</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>The scam mechanics:</strong> Fraudsters advertise non-existent or stolen yachts at attractive prices to generate interest. Once they have a committed buyer, they create urgency and collect deposits before disappearing. The "yacht" either doesn't exist, isn't owned by the seller, or has undisclosed liens that make ownership transfer impossible.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">5. Unverifiable Broker or Escrow Agent</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                In legitimate yacht transactions, reputable brokers and established escrow companies protect both parties. Fraudsters often insert fake intermediaries to add credibility while maintaining control of funds.
              </p>

              <div className="bg-purple-50 rounded-xl p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Verify Your Intermediaries:</h3>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">For Yacht Brokers:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Check membership with IYBA (International Yacht Brokers Association) or CPYB (Certified Professional Yacht Broker)</li>
                      <li>Verify physical office location and established presence</li>
                      <li>Review their listings - should have multiple yachts, professional photos, detailed specifications</li>
                      <li>Search for reviews and reputation on yachting forums</li>
                      <li>Confirm they have insurance and bonding</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-2">For Escrow Companies:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Use only established marine escrow companies (not general escrow services)</li>
                      <li>Verify independent contact information (don't use phone numbers provided by seller)</li>
                      <li>Confirm escrow agreement terms in writing before transferring funds</li>
                      <li>Ensure escrow account is in your name or clearly identified for your transaction</li>
                      <li>Never wire funds to personal or offshore accounts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Common escrow scams:</strong> Fraudster provides "escrow company" contact information that's actually their accomplice or a website they control. The fake escrow company confirms receipt of funds, provides official-looking documentation, but no money was actually placed in true escrow. Alternatively, they provide real escrow company information but insist on wiring to a "temporary account" or "international transfer account" that's actually controlled by the scammer.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Protecting Yourself: Essential Due Diligence Steps</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Before proceeding with any yacht transaction, take these verification steps:
              </p>

              <ol className="space-y-4 text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="font-bold text-[#635BFF] mr-3 mt-1">1.</span>
                  <div>
                    <strong className="text-gray-900">Verify the seller's identity:</strong> Use government databases, corporate registries, and professional background checks. If buying from a company, verify it's legitimately registered and operating.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#635BFF] mr-3 mt-1">2.</span>
                  <div>
                    <strong className="text-gray-900">Inspect the yacht in person:</strong> Never purchase sight-unseen. Hire an independent marine surveyor (not one recommended by the seller).
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#635BFF] mr-3 mt-1">3.</span>
                  <div>
                    <strong className="text-gray-900">Verify clean title:</strong> Search maritime registries for liens, check with the flag state, confirm the yacht's registration number and official documentation.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#635BFF] mr-3 mt-1">4.</span>
                  <div>
                    <strong className="text-gray-900">Use reputable intermediaries:</strong> Work with established yacht brokers and marine-specific escrow companies. Independently verify their credentials.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#635BFF] mr-3 mt-1">5.</span>
                  <div>
                    <strong className="text-gray-900">Never skip the purchase agreement:</strong> Have maritime attorneys review all contracts. Include contingencies for survey results, title verification, and sea trials.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-[#635BFF] mr-3 mt-1">6.</span>
                  <div>
                    <strong className="text-gray-900">Wire funds only to verified escrow:</strong> Never wire money to personal accounts, offshore accounts, or directly to sellers before title transfer.
                  </div>
                </li>
              </ol>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Bottom Line</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yacht fraud costs buyers millions annually. The sophistication of these scams continues to evolve, with fraudsters creating fake websites, forging documentation, and impersonating legitimate brokers. The common thread in most successful frauds is pressure to bypass standard due diligence. Remember: legitimate sellers expect and welcome thorough verification. Anyone who discourages proper due diligence is putting your investment at risk.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                If you encounter any of these red flags, slow down the process. Engage qualified professionals—maritime attorneys, licensed brokers, independent surveyors, and due diligence services. The cost of proper verification is minimal compared to the millions at risk in yacht transactions.
              </p>

              <p className="text-gray-700 leading-relaxed">
                When something feels wrong, trust your instincts. The yacht market will always have legitimate opportunities. Don't let FOMO or artificial urgency push you into a deal that bypasses essential protections.
              </p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/blog/escrow-agent-verification" className="group">
                <div className="bg-white/85 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="text-sm text-purple-600 font-semibold mb-2">Best Practices</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#635BFF] transition-colors">
                    Escrow Agent Verification: A Critical Step
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Don't wire millions without verifying your escrow agent. Here's what to check and how.
                  </p>
                </div>
              </Link>

              <Link href="/blog/document-verification-guide" className="group">
                <div className="bg-white/85 backdrop-blur-sm rounded-xl border border-purple-100/50 shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="text-sm text-purple-600 font-semibold mb-2">Best Practices</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#635BFF] transition-colors">
                    Document Verification 101: LOIs, NDAs, and POFs
                  </h4>
                  <p className="text-gray-600 text-sm">
                    A comprehensive guide to verifying the most common documents in high-value transactions.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verify Your Next Deal
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield helps you verify parties and documents before signing or sending funds
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