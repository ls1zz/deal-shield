import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Last updated: November 4, 2025
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Deal Shield, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our confidential due diligence platform. We are committed to protecting your sensitive business information with bank-grade security measures.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our platform is designed specifically for high-value transactions where confidentiality is paramount. We understand that the information you process through Deal Shield is highly sensitive, and we have built our entire infrastructure around protecting it.
                </p>
              </section>

              {/* Information We Collect */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Account Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you create a Deal Shield account, we collect:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Name and email address</li>
                  <li>Company name and business information</li>
                  <li>Billing and payment information (processed securely through Stripe)</li>
                  <li>Account credentials (passwords are encrypted and never stored in plain text)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Investigation Data</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you use our investigation platform, we temporarily process:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Deal information and documents you upload</li>
                  <li>Entity names, addresses, and identifiers you input</li>
                  <li>Verification requests and document analysis data</li>
                  <li>Risk reports and investigation results</li>
                </ul>
                <div className="bg-purple-50 border-l-4 border-[#635BFF] p-4 rounded-r-lg my-6">
                  <p className="text-gray-800 font-medium">
                    🔒 <strong>Important:</strong> All investigation data is automatically deleted after 72 hours. You can also manually delete any investigation at any time from your dashboard.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Information</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect limited usage data to improve our service:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Login and access times</li>
                  <li>Feature usage patterns (which tools you use most)</li>
                  <li>Browser type and device information</li>
                  <li>IP address (for security and fraud prevention)</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use your information solely to provide and improve our service:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Service Delivery:</strong> To process your due diligence investigations, verify documents, and generate risk reports</li>
                  <li><strong>Account Management:</strong> To maintain your account, process payments, and provide customer support</li>
                  <li><strong>Security:</strong> To detect and prevent fraud, unauthorized access, and other security threats</li>
                  <li><strong>Communication:</strong> To send essential service updates, security alerts, and billing notifications</li>
                  <li><strong>Product Improvement:</strong> To analyze aggregated, anonymized usage patterns to enhance our platform</li>
                </ul>
              </section>

              {/* Data Security */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We implement enterprise-grade security measures to protect your information:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Encryption</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li><strong>Data at Rest:</strong> All stored data is encrypted using 256-bit AES encryption</li>
                  <li><strong>Data in Transit:</strong> All communications use TLS 1.3 encryption</li>
                  <li><strong>Database Encryption:</strong> Your investigation data is encrypted at the database level</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Infrastructure Security</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>SOC 2 Type II certified infrastructure</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Isolated data storage with strict access controls</li>
                  <li>Multi-factor authentication for all accounts</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Automatic Data Deletion</h3>
                <p className="text-gray-700 leading-relaxed">
                  To minimize risk exposure, all investigation data (uploaded documents, analysis results, and risk reports) is automatically and permanently deleted after 72 hours. This ensures that sensitive deal information doesn't remain in our systems longer than necessary.
                </p>
              </section>

              {/* Data Sharing */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Disclosure</h2>
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-r-lg my-6">
                  <p className="text-gray-800 font-medium">
                    ✓ <strong>We do not sell, rent, or share your data with third parties for marketing purposes.</strong>
                  </p>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We only share information in these limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Service Providers:</strong> We use trusted vendors (Supabase for database, Stripe for payments, Vercel for hosting) who are contractually obligated to protect your data</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or legal process</li>
                  <li><strong>Business Transfer:</strong> If Deal Shield is acquired or merged, your information may be transferred to the new entity</li>
                  <li><strong>With Your Consent:</strong> We may share information with your explicit permission</li>
                </ul>
              </section>

              {/* Data Retention */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We practice strict data minimization:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Investigation Data:</strong> Automatically deleted after 72 hours (or immediately upon manual deletion)</li>
                  <li><strong>Account Information:</strong> Retained while your account is active and for 30 days after account closure</li>
                  <li><strong>Billing Records:</strong> Retained for 7 years for tax and accounting purposes</li>
                  <li><strong>Usage Logs:</strong> Retained for 90 days for security and troubleshooting</li>
                </ul>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Export:</strong> Download your data in a portable format</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications (we send minimal marketing)</li>
                  <li><strong>Restrict Processing:</strong> Request that we limit how we process your data</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise these rights, contact us at privacy@dealshield.com
                </p>
              </section>

              {/* Compliance */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">GDPR (European Users)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For users in the European Economic Area, we comply with the General Data Protection Regulation:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                  <li>Legal basis for processing: Contract performance and legitimate business interests</li>
                  <li>Data controller: Deal Shield Inc.</li>
                  <li>Right to lodge complaints with your supervisory authority</li>
                  <li>Data transfer safeguards: Standard Contractual Clauses</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">CCPA (California Users)</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For California residents, we comply with the California Consumer Privacy Act:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>We do not sell personal information</li>
                  <li>Right to know what personal information we collect</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of data sales (not applicable as we don't sell data)</li>
                  <li>Right to non-discrimination for exercising privacy rights</li>
                </ul>
              </section>

              {/* Cookies */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use minimal cookies and tracking technologies:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
                  <li><strong>Analytics:</strong> We use first-party analytics only (no Google Analytics or third-party trackers)</li>
                  <li><strong>No Advertising:</strong> We do not use advertising cookies or track you across websites</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You can control cookies through your browser settings, but disabling essential cookies may impact functionality.
                </p>
              </section>

              {/* International Transfers */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                  Deal Shield is based in the United States. If you access our service from outside the US, your information may be transferred to, stored, and processed in the United States. We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses approved by the European Commission.
                </p>
              </section>

              {/* Children's Privacy */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Deal Shield is a B2B service not intended for individuals under 18 years of age. We do not knowingly collect information from children. If we become aware that we have collected information from someone under 18, we will promptly delete it.
                </p>
              </section>

              {/* Changes to Policy */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes by email and by posting a notice on our platform. Continued use of Deal Shield after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or how we handle your information, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-800 mb-2"><strong>Email:</strong> privacy@dealshield.com</p>
                  <p className="text-gray-800 mb-2"><strong>Data Protection Officer:</strong> dpo@dealshield.com</p>
                  <p className="text-gray-800"><strong>Mail:</strong> Deal Shield Inc., Privacy Department, [Address]</p>
                </div>
              </section>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to protect your deals?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join professionals who trust Deal Shield for confidential due diligence
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-3 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium"
              >
                Get Started Free
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