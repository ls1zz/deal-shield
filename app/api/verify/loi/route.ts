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
    const assetSector = formData.get('assetSector') as string || 'general' // NEW: Asset sector for leniency

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

    // Save ONLY the analysis results to database (NEVER the document)
    const { data: verification, error: dbError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: documentType,
        document_name: file.name,
        asset_sector: assetSector, // NEW: Store sector for context
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
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      summary: analysis.summary,
      leniencyApplied: analysis.leniencyContext, // NEW: Show what leniency was applied
      message: 'Document analyzed successfully. File was processed in memory only and never saved.'
    })

  } catch (error) {
    console.error('LOI verification error:', error)
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

  // Get sector-specific leniency guidelines
  const leniencyContext = getSectorLeniencyGuidelines(assetSector)

  const prompt = `You are a fraud detection expert analyzing a ${documentType} document for the ${assetSector} sector.

CRITICAL CONTEXT - OFF-MARKET LUXURY ASSET DUE DILIGENCE:

This transaction involves the ${assetSector} sector where OFF-MARKET deals are common. Apply appropriate industry leniency:

${leniencyContext}

UNIVERSAL LENIENCY PRINCIPLES FOR OFF-MARKET TRANSACTIONS:
1. LIMITED ONLINE PRESENCE is NORMAL and EXPECTED for legitimate off-market intermediaries
2. CONFIDENTIALITY requirements often prevent public transaction history
3. NDAs are standard - lack of disclosed past deals is NOT automatically suspicious
4. NEW COMPANIES with experienced principals are ACCEPTABLE
5. NETWORK VALIDATION matters more than public visibility
6. TRUST-BASED relationships are industry standard

RED FLAGS THAT OVERRIDE LENIENCY (Never accept these):
❌ Pressure tactics or rushed decision demands
❌ Vague strategies without substance
❌ Unsubstantiated guarantees or promises
❌ Missing professional insurance
❌ Fabricated credentials or references
❌ Unwillingness to use escrow services
❌ No verifiable professional network
❌ Payment demands via untraceable methods

GREEN LIGHTS (Acceptable even with limited history):
✅ Verifiable industry connections and professional references
✅ Principals with relevant expertise and credentials
✅ Willingness to meet in person and provide transparency
✅ Proper insurance coverage (E&O, liability, etc.)
✅ Professional association memberships
✅ Clear transaction process with safeguards
✅ Appropriate use of NDAs and confidentiality

ANALYSIS INSTRUCTIONS:
Analyze the following LOI document for:
1. Party Legitimacy - Verify buyer/seller details, but APPLY LENIENCY for limited online presence
2. Financial Capacity - Check transaction capacity indicators
3. Document Structure - Detect inconsistencies, but DON'T penalize confidentiality clauses
4. Fraud Risk - Assess based on RED FLAGS above, not just lack of public information

Document filename: ${fileName}

Document text:
${text.slice(0, 50000)} 

Respond ONLY with valid JSON in this exact format:
{
  "riskLevel": "LOW" or "MEDIUM" or "HIGH" or "CRITICAL",
  "riskScore": number between 0-100,
  "summary": "2-3 sentence executive summary that acknowledges sector-appropriate leniency applied",
  "leniencyContext": {
    "sector": "${assetSector}",
    "leniencyApplied": "Description of what leniency standards were applied",
    "normalForSector": ["list", "of", "things", "that", "are", "normal", "for", "this", "sector"]
  },
  "fullReport": {
    "partyLegitimacy": {
      "status": "VERIFIED" or "ACCEPTABLE_WITH_LENIENCY" or "NEEDS_REVIEW" or "FAILED",
      "findings": "detailed findings with sector context",
      "leniencyApplied": "explanation of what was considered acceptable for this sector",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "financialCapacity": {
      "status": "ACCEPTABLE" or "ACCEPTABLE_WITH_CONDITIONS" or "NEEDS_REVIEW" or "INSUFFICIENT",
      "findings": "detailed findings",
      "leniencyApplied": "explanation of sector-appropriate standards",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "documentAnalysis": {
      "status": "GOOD" or "ACCEPTABLE" or "ACCEPTABLE_WITH_CONFIDENTIALITY" or "POOR",
      "findings": "detailed findings considering off-market norms",
      "leniencyApplied": "explanation of confidentiality considerations",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "offMarketContext": {
      "confidentialityLevel": "HIGH" or "MEDIUM" or "LOW",
      "networkVerificationRequired": true or false,
      "escrowRecommended": true or false,
      "inPersonMeetingRecommended": true or false,
      "thirdPartyAuthenticationRequired": true or false
    },
    "overallRisk": {
      "score": number between 0-100,
      "level": "LOW" or "MEDIUM" or "HIGH" or "CRITICAL",
      "summary": "overall assessment acknowledging off-market context",
      "criticalIssues": ["issue 1", "issue 2"] or [],
      "warnings": ["warning 1", "warning 2"] or [],
      "positives": ["positive 1", "positive 2"],
      "sectorSpecificNotes": "Any additional context about this sector's practices"
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
      riskLevel: 'MEDIUM',
      riskScore: 50,
      summary: 'Document processed but AI analysis encountered an error. Manual review recommended.',
      leniencyContext: {
        sector: assetSector,
        leniencyApplied: 'Unable to apply sector-specific analysis due to error',
        normalForSector: []
      },
      fullReport: {
        partyLegitimacy: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to complete automated verification. Please review manually.',
          leniencyApplied: 'N/A - Analysis incomplete',
          recommendations: ['Verify all parties manually', 'Check business registration', 'Obtain professional references']
        },
        financialCapacity: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to assess financial capacity automatically.',
          leniencyApplied: 'N/A - Analysis incomplete',
          recommendations: ['Request proof of funds', 'Verify bank references']
        },
        documentAnalysis: {
          status: 'NEEDS_REVIEW',
          findings: 'Document structure could not be fully analyzed.',
          leniencyApplied: 'N/A - Analysis incomplete',
          recommendations: ['Review document clauses manually']
        },
        offMarketContext: {
          confidentialityLevel: 'MEDIUM',
          networkVerificationRequired: true,
          escrowRecommended: true,
          inPersonMeetingRecommended: true,
          thirdPartyAuthenticationRequired: false
        },
        overallRisk: {
          score: 50,
          level: 'MEDIUM',
          summary: 'Analysis incomplete. Manual review required.',
          criticalIssues: [],
          warnings: ['Automated analysis failed'],
          positives: [],
          sectorSpecificNotes: `This is an off-market ${assetSector} transaction where limited public information is normal.`
        }
      }
    }
  }
}

// NEW FUNCTION: Get sector-specific leniency guidelines
function getSectorLeniencyGuidelines(sector: string): string {
  const guidelines: Record<string, string> = {
    'fine-art': `
FINE ART SECTOR LENIENCY:
✅ ACCEPTABLE: Private dealers without gallery spaces, new companies with principals from galleries/auction houses
✅ ACCEPTABLE: Limited online presence - private art dealers deliberately operate "behind closed doors"
✅ ACCEPTABLE: No published sales records due to client confidentiality
✅ REQUIRED: Professional network references, membership in ADAA/NADA/PADA, relationships with museums/galleries
⚠️ REJECT ONLY IF: No art world connections, unwillingness to discuss provenance, resistance to expert authentication
`,
    'luxury-watches': `
LUXURY WATCHES (GREY MARKET) LENIENCY:
✅ ACCEPTABLE: Grey market dealers without manufacturer authorization (this is their business model)
✅ ACCEPTABLE: New dealers with strong online reviews and authentication guarantees
✅ ACCEPTABLE: Limited transaction history if willing to provide detailed photos, movement shots, third-party authentication
✅ REQUIRED: Forum presence, platform badges (Chrono24), willingness for in-person meetings
⚠️ REJECT ONLY IF: Prices significantly below market, removed serial numbers, missing papers, refusal of authentication
`,
    'collectible-automotive': `
COLLECTIBLE AUTOMOTIVE SECTOR LENIENCY:
✅ ACCEPTABLE: New brokerage firms if principals are former dealers or have manufacturer connections
✅ ACCEPTABLE: No public inventory - off-market car brokers specifically "do not list cars publicly"
✅ ACCEPTABLE: Limited transaction visibility due to confidentiality requirements
✅ REQUIRED: Industry reputation, relationships with authorized dealers, professional network within collector community
⚠️ REJECT ONLY IF: No automotive industry background, no connections to manufacturers/dealers, suspicious pricing
`,
    'aviation': `
AVIATION (PRIVATE JETS) SECTOR LENIENCY:
✅ ACCEPTABLE: New brokers with aviation background (consultancy, operator relationships, aircraft management)
✅ ACCEPTABLE: No fleet ownership - brokers should NOT own aircraft (this distinguishes them from operators)
✅ ACCEPTABLE: Limited public transaction history due to client confidentiality
✅ REQUIRED: Part 295 compliance, professional association membership, pre-purchase inspection processes
⚠️ REJECT ONLY IF: No regulatory compliance, no insurance documentation, no carrier verification process
`,
    'cryptocurrency': `
CRYPTOCURRENCY SECTOR LENIENCY:
✅ ACCEPTABLE: Newer companies (emerging sector where new entrants are common)
✅ ACCEPTABLE: Limited public transaction history due to privacy and regulatory concerns
✅ ACCEPTABLE: Evolving regulatory compliance (recent SEC guidance in 2025)
✅ REQUIRED: Security infrastructure, AML/KYC compliance, institutional-grade custody solutions
⚠️ REJECT ONLY IF: No security protocols, no regulatory compliance framework, no insurance coverage
`,
    'wine-spirits': `
WINE & SPIRITS SECTOR LENIENCY:
✅ ACCEPTABLE: New brokerage firms, especially regional/boutique specialists with limited production focus
✅ ACCEPTABLE: Limited documented transactions for private sales and collector deals
✅ ACCEPTABLE: Niche specialization with small market presence
✅ REQUIRED: Winemaking community network, bonded warehouse relationships, professional certifications
⚠️ REJECT ONLY IF: No wine industry connections, no storage facility relationships, no authentication capability
`,
    'luxury-real-estate': `
LUXURY REAL ESTATE SECTOR LENIENCY:
✅ ACCEPTABLE: Newer agents in luxury segment with brand affiliation (Sotheby's, etc.)
✅ ACCEPTABLE: Limited public listings - off-market properties deliberately kept from MLS
✅ ACCEPTABLE: Referral-based business (39% of sellers find agents through referrals)
✅ REQUIRED: Professional network, broker affiliation, luxury referral network membership
⚠️ REJECT ONLY IF: No brokerage affiliation, no professional licenses, no industry references
`,
    'bullion': `
BULLION (GOLD/SILVER/PRECIOUS METALS) LENIENCY:
✅ ACCEPTABLE: New dealers with established metals industry background
✅ ACCEPTABLE: Limited online presence for high-value private transactions
✅ ACCEPTABLE: Confidential client lists due to security concerns
✅ REQUIRED: Proper licensing, insurance, secure storage facilities, authentication capabilities
⚠️ REJECT ONLY IF: No metal authentication capability, no secure storage, no licensing
`,
    'gemstones-jewelry': `
GEMSTONES & JEWELRY SECTOR LENIENCY:
✅ ACCEPTABLE: Private dealers without storefront retail operations
✅ ACCEPTABLE: New companies with gemologist credentials or industry training
✅ ACCEPTABLE: Limited sales records due to high-net-worth client privacy
✅ REQUIRED: Gemological certifications, relationships with certification labs, authentication expertise
⚠️ REJECT ONLY IF: No gemological credentials, unwilling to provide certifications, no authentication process
`,
    'general': `
GENERAL OFF-MARKET ASSET LENIENCY:
✅ ACCEPTABLE: Limited online presence when justified by confidentiality requirements
✅ ACCEPTABLE: New companies with experienced principals who have relevant industry background
✅ ACCEPTABLE: Minimal public transaction history when NDAs are standard practice
✅ REQUIRED: Professional network validation, appropriate insurance, clear transaction safeguards
⚠️ REJECT ONLY IF: Pressure tactics, vague strategies, no professional references, untraceable payment demands
`
  }

  return guidelines[sector] || guidelines['general']
}