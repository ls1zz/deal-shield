import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // 1. Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Get request body
    const body = await request.json()
    const { userId, companyName, location, licenseNumber, additionalInfo } = body

    if (!companyName || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Starting escrow agent analysis for:', companyName)

    // 3. Perform AI analysis with real data
    const analysis = await analyzeEscrowAgent(
      companyName, 
      location, 
      licenseNumber, 
      additionalInfo
    )

    console.log('Analysis complete, saving to database...')

    // 4. Save to database
    const { data: verification, error: dbError } = await supabase
      .from('document_verifications')
      .insert({
        user_id: userId,
        document_type: 'ESCROW_AGENT',
        document_name: `Escrow Agent: ${companyName}`,
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

    // 5. Return success response
    return NextResponse.json({
      success: true,
      verificationId: verification.id,
      riskLevel: analysis.riskLevel,
      riskScore: analysis.riskScore,
      summary: analysis.summary
    })

  } catch (error) {
    console.error('Escrow agent verification error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process request'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Main analysis function
async function analyzeEscrowAgent(
  companyName: string,
  location: string,
  licenseNumber: string,
  additionalInfo: string
): Promise<any> {
  const Anthropic = require('@anthropic-ai/sdk')
  
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  })

  // STEP 1: Gather real data from multiple sources
  let researchData = ''
  
  // Try Companies House API for UK companies
  try {
    const companiesHouseData = await searchCompaniesHouse(companyName)
    console.log('=== COMPANIES HOUSE DATA ===')
    console.log(companiesHouseData)
    console.log('=== END COMPANIES HOUSE DATA ===')
    if (companiesHouseData) {
      researchData += `\n\nCompanies House Data:\n${companiesHouseData}`
    }
  } catch (error) {
    console.error('Companies House API error:', error)
  }

  // Use Google Search for comprehensive verification (4 targeted searches for escrow agents)
  try {
    const googleSearchData = await searchGoogle(
      companyName, 
      location, 
      licenseNumber, 
      additionalInfo
    )
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

  // STEP 2: Build prompt for Claude
  const prompt = `You are a fraud detection expert analyzing an escrow agent/company for verification before a financial transaction.

Escrow Company Name: ${companyName}
Location: ${location || 'Not provided'}
License Number: ${licenseNumber || 'Not provided'}
Additional Information: ${additionalInfo || 'None provided'}
Current Date: ${new Date().toISOString().split('T')[0]}

REAL DATA GATHERED FROM RESEARCH:
${researchData || 'No additional data could be gathered. Provide conservative assessment.'}

CRITICAL INSTRUCTION: If you see ANY dates in the future (after ${new Date().toISOString().split('T')[0]}), they are DATA ERRORS and should be corrected to the previous year.

Based on the REAL DATA above, analyze this escrow agent for:
1. License Verification - Verify escrow license, registration with regulatory bodies
2. Business Registration - Confirm legitimate business entity with proper registration
3. Track Record & Reviews - Assess reputation, experience, client reviews
4. Red Flags - Detect fraud patterns, complaints, suspicious activity

Respond ONLY with valid JSON in this exact format:
{
  "riskLevel": "LOW" or "MEDIUM" or "HIGH" or "CRITICAL",
  "riskScore": number between 0-100,
  "summary": "2-3 sentence executive summary",
  "fullReport": {
    "licenseVerification": {
      "status": "VERIFIED" or "NEEDS_REVIEW" or "FAILED",
      "findings": "detailed findings",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "businessRegistration": {
      "status": "VERIFIED" or "NEEDS_REVIEW" or "FAILED",
      "findings": "detailed findings",
      "recommendations": ["recommendation 1", "recommendation 2"]
    },
    "trackRecord": {
      "status": "GOOD" or "ACCEPTABLE" or "POOR",
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

  // STEP 3: Send to Claude API
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
    
    // Fallback response if AI fails
    return {
      riskLevel: 'MEDIUM',
      riskScore: 50,
      summary: 'Unable to complete full verification. Manual review recommended.',
      fullReport: {
        licenseVerification: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to verify license automatically.',
          recommendations: ['Verify license manually', 'Contact regulatory body']
        },
        businessRegistration: {
          status: 'NEEDS_REVIEW',
          findings: 'Unable to verify business registration automatically.',
          recommendations: ['Check business registry', 'Verify company documents']
        },
        trackRecord: {
          status: 'ACCEPTABLE',
          findings: 'Track record could not be assessed.',
          recommendations: ['Research online reviews', 'Request references']
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

// Helper function: Search Companies House API
async function searchCompaniesHouse(companyName: string): Promise<string | null> {
  try {
    const apiKey = process.env.COMPANIES_HOUSE_API_KEY
    if (!apiKey) return null

    // Search for the company
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

    // Fetch FULL company profile
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

    // Fetch officers (directors)
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

// Helper function: Search Google (4 targeted searches for escrow agents)
async function searchGoogle(
  companyName: string,
  location: string,
  licenseNumber: string,
  additionalInfo: string
): Promise<string | null> {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY
    const engineId = process.env.GOOGLE_SEARCH_ENGINE_ID
    
    if (!apiKey || !engineId) return null

    let allResults = ''
    
    // Do 4 targeted searches for escrow agents
    const queries = [
      `"${companyName}" escrow ${location}`,
      `${companyName} escrow license ${licenseNumber}`,
      `${companyName} escrow reviews`,
      `${companyName} escrow complaints fraud`,
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
    
    return allResults || null
  } catch (error) {
    console.error('Google Search API error:', error)
    return null
  }
}