import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId, entityName, entityType, additionalInfo } = body

    if (!entityName || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Starting analysis for:', entityName)

    // Perform AI analysis with real data
    const analysis = await analyzeCounterparty(entityName, entityType, additionalInfo)

    console.log('Analysis complete, saving to database...')

    // Save to database
    const { data: verification, error: dbError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: 'COUNTERPARTY',
        document_name: `${entityType === 'company' ? 'Company' : 'Individual'}: ${entityName}`,
        risk_level: analysis.riskLevel,
        risk_score: analysis.riskScore,
        summary: analysis.summary,
        analysis_data: analysis.fullReport,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to save verification results')
    }

    console.log('Verification saved with ID:', verification.id)

    return NextResponse.json({
      success: true,
      verificationId: verification.id,
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      summary: analysis.summary
    })

  } catch (error) {
    console.error('Counterparty verification error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

async function analyzeCounterparty(entityName: string, entityType: string, additionalInfo: string): Promise<any> {
  const Anthropic = require('@anthropic-ai/sdk')
  
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })

  // Step 1: Search for real information about the entity
  let researchData = ''
  
  // Try Companies House API first for UK companies
  if (entityType === 'company') {
    try {
      const companiesHouseData = await searchCompaniesHouse(entityName)
      console.log('=== COMPANIES HOUSE DATA ===')
      console.log(companiesHouseData)
      console.log('=== END COMPANIES HOUSE DATA ===')
      if (companiesHouseData) {
        researchData += `\n\nCompanies House Data:\n${companiesHouseData}`
      }
    } catch (error) {
      console.error('Companies House API error:', error)
    }
  }

  // Use Google Search for additional verification
  try {
    const googleSearchData = await searchGoogle(entityName, entityType, additionalInfo)
    console.log('=== GOOGLE SEARCH DATA ===')
    console.log(googleSearchData)
    console.log('=== END GOOGLE SEARCH DATA ===')
    if (googleSearchData) {
      researchData += `\n\nWeb Search Results:\n${googleSearchData}`
    }
  } catch (error) {
    console.error('Google Search API error:', error)
  }

  console.log('=== FULL RESEARCH DATA SENT TO CLAUDE ===')
  console.log(researchData)
  console.log('=== END RESEARCH DATA ===')


  const prompt = `You are a fraud detection expert analyzing a ${entityType} for verification before a business transaction.

Entity Name: ${entityName}
Type: ${entityType}
Additional Information: ${additionalInfo || 'None provided'}
Current Date: ${new Date().toISOString().split('T')[0]}

REAL DATA GATHERED FROM RESEARCH:
${researchData || 'No additional data could be gathered. Provide conservative assessment.'}

CRITICAL INSTRUCTION: If you see ANY dates in the future (after ${new Date().toISOString().split('T')[0]}), they are DATA ERRORS and should be corrected to the previous year. For example, if you see 2025-09-24 and today is 2025-11-02, the correct date is 2024-09-24.

Based on the REAL DATA above (correcting any future dates), analyze this ${entityType} for:
1. Business Legitimacy - Verify registration, history, and legal status based on the CORRECTED data
2. Representative Identity - Confirm authority and legitimacy from directors/officers information
3. Red Flags - Detect fraud patterns, shell companies, suspicious activity
4. Overall Risk Assessment

Respond ONLY with valid JSON in this exact format:
{
  "riskLevel": "LOW" or "MEDIUM" or "HIGH" or "CRITICAL",
  "riskScore": number between 0-100,
  "summary": "2-3 sentence executive summary",
  "fullReport": {
    "businessLegitimacy": {
      "status": "VERIFIED" or "NEEDS_REVIEW" or "FAILED",
      "findings": "detailed findings",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "representativeIdentity": {
      "status": "VERIFIED" or "NEEDS_REVIEW" or "FAILED",
      "findings": "detailed findings",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "redFlags": {
      "status": "NONE" or "MINOR" or "MAJOR",
      "findings": "detailed findings",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "overallRisk": {
      "score": number between 0-100,
      "level": "LOW" or "MEDIUM" or "HIGH" or "CRITICAL",
      "summary": "overall assessment",
      "criticalIssues": ["issue 1", "issue 2"] or [],
      "warnings": ["warning 1", "warning 2"] or [],
      "positives": ["positive 1", "positive 2"]
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
    
    // Extract JSON from response
    let jsonText = responseText.trim()
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    }
    
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      jsonText = jsonMatch[0]
    }
    
    const analysis = JSON.parse(jsonText)
    return analysis

  } catch (error) {
    console.error('AI analysis error:', error)
    
    return {
      riskLevel: 'MEDIUM',
      riskScore: 50,
      summary: 'Unable to complete full verification. Manual review recommended.',
      fullReport: {
        businessLegitimacy: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to verify automatically. Please conduct manual verification.',
          recommendations: ['Verify business registration manually', 'Check company website and online presence']
        },
        representativeIdentity: {
          status: 'NEEDS_REVIEW',
          findings: 'Identity verification incomplete.',
          recommendations: ['Request official identification', 'Verify authority to represent entity']
        },
        redFlags: {
          status: 'MINOR',
          findings: 'Automated analysis failed.',
          recommendations: ['Conduct thorough background check']
        },
        overallRisk: {
          score: 50,
          level: 'MEDIUM',
          summary: 'Analysis incomplete. Manual review required.',
          criticalIssues: [],
          warnings: ['Automated verification failed'],
          positives: []
        }
      }
    }
  }
}

// Helper function to search Companies House API
async function searchCompaniesHouse(companyName: string): Promise<string | null> {
  try {
    const apiKey = process.env.COMPANIES_HOUSE_API_KEY
    if (!apiKey) return null

    // First, search for the company
    const searchResponse = await fetch(
      `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(companyName)}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
        }
      }
    )

    if (!searchResponse.ok) return null

    const searchData = await searchResponse.json()
    if (!searchData.items || searchData.items.length === 0) return null

    const topMatch = searchData.items[0]
    const companyNumber = topMatch.company_number

    // Now fetch the FULL company profile for accurate data
    const profileResponse = await fetch(
      `https://api.company-information.service.gov.uk/company/${companyNumber}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
        }
      }
    )

    if (!profileResponse.ok) return null

    const profile = await profileResponse.json()

    // Also fetch officers (directors)
    const officersResponse = await fetch(
      `https://api.company-information.service.gov.uk/company/${companyNumber}/officers`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`
        }
      }
    )

    let officersInfo = ''
    if (officersResponse.ok) {
      const officersData = await officersResponse.json()
      if (officersData.items && officersData.items.length > 0) {
        officersInfo = '\n\nDirectors/Officers:\n'
        officersData.items.forEach((officer: any) => {
          officersInfo += `- ${officer.name} (${officer.officer_role})\n`
          if (officer.appointed_on) {
            officersInfo += `  Appointed: ${officer.appointed_on}\n`
          }
        })
      }
    }
    
    let result = `Company: ${profile.company_name}\n`
    result += `Company Number: ${profile.company_number}\n`
    result += `Status: ${profile.company_status}\n`
    result += `Type: ${profile.company_type}\n`
    result += `Incorporated: ${profile.date_of_creation}\n`
    
    if (profile.registered_office_address) {
      const addr = profile.registered_office_address
      result += `Registered Address: ${addr.address_line_1 || ''}${addr.address_line_2 ? ', ' + addr.address_line_2 : ''}, ${addr.locality || ''}, ${addr.postal_code || ''}\n`
    }
    
    if (profile.sic_codes && profile.sic_codes.length > 0) {
      result += `SIC Codes: ${profile.sic_codes.join(', ')}\n`
    }

    if (profile.accounts) {
      result += `\nAccounts:\n`
      if (profile.accounts.next_due) result += `Next Due: ${profile.accounts.next_due}\n`
      if (profile.accounts.last_accounts) {
        result += `Last Filed: ${profile.accounts.last_accounts.made_up_to}\n`
      }
    }

    result += officersInfo
    
    return result
  } catch (error) {
    console.error('Companies House API error:', error)
    return null
  }
}

