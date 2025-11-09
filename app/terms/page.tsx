import Image from 'next/image';
import Link from 'next/link';

export default function TermsPage() {
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
            {/* Logo */}
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

            {/* Navigation */}
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

            {/* Auth Buttons */}
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

      {/* Main Content */}
      <main className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 4, 2025
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Agreement */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Deal Shield Inc. ("Deal Shield," "we," "us," or "our") governing your access to and use of the Deal Shield platform, including our website, applications, and services (collectively, the "Service").
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.
                </p>
              </section>

              {/* Eligibility */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To use Deal Shield, you must:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Be at least 18 years of age</li>
                  <li>Have the legal capacity to enter into binding contracts</li>
                  <li>Not be prohibited from using the Service under applicable laws</li>
                  <li>Represent a legitimate business or professional entity engaged in lawful transactions</li>
                  <li>Provide accurate and complete registration information</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By using the Service, you represent and warrant that you meet these eligibility requirements.
                </p>
              </section>

              {/* Account Registration */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration and Security</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Account Creation</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you create an account, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Not share your account with others or allow others to access it</li>
                  <li>Notify us immediately of any unauthorized account access</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Account Responsibility</h3>
                <p className="text-gray-700 leading-relaxed">
                  You are solely responsible for all activity that occurs under your account. We are not liable for any loss or damage arising from unauthorized account access if you fail to maintain proper security measures.
                </p>
              </section>

              {/* Subscription Plans */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Plans and Billing</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Available Plans</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Deal Shield offers the following subscription tiers:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Starter Plan:</strong> $199/month - 10 investigations per month</li>
                  <li><strong>Professional Plan:</strong> $599/month - 50 investigations per month</li>
                  <li><strong>Enterprise Plan:</strong> $1,999/month - Unlimited investigations</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Free Trial</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  New users receive a 7-day free trial to evaluate the Service. During the trial period, you have full access to your selected plan's features. You will not be charged unless you continue your subscription after the trial ends. You may cancel anytime during the trial without charge.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Billing and Payments</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By subscribing, you agree that:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Subscriptions automatically renew monthly unless canceled</li>
                  <li>You authorize us to charge your payment method on each renewal date</li>
                  <li>All fees are non-refundable except as required by law or stated in these Terms</li>
                  <li>You are responsible for all taxes associated with your subscription</li>
                  <li>Failed payments may result in service suspension or termination</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Plan Changes</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  You may upgrade or downgrade your plan at any time from your account settings. Upgrades take effect immediately, and you will be charged a prorated amount. Downgrades take effect at the start of your next billing cycle.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Cancellation</h3>
                <p className="text-gray-700 leading-relaxed">
                  You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. You will continue to have access to the Service until that time. No refunds will be issued for partial months.
                </p>
              </section>

              {/* Acceptable Use */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to use Deal Shield only for lawful purposes and in accordance with these Terms. You agree NOT to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Use the Service to facilitate illegal activities, fraud, money laundering, or any unlawful transactions</li>
                  <li>Use the Service to harass, stalk, or harm others</li>
                  <li>Attempt to reverse engineer, decompile, or disassemble any part of the Service</li>
                  <li>Upload malicious code, viruses, or any harmful software</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Use automated tools (bots, scrapers) to access the Service without permission</li>
                  <li>Resell, redistribute, or sublicense access to the Service</li>
                  <li>Use the Service in any manner that could damage, disable, or impair our infrastructure</li>
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Share false, misleading, or fraudulent information</li>
                </ul>
                <div className="bg-purple-50 border-l-4 border-[#635BFF] p-4 rounded-r-lg my-6">
                  <p className="text-gray-800 font-medium">
                    ⚠️ <strong>Important:</strong> Deal Shield is a tool for legitimate due diligence. Using our Service to facilitate fraud, illegal transactions, or to harm others is strictly prohibited and may result in immediate termination and legal action.
                  </p>
                </div>
              </section>

              {/* Service Description */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description and Limitations</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">What We Provide</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Deal Shield provides:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>AI-powered analysis of transaction documents and entities</li>
                  <li>Automated searches across 9 government and regulatory databases</li>
                  <li>Risk assessment reports and fraud detection</li>
                  <li>Document verification services (LOI, NDA, Proof of Funds, etc.)</li>
                  <li>Secure, encrypted data storage (with automatic 72-hour deletion)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Service Limitations</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Not Professional Advice:</strong> Deal Shield provides information and analysis tools but does not provide legal, financial, investment, or professional advice</li>
                  <li><strong>No Guarantees:</strong> While we strive for accuracy, we do not guarantee that all information is complete, current, or error-free</li>
                  <li><strong>Third-Party Data:</strong> We rely on third-party data sources that may contain inaccuracies or be out of date</li>
                  <li><strong>Your Responsibility:</strong> You are solely responsible for your business decisions and transactions</li>
                  <li><strong>Independent Verification:</strong> You should independently verify critical information and consult professionals as needed</li>
                  <li><strong>Service Availability:</strong> We aim for 99.9% uptime but cannot guarantee uninterrupted access</li>
                </ul>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Our Intellectual Property</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Service, including all content, features, functionality, software, algorithms, trademarks, logos, and branding (collectively, "Deal Shield IP"), is owned by Deal Shield Inc. and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or create derivative works of Deal Shield IP without our express written permission.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Your Content</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You retain all rights to the documents, data, and information you upload to the Service ("Your Content"). By using the Service, you grant us a limited, non-exclusive license to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Process and analyze Your Content to provide the Service</li>
                  <li>Store Your Content temporarily (subject to our 72-hour deletion policy)</li>
                  <li>Use aggregated, anonymized data to improve our algorithms and services</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We will never share, sell, or use Your Content for purposes other than providing the Service, except as required by law.
                </p>
              </section>

              {/* Confidentiality */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Confidentiality and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We understand that the information you process through Deal Shield is highly sensitive and confidential. We commit to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Maintain strict confidentiality of all Your Content and investigation data</li>
                  <li>Encrypt all data at rest and in transit using bank-grade encryption</li>
                  <li>Automatically delete all investigation data after 72 hours</li>
                  <li>Never share your data with third parties for marketing or any non-service purposes</li>
                  <li>Implement SOC 2 Type II certified security controls</li>
                  <li>Maintain regular security audits and penetration testing</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  For more details, see our <Link href="/privacy" className="text-[#635BFF] hover:underline">Privacy Policy</Link> and <Link href="/security" className="text-[#635BFF] hover:underline">Security page</Link>.
                </p>
              </section>

              {/* Disclaimers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimers and Warranties</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <p className="text-gray-800 leading-relaxed uppercase font-semibold mb-4">
                    IMPORTANT LEGAL NOTICE - PLEASE READ CAREFULLY
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    DEAL SHIELD DOES NOT WARRANT THAT:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>The Service will be uninterrupted, secure, or error-free</li>
                    <li>The results obtained from the Service will be accurate, complete, or reliable</li>
                    <li>Any errors in the Service will be corrected</li>
                    <li>The Service will meet your specific requirements</li>
                  </ul>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  You use the Service at your own risk. Any material downloaded or obtained through the Service is accessed at your own discretion and risk, and you are solely responsible for any damage to your computer system or loss of data resulting from such downloads.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-4">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, DEAL SHIELD AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, revenue, data, or business opportunities</li>
                    <li>Loss from transactions, investments, or business decisions made based on information from the Service</li>
                    <li>Damages arising from fraud, misrepresentation, or misconduct by third parties</li>
                    <li>Damages resulting from unauthorized access to your account</li>
                    <li>Any damages exceeding the amount you paid to Deal Shield in the 12 months preceding the claim</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability for incidental or consequential damages. In such jurisdictions, our liability will be limited to the greatest extent permitted by law.
                  </p>
                </div>
              </section>

              {/* Indemnification */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Indemnification</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to indemnify, defend, and hold harmless Deal Shield and its officers, directors, employees, contractors, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Your use or misuse of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any law or regulation</li>
                  <li>Your violation of any third-party rights, including intellectual property or privacy rights</li>
                  <li>Your Content uploaded to the Service</li>
                  <li>Any transaction or business decision you make based on information from the Service</li>
                </ul>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Your Right to Terminate</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  You may terminate your account at any time by contacting support or through your account settings. Upon termination, your subscription will remain active until the end of your current billing period.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Our Right to Terminate</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We may suspend or terminate your account immediately, without prior notice, if:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>You violate these Terms or our Acceptable Use Policy</li>
                  <li>You engage in fraudulent activity or illegal conduct</li>
                  <li>Your payment method fails or you fail to pay fees owed</li>
                  <li>You create risk or legal exposure for Deal Shield or other users</li>
                  <li>We are required to do so by law</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Effects of Termination</h3>
                <p className="text-gray-700 leading-relaxed">
                  Upon termination of your account, your right to access and use the Service immediately ceases. All Your Content will be deleted within 72 hours of termination (or immediately if you manually delete it). Sections of these Terms that by their nature should survive termination will survive, including intellectual property provisions, disclaimers, limitations of liability, and dispute resolution.
                </p>
              </section>

              {/* Dispute Resolution */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution and Arbitration</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Informal Resolution</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Before filing a claim, you agree to contact us at legal@dealshield.com to attempt to resolve the dispute informally. We will work in good faith to resolve any concerns.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Binding Arbitration</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If informal resolution fails, you agree that any dispute arising from these Terms or the Service will be resolved through binding arbitration rather than in court, except that you may assert claims in small claims court if they qualify.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Arbitration will be conducted by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitrator's decision is final and binding. You waive your right to a jury trial or to participate in a class action lawsuit.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Class Action Waiver</h3>
                <p className="text-gray-700 leading-relaxed">
                  You agree to bring claims against Deal Shield only in your individual capacity and not as a plaintiff or class member in any purported class or representative proceeding.
                </p>
              </section>

              {/* Governing Law */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any legal action or proceeding (to the extent not subject to arbitration) shall be brought exclusively in the federal or state courts located in Delaware, and you consent to the personal jurisdiction of such courts.
                </p>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Sending an email to your registered email address</li>
                  <li>Posting a notice on our website and within the Service</li>
                  <li>Updating the "Last updated" date at the top of these Terms</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Continued use of the Service after changes become effective constitutes your acceptance of the modified Terms. If you do not agree to the changes, you must stop using the Service and cancel your account.
                </p>
              </section>

              {/* General Provisions */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">General Provisions</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Entire Agreement</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Deal Shield regarding the Service and supersede all prior agreements.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Severability</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Waiver</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term. Our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Assignment</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  You may not assign or transfer these Terms or your account without our prior written consent. We may assign or transfer these Terms at any time without restriction.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Force Majeure</h3>
                <p className="text-gray-700 leading-relaxed">
                  Deal Shield shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, war, terrorism, riots, strikes, natural disasters, or internet/telecommunications failures.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-800 mb-2"><strong>Email:</strong> legal@dealshield.com</p>
                  <p className="text-gray-800 mb-2"><strong>Support:</strong> support@dealshield.com</p>
                  <p className="text-gray-800"><strong>Mail:</strong> Deal Shield Inc., Legal Department, [Address]</p>
                </div>
              </section>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to get started?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Start your 7-day free trial today - no credit card required
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
            {/* Logo & Tagline */}
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

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/#verification" className="text-gray-400 hover:text-white transition-colors">Document Verification</Link></li>
                <li><Link href="/#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Legal */}
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