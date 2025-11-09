import Image from 'next/image';
import Link from 'next/link';
import { Target, Eye, Shield, TrendingUp, Users, Zap } from 'lucide-react';

export default function AboutPage() {
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
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Making High-Value Deals
              <br />
              <span className="text-[#635BFF]">Safe and Transparent</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deal Shield was built to solve a critical problem in luxury transactions: the lack of fast, confidential, and comprehensive due diligence tools for brokers and investors.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#635BFF]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To prevent fraud and build trust in high-value transactions by providing instant, confidential due diligence that empowers dealmakers to close with confidence.
              </p>
            </div>

            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                A world where every luxury transaction—from private jets to real estate—is protected by intelligent, automated fraud detection and verification.
              </p>
            </div>
          </div>

          {/* The Story */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why We Built Deal Shield</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                The luxury transaction market operates differently than typical business. Deals worth millions happen quickly, often between parties who've never met. A yacht broker in Miami connects a seller in Monaco with a buyer in Dubai. A business acquisition moves forward based on emailed documents and wire instructions. Trust is everything—and so is speed.
              </p>
              <p>
                But this speed comes with risk. Traditional due diligence takes days or weeks, involving multiple expensive consultants. By the time red flags surface, deals have often fallen apart or, worse, money has changed hands based on fraudulent documents.
              </p>
              <p>
                We saw a clear gap: <strong className="text-gray-900">dealmakers needed professional-grade fraud prevention that worked at deal speed</strong>—investigations measured in minutes, not days, without sacrificing thoroughness or confidentiality.
              </p>
              <div className="bg-purple-50 border-l-4 border-[#635BFF] p-6 rounded-r-lg my-8">
                <p className="text-gray-800 font-medium">
                  Deal Shield combines AI-powered analysis with access to 9 global registries to deliver comprehensive fraud detection in under 60 seconds—completely confidential, with automatic data deletion after 72 hours.
                </p>
              </div>
              <p>
                Today, brokers, investors, and dealmakers across luxury goods, real estate, and business acquisitions use Deal Shield to verify counterparties, authenticate documents, and assess risks before signing or sending funds. We've helped prevent millions in potential fraud while accelerating legitimate deals.
              </p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">By the Numbers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-100/50 shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl font-bold text-[#635BFF] mb-2">9</div>
                <div className="text-gray-900 font-semibold mb-2">Government Registries</div>
                <div className="text-gray-600 text-sm">Searched automatically in every investigation</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100/50 shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl font-bold text-emerald-600 mb-2">60s</div>
                <div className="text-gray-900 font-semibold mb-2">Average Report Time</div>
                <div className="text-gray-600 text-sm">From data input to comprehensive risk report</div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100/50 shadow-lg p-8 text-center hover:shadow-xl transition-all hover:scale-105">
                <div className="text-5xl font-bold text-indigo-600 mb-2">72h</div>
                <div className="text-gray-900 font-semibold mb-2">Auto-Delete Window</div>
                <div className="text-gray-600 text-sm">Maximum time your data stays in our system</div>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#635BFF] rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Speed Without Sacrifice</h3>
                  <p className="text-gray-700">
                    Traditional DD takes 2+ hours per investigation. Deal Shield delivers comprehensive reports in 60 seconds without cutting corners.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Confidentiality First</h3>
                  <p className="text-gray-700">
                    Bank-grade encryption, zero data sharing, and automatic 72-hour deletion. Your deals remain completely confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Comprehensive Coverage</h3>
                  <p className="text-gray-700">
                    We don't just check one database—we search 9 government registries plus verify documents against known fraud patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Built for Dealmakers</h3>
                  <p className="text-gray-700">
                    Designed specifically for luxury goods brokers, real estate investors, and M&A professionals who need fast, reliable verification.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who Uses Deal Shield */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Who Uses Deal Shield</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✈️</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Aviation Brokers</h3>
                <p className="text-sm text-gray-600">
                  Private jet transactions from $500K to $50M+
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⛵</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Yacht Dealers</h3>
                <p className="text-sm text-gray-600">
                  Superyacht sales and brokerage verification
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Real Estate Investors</h3>
                <p className="text-sm text-gray-600">
                  High-value property acquisitions and developments
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">M&A Professionals</h3>
                <p className="text-sm text-gray-600">
                  Business acquisitions and private equity deals
                </p>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Commitment to You</h2>
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Absolute Confidentiality:</strong> Your deals are your business. We will never share, sell, or use your data for anything other than providing our service.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Continuous Improvement:</strong> We're constantly expanding our registry coverage and refining our fraud detection algorithms to stay ahead of evolving threats.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Responsive Support:</strong> When you have questions or need help, our team responds quickly. Your success is our priority.
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="ml-4 text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Transparent Pricing:</strong> No hidden fees, no surprise charges. Clear, straightforward pricing with a risk-free 7-day trial.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Deal Shield Today
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Protect your deals with the same fraud prevention tools trusted by leading brokers and investors worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-block px-8 py-4 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium text-lg"
                >
                  Start Free 7-Day Trial
                </Link>
                <Link
                  href="/#pricing"
                  className="inline-block px-8 py-4 bg-white text-[#635BFF] rounded-lg border-2 border-[#635BFF] hover:bg-purple-50 transition-all hover:scale-105 font-medium text-lg"
                >
                  View Pricing
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required • Full access during trial • Cancel anytime
              </p>
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