// Helper function to search Google
async function searchGoogle(entityName: string, entityType: string, additionalInfo: string): Promise<string | null> {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY
    const engineId = process.env.GOOGLE_SEARCH_ENGINE_ID
    
    if (!apiKey || !engineId) return null

    let allResults = ''
    
    if (entityType === 'individual') {
      // For individuals, do multiple targeted searches
      const queries = [
        `"${entityName}" ${additionalInfo}`,
        `${entityName} director ${additionalInfo}`,
        `${entityName} LinkedIn profile`,
        `${entityName} company owner ${additionalInfo}`,
      ]
      
      for (const searchQuery of queries) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(searchQuery)}&num=3`
          )

          if (response.ok) {
            const data = await response.json()
            if (data.items && data.items.length > 0) {
              allResults += `\n--- Search: ${searchQuery} ---\n`
              data.items.forEach((item: any, index: number) => {
                allResults += `Result ${index + 1}: ${item.title}\n`
                allResults += `URL: ${item.link}\n`
                allResults += `Snippet: ${item.snippet}\n\n`
              })
            }
          }
        } catch (error) {
          console.error(`Error searching "${searchQuery}":`, error)
        }
      }
    } else {
      // For companies, do a single comprehensive search
      const searchQuery = `${entityName} ${entityType} ${additionalInfo} company registration business`
      
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${engineId}&q=${encodeURIComponent(searchQuery)}&num=5`
      )

      if (!response.ok) return null

      const data = await response.json()
      if (!data.items || data.items.length === 0) return null

      data.items.forEach((item: any, index: number) => {
        allResults += `\nSource ${index + 1}: ${item.title}\n`
        allResults += `URL: ${item.link}\n`
        allResults += `Snippet: ${item.snippet}\n`
      })
    }
    
    return allResults || null
  } catch (error) {
    console.error('Google Search API error:', error)
    return null
  }
}