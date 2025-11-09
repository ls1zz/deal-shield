import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function DocumentVerificationGuideArticle() {
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
              Best Practices
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Document Verification 101: LOIs, NDAs, and POFs
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 22, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>10 min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                In high-value transactions, documents form the foundation of trust and legal protection. Letters of Intent, Non-Disclosure Agreements, and Proof of Funds are frequently forged or manipulated by fraudsters. Understanding how to properly verify these documents can prevent catastrophic losses.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Document Fraud Landscape</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Document forgery has become increasingly sophisticated with modern technology. High-quality scanners, digital editing software, and readily available corporate templates make it possible to create convincing forgeries that can fool cursory inspection.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Common Document Fraud Statistics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Over 40% of fraudulent transactions involve forged documentation</li>
                  <li>Average loss from document fraud in luxury transactions exceeds $2.3 million</li>
                  <li>Most document fraud is discovered only after funds have been transferred</li>
                  <li>Less than 15% of fraudulent documents are detected before closing</li>
                  <li>Digital forgeries now outnumber physical forgeries 3:1</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Letter of Intent (LOI) Verification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                A Letter of Intent outlines the preliminary terms of a transaction. In luxury deals, LOIs often precede deposits or exclusivity agreements. Fraudulent LOIs create false confidence that a buyer or seller is legitimate and financially capable.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What Makes a Legitimate LOI</h3>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Essential LOI Components</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Complete party identification:</strong> Full legal names, addresses, and entity details for all parties. Corporate entities should include state of incorporation and registration numbers.
                  </li>
                  <li>
                    <strong>Specific asset description:</strong> Detailed description of what's being bought or sold, including unique identifiers, serial numbers, or legal descriptions.
                  </li>
                  <li>
                    <strong>Clear price and terms:</strong> Exact purchase price, payment structure, deposit amount, and timeline. Vague terms like "market price" or "to be determined" are red flags.
                  </li>
                  <li>
                    <strong>Contingencies and conditions:</strong> Due diligence periods, inspection rights, financing contingencies, and conditions for closing.
                  </li>
                  <li>
                    <strong>Expiration date:</strong> LOIs should have clear expiration dates. Open-ended LOIs are unusual in legitimate transactions.
                  </li>
                  <li>
                    <strong>Proper signatures:</strong> Original signatures with dates. Digital signatures should include verification certificates.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common LOI Forgery Techniques</h3>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Red Flags to Watch For</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Template inconsistencies:</strong> LOIs that look computer-generated but claim to be from law firms often have formatting inconsistencies with legitimate firm documents.</li>
                  <li><strong>Generic language:</strong> Overly generic terms without specific transaction details suggest the LOI is being used for multiple scams.</li>
                  <li><strong>Signature irregularities:</strong> Digital signatures without proper certificates, signatures that don't match known samples, or photocopied signature pages attached to different documents.</li>
                  <li><strong>Contact information mismatches:</strong> Email addresses, phone numbers, or addresses that don't match corporate records or professional directories.</li>
                  <li><strong>Legal entity discrepancies:</strong> Company names that don't appear in state registries or international corporate databases.</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">LOI Verification Process</h3>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Step-by-Step Verification</h4>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>1. Verify all parties exist:</strong> Search corporate registries for businesses. For individuals, verify identity through background checks and government databases.</li>
                  <li><strong>2. Confirm signatory authority:</strong> Verify that the person signing has authority to bind the entity. Request corporate resolutions or power of attorney if signing on behalf of a company.</li>
                  <li><strong>3. Validate contact information:</strong> Independently look up company contact details. Call the company's main number to confirm the person exists and has the stated role.</li>
                  <li><strong>4. Check law firm credentials:</strong> If an attorney prepared the LOI, verify their bar membership and firm association through state bar websites.</li>
                  <li><strong>5. Examine document metadata:</strong> PDF metadata can reveal when the document was created, who created it, and what software was used. Inconsistencies are warning signs.</li>
                  <li><strong>6. Cross-reference with public information:</strong> If the LOI references specific assets, verify ownership through registries, title searches, or public records.</li>
                </ol>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">NDA and NCNDA Verification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Non-Disclosure Agreements (NDAs) and Non-Circumvention/Non-Disclosure Agreements (NCNDAs) are frequently used in luxury transactions. Fraudsters use fake NDAs to appear professional and to extract information they can exploit.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Standard NDA Components</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">What Legitimate NDAs Include</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Definition of confidential information:</strong> Clear scope of what information is protected. Overly broad definitions or vague language suggests inexperience or fraud.
                  </li>
                  <li>
                    <strong>Permitted disclosures:</strong> Specific exceptions for legally required disclosures, disclosures to advisors, or information already public.
                  </li>
                  <li>
                    <strong>Duration of confidentiality:</strong> Specific time period for confidentiality obligations. Indefinite confidentiality is unusual except for trade secrets.
                  </li>
                  <li>
                    <strong>Return of materials:</strong> Requirements for returning or destroying confidential materials at transaction end or request.
                  </li>
                  <li>
                    <strong>Governing law and jurisdiction:</strong> Specific state or country law that governs the agreement and where disputes will be resolved.
                  </li>
                  <li>
                    <strong>Remedies for breach:</strong> Injunctive relief provisions and damage calculations for confidentiality breaches.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">NCNDA Red Flags</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                NCNDAs are particularly common in international commodity trading and can be indicators of fraud when used inappropriately. Legitimate businesses in most industries don't require NCNDAs for standard transactions.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Warning Signs in NCNDAs</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Requested too early:</strong> Demanding NCNDA before basic information exchange or preliminary discussions is unusual.</li>
                  <li><strong>Overly punitive terms:</strong> Extreme penalties for circumvention or disclosure that seem designed to intimidate rather than protect.</li>
                  <li><strong>Vague circumvention clause:</strong> If you can't clearly understand what constitutes circumvention, the agreement may be unenforceable or designed to confuse.</li>
                  <li><strong>Strange parties listed:</strong> Long lists of intermediaries or parties with unclear roles suggests a chain of brokers with no actual principals.</li>
                  <li><strong>Multiple conflicting versions:</strong> If you receive several versions with material changes, especially after signing, this indicates disorganization or fraud.</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">NDA/NCNDA Verification Steps</h3>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Verify all signing parties:</strong> Every party listed should be verified through corporate registries. Check that individuals have authority to sign on behalf of their organizations.</p>
                <p><strong>Review with legal counsel:</strong> Have an attorney review before signing. Cost is minimal compared to risk exposure from signing fraudulent documents.</p>
                <p><strong>Check for notarization requirements:</strong> Some jurisdictions require notarization for certain agreements. Verify notary credentials if document is notarized.</p>
                <p><strong>Validate corporate seals:</strong> If a corporate seal is affixed, verify it matches the company's registered seal through corporate registry documents.</p>
                <p><strong>Research the drafter:</strong> If an attorney or firm drafted the NDA, verify their credentials and that they represent the party they claim to represent.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Proof of Funds (POF) Verification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Proof of Funds documents are among the most frequently forged documents in luxury transactions. Fake POFs allow fraudsters to appear as legitimate buyers, gain access to confidential information, and maintain scams until they're ready to disappear.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Legitimate POF Requirements</h3>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">What a Real POF Contains</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Bank letterhead:</strong> Original bank letterhead with complete bank contact information, logos, and security features.
                  </li>
                  <li>
                    <strong>Authorized signatory:</strong> Letter signed by a bank officer with their title, direct contact information, and typically their banking license information.
                  </li>
                  <li>
                    <strong>Account holder identification:</strong> Full legal name of account holder matching the party in the transaction.
                  </li>
                  <li>
                    <strong>Specific funds statement:</strong> Clear statement that funds are available, often with a reference number or date. Generic statements about "sufficient funds" are suspicious.
                  </li>
                  <li>
                    <strong>Date restrictions:</strong> POF letters are typically valid for 30-90 days. Verify the date is current.
                  </li>
                  <li>
                    <strong>Purpose statement:</strong> Many banks include a statement about the intended use of funds, particularly for international transactions.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Common POF Forgery Indicators</h3>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Red Flags in POF Documents</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Generic bank templates:</strong> POFs that look like they were created from online templates rather than bank systems.</li>
                  <li><strong>No direct contact information:</strong> Missing phone numbers or email addresses for the signing bank officer.</li>
                  <li><strong>Offshore banks exclusively:</strong> While legitimate international transactions occur, exclusive use of obscure offshore banks raises questions.</li>
                  <li><strong>Photocopies only:</strong> Reluctance to provide original POF letters is suspicious. Banks can issue original letters on demand.</li>
                  <li><strong>Excessive funds claims:</strong> POF showing funds far exceeding transaction requirements may indicate the same fake POF is being used for multiple scams.</li>
                  <li><strong>No transaction reference:</strong> Legitimate POFs often reference the specific transaction. Generic letters raise concerns.</li>
                  <li><strong>Spelling or grammatical errors:</strong> Major banks have quality controls that prevent obvious errors in official correspondence.</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Direct Bank Verification Process</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                The only reliable way to verify a POF is direct contact with the issuing bank. This requires careful procedure to avoid contacting accomplices.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Bank Verification Procedure</h4>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>1. Independent contact information:</strong> Look up the bank's contact information independently through their official website or financial directories. Never use phone numbers or emails from the POF itself.</li>
                  <li><strong>2. Call the main bank number:</strong> Ask to be transferred to the department that issues POF letters or the specific officer who signed the letter.</li>
                  <li><strong>3. Verify with reference number:</strong> Provide the reference number or date from the POF and ask the bank to confirm its authenticity.</li>
                  <li><strong>4. Confirm account holder:</strong> Ask the bank to confirm that the named individual or entity holds an account. Banks may not disclose balance details but can typically confirm letter authenticity.</li>
                  <li><strong>5. Document the call:</strong> Note the date, time, person spoken to, and their confirmation. Request written confirmation if possible.</li>
                  <li><strong>6. Alternative verification:</strong> For international banks, consider hiring local attorneys or banking verification services to conduct in-person verification.</li>
                </ol>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Counterparty Verification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond document verification, the parties themselves must be verified. A sophisticated forger might create perfect documents while concealing that they have no authority to act or don't represent legitimate entities.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Corporate Registry Searches</h3>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Essential Corporate Verifications</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">United States:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Search Secretary of State databases in the state of incorporation</li>
                      <li>Verify active status, good standing, and registered agent</li>
                      <li>Confirm officers and directors match who you're dealing with</li>
                      <li>Check formation date against claimed company history</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">United Kingdom:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Companies House searches for company number and status</li>
                      <li>Verify directors and persons with significant control</li>
                      <li>Review filed accounts and confirmation statements</li>
                      <li>Check for insolvency proceedings or strike-off notices</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">International:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Each country has different corporate registry systems</li>
                      <li>Some require local legal assistance for searches</li>
                      <li>Offshore jurisdictions often have limited public information</li>
                      <li>Consider using international corporate search services</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Beneficial Ownership Identification</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Corporate structures can obscure true ownership. Shell companies, trusts, and nominee directors can hide the actual parties to a transaction. Understanding beneficial ownership is critical for assessing risk.
              </p>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>What is beneficial ownership:</strong> The natural persons who ultimately own or control a legal entity, typically defined as owning 25% or more or having control through other means.</p>
                <p><strong>Why it matters:</strong> Fraudsters use complex structures to hide their involvement. Understanding who ultimately benefits from the transaction reveals hidden risks.</p>
                <p><strong>How to identify:</strong> Corporate registries in many jurisdictions now require beneficial ownership disclosure. For jurisdictions without transparency, professional due diligence services can trace ownership through corporate documents and filings.</p>
                <p><strong>Red flags:</strong> Offshore structures with nominee directors, frequently changing ownership, or resistance to disclosing beneficial owners all warrant additional scrutiny.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Document Verification Workflow</h2>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <h4 className="font-semibold text-gray-900 mb-4">Complete Verification Process</h4>
                <div className="space-y-4 text-gray-700">
                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong>Phase 1: Initial Document Review (Day 1)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Review all documents for completeness and internal consistency</li>
                      <li>Check for obvious red flags (formatting, signatures, dates)</li>
                      <li>Extract all party names, entities, and contact information</li>
                      <li>Note any unusual terms or suspicious elements</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong>Phase 2: Party Verification (Days 1-3)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Search corporate registries for all business entities</li>
                      <li>Verify individuals through background checks and public records</li>
                      <li>Confirm signatory authority through corporate documents</li>
                      <li>Check for litigation history and regulatory issues</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong>Phase 3: Document Authentication (Days 2-5)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Verify POF through direct bank contact</li>
                      <li>Validate attorney credentials and firm associations</li>
                      <li>Authenticate notarizations with notary public databases</li>
                      <li>Examine digital signatures and certificates</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-[#635BFF] pl-4">
                    <strong>Phase 4: Professional Review (Days 3-7)</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Attorney review of all legal documents</li>
                      <li>Accountant review of financial documents</li>
                      <li>Industry specialist review of transaction terms</li>
                      <li>Compilation of findings and risk assessment</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Cost vs. Risk Analysis</h2>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Investment in Verification</h4>
                <div className="space-y-4 text-gray-700">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Basic document review (in-house):</span>
                    <span className="font-semibold">$0 - $500</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Corporate registry searches:</span>
                    <span className="font-semibold">$200 - $1,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Background checks:</span>
                    <span className="font-semibold">$500 - $2,500</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Bank verification services:</span>
                    <span className="font-semibold">$500 - $1,500</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Attorney document review:</span>
                    <span className="font-semibold">$2,000 - $5,000</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span>Comprehensive due diligence:</span>
                    <span className="font-semibold">$5,000 - $15,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-3">
                    <span className="font-bold">Total comprehensive verification:</span>
                    <span className="font-bold text-[#635BFF]">$8,200 - $25,500</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Compare these costs to typical transaction values and fraud losses. For a $5 million transaction, comprehensive verification represents 0.16% to 0.51% of the deal value. The average document fraud loss exceeds $2.3 million—making verification an exceptional return on investment.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Takeaways</h2>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 my-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Never rely solely on provided documents.</strong> Independent verification is mandatory for all critical documents. Even professional-looking documents can be sophisticated forgeries.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Verify parties before documents.</strong> A perfect LOI from a non-existent company is worthless. Always verify entity existence and signatory authority first.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Direct contact is essential.</strong> For POFs, bank contact is the only reliable verification. For other documents, directly contacting the issuing party through independently verified contact information is critical.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Engage professionals.</strong> Attorneys, accountants, and verification specialists bring expertise you likely don't have. Their fees are minimal insurance against fraud.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Document everything.</strong> Keep records of all verification steps, phone calls, searches, and findings. This creates an audit trail and demonstrates due diligence if disputes arise.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Document verification is not optional in high-value transactions. The sophistication of modern forgery means that visual inspection is insufficient. Every document must be independently authenticated, every party must be verified, and every claim must be substantiated. The cost of verification is trivial compared to the protection it provides.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verify Documents Instantly
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield verifies parties across 9 registries and flags suspicious documents in seconds
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