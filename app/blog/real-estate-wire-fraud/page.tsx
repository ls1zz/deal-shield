import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function RealEstateWireFraudArticle() {
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
              Real Estate Wire Fraud: Prevention Strategies
            </h1>
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>October 12, 2025</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>9 min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Real estate wire fraud has become the most costly cybercrime affecting consumers. In 2024, the FBI reported over $1.5 billion in losses from business email compromise attacks targeting real estate transactions. Understanding how these attacks work and implementing strict verification protocols can prevent devastating losses.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Scale of Real Estate Wire Fraud</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Wire fraud in real estate exploits the perfect storm: large transaction amounts, compressed timelines, multiple parties, and reliance on email for critical financial instructions. Fraudsters have refined their tactics to exploit these vulnerabilities with precision.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">2024 Statistics</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Total reported losses: $1.5 billion+ (FBI IC3 Report)</li>
                  <li>Average loss per incident: $283,000</li>
                  <li>Success rate of attacks: 47% when no verification protocols used</li>
                  <li>Recovery rate: Less than 15% of stolen funds recovered</li>
                  <li>Average time between wire and discovery: 3.2 days</li>
                  <li>Incidents increased 35% year-over-year</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                The concentration of fraud around closing dates is no coincidence. Attackers exploit the urgency and stress of closing deadlines to pressure victims into wiring funds without proper verification.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">How Wire Fraud Works</h2>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Business Email Compromise (BEC)</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Business email compromise is the primary method for real estate wire fraud. Attackers gain access to email accounts or create convincing impersonations to inject fraudulent wire instructions into legitimate transaction communications.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">BEC Attack Methods</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Account takeover:</strong> Attackers compromise real estate agent, title company, or attorney email accounts through phishing or credential theft. They monitor communications waiting for the perfect moment to send fake wire instructions.
                  </li>
                  <li>
                    <strong>Email spoofing:</strong> Creating email addresses that closely resemble legitimate parties (e.g., john@tit1ecompany.com instead of john@titlecompany.com). Victims don't notice the subtle difference.
                  </li>
                  <li>
                    <strong>Domain impersonation:</strong> Registering domains similar to legitimate title companies or law firms (e.g., smithtitlegroup.com when legitimate is smithtitlegroup.net).
                  </li>
                  <li>
                    <strong>Thread hijacking:</strong> Compromising one party's email and continuing existing email threads with fraudulent instructions. Appears legitimate because it's part of an ongoing conversation.
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Man-in-the-Middle Attacks</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                In man-in-the-middle attacks, fraudsters intercept communications between parties without either side realizing. They can read, modify, and inject messages into the conversation.
              </p>

              <div className="border-l-4 border-purple-500 pl-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-3">How It Works</h4>
                <ol className="space-y-2 text-gray-700">
                  <li><strong>1. Email compromise:</strong> Attacker gains access to realtor, title company, or attorney email</li>
                  <li><strong>2. Monitoring phase:</strong> Attacker silently monitors emails, learning about the transaction, parties involved, and expected closing date</li>
                  <li><strong>3. Email forwarding rule:</strong> Attacker creates rules to forward incoming emails to their account and delete the forwarding notification</li>
                  <li><strong>4. Timing the attack:</strong> Days before closing, attacker sends modified wire instructions from the compromised account</li>
                  <li><strong>5. Intercepting responses:</strong> Victim's replies asking for confirmation are intercepted and answered by attacker</li>
                  <li><strong>6. Discovery delay:</strong> Real party doesn't know about the communication until closing fails</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Timing of Attacks</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Wire fraud attacks are carefully timed to exploit moments of maximum vulnerability and urgency.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Attack Timeline</h4>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <p className="font-semibold mb-2">Week 1-3: Reconnaissance</p>
                    <p className="text-sm">Attackers monitor compromised email accounts, learning about upcoming closings, transaction amounts, and parties involved. They study communication patterns to craft convincing fake messages.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">3-5 Days Before Closing: The Strike</p>
                    <p className="text-sm">Fraudulent wire instructions are sent. Timing is critical—close enough to closing that victims feel urgency, but early enough that they won't immediately call to confirm before wiring.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Day of Closing: Discovery</p>
                    <p className="text-sm">When legitimate title company or attorney asks about funds not received, the fraud is discovered. By this time, funds have typically been transferred through multiple accounts and converted to cryptocurrency.</p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Common Scenarios</h2>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Fake Title Company Emails</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                The most common scenario involves emails appearing to come from the title company with changed wire instructions.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Typical Attack Flow</h4>
                <ol className="space-y-3 text-gray-700">
                  <li><strong>Original instructions:</strong> Legitimate title company sends wire instructions early in the process</li>
                  <li><strong>Fake email:</strong> Days before closing, buyer receives email appearing to be from title company: "URGENT: Wire Instructions Changed Due to Bank Account Update"</li>
                  <li><strong>Professional appearance:</strong> Email includes title company logo, signature, and references to the specific property and closing date</li>
                  <li><strong>Urgency tactics:</strong> Email emphasizes that using old instructions will delay closing, appeals to buyer's desire to close on time</li>
                  <li><strong>Social engineering:</strong> If buyer replies with questions, attacker responds promptly with reassuring answers</li>
                  <li><strong>Wire execution:</strong> Buyer wires funds to fraudulent account, believing they're following legitimate updated instructions</li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Compromised Realtor Accounts</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Real estate agents' email accounts are frequent targets because they're involved in many transactions and buyers trust their communications implicitly.
              </p>

              <div className="space-y-3 text-gray-700 my-6">
                <p><strong>Why realtors are targeted:</strong> Real estate agents often have less sophisticated cybersecurity than title companies or law firms. They handle multiple transactions simultaneously, giving attackers access to many potential victims through a single compromised account.</p>
                <p><strong>The attack:</strong> Attacker uses compromised realtor account to send "helpful" emails to buyers with wire instructions, claiming to forward information from the title company. Buyers trust their agent and follow the instructions.</p>
                <p><strong>Detection difficulty:</strong> The email legitimately comes from the agent's account. Email security systems don't flag it because it's not spoofed—the actual account was compromised.</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Prevention Strategies</h2>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Never Trust Emailed Wire Instructions</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                The single most important rule: never wire funds based solely on emailed instructions, regardless of how legitimate they appear.
              </p>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Wire Transfer Rules</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Rule 1:</strong> Never wire funds based on emailed instructions alone</li>
                  <li><strong>Rule 2:</strong> Always verify wire instructions via phone call to a known number</li>
                  <li><strong>Rule 3:</strong> Never use phone numbers from the email—look them up independently</li>
                  <li><strong>Rule 4:</strong> Treat any changes to wire instructions as suspicious</li>
                  <li><strong>Rule 5:</strong> If anything feels rushed or unusual, stop and verify</li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Callback Verification Requirements</h3>

              <p className="text-gray-700 leading-relaxed mb-4">
                Proper callback verification can prevent virtually all wire fraud. The key is using independently verified contact information.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Callback Verification Protocol</h4>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Receive wire instructions:</strong> Whether initial or changed instructions, do not immediately act on them.
                  </li>
                  <li>
                    <strong>2. Find contact number independently:</strong> Look up the title company or attorney's phone number through their website, Google search, or business directory. Never use numbers from the email itself.
                  </li>
                  <li>
                    <strong>3. Call the main number:</strong> Call the company's main line and ask to be transferred to the specific person handling your closing.
                  </li>
                  <li>
                    <strong>4. Verify all details:</strong> Read back every detail: account number, routing number, beneficiary name, bank name, and any reference numbers. Do not say "Is this correct?" and accept yes/no—make them confirm specific details.
                  </li>
                  <li>
                    <strong>5. Document the call:</strong> Write down the date, time, person spoken with, and phone number called. Keep this documentation with your closing records.
                  </li>
                  <li>
                    <strong>6. Any changes require new verification:</strong> If wire instructions change for any reason, restart this entire process. Changed instructions are the highest fraud risk.
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Face-to-Face Verification When Possible</h3>

              <p className="text-gray-700 leading-relaxed mb-6">
                For high-value transactions or when closing remotely, consider in-person verification of wire instructions. Visit the title company office to receive wire instructions directly or use secure portal systems if offered.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Title Company Verification</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond verifying wire instructions, confirm you're actually working with a legitimate title company. Fraudsters sometimes impersonate entire companies.
              </p>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">How to Verify Title Companies</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>State licensing:</strong> Verify the title company is licensed with your state's insurance department or appropriate regulatory agency. Most states maintain searchable databases.
                  </li>
                  <li>
                    <strong>Physical address:</strong> Confirm they have a physical office location. Look up the address on Google Maps street view to verify it's an actual office building.
                  </li>
                  <li>
                    <strong>Years in business:</strong> Check how long the company has been operating. Established companies have track records. Brand new companies warrant extra scrutiny.
                  </li>
                  <li>
                    <strong>Independent reviews:</strong> Search for reviews on Google, Yelp, or Better Business Bureau. Be suspicious of companies with no online presence or only recent positive reviews.
                  </li>
                  <li>
                    <strong>Title insurance underwriters:</strong> Verify the company is authorized by major title insurance underwriters (First American, Fidelity, Stewart, Old Republic).
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What to Do If You're Targeted</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                If you suspect wire fraud or realize you've wired funds based on fraudulent instructions, immediate action is critical. The faster you respond, the better your chances of recovery.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Immediate Response Steps (Time-Critical)</h4>
                <ol className="space-y-3 text-gray-700">
                  <li>
                    <strong>1. Contact your bank immediately (within minutes):</strong> Call your bank's fraud department and request an immediate wire recall. Banks can sometimes stop or reverse wires if caught within hours. Have your wire transfer confirmation number ready.
                  </li>
                  <li>
                    <strong>2. Contact receiving bank:</strong> Call the bank where you sent funds and report the fraud. Request they freeze the receiving account. You'll need the account number and routing number from the fraudulent wire instructions.
                  </li>
                  <li>
                    <strong>3. File FBI IC3 complaint:</strong> Go to ic3.gov and file a complaint immediately. Include all documentation: emails, wire confirmations, and timeline. FBI can issue alerts to financial institutions to attempt fund recovery.
                  </li>
                  <li>
                    <strong>4. Local police report:</strong> File a report with local law enforcement. Get a case number for insurance and potential recovery efforts.
                  </li>
                  <li>
                    <strong>5. Contact legitimate title company:</strong> Alert the actual title company about the fraud. They may have cyber insurance that could provide coverage or can alert other clients.
                  </li>
                  <li>
                    <strong>6. Notify your title insurance company:</strong> Report the fraud to your title insurance provider. Some policies may provide coverage for wire fraud losses.
                  </li>
                  <li>
                    <strong>7. Engage legal counsel:</strong> Consult with an attorney experienced in wire fraud and cybercrime for advice on recovery options and potential liability issues.
                  </li>
                </ol>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Critical timing:</strong> Most successful fund recoveries occur within 24-48 hours of the fraudulent wire. After that, funds have typically been moved through multiple accounts and converted to cryptocurrency, making recovery nearly impossible.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Technology Solutions</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                While human verification is essential, technology solutions can provide additional protection layers.
              </p>

              <div className="bg-blue-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Technology Safeguards</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Secure wire platforms:</strong> Some title companies now use secure portal systems (CertifID, Snapdocs, etc.) that verify wire instructions and provide authentication. These systems are significantly more secure than email.
                  </li>
                  <li>
                    <strong>Email authentication (DMARC):</strong> Email systems that implement DMARC, SPF, and DKIM can reduce email spoofing. Ask your title company if they use these protections.
                  </li>
                  <li>
                    <strong>Multi-factor authentication:</strong> Ensure all parties in the transaction use MFA on their email accounts to reduce account takeover risk.
                  </li>
                  <li>
                    <strong>Encrypted communication:</strong> For sensitive information like wire instructions, use encrypted messaging platforms rather than standard email.
                  </li>
                  <li>
                    <strong>Wire verification services:</strong> Third-party services that provide additional verification layers before funds are released.
                  </li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Real Case Study</h2>

              <div className="bg-gray-50 rounded-xl p-6 my-6">
                <h4 className="font-semibold text-gray-900 mb-4">Case: The $1.2 Million Luxury Home</h4>
                <p className="text-gray-700 mb-4">
                  A couple purchasing a $1.2 million home in California received wire instructions from their real estate attorney via email three days before closing. The email included the attorney's signature block, logo, and referenced their specific property address and closing date.
                </p>
                <p className="text-gray-700 mb-4">
                  The buyers, familiar with wire fraud risks, called the attorney's office using a phone number from the email. The person who answered confirmed the wire instructions were correct and the account was ready to receive funds.
                </p>
                <p className="text-gray-700 mb-4">
                  They wired $240,000 (20% down payment plus closing costs) that afternoon. Three days later, on the scheduled closing date, the attorney's office called asking where their funds were. The attorney had never sent wire instructions.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>What happened:</strong> The attorney's email account had been compromised weeks earlier. The attacker monitored communications, created a forwarding rule to hide the fraud, and set up a phone number that answered as the law firm. The fake phone number was included in the fraudulent email.
                </p>
                <p className="text-gray-700">
                  <strong>Outcome:</strong> Despite immediate action, only $18,000 was recovered. The buyers lost $222,000. Their title insurance did not cover wire fraud. The transaction eventually closed with additional funds, but the buyers suffered devastating financial loss.
                </p>
              </div>

              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg my-6">
                <h4 className="font-semibold text-gray-900 mb-3">Prevention Points</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Mistake:</strong> Used phone number from the email instead of looking it up independently</li>
                  <li><strong>Should have:</strong> Looked up attorney's phone number on their website or through state bar association</li>
                  <li><strong>Mistake:</strong> Accepted verbal confirmation without visiting office or using known contact</li>
                  <li><strong>Should have:</strong> Visited attorney's office in person to receive wire instructions or called known phone number from previous communications</li>
                  <li><strong>Mistake:</strong> Didn't question why wire instructions came via email days before closing</li>
                  <li><strong>Should have:</strong> Asked why instructions weren't provided at contract signing or through secure portal</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Key Takeaways</h2>

              <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl p-8 my-8">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Never wire funds based on email alone.</strong> Regardless of how legitimate the email appears, always verify through independent phone call using known contact information.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Look up phone numbers yourself.</strong> Never use contact information from emails containing wire instructions. Find numbers through independent web searches, company websites, or professional directories.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Changed wire instructions are highest risk.</strong> Treat any changes to wire instructions with extreme suspicion. Verify through in-person visit or multiple independent phone calls.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Time pressure is a red flag.</strong> Fraudsters create urgency to bypass verification. Legitimate closings have enough flexibility to allow proper wire instruction verification.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-3 mt-1">•</span>
                    <span><strong>Act within minutes if fraud suspected.</strong> Every minute counts in fund recovery. Have fraud response plan ready before closing day.</span>
                  </li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Wire fraud in real estate is entirely preventable with proper verification protocols. The extra 10 minutes required to independently verify wire instructions is trivial compared to the average $283,000 loss. Make callback verification a non-negotiable part of your closing process, and never let urgency or convenience compromise this critical security step.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Protect Your Transaction
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Deal Shield verifies title companies and parties before you wire funds
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