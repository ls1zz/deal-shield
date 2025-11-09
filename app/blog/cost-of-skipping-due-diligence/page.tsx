import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function CostOfSkippingDDArticle() {
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
              Case Studies
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              The True Cost of Skipping Due Diligence
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 28, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>8 min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Due diligence costs money and takes time—two commodities that seem expensive until you compare them to the alternative. These real-world cases demonstrate why proper verification isn't optional in high-value transactions. Names and specific details have been changed to protect privacy, but the financial losses and lessons are entirely real.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Case Study 1: The $8.2 Million Private Jet That Never Existed</h2>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction Overview</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Asset:</strong> Gulfstream G550, listed at $8.2 million</li>
                  <li><strong>Buyer:</strong> Private equity executive purchasing for business use</li>
                  <li><strong>Timeline:</strong> Contact to wire transfer in 11 days</li>
                  <li><strong>Red flags ignored:</strong> Multiple</li>
                  <li><strong>Loss:</strong> $820,000 deposit (10% down payment)</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Happened</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                A successful private equity executive found a Gulfstream G550 listed on a legitimate aviation marketplace. The price was attractive—about 15% below market—but not suspiciously low. The listing included professional photos, detailed specifications, and maintenance records.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The "seller" claimed to be a corporate flight department downsizing their fleet. They provided what appeared to be corporate registration documents and maintenance logs. Communication was professional and responsive. When the buyer expressed interest, the seller created urgency: another buyer was conducting a pre-purchase inspection the following week, and they needed a commitment.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The buyer, not wanting to lose the opportunity, agreed to wire a 10% deposit ($820,000) to an escrow account before scheduling his own inspection. The seller provided escrow instructions and account details that appeared legitimate.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Critical Mistakes Made</h4>
                <ol className="space-y-2 text-gray-700">
                  <li>1. Never verified the seller's identity or corporate existence</li>
                  <li>2. Did not independently confirm the aircraft's registration or ownership</li>
                  <li>3. Accepted escrow instructions provided by seller without independent verification</li>
                  <li>4. Wired funds before conducting pre-purchase inspection</li>
                  <li>5. Did not use an aviation attorney or experienced broker</li>
                  <li>6. Allowed artificial urgency to compress timeline</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Outcome</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                After wiring the funds, the buyer attempted to schedule the pre-purchase inspection. The seller became evasive, providing excuses about scheduling conflicts. Within 72 hours, all communication ceased. The phone numbers were disconnected, email addresses bounced, and the aircraft listing disappeared.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Investigation revealed the "corporate seller" didn't exist. The registration documents were sophisticated forgeries. The escrow company was fake—a website created by the fraudsters with a phone number that went to their accomplice. The aircraft photos were stolen from a legitimate listing of a plane that had sold two years earlier.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                The FBI investigation recovered none of the funds. The money had been immediately transferred through multiple international accounts and converted to cryptocurrency. Total loss: $820,000, plus $45,000 in legal fees pursuing recovery.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">What Proper Due Diligence Would Have Cost</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Corporate verification:</strong> $500 (would have revealed non-existent company immediately)</li>
                  <li><strong>Aircraft title search:</strong> $350 (would have shown plane sold years ago)</li>
                  <li><strong>Escrow company verification:</strong> $0 (independent phone call to known escrow firms)</li>
                  <li><strong>Aviation attorney review:</strong> $3,000 (would have flagged multiple red flags)</li>
                  <li><strong>Total prevention cost:</strong> $3,850</li>
                  <li><strong>Amount saved by proper DD:</strong> $861,150</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Case Study 2: The Shell Company Acquisition</h2>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction Overview</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Asset:</strong> Technology services company with claimed $12M revenue</li>
                  <li><strong>Buyer:</strong> Serial entrepreneur acquiring for strategic expansion</li>
                  <li><strong>Purchase price:</strong> $4.5 million</li>
                  <li><strong>Red flags ignored:</strong> Financial statements not audited</li>
                  <li><strong>Loss:</strong> $4.5 million plus 18 months managing worthless asset</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Happened</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                An experienced entrepreneur identified an acquisition target: a technology services company with $12 million in claimed annual revenue and strong profit margins. The seller provided detailed financial statements showing consistent growth, a solid customer base, and recurring revenue contracts.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The buyer conducted some due diligence: he reviewed the provided financial statements, spoke with the seller multiple times, visited the small office, and met some employees. The seller explained the financial statements were prepared internally by their bookkeeper, not audited by an external firm, which he attributed to cost savings.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The buyer, eager to close the deal before year-end for tax reasons, accepted the internal financial statements and closed the transaction for $4.5 million. He took over operations planning to scale the business with his operational expertise.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">What Due Diligence Would Have Revealed</h4>
                <ol className="space-y-3 text-gray-700">
                  <li>1. <strong>Revenue inflation:</strong> Actual revenue was $2.1 million, not $12 million. The seller had fabricated customer contracts and created fake invoices.</li>
                  <li>2. <strong>Customer fraud:</strong> Of the "customers" listed, 60% didn't exist. The remaining 40% had minimal or no active contracts.</li>
                  <li>3. <strong>Employee misrepresentation:</strong> The "15 full-time employees" were mostly contractors who worked occasionally. Only 3 were actual employees.</li>
                  <li>4. <strong>Asset overstatement:</strong> Equipment and technology assets were obsolete or non-functional. Book value overstated by 85%.</li>
                  <li>5. <strong>Hidden liabilities:</strong> Undisclosed lawsuits from customers and vendors totaling $600,000.</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Outcome</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Within 30 days of closing, customers stopped paying. Investigation revealed most purchase orders were fabricated. The buyer realized he'd acquired a shell company with minimal real operations. He attempted to rescind the sale, but the seller's company had been dissolved and the individual had moved overseas.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                After 18 months of attempting to salvage operations and pursuing legal remedies, the buyer shut down the company. Total loss: $4.5 million purchase price, plus $1.2 million in legal fees, $800,000 in attempted operational rescue, and 18 months of wasted time.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">What Proper Due Diligence Would Have Cost</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Quality of Earnings (QoE) analysis:</strong> $35,000 (would have exposed revenue fraud)</li>
                  <li><strong>Customer verification:</strong> $8,000 (would have revealed fake customers)</li>
                  <li><strong>Legal due diligence:</strong> $15,000 (would have found hidden lawsuits)</li>
                  <li><strong>Operational assessment:</strong> $12,000 (would have revealed minimal operations)</li>
                  <li><strong>Background checks:</strong> $2,500 (would have shown seller's fraud history)</li>
                  <li><strong>Total prevention cost:</strong> $72,500</li>
                  <li><strong>Amount saved by proper DD:</strong> $6,427,500</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Case Study 3: The Fraudulent Real Estate Development</h2>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Transaction Overview</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Asset:</strong> Commercial real estate development opportunity</li>
                  <li><strong>Investors:</strong> Group of 12 individuals</li>
                  <li><strong>Investment amount:</strong> $8.7 million (collective)</li>
                  <li><strong>Red flags ignored:</strong> No independent title verification</li>
                  <li><strong>Loss:</strong> 100% of invested capital</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Happened</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                A developer presented a luxury condominium project to potential investors. The opportunity appeared solid: prime urban location, detailed architectural plans, construction timeline, and projected returns of 25% annually. The developer provided impressive credentials, showed existing permits, and arranged site visits to the property.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Twelve investors contributed amounts ranging from $500,000 to $1.2 million each, totaling $8.7 million. The developer provided purchase agreements and promised quarterly updates on construction progress. Each investor received professional-looking documentation and regular email updates showing "progress."
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">The Fatal Assumption</h4>
                <p className="text-gray-700">
                  Not one of the twelve investors independently verified that the developer actually owned the property. They relied on the site visit and the developer's documents without conducting independent title searches or verifying permits with the city.
                </p>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">The Outcome</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Eighteen months after investing, no construction had begun. Investors discovered the developer never owned the property—he had used forged ownership documents. The real property owner had no knowledge of the "development project." The permits shown to investors were sophisticated forgeries.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The developer had run an elaborate Ponzi scheme, using new investor money to pay "returns" to earlier investors while siphoning millions for personal use. He was eventually arrested, but had spent or hidden most of the funds.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Of the $8.7 million invested, receivers recovered only $650,000 in asset seizures. Average investor loss: $670,000 each.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">What Proper Due Diligence Would Have Cost</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Title search and ownership verification:</strong> $1,500 (would have revealed the fraud immediately)</li>
                  <li><strong>Permit verification with city:</strong> $500 (phone calls to municipal offices)</li>
                  <li><strong>Developer background check:</strong> $1,200 (would have shown previous fraud allegations)</li>
                  <li><strong>Real estate attorney review:</strong> $8,000</li>
                  <li><strong>Independent property assessment:</strong> $5,000</li>
                  <li><strong>Total prevention cost:</strong> $16,200</li>
                  <li><strong>Amount saved by proper DD:</strong> $8,033,800</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Patterns Across All Cases</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                These cases, while different in specifics, share critical commonalities:
              </p>

              <div className="space-y-4 mb-8">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Artificial Urgency</h4>
                  <p className="text-gray-700">
                    In each case, the fraudster created time pressure to prevent thorough due diligence. "Other buyers," "limited time offers," and "year-end deadlines" compressed decision timelines.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Presentation</h4>
                  <p className="text-gray-700">
                    Sophisticated fraudsters create professional documentation, websites, and communications that appear legitimate. High-quality forgeries can pass casual inspection.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Verification Bypass</h4>
                  <p className="text-gray-700">
                    Victims accepted seller-provided documentation without independent verification. Phone numbers, escrow companies, and references all provided by the seller went unverified.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Advice Skipped</h4>
                  <p className="text-gray-700">
                    In each case, engaging specialized attorneys, accountants, or industry experts would have immediately identified red flags. The cost was deemed unnecessary until disaster struck.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Economics of Due Diligence</h2>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 my-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cost-Benefit Analysis</h3>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
                    <span className="font-semibold">Comprehensive due diligence cost:</span>
                    <span className="text-xl font-bold text-emerald-700">$15,000 - $75,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-emerald-200">
                    <span className="font-semibold">Typical fraud losses prevented:</span>
                    <span className="text-xl font-bold text-emerald-700">$500,000 - $10,000,000+</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-semibold text-lg">Return on DD investment:</span>
                    <span className="text-2xl font-bold text-emerald-700">10x - 200x+</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The mathematics are overwhelming: spending 0.5-2% of transaction value on proper due diligence provides extraordinary insurance against total loss. Beyond fraud prevention, thorough due diligence also identifies operational issues, overvaluation, and hidden liabilities that can be negotiated before closing.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Essential Due Diligence Components</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Every high-value transaction should include these minimum verification steps:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Identity & Legal Verification</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Corporate registry searches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Beneficial ownership verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Background checks on principals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Litigation history searches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Regulatory compliance checks</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Asset Verification</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Independent ownership confirmation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Title searches and lien verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Physical inspection by qualified experts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Valuation by independent appraisers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Registry and permit verification</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Financial Verification</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Audited financial statements review</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Quality of earnings analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Customer and revenue verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Bank statement analysis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Tax return verification</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Intermediary Verification</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Independent broker verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Escrow company validation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Attorney credentials confirmation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Reference checks on advisors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Professional licensing verification</span>
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Takeaways</h2>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <ol className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] text-xl mr-4">1.</span>
                    <div>
                      <strong className="text-gray-900">Due diligence is insurance, not expense.</strong> The cost is negligible compared to the losses prevented. Every case study above could have been avoided with spending less than 2% of the transaction value on proper verification.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] text-xl mr-4">2.</span>
                    <div>
                      <strong className="text-gray-900">Urgency is a weapon.</strong> Legitimate sellers understand and expect due diligence. Anyone pressuring you to skip or compress verification is either incompetent or fraudulent.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] text-xl mr-4">3.</span>
                    <div>
                      <strong className="text-gray-900">Never rely on seller-provided information alone.</strong> Every critical claim—ownership, financial performance, asset condition, company existence—must be independently verified.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] text-xl mr-4">4.</span>
                    <div>
                      <strong className="text-gray-900">Sophisticated fraud looks professional.</strong> High-quality documentation, professional communication, and impressive presentations are not verification. Independent third-party confirmation is mandatory.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-[#635BFF] text-xl mr-4">5.</span>
                    <div>
                      <strong className="text-gray-900">Engage specialized professionals.</strong> Industry-specific attorneys, accountants, inspectors, and verification services have experience identifying red flags you might miss. Their fees are trivial compared to their value.
                    </div>
                  </li>
                </ol>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                The pattern in every major fraud case is the same: victims chose speed and convenience over verification. They trusted impressive presentations instead of insisting on independent confirmation. They accepted explanations for irregularities instead of walking away from questionable deals.
              </p>

              <p className="text-gray-700 leading-relaxed">
                The next time you're tempted to skip due diligence to save time or money, remember these case studies. The true cost of skipping due diligence isn't the money you save today—it's the total loss you risk tomorrow.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Protect Your Next Transaction
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield provides comprehensive verification in 60 seconds—far less than the cost of one hour of legal fees
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