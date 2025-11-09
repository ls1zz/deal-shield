import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function InternationalTransactionRisksArticle() {
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
              International
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              International Transaction Risks
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 10, 2025</span>
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
                Cross-border transactions present unique challenges that multiply fraud risk. Different legal systems, currency complications, language barriers, and varying levels of corporate transparency create opportunities for sophisticated fraud. Understanding these risks and implementing appropriate protections is essential for international deals.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Cross-Border Fraud Vectors</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                International transactions face fraud risks that don't exist in domestic deals. Fraudsters exploit jurisdictional complexity, regulatory gaps, and the difficulty of verifying foreign entities.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Common International Fraud Tactics</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Shell company jurisdictions:</strong> Use of offshore entities in countries with minimal corporate transparency requirements. BVI, Cayman Islands, and Panama companies are frequently used to hide beneficial ownership.
                  </li>
                  <li>
                    <strong>Document forgery:</strong> Forged foreign documents are harder to verify without local expertise. Fake certificates of incorporation, tax documents, and business licenses from foreign jurisdictions are difficult to authenticate.
                  </li>
                  <li>
                    <strong>Impersonation of foreign entities:</strong> Claiming to represent legitimate foreign companies that are difficult to verify. Distance and language barriers make verification challenging.
                  </li>
                  <li>
                    <strong>Jurisdiction shopping:</strong> Structuring deals through multiple jurisdictions to complicate enforcement and obscure ultimate beneficial owners.
                  </li>
                  <li>
                    <strong>Currency manipulation:</strong> Exploiting forex complexity and delays to extract additional value or hide fraud through favorable rate claims or hidden conversion fees.
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                The complexity of international business creates information asymmetry that fraudsters exploit. What might be routine verification domestically becomes expensive and time-consuming internationally—creating pressure to skip due diligence.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Currency and Payment Risks</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                International payments introduce risks beyond simple fraud. Currency exchange, payment method limitations, and transfer delays create vulnerabilities that fraudsters exploit.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Exchange Rate Manipulation</h3>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Currency-Related Fraud Techniques</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Unfavorable rate claims:</strong> Fraudsters claim exchange rates that are significantly worse than market rates, pocketing the difference. They may cite "bank fees" or "international transfer costs" to justify discrepancies.
                  </li>
                  <li>
                    <strong>Rate change timing:</strong> Agreeing to a price in one currency, then claiming exchange rates changed significantly before payment is due, demanding additional funds.
                  </li>
                  <li>
                    <strong>Hidden conversion fees:</strong> Multiple intermediary banks each taking conversion fees that weren't disclosed upfront. What should cost 1-2% in forex fees becomes 5-8%.
                  </li>
                  <li>
                    <strong>Phantom exchange costs:</strong> Claiming that special accounts or procedures are required for international transfers, with associated fees that are actually just additional fraud extraction.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Wire Transfer Complexity</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                International wire transfers involve multiple correspondent banks, each representing potential points of fraud or failure.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">International Wire Transfer Risks</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Multiple intermediaries:</strong> International wires route through 2-4 correspondent banks before reaching destination. Each is a potential interception point.</li>
                  <li><strong>SWIFT code confusion:</strong> Similar SWIFT codes or fraudulent SWIFT information can route funds to wrong accounts</li>
                  <li><strong>Delayed transfers:</strong> International wires can take 3-5 business days, giving fraudsters time to disappear before fraud is discovered</li>
                  <li><strong>Limited reversibility:</strong> Once international wires complete, reversal is nearly impossible without cooperation from receiving bank</li>
                  <li><strong>Correspondent bank fees:</strong> Unexpected deductions by intermediary banks can signal fraudulent routing</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Payment Method Risks</h3>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Cryptocurrency pressure:</strong> Fraudsters increasingly demand cryptocurrency payment for "speed" or "lower fees." Cryptocurrency transfers are irreversible and untraceable—perfect for fraud.</p>
                <p><strong>Third-party payment processors:</strong> Use of obscure international payment processors that have minimal fraud protection or buyer recourse.</p>
                <p><strong>Cash alternatives:</strong> Requests for payment via money transfer services (Western Union, MoneyGram) that are designed for person-to-person transfers, not business transactions.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Foreign Entity Verification Challenges</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Verifying foreign companies is significantly more complex than domestic verification. Corporate registry access, language barriers, and unfamiliar legal structures all create obstacles.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Verification Challenges by Region</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Regional Verification Considerations</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2 text-gray-900">European Union:</p>
                    <p className="text-sm mb-2">Generally strong corporate transparency. Most EU countries maintain searchable corporate registries with beneficial ownership information.</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li><strong>Challenges:</strong> Language barriers, country-specific filing requirements, varying data quality</li>
                      <li><strong>Resources:</strong> Each country has its own registry system (e.g., Companies House UK, Registre du Commerce France)</li>
                      <li><strong>Cost:</strong> Registry searches typically €10-50 per company</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-gray-900">United Kingdom:</p>
                    <p className="text-sm mb-2">Companies House provides excellent transparency with online searches and downloadable documents.</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li><strong>Advantage:</strong> Easy online access, English language, comprehensive filings</li>
                      <li><strong>Warning:</strong> Minimal verification requirements mean shell companies are common. Beneficial ownership information exists but isn't always accurate</li>
                      <li><strong>Verification:</strong> Check filing history, officer appointments, and registered address legitimacy</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-gray-900">Asia-Pacific:</p>
                    <p className="text-sm mb-2">Varies dramatically by country. Transparency ranges from excellent (Singapore, Hong Kong) to opaque (many jurisdictions).</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li><strong>Singapore:</strong> ACRA registry provides good transparency, English language, reasonable fees</li>
                      <li><strong>Hong Kong:</strong> Companies Registry searchable online, corporate documents available</li>
                      <li><strong>China:</strong> National Enterprise Credit Information System exists but requires Chinese language, local assistance usually needed</li>
                      <li><strong>Japan:</strong> Commercial registry searches require local assistance or specialized services</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-gray-900">Offshore Jurisdictions:</p>
                    <p className="text-sm mb-2">BVI, Cayman Islands, Panama, and similar jurisdictions intentionally provide minimal transparency.</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li><strong>Purpose:</strong> These jurisdictions exist specifically to provide corporate privacy and tax benefits</li>
                      <li><strong>Transparency:</strong> Beneficial ownership is often impossible to determine without court orders or local legal process</li>
                      <li><strong>Red flag:</strong> Use of offshore entities with no clear business reason should trigger enhanced due diligence</li>
                      <li><strong>Verification:</strong> Requires local legal counsel and often cannot fully determine beneficial ownership</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2 text-gray-900">Middle East:</p>
                    <p className="text-sm mb-2">Varies significantly. UAE has improved transparency, but verification still often requires local assistance.</p>
                    <ul className="text-sm list-disc pl-6 space-y-1">
                      <li><strong>Challenges:</strong> Free zones have different rules than mainland companies, language barriers</li>
                      <li><strong>Local requirements:</strong> Most jurisdictions require local sponsor or partner, complicating ownership structures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Language and Document Barriers</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Corporate documents in foreign languages present verification challenges beyond simple translation. Legal terminology, document formats, and authentication requirements vary by jurisdiction.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Document Verification Challenges</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Translation accuracy:</strong> Machine translation of legal documents often produces inaccurate results. Professional legal translation is expensive ($100-300 per page) but necessary.
                  </li>
                  <li>
                    <strong>Document authentication:</strong> Many countries require notarization, apostille, or consular legalization for documents used internationally. Verifying these authentications requires familiarity with foreign document standards.
                  </li>
                  <li>
                    <strong>Unfamiliar document types:</strong> Foreign corporate structures use different documents than U.S. equivalents. Understanding what documents should exist and what they should contain requires local expertise.
                  </li>
                  <li>
                    <strong>Forgery detection:</strong> Security features, paper quality, stamps, and seals vary by jurisdiction. Detecting sophisticated forgeries of foreign documents is nearly impossible without local knowledge.
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Jurisdiction and Legal Protection</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                One of the most critical and often overlooked aspects of international transactions is determining where disputes will be resolved and whether judgments can be enforced.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Choice of Law and Forum</h3>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Critical Contract Provisions</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Governing law:</strong> Which country's laws govern the contract interpretation and enforcement. This should be explicitly stated in the contract. Without clear choice, conflicts of law rules create uncertainty.
                  </li>
                  <li>
                    <strong>Forum selection:</strong> Where lawsuits or arbitrations will occur. Litigating in a foreign country is expensive and time-consuming. Having disputes resolved in your home jurisdiction provides significant advantage.
                  </li>
                  <li>
                    <strong>Arbitration clauses:</strong> International arbitration (ICC, LCIA) can be faster than courts but is still expensive. Arbitration location and rules should be clearly specified.
                  </li>
                  <li>
                    <strong>Judgment enforcement:</strong> Winning a judgment is worthless if it can't be enforced. Research whether the foreign country recognizes and enforces judgments from your jurisdiction.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Enforcement Challenges</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Even with favorable contract terms, enforcing judgments across borders faces practical obstacles.
              </p>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Asset location:</strong> If the foreign party has no assets in your jurisdiction, enforcing a judgment requires action in their home country. This typically requires hiring local counsel and navigating foreign legal systems.</p>
                <p><strong>Reciprocity requirements:</strong> Many countries will only enforce foreign judgments if there's a treaty or reciprocal enforcement agreement. Without reciprocity, you may need to re-litigate the entire case in the foreign court.</p>
                <p><strong>Public policy defenses:</strong> Foreign courts can refuse to enforce judgments that violate their public policy, even if the judgment is valid in the issuing country.</p>
                <p><strong>Time and cost:</strong> International enforcement commonly takes 2-5 years and costs hundreds of thousands in legal fees. For many fraud cases, this makes recovery economically impractical.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Working with Local Counsel</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                For significant international transactions, engaging local legal counsel in the foreign jurisdiction is essential. Local attorneys understand local law, can verify entities in local registries, and provide insight into local business practices and fraud tactics.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">What Local Counsel Provides</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Corporate registry searches:</strong> Conduct searches in local language, understand local corporate structures, and interpret filings correctly.
                  </li>
                  <li>
                    <strong>Business license verification:</strong> Confirm business licenses, permits, and regulatory compliance in local jurisdiction.
                  </li>
                  <li>
                    <strong>Local business practices:</strong> Understand what's normal vs. suspicious in local business culture. What seems unusual from a U.S. perspective may be standard practice, and vice versa.
                  </li>
                  <li>
                    <strong>Document review:</strong> Review contracts and documents under local law, identify problematic provisions, and suggest protective terms.
                  </li>
                  <li>
                    <strong>Physical verification:</strong> Visit business locations, meet with principals, and assess whether operations are as represented.
                  </li>
                  <li>
                    <strong>Background checks:</strong> Conduct background checks using local resources and databases not accessible from abroad.
                  </li>
                  <li>
                    <strong>Enforcement advice:</strong> Provide realistic assessment of ability to enforce judgments or recover assets if things go wrong.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Finding and Engaging Local Counsel</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">How to Find Reliable Local Attorneys</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>International firm networks:</strong> Major law firms have international networks and can refer to qualified local counsel in most jurisdictions.
                  </li>
                  <li>
                    <strong>Professional associations:</strong> Contact international lawyer associations or local bar associations for referrals.
                  </li>
                  <li>
                    <strong>Embassy recommendations:</strong> U.S. Embassies maintain lists of local attorneys who serve American clients.
                  </li>
                  <li>
                    <strong>Industry contacts:</strong> Ask for referrals from others in your industry who've done business in the foreign jurisdiction.
                  </li>
                  <li>
                    <strong>Verify credentials:</strong> Confirm local bar membership, experience with international transactions, and English language capabilities.
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Cost consideration:</strong> Local counsel fees vary dramatically by jurisdiction. Expect $200-800/hour depending on location and attorney seniority. While expensive, the cost is minimal compared to the risk exposure in international deals.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Due Diligence in Emerging Markets</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Emerging markets present even greater challenges than established jurisdictions. Limited corporate transparency, developing legal systems, and higher fraud rates require enhanced verification.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Additional Verification for Emerging Markets</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>On-the-ground verification:</strong> Physical presence becomes more critical. Visit facilities, meet principals face-to-face, and observe actual operations.
                  </li>
                  <li>
                    <strong>Multiple independent sources:</strong> Don't rely on single sources of information. Cross-reference everything through multiple independent channels.
                  </li>
                  <li>
                    <strong>Banking relationships:</strong> Verify banking relationships directly with banks. Fake bank documents are common in high-fraud jurisdictions.
                  </li>
                  <li>
                    <strong>Trade references:</strong> Contact suppliers and customers directly. Verify they're real companies with legitimate relationships to your counterparty.
                  </li>
                  <li>
                    <strong>Government connections:</strong> In some emerging markets, legitimate business requires government connections. Understand these relationships but be aware of corruption risks.
                  </li>
                  <li>
                    <strong>Political risk insurance:</strong> Consider political risk insurance for large transactions in jurisdictions with unstable legal or political systems.
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">International Escrow Considerations</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Using escrow in international transactions provides protection but introduces additional complexity around jurisdiction, currency, and escrow agent selection.
              </p>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Jurisdiction of escrow:</strong> Where is the escrow account located? This determines which laws govern the escrow and affects fund security and accessibility.</p>
                <p><strong>Currency of escrow:</strong> Which currency will escrow hold funds in? Currency risk and conversion fees impact transaction economics.</p>
                <p><strong>Release conditions:</strong> Ensure release conditions are objective and verifiable. Subjective conditions ("satisfactory performance") create disputes in international contexts where parties may have different expectations.</p>
                <p><strong>Dispute resolution:</strong> How are disputes about release conditions resolved? International arbitration is typically preferred over litigation for cross-border escrow disputes.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Takeaways</h2>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>International deals require enhanced due diligence.</strong> What's sufficient for domestic transactions is inadequate for cross-border deals. Multiply your verification efforts proportionally to the added complexity.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Engage local legal counsel early.</strong> The cost of local attorneys is minimal compared to the risks they help identify and mitigate. Their local knowledge is irreplaceable.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Understand jurisdiction and enforcement before signing.</strong> Where will disputes be resolved? Can judgments be enforced? These questions must be answered before closing, not after problems arise.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Currency transfers require extra caution.</strong> Use reputable forex services, understand all fees, verify bank account ownership before wiring funds internationally, and consider test wires for large amounts.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Offshore entities warrant skepticism.</strong> Companies registered in jurisdictions known for secrecy should trigger enhanced scrutiny. Demand transparency about beneficial ownership and business purpose.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                International transactions offer tremendous opportunities but require proportionally greater diligence. The complexity and distance involved in cross-border deals create fraud opportunities that don't exist domestically. Success requires understanding these unique risks and implementing appropriate verification and protection measures.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Don't let the excitement of international expansion or attractive deal terms cause you to shortcut verification. The businesses and individuals that thrive in international commerce are those who respect the additional complexity and invest appropriately in due diligence, local expertise, and protective contract terms.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verify International Counterparties
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield searches global registries to verify foreign entities before you commit
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