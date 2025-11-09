'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Category = 'automotive' | 'aviation' | 'fine_art' | 'bullion' | 'cryptocurrency' | 'luxury_watches' | 'wine_spirits' | 'gemstones' | 'real_estate' | 'general'

interface FormData {
  category: Category
  [key: string]: any
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const [step, setStep] = useState<'category' | 'form' | 'results'>('category')
  const [formData, setFormData] = useState<FormData>({ category: 'general' })
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['transaction', 'seller']))
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<any>(null)
  const [reportData, setReportData] = useState<any>(null)
  const router = useRouter()
  const reportId = params.id

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/sign-in')
        return
      }

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }

      // Load existing report if it exists
      const { data: report } = await supabase
        .from('reports')
        .select('*')
        .eq('id', reportId)
        .eq('user_id', user.id)
        .single()

      if (report) {
        setReportData(report)
        
        // If report already has results, show them
        if (report.full_report) {
          setResult(report.full_report)
          setStep('results')
        } else if (report.category) {
          // If category was set, show form
          setFormData({ category: report.category, ...report.form_data })
          setStep('form')
        }
      }
    }
    loadData()
  }, [router, reportId])

  const categories = [
    { id: 'automotive', name: 'Collectible Automotive', icon: '🏎️', description: 'Classic cars, supercars, vintage vehicles' },
    { id: 'aviation', name: 'Aviation', icon: '✈️', description: 'Aircraft, helicopters, jets' },
    { id: 'fine_art', name: 'Fine Art', icon: '🎨', description: 'Paintings, sculptures, art pieces' },
    { id: 'bullion', name: 'Bullion', icon: '🪙', description: 'Gold, silver, platinum, precious metals' },
    { id: 'cryptocurrency', name: 'Cryptocurrency', icon: '₿', description: 'Bitcoin, Ethereum, digital assets' },
    { id: 'luxury_watches', name: 'Luxury Watches', icon: '⌚', description: 'High-end timepieces, collectible watches' },
    { id: 'wine_spirits', name: 'Wine & Spirits', icon: '🍷', description: 'Fine wine, rare spirits, collectible bottles' },
    { id: 'gemstones', name: 'Gemstones & Jewelry', icon: '💎', description: 'Diamonds, precious stones, fine jewelry' },
    { id: 'real_estate', name: 'Luxury Real Estate', icon: '🏛️', description: 'High-value properties, estates' },
    { id: 'general', name: 'General / Other', icon: '📋', description: 'Other luxury assets or mixed deals' }
  ]

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const handleCategorySelect = async (categoryId: Category) => {
    setFormData({ category: categoryId })
    setStep('form')
    setExpandedSections(new Set(['transaction', 'seller', 'asset']))
    
    // Save category to database
    const supabase = createClient()
    await supabase
      .from('reports')
      .update({ category: categoryId })
      .eq('id', reportId)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          category: formData.category,
          formData: formData,
          reportId: reportId
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Investigation failed')
        return
      }

      setResult(data)
      setStep('results')
    } catch (err) {
      setError('Network error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const FormSection = ({ title, icon, sectionId, children }: { title: string, icon: string, sectionId: string, children: React.ReactNode }) => {
    const isExpanded = expandedSections.has(sectionId)
    
    return (
      <div className="bg-white/90 rounded-2xl border-2 border-indigo-200 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection(sectionId)}
          className="w-full p-6 flex items-center justify-between hover:bg-indigo-50/50 transition"
        >
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-[18px] font-bold text-gray-900">{title}</h3>
          </div>
          <svg 
            className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <div className="p-6 pt-0 border-t border-indigo-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {children}
            </div>
          </div>
        )}
      </div>
    )
  }

  const InputField = ({ label, field, placeholder, fullWidth = false, textarea = false }: { 
    label: string
    field: string
    placeholder: string
    fullWidth?: boolean
    textarea?: boolean
  }) => (
    <div className={fullWidth ? 'md:col-span-2' : ''}>
      <label className="block text-[13px] font-semibold text-gray-700 mb-2">{label}</label>
      {textarea ? (
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-[14px] resize-none h-24"
        />
      ) : (
        <input
          type="text"
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent text-[14px]"
        />
      )}
    </div>
  )

  const renderCategoryForm = () => {
    const { category } = formData

    return (
      <div className="space-y-4">
        {/* Transaction Details */}
        <FormSection title="Transaction Details" icon="📄" sectionId="transaction">
          <InputField label="Transaction Value" field="transactionValue" placeholder="e.g., $5,000,000" />
          <InputField label="Currency" field="transactionCurrency" placeholder="USD, EUR, GBP, etc." />
          <InputField label="Transaction Date" field="transactionDate" placeholder="Proposed or actual date" />
          <InputField label="Payment Method" field="paymentMethod" placeholder="Wire, crypto, escrow, etc." />
          <InputField label="Escrow Arrangement" field="escrowArrangement" placeholder="Escrow provider details" fullWidth />
        </FormSection>

        {/* Seller Information */}
        <FormSection title="Seller Information" icon="👤" sectionId="seller">
          <InputField label="Seller Name" field="sellerName" placeholder="Full name or entity" />
          <InputField label="Seller Company" field="sellerCompany" placeholder="Company name if applicable" />
          <InputField label="Seller Country" field="sellerCountry" placeholder="Country of residence/registration" />
          <InputField label="Seller Contact" field="sellerContact" placeholder="Email, phone, address" />
          <InputField label="Tax ID / Registration Number" field="sellerTaxId" placeholder="Tax ID, VAT, company number" />
          <InputField label="How Seller Acquired Asset" field="sellerAcquisitionMethod" placeholder="Purchase, inheritance, gift, etc." />
        </FormSection>

        {/* Buyer Information */}
        <FormSection title="Buyer Information" icon="🤝" sectionId="buyer">
          <InputField label="Buyer Name" field="buyerName" placeholder="Full name or entity" />
          <InputField label="Buyer Company" field="buyerCompany" placeholder="Company name if applicable" />
          <InputField label="Buyer Country" field="buyerCountry" placeholder="Country of residence/registration" />
          <InputField label="Source of Funds" field="buyerSourceOfFunds" placeholder="Where funds coming from" fullWidth />
        </FormSection>

        {/* Category-Specific Fields */}
        {category === 'automotive' && (
          <>
            <FormSection title="Vehicle Identity" icon="🔢" sectionId="auto_identity">
              <InputField label="VIN" field="vin" placeholder="17-character VIN" />
              <InputField label="Chassis Number" field="chassisNumber" placeholder="Chassis number" />
              <InputField label="Engine Number" field="engineNumber" placeholder="Engine number" />
              <InputField label="Make" field="make" placeholder="Ferrari, Porsche, etc." />
              <InputField label="Model" field="model" placeholder="F40, 911, etc." />
              <InputField label="Year" field="year" placeholder="Manufacturing year" />
            </FormSection>

            <FormSection title="Vehicle History" icon="📋" sectionId="auto_history">
              <InputField label="Registration Number" field="registrationNumber" placeholder="License plate" />
              <InputField label="Mileage" field="mileage" placeholder="Current odometer reading" />
              <InputField label="Numbers Matching" field="numbersMatching" placeholder="Engine, trans, diff matching?" />
              <InputField label="Service History" field="serviceHistory" placeholder="Complete service records" fullWidth textarea />
              <InputField label="Accident History" field="accidentHistory" placeholder="Any accidents or damage" fullWidth />
            </FormSection>
          </>
        )}

        {category === 'aviation' && (
          <>
            <FormSection title="Aircraft Identity" icon="✈️" sectionId="aviation_identity">
              <InputField label="Tail Number" field="tailNumber" placeholder="e.g., N123AB" />
              <InputField label="Serial Number" field="aircraftSerialNumber" placeholder="Manufacturer serial" />
              <InputField label="Manufacturer" field="aircraftManufacturer" placeholder="Gulfstream, Bombardier, etc." />
              <InputField label="Model" field="aircraftModel" placeholder="G650, Global 7500, etc." />
            </FormSection>

            <FormSection title="Aircraft History" icon="📊" sectionId="aviation_history">
              <InputField label="Total Time in Service" field="totalTimeInService" placeholder="Total flight hours" />
              <InputField label="Total Cycles" field="totalCycles" placeholder="Pressurization cycles" />
              <InputField label="Last Inspection" field="lastAnnualInspection" placeholder="Date of last inspection" />
              <InputField label="Accident History" field="ntsbReports" placeholder="Any NTSB reports" fullWidth />
            </FormSection>
          </>
        )}

        {category === 'fine_art' && (
          <>
            <FormSection title="Artwork Identity" icon="🎨" sectionId="art_identity">
              <InputField label="Artwork Title" field="artworkTitle" placeholder="Title of the work" />
              <InputField label="Artist Name" field="artistName" placeholder="Full name of artist" />
              <InputField label="Creation Year" field="creationYear" placeholder="Year created" />
              <InputField label="Medium" field="medium" placeholder="Oil on canvas, bronze, etc." />
              <InputField label="Dimensions" field="dimensions" placeholder="Height x Width x Depth" />
            </FormSection>

            <FormSection title="Provenance" icon="📚" sectionId="art_provenance">
              <InputField label="Exhibition History" field="exhibitionHistory" placeholder="Gallery and museum exhibitions" fullWidth textarea />
              <InputField label="Nazi-Era Provenance" field="naziEraProvenance" placeholder="Complete WWII-era research" fullWidth textarea />
              <InputField label="Art Loss Register" field="artLossRegister" placeholder="ALR search conducted?" />
            </FormSection>
          </>
        )}

        {category === 'bullion' && (
          <FormSection title="Bullion Details" icon="🪙" sectionId="bullion">
            <InputField label="Type" field="bullionType" placeholder="Gold, silver, platinum" />
            <InputField label="Weight" field="weight" placeholder="Troy ounces, grams" />
            <InputField label="Purity" field="purity" placeholder="999.9, 24K, etc." />
            <InputField label="Serial Numbers" field="serialNumbers" placeholder="All serial numbers" fullWidth />
            <InputField label="Refiner" field="refiner" placeholder="PAMP, Perth Mint, etc." />
            <InputField label="Assay Certificate" field="assayCertificate" placeholder="Certificate details" fullWidth />
          </FormSection>
        )}

        {category === 'cryptocurrency' && (
          <FormSection title="Cryptocurrency Details" icon="₿" sectionId="crypto">
            <InputField label="Type" field="cryptoType" placeholder="Bitcoin, Ethereum, etc." />
            <InputField label="Blockchain" field="blockchain" placeholder="Bitcoin, Ethereum, BSC" />
            <InputField label="Amount" field="tokenAmount" placeholder="Amount being transacted" />
            <InputField label="Wallet Address" field="walletAddress" placeholder="Public wallet address" fullWidth />
            <InputField label="Transaction Hash" field="transactionHash" placeholder="Tx hash for verification" fullWidth />
          </FormSection>
        )}

        {category === 'luxury_watches' && (
          <FormSection title="Watch Details" icon="⌚" sectionId="watch">
            <InputField label="Brand" field="watchBrand" placeholder="Rolex, Patek Philippe, etc." />
            <InputField label="Model" field="watchModel" placeholder="Submariner, Nautilus, etc." />
            <InputField label="Reference Number" field="watchReferenceNumber" placeholder="e.g., 116610LN" />
            <InputField label="Serial Number" field="watchSerialNumber" placeholder="Watch serial number" />
            <InputField label="Year" field="watchYear" placeholder="Production year" />
            <InputField label="Box & Papers" field="watchPapers" placeholder="Complete set?" />
          </FormSection>
        )}

        {category === 'wine_spirits' && (
          <FormSection title="Wine & Spirits Details" icon="🍷" sectionId="wine">
            <InputField label="Producer" field="producer" placeholder="Château, distillery" />
            <InputField label="Vintage" field="vintage" placeholder="Year" />
            <InputField label="Bottle Size" field="bottleSize" placeholder="750ml, Magnum, etc." />
            <InputField label="Case Count" field="caseCount" placeholder="Number of bottles" />
            <InputField label="Storage Provenance" field="storageProvenance" placeholder="Storage history" fullWidth textarea />
          </FormSection>
        )}

        {category === 'gemstones' && (
          <FormSection title="Gemstone Details" icon="💎" sectionId="gem">
            <InputField label="Type" field="gemType" placeholder="Diamond, ruby, sapphire" />
            <InputField label="Carat Weight" field="caratWeight" placeholder="Weight in carats" />
            <InputField label="Certification Lab" field="certification" placeholder="GIA, AGS, IGI" />
            <InputField label="Certificate Number" field="certificationNumber" placeholder="Lab certificate number" />
            <InputField label="Natural vs Lab-Grown" field="naturalVsLabGrown" placeholder="Natural or lab-created" />
          </FormSection>
        )}

        {category === 'real_estate' && (
          <FormSection title="Property Details" icon="🏛️" sectionId="property">
            <InputField label="Address" field="propertyAddress" placeholder="Full property address" fullWidth />
            <InputField label="Type" field="propertyType" placeholder="Estate, villa, penthouse" />
            <InputField label="Land Registry Number" field="landRegistryNumber" placeholder="Official registry number" />
            <InputField label="Title Search" field="titleSearch" placeholder="Title search results" fullWidth textarea />
          </FormSection>
        )}

        {/* Additional Information */}
        <FormSection title="Additional Information" icon="📝" sectionId="additional">
          <InputField 
            label="Red Flags or Concerns" 
            field="redFlags" 
            placeholder="List any concerns or areas requiring extra investigation" 
            fullWidth 
            textarea 
          />
          <InputField 
            label="Additional Context" 
            field="additionalInfo" 
            placeholder="Any other relevant information" 
            fullWidth 
            textarea 
          />
        </FormSection>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 w-full backdrop-blur-md bg-transparent z-50 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/dashboard" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-[#635BFF] rounded-lg flex items-center justify-center transform transition group-hover:scale-105">
                <span className="text-white font-semibold text-base">DS</span>
              </div>
              <span className="text-[17px] font-semibold text-gray-900 tracking-tight">DealShield</span>
            </Link>
            
            <Link
              href="/dashboard"
              className="px-4 py-2 text-[15px] text-gray-700 hover:text-gray-900 transition font-medium rounded-lg hover:bg-white/50"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 via-pink-50 to-indigo-50" />
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[5%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-12" />
          <div className="absolute top-[40%] right-[5%] w-[55%] h-[15%] bg-gradient-to-l from-purple-400/40 via-pink-400/40 to-transparent rounded-full blur-3xl transform -rotate-6" />
          <div className="absolute top-[75%] left-[5%] w-[60%] h-[15%] bg-gradient-to-r from-pink-400/40 via-indigo-400/40 to-transparent rounded-full blur-3xl transform rotate-3" />
        </div>

        <div className="relative pt-32 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Error Display */}
            {error && (
              <div className="mb-6 p-6 bg-red-50/90 backdrop-blur-sm border-2 border-red-300 rounded-2xl shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-red-500 text-3xl mr-4">⚠️</div>
                  <div className="flex-1">
                    <h3 className="text-[16px] font-bold text-red-900 mb-2">Investigation Failed</h3>
                    <p className="text-[15px] text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Category Selection */}
            {step === 'category' && (
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-200 p-8">
                <h2 className="text-[32px] font-bold text-gray-900 mb-3 tracking-[-0.01em]">
                  Select Asset Category
                </h2>
                <p className="text-[16px] text-gray-600 mb-8 leading-relaxed">
                  Choose the type of asset or transaction you want to investigate.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id as Category)}
                      className="p-6 bg-gradient-to-br from-white to-indigo-50 border-2 border-indigo-200 rounded-2xl hover:border-[#635BFF] hover:shadow-xl transition-all group text-left"
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                      <h3 className="text-[18px] font-bold text-gray-900 mb-2">{cat.name}</h3>
                      <p className="text-[14px] text-gray-600">{cat.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Form */}
            {step === 'form' && (
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[32px] font-bold text-gray-900 mb-2 tracking-[-0.01em]">
                      Due Diligence Form
                    </h2>
                    <p className="text-[16px] text-gray-600">
                      Category: <span className="font-semibold text-[#635BFF]">
                        {categories.find(c => c.id === formData.category)?.name}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => setStep('category')}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-[15px]"
                  >
                    ← Change Category
                  </button>
                </div>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-[14px] text-blue-900">
                    <strong>💡 Tip:</strong> Fill out as many fields as possible for the most comprehensive report. All fields are optional.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const allSections = new Set([
                        'transaction', 'seller', 'buyer', 'auto_identity', 'auto_history',
                        'aviation_identity', 'aviation_history', 'art_identity', 'art_provenance',
                        'bullion', 'crypto', 'watch', 'wine', 'gem', 'property', 'additional'
                      ])
                      setExpandedSections(allSections)
                    }}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-[13px] font-semibold hover:bg-blue-700 transition"
                  >
                    Expand All Sections
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  {renderCategoryForm()}

                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('category')}
                      className="px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold text-[15px]"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-4 bg-[#635BFF] text-white rounded-xl hover:bg-[#5851EA] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:scale-105 text-[16px]"
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Investigating...
                        </span>
                      ) : (
                        'Start Investigation'
                      )}
                    </button>
                  </div>
                </form>

                {loading && (
                  <div className="mt-8 p-6 bg-blue-50/90 backdrop-blur-sm rounded-2xl border border-blue-200">
                    <p className="text-[15px] text-blue-900 mb-2 font-semibold">
                      🔍 Investigation in progress...
                    </p>
                    <p className="text-[14px] text-blue-700">
                      Conducting comprehensive due diligence across global registries and databases. This may take 60-120 seconds.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Results */}
            {step === 'results' && result && (
              <div className="space-y-6">
                <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-200 p-8">
                  <h2 className="text-[32px] font-bold text-gray-900 mb-8 tracking-[-0.01em]">Investigation Complete</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Risk Score */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-indigo-200 relative bg-white/50">
                        <div className="text-[56px] font-bold text-gray-900">{result.risk_score}</div>
                      </div>
                      <div className="mt-6">
                        <span className={`inline-block px-6 py-3 rounded-full text-[15px] font-bold ${
                          result.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                          result.risk_level === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                          result.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {result.risk_level} RISK
                        </span>
                      </div>
                    </div>

                    {/* Executive Summary */}
                    <div>
                      <h3 className="text-[22px] font-bold text-gray-900 mb-4">Executive Summary</h3>
                      <p className="text-[16px] text-gray-700 leading-relaxed">{result.executive_summary}</p>
                    </div>
                  </div>
                </div>

                {/* Red Flags */}
                {result.red_flags && result.red_flags.length > 0 && (
                  <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-200 p-8">
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">🚩 Red Flags</h3>
                    <div className="space-y-4">
                      {result.red_flags.map((flag: any, index: number) => (
                        <div key={index} className={`p-5 rounded-2xl border-l-4 ${
                          flag.severity === 'CRITICAL' ? 'bg-red-50 border-red-500' :
                          flag.severity === 'HIGH' ? 'bg-orange-50 border-orange-500' :
                          flag.severity === 'MEDIUM' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}>
                          <p className="font-semibold text-gray-900 mb-2">{flag.description}</p>
                          <p className="text-[14px] text-gray-600">Evidence: {flag.evidence}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Party Backgrounds */}
                {result.party_backgrounds && result.party_backgrounds.length > 0 && (
                  <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-200 p-8">
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">Party Backgrounds</h3>
                    <div className="space-y-5">
                      {result.party_backgrounds.map((party: any, index: number) => (
                        <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl">
                          <h4 className="font-bold text-gray-900 text-[18px] mb-3">{party.name}</h4>
                          <p className="text-[15px] text-gray-700 leading-relaxed">{party.findings}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="bg-white/85 backdrop-blur-sm rounded-3xl shadow-lg border border-indigo-200 p-8">
                    <h3 className="text-[22px] font-bold text-gray-900 mb-6">✅ Recommendations</h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#635BFF] mr-3 text-[20px] font-bold">•</span>
                          <span className="text-[15px] text-gray-700 leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-semibold text-[15px]"
                  >
                    ← Back to Dashboard
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition font-semibold border border-indigo-200"
                  >
                    📄 Export PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}