'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$199',
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID!,
    reports: '10 reports/month',
    features: [
      '10 due diligence reports per month',
      'Automated risk assessment',
      'Access to 9 global registries',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '$599',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID!,
    reports: '50 reports/month',
    features: [
      '50 due diligence reports per month',
      'Automated risk assessment',
      'Access to 9 global registries',
      'Priority email support',
      'Advanced analytics',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$1,999',
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID!,
    reports: 'Unlimited reports',
    features: [
      'Unlimited due diligence reports',
      'Automated risk assessment',
      'Access to 9 global registries',
      'Priority phone & email support',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, planName: string) => {
    setLoading(planName);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
        setLoading(null);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Premium Header */}
      <header className="fixed top-0 w-full backdrop-blur-md bg-white/95 z-50 border-b border-gray-200/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] sm:h-[72px]">
            <Link href="/" className="flex items-center group">
              <img 
                src="/dealshield-logo.png" 
                alt="Shield Your Deal" 
                className="w-8 h-8 sm:w-9 sm:h-9 transform transition group-hover:scale-105"
              />
            </Link>
            
            <Link
              href="/"
              className="px-3 sm:px-4 py-2 text-[14px] sm:text-[15px] text-gray-700 hover:text-gray-900 transition font-medium rounded-lg hover:bg-gray-50"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content with Unified Gradient */}
      <main className="relative pt-[64px] sm:pt-[72px]">
        {/* Light Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 via-pink-50 to-indigo-50" />
        
        {/* Winding Snake Gradient */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          {/* Top curve */}
          <div className="absolute top-[5%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-12" />
          
          {/* Middle curve */}
          <div className="absolute top-[40%] right-[5%] w-[55%] h-[15%] bg-gradient-to-l from-purple-400/40 via-pink-400/40 to-transparent rounded-full blur-3xl transform -rotate-6" />
          
          {/* Bottom curve */}
          <div className="absolute top-[75%] left-[5%] w-[60%] h-[15%] bg-gradient-to-r from-pink-400/40 via-indigo-400/40 to-transparent rounded-full blur-3xl transform rotate-3" />
        </div>

        <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Free Trial Banner */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center bg-[#635BFF] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg mb-4 sm:mb-6 animate-pulse">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-[13px] sm:text-[15px]">7-Day Free Trial • No Charges Until Trial Ends</span>
              </div>
            </div>

            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-[36px] sm:text-[44px] lg:text-[52px] font-bold text-gray-900 mb-3 sm:mb-4 tracking-[-0.02em] px-4">
                Choose Your Plan
              </h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-gray-600 max-w-[700px] mx-auto leading-relaxed mb-3 px-4">
                Try any plan free for 7 days — start securing your deals today
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[13px] sm:text-[14px] text-gray-600 px-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-[#635BFF] mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Bank-grade encryption</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-[#635BFF] mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">100% confidential</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-[#635BFF] mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">SOC 2 compliant</span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 max-w-[1100px] mx-auto mb-8 sm:mb-12">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative bg-white/85 backdrop-blur-sm rounded-3xl shadow-inner flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                    plan.popular ? 'border-2 border-indigo-200 lg:scale-105' : 'border border-indigo-100'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#635BFF] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className={`p-6 sm:p-8 flex-1 flex flex-col ${plan.popular ? 'bg-gradient-to-br from-[#635BFF] to-purple-600 rounded-3xl' : ''}`}>
                    <div>
                      <h3 className={`text-[16px] sm:text-[17px] font-semibold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        {plan.name}
                      </h3>
                      <div className="mt-4">
                        <div className="flex items-baseline">
                          <span className={`text-[40px] sm:text-[48px] font-bold tracking-tight ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                            $0
                          </span>
                          <span className={`ml-2 text-[15px] sm:text-[17px] ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                            for 7 days
                          </span>
                        </div>
                        <div className="flex items-baseline mt-1">
                          <span className={`text-[20px] sm:text-[24px] font-semibold ${plan.popular ? 'text-white/80' : 'text-gray-700'}`}>
                            {plan.price}
                          </span>
                          <span className={`ml-1 text-[14px] sm:text-[15px] ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>
                            /month after trial
                          </span>
                        </div>
                      </div>
                      <p className={`mt-2 text-[13px] sm:text-[14px] font-medium ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                        {plan.reports}
                      </p>
                    </div>

                    <ul className="mt-6 sm:mt-8 space-y-3 flex-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-[14px] sm:text-[15px]">
                          <svg
                            className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-blue-200' : 'text-[#635BFF]'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(plan.priceId, plan.name)}
                      disabled={loading !== null}
                      className={`w-full py-3 sm:py-4 text-center rounded-xl transition-all font-semibold text-[15px] sm:text-[16px] mt-6 sm:mt-8 ${
                        loading === plan.name
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : plan.popular
                          ? 'bg-white text-[#635BFF] hover:bg-gray-50 shadow-lg hover:scale-105'
                          : 'bg-gray-900 text-white hover:bg-gray-800 hover:scale-105'
                      }`}
                    >
                      {loading === plan.name ? 'Loading...' : 'Start 7-Day Free Trial'}
                    </button>
                    <p className={`text-[12px] sm:text-[13px] text-center mt-3 font-medium ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      Free for 7 days • Cancel anytime • No commitment
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust & Process Section */}
            <div className="text-center max-w-3xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm border border-indigo-200 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 px-4 sm:px-8 py-5 sm:py-6 border-b border-indigo-100">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#635BFF] mr-2 sm:mr-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-bold text-gray-900 text-[18px] sm:text-[22px] tracking-[-0.01em]">100% Risk-Free Trial</h3>
                  </div>
                  <p className="text-[14px] sm:text-[16px] text-gray-600 leading-relaxed max-w-xl mx-auto px-4">
                    Try Shield Your Deal for 7 days with full access. Cancel anytime—no charges if you cancel during trial.
                  </p>
                </div>

                {/* Steps Section */}
                <div className="px-4 sm:px-8 py-6 sm:py-8">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="flex items-start space-x-3 bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-indigo-50/50 transition">
                      <svg className="w-5 h-5 text-[#635BFF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
                          Click <span className="font-semibold text-gray-900">"Start 7-Day Free Trial"</span> on your preferred plan
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-indigo-50/50 transition">
                      <svg className="w-5 h-5 text-[#635BFF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
                          Enter payment details via <span className="font-semibold text-gray-900">Stripe</span> (won't be charged for 7 days)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-indigo-50/50 transition">
                      <svg className="w-5 h-5 text-[#635BFF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
                          Create your <span className="font-semibold text-gray-900">Shield Your Deal account</span> after checkout
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 bg-gray-50 rounded-xl p-3 sm:p-4 hover:bg-indigo-50/50 transition">
                      <svg className="w-5 h-5 text-[#635BFF] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-left">
                        <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
                          Start using <span className="font-semibold text-gray-900">all features immediately</span> with full access
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 px-4 sm:px-8 py-4 sm:py-5 border-t border-indigo-100">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-[13px] sm:text-[14px] text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-[#635BFF] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Secure payment by Stripe</span>
                    </div>
                    <span className="hidden sm:inline mx-2 text-gray-400">•</span>
                    <span>Cancel anytime with one click</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-gray-400 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/dealshield-logo.png" 
                  alt="Shield Your Deal" 
                  className="w-6 h-6 sm:w-7 sm:h-7"
                />
                <span className="text-[15px] sm:text-[16px] font-semibold text-white">Shield Your Deal</span>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed">
                Confidential due diligence for luxury transactions.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-3 sm:mb-4 text-[13px] sm:text-[14px]">Product</h5>
              <ul className="space-y-2 sm:space-y-3 text-[13px] sm:text-[14px]">
                <li><a href="/#features" className="hover:text-white transition">Features</a></li>
                <li><a href="/#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="/#how-it-works" className="hover:text-white transition">How it works</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3 sm:mb-4 text-[13px] sm:text-[14px]">Company</h5>
              <ul className="space-y-2 sm:space-y-3 text-[13px] sm:text-[14px]">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-semibold mb-3 sm:mb-4 text-[13px] sm:text-[14px]">Legal</h5>
              <ul className="space-y-2 sm:space-y-3 text-[13px] sm:text-[14px]">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-[12px] sm:text-[13px] text-gray-500">
            <p>&copy; 2025 Shield Your Deal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}