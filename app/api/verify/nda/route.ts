import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Anthropic from '@anthropic-ai/sdk'

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string
    const documentType = formData.get('documentType') as string
    const assetSector = formData.get('assetSector') as string || 'auto-detect' // NEW: Allow user to specify or auto-detect

    if (!file || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')

    // Determine media type
    let mediaType = 'application/pdf'
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      mediaType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    } else if (file.type === 'image/png') {
      mediaType = 'image/png'
    } else if (file.type === 'image/jpeg') {
      mediaType = 'image/jpeg'
    }

    // Get leniency context (will be applied after sector detection)
    const leniencyGuidelines = getAllSectorGuidelines()

    // Create prompt for NDA analysis with sector detection and leniency
    const prompt = `You are a fraud detection expert analyzing an NDA/NCNDA (Non-Disclosure Agreement / Non-Circumvention Non-Disclosure Agreement) document.

CRITICAL CONTEXT - OFF-MARKET LUXURY ASSET DUE DILIGENCE:

This NDA may involve OFF-MARKET luxury asset transactions where specific industry leniency standards apply.

FIRST: DETECT THE ASSET SECTOR from the document content:
- Look for mentions of: art, paintings, sculptures, galleries, auction houses → "fine-art"
- Look for mentions of: watches, timepieces, Rolex, Patek Philippe, grey market → "luxury-watches"  
- Look for mentions of: vehicles, cars, automobiles, supercars, Ferrari, classic cars → "collectible-automotive"
- Look for mentions of: aircraft, jets, aviation, helicopters, planes → "aviation"
- Look for mentions of: cryptocurrency, Bitcoin, Ethereum, digital assets, blockchain → "cryptocurrency"
- Look for mentions of: wine, spirits, whisky, bottles, casks, cellars → "wine-spirits"
- Look for mentions of: real estate, property, properties, land, buildings → "luxury-real-estate"
- Look for mentions of: gold, silver, bullion, precious metals → "bullion"
- Look for mentions of: diamonds, gemstones, jewelry, jewellery → "gemstones-jewelry"
- If unclear or multiple sectors → "general"

SECTOR-SPECIFIC LENIENCY GUIDELINES:
${leniencyGuidelines}

UNIVERSAL PRINCIPLES FOR OFF-MARKET TRANSACTIONS:
1. LIMITED ONLINE PRESENCE is NORMAL for legitimate off-market intermediaries
2. CONFIDENTIALITY requirements prevent public transaction history - this is NOT suspicious
3. NDAs are STANDARD and expected in these sectors
4. NEW COMPANIES with experienced principals are ACCEPTABLE
5. NETWORK VALIDATION matters more than public visibility
6. PRIVATE OPERATIONS are the business model, not a red flag

RED FLAGS THAT OVERRIDE ALL LENIENCY:
❌ Pressure tactics or rushed signing demands
❌ Vague terms without specific confidentiality scope
❌ Unreasonable non-circumvention clauses (overly broad or indefinite)
❌ Missing essential legal elements (jurisdiction, duration, definitions)
❌ One-sided terms that heavily favor one party
❌ Circumvention of standard legal protections
❌ Fabricated party credentials
❌ Requests for payment or financial information in an NDA
❌ Unusual termination or penalty clauses

GREEN LIGHTS (Normal for off-market deals):
✅ Strong confidentiality clauses protecting transaction details
✅ Non-circumvention terms protecting intermediary relationships
✅ Multiple parties involved (buyer, seller, intermediaries)
✅ Professional language and legal terminology
✅ Clear scope and duration
✅ References to subsequent transaction documents (LOI, purchase agreement)
✅ Industry-standard protective clauses
✅ Limited public information about parties (expected in confidential deals)

ANALYSIS INSTRUCTIONS:
Analyze this NDA document with appropriate sector leniency. DO NOT penalize parties for:
- Limited online presence or public information
- Being new companies (if principals have experience)
- Lack of disclosed transaction history (confidentiality is standard)
- Private operations without public storefronts

Focus on:
1. **Asset Sector Detection**: What type of transaction is this?
2. **Party Legitimacy**: Verify parties exist, but APPLY LENIENCY for limited public info
3. **Standard NDA Clauses**: Are essential legal protections present?
4. **Document Analysis**: Red flags vs. normal confidentiality practices
5. **Overall Risk**: Based on actual fraud indicators, not just privacy

Return your analysis in this EXACT JSON format:
{
  "detectedSector": "fine-art|luxury-watches|collectible-automotive|aviation|cryptocurrency|wine-spirits|luxury-real-estate|bullion|gemstones-jewelry|general",
  "sectorConfidence": "high|medium|low",
  "riskLevel": "LOW|MEDIUM|HIGH|CRITICAL",
  "riskScore": 0-100,
  "summary": "Brief 2-3 sentence summary acknowledging the sector and leniency applied",
  "leniencyContext": {
    "sector": "detected sector name",
    "leniencyApplied": "Description of what leniency standards were applied",
    "normalForSector": ["list", "of", "things", "normal", "for", "this", "sector"],
    "confidentialityJustified": true or false
  },
  "fullReport": {
    "partyLegitimacy": {
      "status": "VERIFIED|ACCEPTABLE_WITH_LENIENCY|NEEDS_REVIEW|FLAGGED",
      "findings": "Detailed analysis with sector context. Note if limited info is normal for this sector.",
      "leniencyApplied": "Explanation of what was considered acceptable for this sector",
      "recommendations": ["Specific action items considering sector norms"]
    },
    "documentAnalysis": {
      "status": "COMPLETE|ACCEPTABLE_WITH_CONFIDENTIALITY|INCOMPLETE|SUSPICIOUS",
      "findings": "Analysis of NDA clauses with off-market context: confidentiality terms, non-circumvention clauses, duration, scope, jurisdiction",
      "leniencyApplied": "Explanation of confidentiality considerations for this sector",
      "recommendations": ["Specific suggestions"]
    },
    "fraudIndicators": {
      "status": "CLEAR|MINOR_CONCERNS|MAJOR_CONCERNS|CRITICAL",
      "findings": "Actual red flags vs. normal privacy practices. Distinguish between suspicious behavior and standard confidentiality.",
      "leniencyApplied": "Explanation of what was not flagged due to sector norms",
      "recommendations": ["Actions to take"]
    },
    "offMarketContext": {
      "isOffMarketDeal": true or false,
      "confidentialityLevel": "HIGH|MEDIUM|LOW",
      "networkVerificationRequired": true or false,
      "multipleIntermediaries": true or false,
      "standardNDAStructure": true or false,
      "unusualClauses": ["list any unusual clauses"]
    },
    "overallRisk": {
      "score": 0-100,
      "level": "LOW|MEDIUM|HIGH|CRITICAL",
      "criticalIssues": ["Severe problems that must be addressed"],
      "warnings": ["Concerns that should be reviewed"],
      "positives": ["Good signs and strong elements"],
      "sectorSpecificNotes": "Additional context about this sector's NDA practices"
    }
  }
}

Be thorough and specific. If you cannot find certain information about parties, note whether this is normal for the sector or genuinely concerning.`

    // Build content array based on file type
    const contentArray: any[] = []
    
    if (mediaType.startsWith('image/')) {
      // For images, use the 'image' type
      contentArray.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64,
        },
      })
    } else {
      // For PDFs and documents, use 'document' type with 'as any' to bypass type checking
      contentArray.push({
        type: 'document',
        source: {
          type: 'base64',
          media_type: mediaType,
          data: base64,
        },
      } as any)
    }
    
    contentArray.push({
      type: 'text',
      text: prompt,
    })

    // Call Claude API with document
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: contentArray,
        },
      ],
    })

    // Extract JSON from Claude's response
    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    
    // Try to parse JSON from the response
    let analysisData
    try {
      // Look for JSON in code blocks or raw text
      const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) || 
                       responseText.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        const jsonText = jsonMatch[1] || jsonMatch[0]
        analysisData = JSON.parse(jsonText)
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText)
      return NextResponse.json(
        { error: 'Failed to parse AI analysis results' },
        { status: 500 }
      )
    }

    // Use detected sector if auto-detect was selected
    const finalSector = assetSector === 'auto-detect' ? analysisData.detectedSector : assetSector

    // Save to database
    const supabase = await createClient()
    
    const { data: verification, error: dbError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: documentType,
        document_name: file.name,
        asset_sector: finalSector, // NEW: Store detected/specified sector
        risk_level: analysisData.riskLevel,
        risk_score: analysisData.riskScore,
        summary: analysisData.summary,
        analysis_data: analysisData.fullReport,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save verification results' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      verificationId: verification.id,
      detectedSector: analysisData.detectedSector,
      sectorConfidence: analysisData.sectorConfidence,
      riskLevel: analysisData.riskLevel,
      riskScore: analysisData.riskScore,
      summary: analysisData.summary,
      leniencyApplied: analysisData.leniencyContext, // NEW: Show what leniency was applied
    })

  } catch (error) {
    console.error('Error processing NDA:', error)
    return NextResponse.json(
      { error: 'Failed to process document' },
      { status: 500 }
    )
  }
}

