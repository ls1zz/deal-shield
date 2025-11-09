'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Category = 'automotive' | 'aviation' | 'fine_art' | 'bullion' | 'cryptocurrency' | 'luxury_watches' | 'wine_spirits' | 'gemstones' | 'real_estate' | 'general'

interface FormData {
  category: Category
  // Universal fields
  sellerName?: string
  sellerCompany?: string
  sellerCountry?: string
  sellerContactInfo?: string
  buyerName?: string
  buyerCompany?: string
  buyerCountry?: string
  intermediaryName?: string
  intermediaryCompany?: string
  transactionValue?: string
  transactionCurrency?: string
  
  // Automotive specific
  vin?: string
  chassisNumber?: string
  engineNumber?: string
  make?: string
  model?: string
  year?: string
  registrationNumber?: string
  
  // Aviation specific
  tailNumber?: string
  aircraftSerialNumber?: string
  aircraftManufacturer?: string
  aircraftModel?: string
  totalTimeInService?: string
  lastInspectionDate?: string
  
  // Fine Art specific
  artworkTitle?: string
  artistName?: string
  creationYear?: string
  medium?: string
  dimensions?: string
  catalogueRaisonne?: string
  
  // Bullion specific
  bullionType?: string
  weight?: string
  purity?: string
  serialNumbers?: string
  refiner?: string
  certificateNumber?: string
  
  // Cryptocurrency specific
  cryptoType?: string
  walletAddress?: string
  transactionHash?: string
  blockchain?: string
  tokenAmount?: string
  
  // Luxury Watches specific
  watchBrand?: string
  watchModel?: string
  watchSerialNumber?: string
  watchReferenceNumber?: string
  watchYear?: string
  
  // Wine & Spirits specific
  producer?: string
  vintage?: string
  bottleSize?: string
  caseCount?: string
  storageProvenance?: string
  
  // Gemstones specific
  gemType?: string
  caratWeight?: string
  certification?: string
  certificationNumber?: string
  
  // Real Estate specific
  propertyAddress?: string
  propertyType?: string
  landRegistryNumber?: string
  
  // Additional information
  additionalInfo?: string
}

