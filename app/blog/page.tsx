import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "5 Red Flags in Luxury Yacht Transactions",
      excerpt: "Learn to spot the warning signs that could save you millions when brokering or buying superyachts.",
      category: "Fraud Prevention",
      date: "Nov 1, 2025",
      readTime: "6 min read",
      slug: "red-flags-yacht-transactions"
    },
    {
      id: 2,
      title: "The True Cost of Skipping Due Diligence",
      excerpt: "Real case studies of deals gone wrong—and how proper verification could have prevented disaster.",
      category: "Case Studies",
      date: "Oct 28, 2025",
      readTime: "8 min read",
      slug: "cost-of-skipping-due-diligence"
    },
    {
      id: 3,
      title: "Private Jet Fraud: What Brokers Need to Know",
      excerpt: "The aviation industry faces unique fraud risks. Here's how to protect yourself and your clients.",
      category: "Industry Insights",
      date: "Oct 25, 2025",
      readTime: "7 min read",
      slug: "private-jet-fraud-prevention"
    },
    {
      id: 4,
      title: "Document Verification 101: LOIs, NDAs, and POFs",
      excerpt: "A comprehensive guide to verifying the most common documents in high-value transactions.",
      category: "Best Practices",
      date: "Oct 22, 2025",
      readTime: "10 min read",
      slug: "document-verification-guide"
    },
    {
      id: 5,
      title: "Why 72-Hour Data Retention Matters",
      excerpt: "Understanding the security benefits of automatic data deletion in due diligence platforms.",
      category: "Security",
      date: "Oct 18, 2025",
      readTime: "5 min read",
      slug: "why-72-hour-data-retention"
    },
    {
      id: 6,
      title: "M&A Due Diligence in 60 Seconds",
      excerpt: "How AI and automation are transforming business acquisition verification without sacrificing thoroughness.",
      category: "Technology",
      date: "Oct 15, 2025",
      readTime: "6 min read",
      slug: "ai-ma-due-diligence"
    },
    {
      id: 7,
      title: "Escrow Agent Verification: A Critical Step",
      excerpt: "Don't wire millions without verifying your escrow agent. Here's what to check and how.",
      category: "Best Practices",
      date: "Oct 12, 2025",
      readTime: "5 min read",
      slug: "escrow-agent-verification"
    },
    {
      id: 8,
      title: "Real Estate Wire Fraud: Prevention Strategies",
      excerpt: "Wire fraud in real estate costs billions annually. Learn the tactics scammers use and how to defend against them.",
      category: "Fraud Prevention",
      date: "Oct 8, 2025",
      readTime: "9 min read",
      slug: "real-estate-wire-fraud"
    },
    {
      id: 9,
      title: "International Transaction Risks",
      excerpt: "Cross-border deals introduce unique fraud vectors. Navigate international due diligence with confidence.",
      category: "Industry Insights",
      date: "Oct 5, 2025",
      readTime: "7 min read",
      slug: "international-transaction-risks"
    }
  ];

  const categories = ["All", "Fraud Prevention", "Best Practices", "Case Studies", "Industry Insights", "Security", "Technology"];

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
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">
              Deal Shield Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights on fraud prevention, due diligence best practices, and trends in luxury transactions
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  category === "All"
                    ? "bg-[#635BFF] text-white shadow-md"
                    : "bg-white/85 backdrop-blur-sm text-gray-700 border border-purple-100/50 hover:bg-purple-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg overflow-hidden mb-12 hover:shadow-xl transition-all">
            <div className="md:flex">
              <div className="md:w-2/5 bg-gradient-to-br from-purple-100 to-blue-100 p-12 flex items-center justify-center">
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-[#635BFF] text-white text-xs font-semibold rounded-full mb-4">
                    FEATURED
                  </span>
                  <div className="text-6xl mb-4">🚨</div>
                  <h3 className="text-2xl font-bold text-gray-900">Top Story</h3>
                </div>
              </div>
              <div className="md:w-3/5 p-8">
                <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-4">
                  Fraud Prevention
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  5 Red Flags in Luxury Yacht Transactions
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The superyacht market is notorious for sophisticated fraud schemes. From forged ownership documents to fake escrow agents, understanding these warning signs could save you millions. We break down the most common tactics used by scammers and show you exactly what to look for.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Nov 1, 2025</span>
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  <span>6 min read</span>
                </div>
                <Link
                  href="/blog/red-flags-yacht-transactions"
                  className="inline-flex items-center px-6 py-3 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <div
                key={post.id}
                className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 flex items-center justify-center h-48">
                  <div className="text-center">
                    <div className="text-5xl mb-2">
                      {post.category === "Fraud Prevention" && "🛡️"}
                      {post.category === "Best Practices" && "✅"}
                      {post.category === "Case Studies" && "📊"}
                      {post.category === "Industry Insights" && "🔍"}
                      {post.category === "Security" && "🔒"}
                      {post.category === "Technology" && "⚡"}
                    </div>
                    <span className="inline-block px-3 py-1 bg-white/80 text-gray-700 text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{post.date}</span>
                    <Clock className="w-3 h-3 ml-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#635BFF] font-medium hover:text-[#5349E6] transition-colors"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20">
            <div className="bg-gradient-to-br from-[#635BFF]/10 to-purple-50 rounded-2xl border border-purple-100/50 shadow-lg p-8 sm:p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Stay Informed
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Get the latest fraud prevention insights, due diligence tips, and luxury transaction trends delivered to your inbox monthly.
              </p>
              <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
                <button className="px-6 py-3 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No spam. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20">
            <div className="bg-white/85 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to protect your deals?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Stop reading about fraud—start preventing it with Deal Shield
              </p>
              <Link
                href="/signup"
                className="inline-block px-6 py-3 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition-all hover:scale-105 font-medium"
              >
                Start Free 7-Day Trial
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