import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// NO FILE STORAGE - Everything processed in memory only
// Files are NEVER saved anywhere, ensuring maximum security

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string
    const documentType = formData.get('documentType') as string
    const assetSector = formData.get('assetSector') as string || 'auto-detect' // NEW: Allow user to specify or auto-detect

    if (!file || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Convert file to buffer - ONLY IN MEMORY, never written to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Extract text from document based on file type
    let documentText = ''

    if (file.type === 'application/pdf') {
      documentText = await extractTextFromPDF(buffer)
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      documentText = await extractTextFromDOCX(buffer)
    } else if (file.type.startsWith('image/')) {
      documentText = await extractTextFromImage(buffer)
    }

    // AI Analysis using Claude API with off-market leniency
    const analysis = await analyzeDocument(documentText, documentType, file.name, assetSector)

    // Use detected sector if auto-detect was selected
    const finalSector = assetSector === 'auto-detect' ? analysis.detectedSector : assetSector

    // Save ONLY the analysis results to database (NEVER the document)
    const { data: verification, error: dbError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: documentType,
        document_name: file.name,
        asset_sector: finalSector, // NEW: Store detected/specified sector
        risk_level: analysis.riskLevel,
        risk_score: analysis.riskScore,
        summary: analysis.summary,
        analysis_data: analysis.fullReport,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      throw new Error('Failed to save verification results')
    }

    // Buffer is automatically cleared from memory when function ends
    // No cleanup needed - file was NEVER saved anywhere

    return NextResponse.json({
      success: true,
      verificationId: verification.id,
      detectedSector: analysis.detectedSector,
      sectorConfidence: analysis.sectorConfidence,
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      summary: analysis.summary,
      leniencyApplied: analysis.leniencyContext, // NEW: Show what leniency was applied
      message: 'Document analyzed successfully. File was processed in memory only and never saved.'
    })

  } catch (error) {
    console.error('POF verification error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process document'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}


// Text extraction implementations

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const pdf = require('pdf-parse')
  try {
    const data = await pdf(buffer)
    return data.text
  } catch (error) {
    console.error('PDF extraction error:', error)
    throw new Error('Failed to extract text from PDF')
  }
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const mammoth = require('mammoth')
  try {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  } catch (error) {
    console.error('DOCX extraction error:', error)
    throw new Error('Failed to extract text from DOCX')
  }
}

async function extractTextFromImage(buffer: Buffer): Promise<string> {
  const Tesseract = require('tesseract.js')
  try {
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng')
    return text
  } catch (error) {
    console.error('OCR error:', error)
    throw new Error('Failed to extract text from image')
  }
}