export default function AnalyzePage() {
  const [step, setStep] = useState<'category' | 'form' | 'results'>('category')
  const [formData, setFormData] = useState<FormData>({ category: 'general' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<any>(null)
  const [reportsRemaining, setReportsRemaining] = useState<number | null>(null)
  const router = useRouter()

  // Load user profile and calculate remaining reports
  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/sign-in')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
        if (data.subscription_tier === 'enterprise') {
          setReportsRemaining(null) // Unlimited
        } else {
          setReportsRemaining(data.reports_limit - data.reports_count)
        }
      }
    }
    loadProfile()
  }, [router])

  const categories = [
    { id: 'automotive', name: 'Collectible Automotive', description: 'Classic cars, supercars, vintage vehicles' },
    { id: 'aviation', name: 'Aviation', description: 'Aircraft, helicopters, jets' },
    { id: 'fine_art', name: 'Fine Art', description: 'Paintings, sculptures, art pieces' },
    { id: 'bullion', name: 'Bullion', description: 'Gold, silver, platinum, precious metals' },
    { id: 'cryptocurrency', name: 'Cryptocurrency', description: 'Bitcoin, Ethereum, digital assets' },
    { id: 'luxury_watches', name: 'Luxury Watches', description: 'High-end timepieces, collectible watches' },
    { id: 'wine_spirits', name: 'Wine & Spirits', description: 'Fine wine, rare spirits, collectible bottles' },
    { id: 'gemstones', name: 'Gemstones & Jewelry', description: 'Diamonds, precious stones, fine jewelry' },
    { id: 'real_estate', name: 'Luxury Real Estate', description: 'High-value properties, estates' },
    { id: 'general', name: 'General / Other', description: 'Other luxury assets or mixed deals' }
  ]

  const handleCategorySelect = (categoryId: Category) => {
    setFormData({ ...formData, category: categoryId })
    setStep('form')
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          category: formData.category,
          formData: formData 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 403) {
          setError(data.message || 'Report limit reached. Please upgrade your plan.')
        } else if (response.status === 401) {
          setError('Please sign in to continue.')
          router.push('/sign-in')
        } else {
          setError(data.error || 'Investigation failed')
        }
        return
      }

      setResult(data)
      setStep('results')
      
      // Update remaining reports count
      if (profile?.subscription_tier !== 'enterprise') {
        setReportsRemaining(prev => prev ? prev - 1 : 0)
      }
    } catch (err) {
      setError('Network error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNewInvestigation = () => {
    setFormData({ category: 'general' })
    setStep('category')
    setResult(null)
    setError('')
  }

  const isUnlimited = profile?.subscription_tier === 'enterprise'
  const isLowOnReports = !isUnlimited && reportsRemaining !== null && reportsRemaining <= 2
  const isOutOfReports = !isUnlimited && reportsRemaining === 0

  const renderFormFields = () => {
    const { category } = formData

    return (
      <div className="space-y-8">
        {/* Universal Transaction Details */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Value</label>
              <input
                type="text"
                value={formData.transactionValue || ''}
                onChange={(e) => handleInputChange('transactionValue', e.target.value)}
                placeholder="e.g., $5,000,000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <input
                type="text"
                value={formData.transactionCurrency || ''}
                onChange={(e) => handleInputChange('transactionCurrency', e.target.value)}
                placeholder="e.g., USD, EUR, GBP"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Seller Information */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Name</label>
              <input
                type="text"
                value={formData.sellerName || ''}
                onChange={(e) => handleInputChange('sellerName', e.target.value)}
                placeholder="Full name or entity name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Company (if applicable)</label>
              <input
                type="text"
                value={formData.sellerCompany || ''}
                onChange={(e) => handleInputChange('sellerCompany', e.target.value)}
                placeholder="Company or entity name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Country</label>
              <input
                type="text"
                value={formData.sellerCountry || ''}
                onChange={(e) => handleInputChange('sellerCountry', e.target.value)}
                placeholder="Country of residence/registration"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seller Contact Info</label>
              <input
                type="text"
                value={formData.sellerContactInfo || ''}
                onChange={(e) => handleInputChange('sellerContactInfo', e.target.value)}
                placeholder="Email, phone, or address"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Buyer Information */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Buyer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Name</label>
              <input
                type="text"
                value={formData.buyerName || ''}
                onChange={(e) => handleInputChange('buyerName', e.target.value)}
                placeholder="Full name or entity name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Company (if applicable)</label>
              <input
                type="text"
                value={formData.buyerCompany || ''}
                onChange={(e) => handleInputChange('buyerCompany', e.target.value)}
                placeholder="Company or entity name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buyer Country</label>
              <input
                type="text"
                value={formData.buyerCountry || ''}
                onChange={(e) => handleInputChange('buyerCountry', e.target.value)}
                placeholder="Country of residence/registration"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Intermediary Information */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Intermediary/Broker Information <span className="text-sm text-gray-500 font-normal">(Optional)</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intermediary Name</label>
              <input
                type="text"
                value={formData.intermediaryName || ''}
                onChange={(e) => handleInputChange('intermediaryName', e.target.value)}
                placeholder="Broker or intermediary name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Intermediary Company</label>
              <input
                type="text"
                value={formData.intermediaryCompany || ''}
                onChange={(e) => handleInputChange('intermediaryCompany', e.target.value)}
                placeholder="Brokerage or firm name"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Category-Specific Fields */}
        {category === 'automotive' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">VIN (Vehicle Identification Number)</label>
                <input
                  type="text"
                  value={formData.vin || ''}
                  onChange={(e) => handleInputChange('vin', e.target.value)}
                  placeholder="17-character VIN"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Chassis Number</label>
                <input
                  type="text"
                  value={formData.chassisNumber || ''}
                  onChange={(e) => handleInputChange('chassisNumber', e.target.value)}
                  placeholder="Chassis number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Engine Number</label>
                <input
                  type="text"
                  value={formData.engineNumber || ''}
                  onChange={(e) => handleInputChange('engineNumber', e.target.value)}
                  placeholder="Engine number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                <input
                  type="text"
                  value={formData.make || ''}
                  onChange={(e) => handleInputChange('make', e.target.value)}
                  placeholder="e.g., Ferrari, Porsche, Aston Martin"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={formData.model || ''}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="e.g., F40, 911 Turbo, DB5"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year || ''}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="Manufacturing year"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                <input
                  type="text"
                  value={formData.registrationNumber || ''}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  placeholder="License plate / registration"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'aviation' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aircraft Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tail Number / Registration</label>
                <input
                  type="text"
                  value={formData.tailNumber || ''}
                  onChange={(e) => handleInputChange('tailNumber', e.target.value)}
                  placeholder="e.g., N123AB"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                <input
                  type="text"
                  value={formData.aircraftSerialNumber || ''}
                  onChange={(e) => handleInputChange('aircraftSerialNumber', e.target.value)}
                  placeholder="Manufacturer serial number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                <input
                  type="text"
                  value={formData.aircraftManufacturer || ''}
                  onChange={(e) => handleInputChange('aircraftManufacturer', e.target.value)}
                  placeholder="e.g., Gulfstream, Bombardier, Cessna"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={formData.aircraftModel || ''}
                  onChange={(e) => handleInputChange('aircraftModel', e.target.value)}
                  placeholder="e.g., G650, Global 7500"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Time in Service (Hours)</label>
                <input
                  type="text"
                  value={formData.totalTimeInService || ''}
                  onChange={(e) => handleInputChange('totalTimeInService', e.target.value)}
                  placeholder="Total flight hours"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Inspection Date</label>
                <input
                  type="text"
                  value={formData.lastInspectionDate || ''}
                  onChange={(e) => handleInputChange('lastInspectionDate', e.target.value)}
                  placeholder="Date of last inspection"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'fine_art' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Artwork Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artwork Title</label>
                <input
                  type="text"
                  value={formData.artworkTitle || ''}
                  onChange={(e) => handleInputChange('artworkTitle', e.target.value)}
                  placeholder="Title of the artwork"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Artist Name</label>
                <input
                  type="text"
                  value={formData.artistName || ''}
                  onChange={(e) => handleInputChange('artistName', e.target.value)}
                  placeholder="Full name of artist"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Creation Year</label>
                <input
                  type="text"
                  value={formData.creationYear || ''}
                  onChange={(e) => handleInputChange('creationYear', e.target.value)}
                  placeholder="Year created"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
                <input
                  type="text"
                  value={formData.medium || ''}
                  onChange={(e) => handleInputChange('medium', e.target.value)}
                  placeholder="e.g., Oil on canvas, Bronze sculpture"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                <input
                  type="text"
                  value={formData.dimensions || ''}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                  placeholder="e.g., 100 x 80 cm"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catalogue Raisonné Number</label>
                <input
                  type="text"
                  value={formData.catalogueRaisonne || ''}
                  onChange={(e) => handleInputChange('catalogueRaisonne', e.target.value)}
                  placeholder="Catalogue reference if known"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'bullion' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bullion Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bullion Type</label>
                <input
                  type="text"
                  value={formData.bullionType || ''}
                  onChange={(e) => handleInputChange('bullionType', e.target.value)}
                  placeholder="e.g., Gold bars, Silver coins, Platinum"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  placeholder="e.g., 1 kg, 100 oz"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purity</label>
                <input
                  type="text"
                  value={formData.purity || ''}
                  onChange={(e) => handleInputChange('purity', e.target.value)}
                  placeholder="e.g., 999.9, 24K"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Numbers</label>
                <input
                  type="text"
                  value={formData.serialNumbers || ''}
                  onChange={(e) => handleInputChange('serialNumbers', e.target.value)}
                  placeholder="Bar or coin serial numbers"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Refiner / Mint</label>
                <input
                  type="text"
                  value={formData.refiner || ''}
                  onChange={(e) => handleInputChange('refiner', e.target.value)}
                  placeholder="e.g., PAMP Suisse, Royal Mint"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                <input
                  type="text"
                  value={formData.certificateNumber || ''}
                  onChange={(e) => handleInputChange('certificateNumber', e.target.value)}
                  placeholder="Assay certificate number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'cryptocurrency' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cryptocurrency Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency Type</label>
                <input
                  type="text"
                  value={formData.cryptoType || ''}
                  onChange={(e) => handleInputChange('cryptoType', e.target.value)}
                  placeholder="e.g., Bitcoin, Ethereum, USDT"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blockchain</label>
                <input
                  type="text"
                  value={formData.blockchain || ''}
                  onChange={(e) => handleInputChange('blockchain', e.target.value)}
                  placeholder="e.g., Bitcoin, Ethereum, BSC"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Wallet Address</label>
                <input
                  type="text"
                  value={formData.walletAddress || ''}
                  onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                  placeholder="Wallet address (public)"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Hash (if applicable)</label>
                <input
                  type="text"
                  value={formData.transactionHash || ''}
                  onChange={(e) => handleInputChange('transactionHash', e.target.value)}
                  placeholder="Transaction hash for verification"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token Amount</label>
                <input
                  type="text"
                  value={formData.tokenAmount || ''}
                  onChange={(e) => handleInputChange('tokenAmount', e.target.value)}
                  placeholder="Amount being transacted"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'luxury_watches' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Watch Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.watchBrand || ''}
                  onChange={(e) => handleInputChange('watchBrand', e.target.value)}
                  placeholder="e.g., Rolex, Patek Philippe, Audemars Piguet"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={formData.watchModel || ''}
                  onChange={(e) => handleInputChange('watchModel', e.target.value)}
                  placeholder="e.g., Submariner, Nautilus, Royal Oak"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
                <input
                  type="text"
                  value={formData.watchReferenceNumber || ''}
                  onChange={(e) => handleInputChange('watchReferenceNumber', e.target.value)}
                  placeholder="e.g., 116610LN"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                <input
                  type="text"
                  value={formData.watchSerialNumber || ''}
                  onChange={(e) => handleInputChange('watchSerialNumber', e.target.value)}
                  placeholder="Watch serial number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Manufacture</label>
                <input
                  type="text"
                  value={formData.watchYear || ''}
                  onChange={(e) => handleInputChange('watchYear', e.target.value)}
                  placeholder="Production year"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'wine_spirits' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wine & Spirits Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Producer / Château</label>
                <input
                  type="text"
                  value={formData.producer || ''}
                  onChange={(e) => handleInputChange('producer', e.target.value)}
                  placeholder="e.g., Château Lafite Rothschild, Macallan"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vintage</label>
                <input
                  type="text"
                  value={formData.vintage || ''}
                  onChange={(e) => handleInputChange('vintage', e.target.value)}
                  placeholder="e.g., 1982, 2005"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bottle Size</label>
                <input
                  type="text"
                  value={formData.bottleSize || ''}
                  onChange={(e) => handleInputChange('bottleSize', e.target.value)}
                  placeholder="e.g., 750ml, Magnum, Jeroboam"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Count / Quantity</label>
                <input
                  type="text"
                  value={formData.caseCount || ''}
                  onChange={(e) => handleInputChange('caseCount', e.target.value)}
                  placeholder="Number of bottles or cases"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage Provenance</label>
                <input
                  type="text"
                  value={formData.storageProvenance || ''}
                  onChange={(e) => handleInputChange('storageProvenance', e.target.value)}
                  placeholder="e.g., Temperature-controlled cellar, professional storage"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'gemstones' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gemstone Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gemstone Type</label>
                <input
                  type="text"
                  value={formData.gemType || ''}
                  onChange={(e) => handleInputChange('gemType', e.target.value)}
                  placeholder="e.g., Diamond, Ruby, Sapphire, Emerald"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Carat Weight</label>
                <input
                  type="text"
                  value={formData.caratWeight || ''}
                  onChange={(e) => handleInputChange('caratWeight', e.target.value)}
                  placeholder="Weight in carats"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certification Lab</label>
                <input
                  type="text"
                  value={formData.certification || ''}
                  onChange={(e) => handleInputChange('certification', e.target.value)}
                  placeholder="e.g., GIA, AGS, IGI"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Number</label>
                <input
                  type="text"
                  value={formData.certificationNumber || ''}
                  onChange={(e) => handleInputChange('certificationNumber', e.target.value)}
                  placeholder="Lab certificate number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {category === 'real_estate' && (
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
                <input
                  type="text"
                  value={formData.propertyAddress || ''}
                  onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                  placeholder="Full property address"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <input
                  type="text"
                  value={formData.propertyType || ''}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  placeholder="e.g., Estate, Villa, Penthouse"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Land Registry / Title Number</label>
                <input
                  type="text"
                  value={formData.landRegistryNumber || ''}
                  onChange={(e) => handleInputChange('landRegistryNumber', e.target.value)}
                  placeholder="Official registry number"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Additional Information - Always shown */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 shadow-inner">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <textarea
            value={formData.additionalInfo || ''}
            onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
            placeholder="Provide any additional context, concerns, or specific areas you want investigated. Include provenance history, documentation available, known issues, previous ownership, etc."
            className="w-full h-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#635BFF] focus:border-transparent resize-none"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Premium Header */}
      <header className="absolute top-0 w-full backdrop-blur-md bg-transparent z-50 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/dashboard" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 flex items-center justify-center transform transition group-hover:scale-105">
                <img src="/dealshield-logo.png" alt="Deal Shield" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-[17px] font-semibold text-gray-900 tracking-tight">Deal Shield</span>
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

      {/* Main Content with Gradient Background */}
      <main className="relative">
        {/* Light Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-purple-50 via-pink-50 to-indigo-50" />
        
        {/* Winding Snake Gradient */}
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[5%] left-[10%] w-[50%] h-[15%] bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-transparent rounded-full blur-3xl transform rotate-12" />
          <div className="absolute top-[40%] right-[5%] w-[55%] h-[15%] bg-gradient-to-l from-purple-400/40 via-pink-400/40 to-transparent rounded-full blur-3xl transform -rotate-6" />
          <div className="absolute top-[75%] left-[5%] w-[60%] h-[15%] bg-gradient-to-r from-pink-400/40 via-indigo-400/40 to-transparent rounded-full blur-3xl transform rotate-3" />
        </div>

        <div className="relative pt-32 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
          {/* Usage Display */}
          {profile && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isOutOfReports 
                ? 'bg-red-50 border-red-200' 
                : isLowOnReports 
                ? 'bg-amber-50 border-amber-200' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {isUnlimited ? (
                      'Unlimited Reports (Enterprise Plan)'
                    ) : (
                      <>Reports Remaining: <strong className="text-[#635BFF]">{reportsRemaining} of {profile.reports_limit}</strong></>
                    )}
                  </p>
                  {isLowOnReports && !isOutOfReports && (
                    <p className="text-sm text-amber-700 mt-1">You're running low on reports this month</p>
                  )}
                  {isOutOfReports && (
                    <p className="text-sm text-red-700 mt-1">You've reached your monthly limit</p>
                  )}
                </div>
                {(isLowOnReports || isOutOfReports) && (
                  <Link
                    href="/pricing"
                    className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                      isOutOfReports
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {isOutOfReports ? 'Upgrade Now' : 'Upgrade Plan'}
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-900 mb-1">Investigation Failed</h3>
                  <p className="text-sm text-red-700">{error}</p>
                  {error.includes('limit reached') && (
                    <Link
                      href="/pricing"
                      className="inline-block mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                    >
                      View Upgrade Options
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Category Selection */}
          {step === 'category' && (
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Asset Category</h2>
              <p className="text-gray-600 mb-6">
                Choose the type of asset or transaction you want to investigate
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id as Category)}
                    disabled={isOutOfReports}
                    className="p-4 bg-white/50 backdrop-blur-sm border-2 border-purple-100/50 rounded-lg hover:border-[#635BFF] hover:shadow-xl transition text-left disabled:opacity-50 disabled:cursor-not-allowed shadow-inner hover:scale-105"
                  >
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-gray-600">{cat.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Form */}
          {step === 'form' && (
            <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Due Diligence Form</h2>
                  <p className="text-sm text-gray-600">
                    Category: <span className="font-medium text-[#635BFF]">
                      {categories.find(c => c.id === formData.category)?.name}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setStep('category')}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Change Category
                </button>
              </div>

              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Fill out as many fields as possible for the most comprehensive report. All fields are optional.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {renderFormFields()}

                <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setStep('category')}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || isOutOfReports}
                    className="px-6 py-2.5 bg-[#635BFF] text-white rounded-lg hover:bg-[#5349E6] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Investigating...
                      </span>
                    ) : isOutOfReports ? (
                      'Upgrade Required'
                    ) : (
                      'Start Investigation'
                    )}
                  </button>
                </div>
              </form>

              {loading && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900 font-medium mb-1">Investigation in progress</p>
                  <p className="text-sm text-blue-700">
                    Conducting comprehensive due diligence. This may take 30-90 seconds.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Results Display */}
          {step === 'results' && result && (
            <div className="space-y-6">
              {/* Risk Score */}
              <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Investigation Complete</h2>
                  <button
                    onClick={handleNewInvestigation}
                    className="px-4 py-2 text-[#635BFF] hover:bg-gray-50 rounded-lg transition font-medium border border-[#635BFF] text-sm"
                  >
                    New Investigation
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Risk Score Gauge */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-gray-200 bg-gray-50">
                      <div className="text-4xl font-bold text-gray-900">{result.risk_score}</div>
                    </div>
                    <div className="mt-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Executive Summary</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{result.executive_summary}</p>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              {result.verification_status && (
                <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-3xl font-bold text-[#635BFF]">{result.verification_status.companies_checked}</div>
                      <div className="text-xs text-gray-600 mt-2">Companies Checked</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-3xl font-bold text-[#635BFF]">{result.verification_status.individuals_checked}</div>
                      <div className="text-xs text-gray-600 mt-2">Individuals Checked</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-3xl font-bold text-[#635BFF]">{result.verification_status.assets_verified}</div>
                      <div className="text-xs text-gray-600 mt-2">Assets Verified</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Red Flags */}
              {result.red_flags && result.red_flags.length > 0 && (
                <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Red Flags Identified</h3>
                  <div className="space-y-3">
                    {result.red_flags.map((flag: any, index: number) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        flag.severity === 'CRITICAL' ? 'bg-red-50 border-red-500' :
                        flag.severity === 'HIGH' ? 'bg-orange-50 border-orange-500' :
                        flag.severity === 'MEDIUM' ? 'bg-yellow-50 border-yellow-500' :
                        'bg-blue-50 border-blue-500'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            flag.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                            flag.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                            flag.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {flag.severity} • {flag.category}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900 mb-1 text-sm">{flag.description}</p>
                        <p className="text-sm text-gray-600">Evidence: {flag.evidence}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Party Backgrounds */}
              {result.party_backgrounds && result.party_backgrounds.length > 0 && (
                <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Party Backgrounds</h3>
                  <div className="space-y-4">
                    {result.party_backgrounds.map((party: any, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{party.name}</h4>
                          <span className="px-2 py-1 bg-[#635BFF] text-white text-xs rounded font-medium">
                            {party.type} • {party.country}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{party.findings}</p>
                        <div className="text-xs text-gray-500">
                          Sources: {party.sources.join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-purple-100/50 shadow-inner p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#635BFF] mr-2 font-bold">•</span>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Back to Dashboard
                </Link>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium border border-gray-300 text-sm"
                >
                  Export PDF
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