// NEW FUNCTION: Provide all sector guidelines for AI to reference
function getAllSectorGuidelines(): string {
  return `
FINE ART SECTOR:
✅ ACCEPTABLE: Private dealers without galleries, new companies with gallery/auction house backgrounds, no published sales
✅ REQUIRED: Professional art world connections, provenance discussion willingness, authentication acceptance
⚠️ REJECT: No art credentials, provenance resistance, authentication refusal

LUXURY WATCHES:
✅ ACCEPTABLE: Grey market dealers (no manufacturer authorization is normal), new dealers with reviews, limited history with authentication offers
✅ REQUIRED: Detailed documentation, third-party authentication willingness, forum presence
⚠️ REJECT: Below-market pricing, removed serials, missing papers, authentication refusal

COLLECTIBLE AUTOMOTIVE:
✅ ACCEPTABLE: New brokerages with dealer backgrounds, no public inventory (standard for off-market), limited visibility
✅ REQUIRED: Industry reputation, manufacturer/dealer connections, collector network presence
⚠️ REJECT: No automotive background, no dealer connections, suspicious pricing

AVIATION:
✅ ACCEPTABLE: New brokers with aviation background, no fleet ownership (they shouldn't own aircraft), limited public history
✅ REQUIRED: Part 295 compliance, association memberships, inspection processes, insurance docs
⚠️ REJECT: No regulatory compliance, no insurance, no carrier verification

CRYPTOCURRENCY:
✅ ACCEPTABLE: Newer companies (emerging sector), limited public history (privacy concerns), evolving compliance
✅ REQUIRED: Security infrastructure, AML/KYC compliance, institutional custody
⚠️ REJECT: No security protocols, no compliance framework, no insurance

WINE & SPIRITS:
✅ ACCEPTABLE: New brokerages, regional/boutique specialists, limited transaction docs, niche focus
✅ REQUIRED: Winemaking network, bonded warehouse relationships, certifications
⚠️ REJECT: No wine connections, no storage relationships, no authentication

LUXURY REAL ESTATE:
✅ ACCEPTABLE: Newer luxury agents with brand affiliation, limited public listings (off-market standard), referral-based
✅ REQUIRED: Professional networks, broker affiliation, referral network membership
⚠️ REJECT: No brokerage affiliation, no licenses, no references

BULLION:
✅ ACCEPTABLE: New dealers with metals background, limited online presence (high-value private deals), confidential clients
✅ REQUIRED: Licensing, insurance, secure storage, authentication capabilities
⚠️ REJECT: No authentication capability, no secure storage, no licensing

GEMSTONES & JEWELRY:
✅ ACCEPTABLE: Private dealers without storefronts, new companies with gemological credentials, limited sales records
✅ REQUIRED: Gemological certifications, lab relationships, authentication expertise
⚠️ REJECT: No credentials, no certifications, no authentication process

GENERAL OFF-MARKET:
✅ ACCEPTABLE: Limited online presence with confidentiality justification, new companies with experienced principals, minimal public history with NDA standard
✅ REQUIRED: Professional network validation, appropriate insurance, transaction safeguards
⚠️ REJECT: Pressure tactics, vague strategies, no references, untraceable payments
`
}