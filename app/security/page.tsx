import Image from 'next/image';
import Link from 'next/link';
import { Shield, Lock, Database, FileCheck, AlertTriangle, CheckCircle, Server, Key } from 'lucide-react';

export default function SecurityPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#635BFF]/10 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-[#635BFF]" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Enterprise-Grade Security
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bank-grade encryption and infrastructure designed to protect your most sensitive deal information
            </p>
          </div>

          {/* Security Commitment */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Security Commitment</h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              At Deal Shield, security isn't an afterthought—it's the foundation of everything we do. We understand that you're trusting us with highly confidential transaction data worth millions of dollars. That's why we've built our platform with the same security standards used by financial institutions and government agencies.
            </p>
          </div>

          {/* Key Security Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Encryption */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">256-bit AES Encryption</h3>
              <p className="text-gray-600 leading-relaxed">
                All data is encrypted at rest using military-grade 256-bit AES encryption. Data in transit uses TLS 1.3 protocol, ensuring end-to-end protection.
              </p>
            </div>

            {/* Auto-Delete */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">72-Hour Auto-Delete</h3>
              <p className="text-gray-600 leading-relaxed">
                Investigation data is automatically and permanently deleted after 72 hours, minimizing exposure. You can also delete anytime manually.
              </p>
            </div>

            {/* SOC 2 */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">SOC 2 Type II Certified</h3>
              <p className="text-gray-600 leading-relaxed">
                Our infrastructure meets the highest standards for security, availability, and confidentiality as verified by independent auditors.
              </p>
            </div>

            {/* Isolated Storage */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Isolated Data Storage</h3>
              <p className="text-gray-600 leading-relaxed">
                Each customer's data is logically isolated with strict access controls. No cross-customer data access is possible.
              </p>
            </div>

            {/* Zero Trust */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Key className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Trust Architecture</h3>
              <p className="text-gray-600 leading-relaxed">
                Multi-factor authentication required for all accounts. Role-based access controls and principle of least privilege enforced throughout.
              </p>
            </div>

            {/* Penetration Testing */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all hover:scale-105">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regular Security Audits</h3>
              <p className="text-gray-600 leading-relaxed">
                Quarterly penetration testing by third-party security firms. Continuous vulnerability scanning and monitoring.
              </p>
            </div>
          </div>

          {/* Detailed Security Sections */}
          <div className="space-y-12">
            {/* Data Protection */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Protection</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Lock className="w-5 h-5 text-[#635BFF] mr-2" />
                    Encryption Standards
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Data at Rest</h4>
                      <p className="text-gray-700 mb-3">All stored data uses 256-bit AES encryption (same as banks):</p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Uploaded documents encrypted in database</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Investigation results encrypted</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Passwords hashed with bcrypt (never plain text)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Encryption keys stored in secure vault</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Data in Transit</h4>
                      <p className="text-gray-700 mb-3">All communications use TLS 1.3 encryption:</p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Browser to server: HTTPS only (no HTTP)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>API communications encrypted</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Database connections encrypted</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-emerald-600 mr-2">✓</span>
                          <span>Perfect Forward Secrecy (PFS) enabled</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-[#635BFF] mr-2" />
                    Automatic Data Deletion
                  </h3>
                  <div className="bg-purple-50 border-l-4 border-[#635BFF] p-6 rounded-r-lg">
                    <p className="text-gray-800 leading-relaxed mb-4">
                      <strong className="text-gray-900">Why 72 hours?</strong> We believe in data minimization. The less time sensitive data exists in any system, the lower the risk. Most due diligence decisions happen within 48-72 hours, so we automatically purge all investigation data after this window.
                    </p>
                    <p className="text-gray-800 leading-relaxed">
                      <strong className="text-gray-900">Manual deletion:</strong> Need data removed immediately? Use the "Delete" button on any investigation in your dashboard for instant, permanent deletion.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Database className="w-5 h-5 text-[#635BFF] mr-2" />
                    Data Isolation
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Every customer's data is logically isolated within our database:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>Row-level security policies enforce data segregation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>No cross-customer queries possible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>Separate encryption keys per customer</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>Database-level access controls enforced</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infrastructure Security */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Infrastructure Security</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Cloud Infrastructure</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Deal Shield runs on enterprise-grade cloud infrastructure with industry-leading security:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Hosting: Vercel</h4>
                        <p className="text-sm text-gray-600">SOC 2 Type II certified, DDoS protection, global CDN</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Database: Supabase</h4>
                        <p className="text-sm text-gray-600">SOC 2 Type II certified, automatic backups, encryption</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Payments: Stripe</h4>
                        <p className="text-sm text-gray-600">PCI DSS Level 1 certified, we never see card data</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Monitoring: 24/7</h4>
                        <p className="text-sm text-gray-600">Real-time alerting, automated incident response</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Security</h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-[#635BFF] mr-3 mt-1">▸</span>
                        <span><strong>Firewalls:</strong> Multi-layer firewalls protect against unauthorized access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#635BFF] mr-3 mt-1">▸</span>
                        <span><strong>DDoS Protection:</strong> Automatic detection and mitigation of distributed attacks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#635BFF] mr-3 mt-1">▸</span>
                        <span><strong>Rate Limiting:</strong> API rate limits prevent abuse and ensure availability</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#635BFF] mr-3 mt-1">▸</span>
                        <span><strong>IP Whitelisting:</strong> Available for Enterprise customers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Backup & Disaster Recovery</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    While we automatically delete investigation data after 72 hours, we maintain robust backup systems for account and configuration data:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>Automated daily backups with 30-day retention</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>Geo-redundant storage across multiple regions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>Tested disaster recovery procedures (RTO: 4 hours, RPO: 1 hour)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-600 mr-2 mt-1">✓</span>
                      <span>High availability architecture with 99.9% uptime SLA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Access Control */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Access Control & Authentication</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Factor Authentication (MFA)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    MFA is required for all Deal Shield accounts, providing an additional layer of security beyond passwords:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">Supported Methods</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Authenticator apps (recommended)</li>
                        <li>• SMS verification codes</li>
                        <li>• Email verification codes</li>
                        <li>• Hardware security keys</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h4 className="font-semibold text-gray-900 mb-2">When MFA is Required</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Login from new device</li>
                        <li>• Password changes</li>
                        <li>• Account settings updates</li>
                        <li>• Every 30 days (session refresh)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Password Security</h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-3 mt-1">✓</span>
                        <span><strong>Bcrypt Hashing:</strong> Passwords hashed using industry-standard bcrypt with salt</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-3 mt-1">✓</span>
                        <span><strong>Never Stored in Plain Text:</strong> We can never see your actual password</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-3 mt-1">✓</span>
                        <span><strong>Strong Password Requirements:</strong> Minimum 12 characters, mix of letters, numbers, symbols</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-3 mt-1">✓</span>
                        <span><strong>Breach Detection:</strong> Passwords checked against known breach databases</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Session Management</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Sessions expire after 7 days of inactivity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Concurrent session limits to prevent account sharing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Ability to view and revoke active sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Automatic logout on suspicious activity</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Compliance & Auditing */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Compliance & Auditing</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications & Standards</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                      <div className="flex items-center mb-3">
                        <Shield className="w-6 h-6 text-[#635BFF] mr-2" />
                        <h4 className="font-bold text-gray-900">SOC 2 Type II</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Independently audited and certified for security, availability, confidentiality, and privacy. Reports available to Enterprise customers under NDA.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-6 h-6 text-emerald-600 mr-2" />
                        <h4 className="font-bold text-gray-900">GDPR Compliant</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Full compliance with European data protection regulations. Data processing agreements available. User rights fully supported.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-center mb-3">
                        <Lock className="w-6 h-6 text-indigo-600 mr-2" />
                        <h4 className="font-bold text-gray-900">CCPA Compliant</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        California Consumer Privacy Act compliant. We don't sell personal information. Full transparency on data usage.
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                      <div className="flex items-center mb-3">
                        <FileCheck className="w-6 h-6 text-pink-600 mr-2" />
                        <h4 className="font-bold text-gray-900">ISO 27001 Ready</h4>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Infrastructure and processes aligned with ISO 27001 information security standards. Certification in progress.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Audits & Testing</h3>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Penetration Testing</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Quarterly external pentests by certified firms</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Annual internal security assessments</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Continuous vulnerability scanning</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Bug bounty program for researchers</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Code Security</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Static code analysis on every commit</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Dependency vulnerability scanning</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Peer code reviews required</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-emerald-600 mr-2">✓</span>
                            <span>Security training for all engineers</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Audit Logging</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Comprehensive audit trails for security monitoring and compliance:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>All user authentication events logged (login, logout, failed attempts)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Data access and modification tracked with timestamps</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>API calls logged with request details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Logs retained for 90 days (longer for Enterprise)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#635BFF] mr-2 mt-1">▸</span>
                      <span>Immutable audit logs (tamper-proof)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Incident Response */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Incident Response</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  While we work hard to prevent security incidents, we're prepared to respond quickly and effectively if one occurs:
                </p>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Incident Response Process</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Detection & Assessment</h4>
                        <p className="text-sm text-gray-700">24/7 monitoring systems alert our team within minutes. Immediate impact assessment begins.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Containment</h4>
                        <p className="text-sm text-gray-700">Isolate affected systems to prevent spread. Preserve evidence for investigation.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Customer Notification</h4>
                        <p className="text-sm text-gray-700">Affected customers notified within 24 hours with clear details and recommended actions.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Remediation & Recovery</h4>
                        <p className="text-sm text-gray-700">Fix vulnerabilities, restore services, and implement additional safeguards.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#635BFF] rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                        5
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Post-Incident Review</h4>
                        <p className="text-sm text-gray-700">Comprehensive analysis to prevent future occurrences. Update security procedures.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Contact for Security Issues</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      If you discover a security vulnerability or have security concerns:
                    </p>
                    <p className="text-gray-900 font-medium">security@dealshield.com</p>
                    <p className="text-sm text-gray-600 mt-2">Our security team monitors this 24/7 and responds within 1 hour.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Bug Bounty Program</h4>
                    <p className="text-sm text-gray-700 mb-3">
                      Responsible disclosure program for security researchers:
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Cash rewards for valid vulnerabilities</li>
                      <li>• Public acknowledgment (if desired)</li>
                      <li>• Safe harbor for good-faith research</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Employee Access */}
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Employee Access & Training</h2>
              
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Human error is often the weakest link in security. We address this through strict access controls and continuous training:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Controls</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Principle of least privilege enforced</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Role-based access control (RBAC)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Just-in-time access provisioning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Quarterly access reviews and audits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">✓</span>
                        <span>Automatic access revocation on departure</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Training</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">✓</span>
                        <span>Security training during onboarding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">✓</span>
                        <span>Quarterly security awareness updates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">✓</span>
                        <span>Phishing simulation testing</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">✓</span>
                        <span>Secure coding practices for engineers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-600 mr-2">✓</span>
                        <span>NDAs and security agreements signed</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-[#635BFF] p-6 rounded-r-lg">
                  <p className="text-gray-800 leading-relaxed">
                    <strong>Customer Data Access:</strong> Deal Shield employees have NO access to your investigation data or uploaded documents. Our systems are designed so that customer data is encrypted and inaccessible to our team, even for debugging purposes. Only automated systems process your data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Questions CTA */}
          <div className="mt-16">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Have Security Questions?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our security team is here to help. We're happy to provide additional documentation, answer questions about our security practices, or discuss custom security requirements for Enterprise customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:security@dealshield.com"
                  className="inline-block px-6 py-3 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium"
                >
                  Contact Security Team
                </a>
                <Link
                  href="/signup"
                  className="inline-block px-6 py-3 bg-white text-[#635BFF] rounded-lg border-2 border-[#635BFF] hover:bg-purple-50 transition-all hover:scale-105 font-medium"
                >
                  Start Free Trial
                </Link>
              </div>
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