async function analyzeDocument(text: string, documentType: string, fileName: string, assetSector: string): Promise<any> {
  const Anthropic = require('@anthropic-ai/sdk')
  
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })

  const leniencyGuidelines = getAllSectorGuidelines()

  const prompt = `You are a fraud detection expert analyzing a ${documentType} (Proof of Funds) document.

CRITICAL CONTEXT - OFF-MARKET LUXURY ASSET DUE DILIGENCE:

This POF may involve OFF-MARKET luxury asset transactions where specific industry leniency standards apply.

FIRST: DETECT THE ASSET SECTOR from the document content:
- Look for mentions of: art, paintings, sculptures, galleries, auction houses → "fine-art"
- Look for mentions of: watches, timepieces, Rolex, Patek Philippe, grey market → "luxury-watches"  
- Look for mentions of: vehicles, cars, automobiles, supercars, Ferrari, classic cars → "collectible-automotive"
- Look for mentions of: aircraft, jets, aviation, helicopters, planes → "aviation"
- Look for mentions of: cryptocurrency, Bitcoin, Ethereum, digital assets, wallets → "cryptocurrency"
- Look for mentions of: wine, spirits, whisky, bottles, casks, cellars → "wine-spirits"
- Look for mentions of: real estate, property, properties, land, buildings → "luxury-real-estate"
- Look for mentions of: gold, silver, bullion, precious metals, commodities → "bullion"
- Look for mentions of: diamonds, gemstones, jewelry, jewellery → "gemstones-jewelry"
- If unclear or multiple sectors → "general"

SECTOR-SPECIFIC LENIENCY GUIDELINES:
${leniencyGuidelines}

UNIVERSAL PRINCIPLES FOR OFF-MARKET PROOF OF FUNDS:
1. PRIVATE BANKING is common for high-value deals - boutique banks, private wealth managers are NORMAL
2. CONFIDENTIALITY in POF documents is STANDARD - limited details protect account holder
3. OFFSHORE BANKING is LEGITIMATE for international buyers - don't automatically flag jurisdictions
4. CRYPTOCURRENCY PROOF OF FUNDS increasingly common - blockchain verification is valid
5. THIRD-PARTY POF LETTERS (from wealth managers, attorneys) are ACCEPTABLE in many sectors
6. REDACTED ACCOUNT NUMBERS are NORMAL for privacy - full disclosure comes at closing
7. RANGE AMOUNTS (e.g., "$5M - $10M available") are acceptable vs. exact figures

RED FLAGS THAT OVERRIDE ALL LENIENCY (Genuine Fraud Indicators):
❌ Recently opened accounts with large sudden deposits (structuring/layering)
❌ Inconsistent letterhead, fonts, or formatting (forgery)
❌ Unverifiable bank or financial institution
❌ Amounts that don't match stated transaction value
❌ Generic "To Whom It May Concern" letters without transaction specifics
❌ No contact information or verification method provided
❌ Obvious alterations or editing of figures
❌ POF from unrelated third parties with no explained relationship
❌ Expired POF documents (typically valid 30-90 days)
❌ POF with impossible conditions or guarantees

GREEN LIGHTS (Normal for off-market high-value deals):
✅ Boutique private banks or wealth management firms (not just major retail banks)
✅ International banks in financial centers (Switzerland, Singapore, UAE, Hong Kong)
✅ Attorney-issued POF letters with verified bar membership
✅ CPA-certified statements with license verification
✅ Cryptocurrency wallet verification with blockchain proof
✅ Redacted account details with verification hotline provided
✅ Conditional language about fund availability pending due diligence
✅ Third-party escrow or trust arrangements
✅ Letters referencing specific transaction/property/asset
✅ Professional letterhead with verifiable contact information

SECTOR-SPECIFIC POF NORMS:
${getSectorPOFNorms()}

ANALYSIS INSTRUCTIONS:
Analyze this POF document with appropriate sector leniency. Focus on REAL fraud indicators, not just privacy practices.

DO NOT penalize for:
- Private/boutique banks instead of major retail banks
- International jurisdictions (Switzerland, Singapore, UAE, Cayman, etc.)
- Redacted account numbers or limited details
- Third-party letters from attorneys/CPAs/wealth managers
- Cryptocurrency-based proof of funds
- Conditional availability language

DO penalize for:
- Unverifiable institutions
- Recent suspicious account activity patterns
- Document alterations or forgeries
- Amounts insufficient for transaction
- Expired or generic letters

Document filename: ${fileName}

Document text:
${text.slice(0, 50000)} 

Respond ONLY with valid JSON in this exact format:
{
  "detectedSector": "fine-art|luxury-watches|collectible-automotive|aviation|cryptocurrency|wine-spirits|luxury-real-estate|bullion|gemstones-jewelry|general",
  "sectorConfidence": "high|medium|low",
  "riskLevel": "LOW|MEDIUM|HIGH|CRITICAL",
  "riskScore": number between 0-100,
  "summary": "2-3 sentence executive summary acknowledging sector and leniency applied",
  "leniencyContext": {
    "sector": "detected sector name",
    "leniencyApplied": "Description of what leniency standards were applied",
    "normalForSector": ["list", "of", "POF", "practices", "normal", "for", "this", "sector"],
    "privacyJustified": true or false,
    "internationalBankingNormal": true or false
  },
  "fullReport": {
    "bankVerification": {
      "status": "VERIFIED|ACCEPTABLE_WITH_LENIENCY|NEEDS_REVIEW|FAILED",
      "findings": "Detailed findings with context. Note if private/international banking is normal for this sector and transaction size.",
      "leniencyApplied": "Explanation of what banking practices were accepted for this sector",
      "bankType": "major_retail|private_bank|wealth_manager|crypto_exchange|other",
      "jurisdiction": "country or region",
      "verificationMethod": "contact info, website, regulatory lookup, etc.",
      "recommendations": ["Specific action items considering sector norms"]
    },
    "financialCapacity": {
      "status": "ACCEPTABLE|ACCEPTABLE_WITH_CONDITIONS|NEEDS_REVIEW|INSUFFICIENT",
      "findings": "Detailed analysis of stated funds vs. transaction requirements. Note if range amounts or conditional availability is normal.",
      "leniencyApplied": "Explanation of what financial documentation was considered acceptable",
      "fundingSource": "personal_wealth|business_funds|crypto_assets|mixed|unclear",
      "amountSufficiency": "more_than_adequate|adequate|marginal|insufficient",
      "recommendations": ["Specific action items"]
    },
    "documentAuthenticity": {
      "status": "GOOD|ACCEPTABLE_WITH_REDACTIONS|NEEDS_REVIEW|SUSPICIOUS",
      "findings": "Analysis of document legitimacy. Distinguish between normal privacy redactions and suspicious alterations.",
      "leniencyApplied": "Explanation of what redactions/privacy measures were accepted",
      "redactionLevel": "none|minimal|moderate|extensive",
      "redactionJustified": true or false,
      "alterationDetected": true or false,
      "recommendations": ["Specific actions"]
    },
    "offMarketContext": {
      "isHighValueDeal": true or false,
      "privateBankingAppropriate": true or false,
      "internationalTransaction": true or false,
      "thirdPartyPOF": true or false,
      "cryptoFunds": true or false,
      "escrowRecommended": true or false,
      "directBankVerificationRequired": true or false
    },
    "overallRisk": {
      "score": number between 0-100,
      "level": "LOW|MEDIUM|HIGH|CRITICAL",
      "summary": "Overall assessment with off-market context",
      "criticalIssues": ["Severe problems that must be addressed"],
      "warnings": ["Concerns that should be reviewed"],
      "positives": ["Good signs and strong elements"],
      "sectorSpecificNotes": "Additional context about POF practices in this sector"
    }
  }
}`

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{
        role: "user",
        content: prompt
      }]
    })

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text 
      : ''
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = responseText.trim()
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    }
    
    // Try to find JSON object in the text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      jsonText = jsonMatch[0]
    }
    
    // Parse the JSON response
    const analysis = JSON.parse(jsonText)
    return analysis

  } catch (error) {
    console.error('AI analysis error:', error)
    
    // Fallback response if AI fails
    return {
      detectedSector: 'general',
      sectorConfidence: 'low',
      riskLevel: 'MEDIUM',
      riskScore: 50,
      summary: 'Document processed but AI analysis encountered an error. Manual review recommended.',
      leniencyContext: {
        sector: 'general',
        leniencyApplied: 'Unable to apply sector-specific analysis due to error',
        normalForSector: [],
        privacyJustified: false,
        internationalBankingNormal: false
      },
      fullReport: {
        bankVerification: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to complete automated verification. Please review manually.',
          leniencyApplied: 'N/A - Analysis incomplete',
          bankType: 'other',
          jurisdiction: 'unknown',
          verificationMethod: 'manual review required',
          recommendations: ['Verify bank authenticity manually', 'Contact bank directly', 'Check regulatory databases']
        },
        financialCapacity: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to assess financial capacity automatically.',
          leniencyApplied: 'N/A - Analysis incomplete',
          fundingSource: 'unclear',
          amountSufficiency: 'insufficient',
          recommendations: ['Request additional proof', 'Verify account balances', 'Confirm fund availability']
        },
        documentAuthenticity: {
          status: 'NEEDS_REVIEW',
          findings: 'Document structure could not be fully analyzed.',
          leniencyApplied: 'N/A - Analysis incomplete',
          redactionLevel: 'moderate',
          redactionJustified: false,
          alterationDetected: false,
          recommendations: ['Review document for alterations', 'Verify signatures', 'Check document metadata']
        },
        offMarketContext: {
          isHighValueDeal: false,
          privateBankingAppropriate: false,
          internationalTransaction: false,
          thirdPartyPOF: false,
          cryptoFunds: false,
          escrowRecommended: true,
          directBankVerificationRequired: true
        },
        overallRisk: {
          score: 50,
          level: 'MEDIUM',
          summary: 'Analysis incomplete. Manual review required.',
          criticalIssues: [],
          warnings: ['Automated analysis failed'],
          positives: [],
          sectorSpecificNotes: 'Unable to provide sector-specific guidance due to analysis error'
        }
      }
    }
  }
}

// NEW FUNCTION: Provide all sector guidelines for POF analysis
function getAllSectorGuidelines(): string {
  return `
FINE ART SECTOR POF:
✅ ACCEPTABLE: Private wealth managers, art finance specialists, auction house financing, Swiss/offshore banks
✅ COMMON: Redacted details, range amounts, conditional on authentication, third-party art advisors
⚠️ REJECT: Amounts insufficient for artwork value, no art transaction reference, unverifiable institutions

LUXURY WATCHES POF:
✅ ACCEPTABLE: Personal bank accounts, cryptocurrency wallets (blockchain verification), private banking
✅ COMMON: International buyers, offshore accounts, range amounts for flexibility, dealer financing arrangements
⚠️ REJECT: Amounts far below watch value, suspicious recent deposits, no payment method verification

COLLECTIBLE AUTOMOTIVE POF:
✅ ACCEPTABLE: Classic car financing specialists, private banks, collection financing, international buyers
✅ COMMON: Escrow arrangements, conditional on inspection, range amounts, dealer relationships
⚠️ REJECT: Amounts insufficient for vehicle value, no automotive reference, unverified sources

AVIATION POF:
✅ ACCEPTABLE: Aviation finance specialists, aircraft lenders, major private banks, international corporations
✅ COMMON: Pre-approved financing letters, escrow requirements, conditional on inspection, range amounts
⚠️ REJECT: Amounts far below aircraft value, no aviation context, suspicious structuring

CRYPTOCURRENCY POF:
✅ ACCEPTABLE: Blockchain wallet verification, exchange statements, cold storage proof, DeFi protocols
✅ COMMON: Multiple wallets, recent large movements (normal volatility), privacy coins, smart contracts
⚠️ REJECT: Unverifiable wallets, mixing service abuse, stolen funds indicators, unrealistic claims

WINE & SPIRITS POF:
✅ ACCEPTABLE: Wine investment funds, private collectors, auction financing, boutique banks
✅ COMMON: Conditional on authentication, range amounts, escrow via wine storage facilities
⚠️ REJECT: Amounts insufficient for collection value, no wine context, suspicious patterns

LUXURY REAL ESTATE POF:
✅ ACCEPTABLE: Mortgage pre-approvals, private banking, international buyers, family office funds
✅ COMMON: Conditional financing, escrow requirements, range amounts, multiple funding sources
⚠️ REJECT: Amounts insufficient for property, no real estate reference, unverifiable institutions

BULLION POF:
✅ ACCEPTABLE: Commodity trading accounts, precious metals dealers, secure vault storage, major banks
✅ COMMON: Physical holdings verification, vault receipts, allocated/unallocated accounts
⚠️ REJECT: Amounts inconsistent with order, no metals dealer verification, suspicious sourcing

GEMSTONES & JEWELRY POF:
✅ ACCEPTABLE: Jewelry finance specialists, private banking, auction financing, high-net-worth portfolios
✅ COMMON: Conditional on certification, range amounts, escrow via gemological labs
⚠️ REJECT: Amounts far below jewelry value, no gemstone context, unverifiable funds

GENERAL OFF-MARKET POF:
✅ ACCEPTABLE: International banks in major financial centers, private wealth management, attorney/CPA letters
✅ COMMON: Privacy redactions, conditional availability, escrow arrangements, third-party verification
⚠️ REJECT: Unverifiable institutions, suspicious patterns, altered documents, insufficient amounts
`
}

// NEW FUNCTION: Sector-specific POF norms
function getSectorPOFNorms(): string {
  return `
FINE ART: POF often conditional on authentication, may include art lending terms, international buyers common
LUXURY WATCHES: Cryptocurrency increasingly common, grey market dealer financing acceptable, international standard
AUTOMOTIVE: Classic car financing specialists involved, escrow standard, conditional on inspection
AVIATION: Large institutional financing common, pre-approvals expected, regulatory compliance required
CRYPTOCURRENCY: Blockchain verification is proof, multiple wallets normal, privacy measures expected
WINE & SPIRITS: Investment fund POF common, bonded warehouse escrow, conditional on provenance
REAL ESTATE: Mortgage pre-approvals acceptable, international buyers common, conditional clauses expected
BULLION: Commodity account statements valid, vault storage proof, dealer financing common
JEWELRY: High-value POF with range amounts, conditional on certification, escrow via labs
GENERAL: Privacy redactions normal for high-value, international banking expected, third-party POF acceptable
`
}