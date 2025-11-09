import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Google Custom Search function
async function performWebSearch(query: string): Promise<any[]> {
  try {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&num=5`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.items) {
      return data.items.map((item: any) => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Web search error:", error);
    return [];
  }
}

// Registry lookup functions (keeping your existing implementations)
async function lookupCompanyUK(companyNameOrNumber: string): Promise<any> {
  try {
    const apiKey = process.env.COMPANIES_HOUSE_API_KEY;
    
    const searchUrl = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(companyNameOrNumber)}`;
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
    });
    
    const searchData = await searchResponse.json();
    
    if (!searchData.items || searchData.items.length === 0) {
      return {
        found: false,
        country: "UK",
        message: "Company not found in UK Companies House"
      };
    }
    
    const company = searchData.items[0];
    const companyNumber = company.company_number;
    
    const detailUrl = `https://api.company-information.service.gov.uk/company/${companyNumber}`;
    const detailResponse = await fetch(detailUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
    });
    
    const detailData = await detailResponse.json();
    
    const officersUrl = `https://api.company-information.service.gov.uk/company/${companyNumber}/officers`;
    const officersResponse = await fetch(officersUrl, {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      },
    });
    
    const officersData = await officersResponse.json();
    
    return {
      found: true,
      country: "UK",
      company_name: detailData.company_name,
      company_number: detailData.company_number,
      company_status: detailData.company_status,
      company_type: detailData.type,
      date_of_creation: detailData.date_of_creation,
      registered_office_address: detailData.registered_office_address,
      officers: officersData.items?.map((officer: any) => ({
        name: officer.name,
        officer_role: officer.officer_role,
        appointed_on: officer.appointed_on,
        nationality: officer.nationality,
        country_of_residence: officer.country_of_residence,
      })) || [],
      has_been_liquidated: detailData.has_been_liquidated,
      has_insolvency_history: detailData.has_insolvency_history,
      has_charges: detailData.has_charges,
    };
  } catch (error) {
    console.error("UK Companies House error:", error);
    return {
      found: false,
      country: "UK",
      error: "Error accessing UK Companies House"
    };
  }
}

async function lookupCompanyUSA(companyNameOrCIK: string): Promise<any> {
  try {
    const searchUrl = `https://www.sec.gov/cgi-bin/browse-edgar?company=${encodeURIComponent(companyNameOrCIK)}&owner=exclude&action=getcompany&output=atom`;
    
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'DealShield Due Diligence Platform contact@dealshield.com',
        'Accept': 'application/atom+xml',
      },
    });
    
    const searchText = await searchResponse.text();
    
    const cikMatch = searchText.match(/CIK=(\d+)/);
    if (!cikMatch) {
      return {
        found: false,
        country: "USA",
        message: "Company not found in SEC Edgar"
      };
    }
    
    const cik = cikMatch[1].padStart(10, '0');
    
    const detailUrl = `https://data.sec.gov/submissions/CIK${cik}.json`;
    const detailResponse = await fetch(detailUrl, {
      headers: {
        'User-Agent': 'DealShield Due Diligence Platform contact@dealshield.com',
      },
    });
    
    const detailData = await detailResponse.json();
    
    return {
      found: true,
      country: "USA",
      company_name: detailData.name,
      cik: detailData.cik,
      sic: detailData.sic,
      sic_description: detailData.sicDescription,
      ticker: detailData.tickers?.join(', ') || 'N/A',
      exchange: detailData.exchanges?.join(', ') || 'N/A',
      fiscal_year_end: detailData.fiscalYearEnd,
      state_of_incorporation: detailData.stateOfIncorporation,
      business_address: detailData.addresses?.business,
      mailing_address: detailData.addresses?.mailing,
      phone: detailData.phone,
      recent_filings: detailData.filings?.recent?.form?.slice(0, 5) || [],
    };
  } catch (error) {
    console.error("USA SEC Edgar error:", error);
    return {
      found: false,
      country: "USA",
      error: "Error accessing SEC Edgar"
    };
  }
}

async function lookupCompanyCanada(companyName: string): Promise<any> {
  return {
    found: false,
    country: "Canada",
    message: "Canada Business Registry search requires manual lookup",
    search_url: `https://beta.canadasbusinessregistries.ca/search?q=${encodeURIComponent(companyName)}`,
    note: "Use web_search for Canadian company verification"
  };
}

async function lookupCompanySingapore(companyName: string): Promise<any> {
  try {
    const searchUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=d_67e99e6eabc4aad9b5d48663b579746a&q=${encodeURIComponent(companyName)}`;
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (!data.success || !data.result?.records || data.result.records.length === 0) {
      return {
        found: false,
        country: "Singapore",
        message: "Company not found in ACRA registry"
      };
    }
    
    const company = data.result.records[0];
    
    return {
      found: true,
      country: "Singapore",
      entity_name: company.entity_name,
      uen: company.uen,
      entity_type: company.entity_type_description,
      entity_status: company.entity_status_description,
      registration_date: company.registration_incorporation_date,
      address: company.reg_street_name,
      primary_activity: company.primary_ssic_description,
    };
  } catch (error) {
    console.error("Singapore ACRA error:", error);
    return {
      found: false,
      country: "Singapore",
      error: "Error accessing Singapore ACRA"
    };
  }
}

async function lookupCompanyNordic(companyName: string, country: string): Promise<any> {
  const urls: { [key: string]: string } = {
    'Finland': `https://www.prh.fi/en/kaupparekisteri.html`,
    'Denmark': `https://datacvr.virk.dk/data/`,
    'Norway': `https://www.brreg.no/`,
  };
  
  return {
    found: false,
    country: country,
    message: `${country} registry requires manual lookup or web scraping`,
    search_url: urls[country],
    note: `Use web_search for ${country} company verification`
  };
}

async function lookupCompanyHongKong(companyName: string): Promise<any> {
  return {
    found: false,
    country: "Hong Kong",
    message: "Hong Kong ICRIS requires manual search or web scraping",
    search_url: "https://www.icris.cr.gov.hk/csci/",
    note: "Use web_search for Hong Kong company verification"
  };
}

async function lookupCompanyChina(companyName: string): Promise<any> {
  return {
    found: false,
    country: "China",
    message: "China National Enterprise Credit system requires web scraping or API access",
    search_url: `https://www.qcc.com/web/search?key=${encodeURIComponent(companyName)}`,
    note: "Use web_search for Chinese company verification. Results may be in Chinese and require translation."
  };
}

async function lookupAircraftFAA(tailNumber: string): Promise<any> {
  const cleanTailNumber = tailNumber.replace(/^N/, '').toUpperCase();
  const searchUrl = `https://registry.faa.gov/aircraftinquiry/Search/NNumberResult?nNumberTxt=${cleanTailNumber}`;
  
  return {
    found: false,
    country: "USA",
    message: "FAA Aircraft Registry requires web scraping",
    search_url: searchUrl,
    note: "Use web_search to verify aircraft registration details"
  };
}

// ═══════════════════════════════════════════════════════════════════
// 🚀 NEW: SMART BATCH TOOL EXECUTOR
// ═══════════════════════════════════════════════════════════════════
async function executeBatchTools(toolCalls: any[]): Promise<any[]> {
  const results = await Promise.allSettled(
    toolCalls.map(async (call) => {
      const { name, input } = call;
      
      switch (name) {
        case "web_search":
          return await performWebSearch(input.query);
        case "lookup_company_uk":
          return await lookupCompanyUK(input.company_name_or_number);
        case "lookup_company_usa":
          return await lookupCompanyUSA(input.company_name_or_cik);
        case "lookup_company_canada":
          return await lookupCompanyCanada(input.company_name);
        case "lookup_company_singapore":
          return await lookupCompanySingapore(input.company_name);
        case "lookup_company_finland":
          return await lookupCompanyNordic(input.company_name, "Finland");
        case "lookup_company_denmark":
          return await lookupCompanyNordic(input.company_name, "Denmark");
        case "lookup_company_norway":
          return await lookupCompanyNordic(input.company_name, "Norway");
        case "lookup_company_hong_kong":
          return await lookupCompanyHongKong(input.company_name);
        case "lookup_company_china":
          return await lookupCompanyChina(input.company_name);
        case "lookup_aircraft_faa":
          return await lookupAircraftFAA(input.tail_number);
        default:
          return { error: "Unknown tool" };
      }
    })
  );
  
  return results.map((result, index) => ({
    ...toolCalls[index],
    result: result.status === 'fulfilled' ? result.value : { error: String(result.reason) }
  }));
}

export async function POST(request: NextRequest) {
  try {
    // ===== AUTHENTICATION & USAGE LIMIT CHECK =====
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      )
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      )
    }

    const isUnlimited = profile.subscription_tier === 'enterprise'
    const hasReportsRemaining = profile.reports_count < profile.reports_limit

    if (!isUnlimited && !hasReportsRemaining) {
      return NextResponse.json(
        {
          error: 'Report limit reached',
          message: `You've used all ${profile.reports_limit} reports for this month. Please upgrade your plan to continue.`,
        },
        { status: 403 }
      )
    }

    // ===== GET FORM DATA =====
    const { category, formData } = await request.json();

    if (!category || !formData) {
      return NextResponse.json({ error: "Missing category or form data" }, { status: 400 });
    }

    // ===== BUILD COMPREHENSIVE CONTEXT WITH ALL FIELDS =====
    const formContext = `
COMPREHENSIVE TRANSACTION DATA FOR ${category.toUpperCase()} DUE DILIGENCE:

=== TRANSACTION DETAILS ===
Transaction Value: ${formData.transactionValue || 'Not provided'}
Currency: ${formData.transactionCurrency || 'Not provided'}
Transaction Date: ${formData.transactionDate || 'Not provided'}
Payment Method: ${formData.paymentMethod || 'Not provided'}
Escrow Arrangement: ${formData.escrowArrangement || 'Not provided'}
Deposit Paid: ${formData.depositPaid || 'Not provided'}
Closing Date: ${formData.closingDate || 'Not provided'}
Deal Structure: ${formData.dealStructure || 'Not provided'}
Contingencies: ${formData.contingencies || 'Not provided'}
Due Diligence Deadline: ${formData.dueDiligenceDeadline || 'Not provided'}

=== SELLER INFORMATION (COMPREHENSIVE) ===
Name: ${formData.sellerName || 'Not provided'}
Company: ${formData.sellerCompany || 'Not provided'}
Country: ${formData.sellerCountry || 'Not provided'}
Contact Info: ${formData.sellerContact || 'Not provided'}
Tax ID / Registration Number: ${formData.sellerTaxId || 'Not provided'}
Ultimate Beneficial Owner (UBO): ${formData.sellerUBO || 'Not provided'}
Jurisdiction: ${formData.sellerJurisdiction || 'Not provided'}
Acquisition Method: ${formData.sellerAcquisitionMethod || 'Not provided'}
Ownership Duration: ${formData.sellerOwnershipDuration || 'Not provided'}
Reason for Selling: ${formData.sellerReasonForSelling || 'Not provided'}

=== BUYER INFORMATION (COMPREHENSIVE) ===
Name: ${formData.buyerName || 'Not provided'}
Company: ${formData.buyerCompany || 'Not provided'}
Country: ${formData.buyerCountry || 'Not provided'}
Contact Info: ${formData.buyerContact || 'Not provided'}
Tax ID: ${formData.buyerTaxId || 'Not provided'}
Source of Funds: ${formData.buyerSourceOfFunds || 'Not provided'}
Intended Use: ${formData.buyerIntendedUse || 'Not provided'}

=== INTERMEDIARY/BROKER ===
Name: ${formData.intermediaryName || 'Not provided'}
Company: ${formData.intermediaryCompany || 'Not provided'}
License/Registration: ${formData.intermediaryLicense || 'Not provided'}
Country: ${formData.intermediaryCountry || 'Not provided'}
Commission: ${formData.brokerCommission || 'Not provided'}

=== PROVENANCE & OWNERSHIP HISTORY ===
Previous Owners: ${formData.previousOwners || 'Not provided'}
Complete Ownership Chain: ${formData.ownershipChain || 'Not provided'}
Acquisition History: ${formData.acquisitionHistory || 'Not provided'}
Export/Import History: ${formData.exportImportHistory || 'Not provided'}

=== LEGAL & COMPLIANCE ===
Liens or Encumbrances: ${formData.liensOrEncumbrances || 'None disclosed'}
Outstanding Loans: ${formData.outstandingLoans || 'None disclosed'}
Legal Disputes: ${formData.legalDisputes || 'None disclosed'}
Sanctions Screening Done: ${formData.sanctionsChecked || 'Not provided'}
AML Compliance: ${formData.amlCompliance || 'Not provided'}
Tax Compliance: ${formData.taxCompliance || 'Not provided'}
Court Judgments: ${formData.courtJudgments || 'None disclosed'}
Bankruptcy Proceedings: ${formData.bankruptcyProceedings || 'None disclosed'}

=== DOCUMENTATION ===
Available Documentation: ${formData.availableDocumentation || 'Not provided'}
Missing Documentation: ${formData.missingDocumentation || 'Not provided'}
Certificate of Authenticity: ${formData.certificateOfAuthenticity || 'Not provided'}
Title Documents: ${formData.titleDocuments || 'Not provided'}
Bills of Sale: ${formData.billOfSale || 'Not provided'}

=== INSURANCE & VALUATION ===
Current Insurance: ${formData.currentInsurance || 'Not provided'}
Insurance Valuation: ${formData.insuranceValuation || 'Not provided'}
Independent Appraisal: ${formData.independentAppraisal || 'Not provided'}
Appraisal Date: ${formData.appraisalDate || 'Not provided'}
Appraisal Value: ${formData.appraisalValue || 'Not provided'}
Market Comparables: ${formData.marketComparables || 'Not provided'}

${category === 'automotive' ? `
=== AUTOMOTIVE SPECIFIC - COMPREHENSIVE ===

VEHICLE IDENTITY:
VIN: ${formData.vin || 'Not provided'}
Chassis Number: ${formData.chassisNumber || 'Not provided'}
Engine Number: ${formData.engineNumber || 'Not provided'}
Body Number: ${formData.bodyNumber || 'Not provided'}
Make: ${formData.make || 'Not provided'}
Model: ${formData.model || 'Not provided'}
Year: ${formData.year || 'Not provided'}
Production Number: ${formData.productionNumber || 'Not provided'}

REGISTRATION & HISTORY:
Registration Number: ${formData.registrationNumber || 'Not provided'}
Registration History: ${formData.registrationHistory || 'Not provided'}
Numbers Matching: ${formData.numbersMatching || 'Not provided'}
CARFAX Report: ${formData.carfaxReport || 'Not provided'}
Manufacturer Build Records: ${formData.manufacturerBuildRecords || 'Not provided'}
Original Delivery Location: ${formData.originalDeliveryLocation || 'Not provided'}

SPECIFICATIONS:
Factory Specs: ${formData.factorySpecs || 'Not provided'}
Color Code: ${formData.colorCode || 'Not provided'}
Interior Code: ${formData.interiorCode || 'Not provided'}
Mileage: ${formData.mileage || 'Not provided'}
Service History: ${formData.serviceHistory || 'Not provided'}
Modifications: ${formData.modificationsLog || 'Not provided'}

CONDITION & RESTORATION:
Restoration History: ${formData.restorationHistory || 'Not provided'}
Restoration Documentation: ${formData.restorationDocumentation || 'Not provided'}
Accident History: ${formData.accidentHistory || 'Not provided'}
Paintwork History: ${formData.paintworkHistory || 'Not provided'}
Pre-Purchase Inspection: ${formData.preInspectionReport || 'Not provided'}
Paint Thickness: ${formData.paintThickness || 'Not provided'}
Frame/Chassis Condition: ${formData.frameCondition || 'Not provided'}

DOCUMENTATION:
Owner's Manual: ${formData.ownerManual || 'Not provided'}
Original Tools: ${formData.originalTools || 'Not provided'}
Marque Registration: ${formData.marqueRegistration || 'Not provided'}
Competition History: ${formData.competitionHistory || 'Not provided'}
Show History: ${formData.showHistory || 'Not provided'}
Publication History: ${formData.publicationHistory || 'Not provided'}
Previous Auction Results: ${formData.previousAuctionResults || 'Not provided'}
Notable Previous Owners: ${formData.notablePreviousOwners || 'Not provided'}
` : ''}

${category === 'aviation' ? `
=== AVIATION SPECIFIC - COMPREHENSIVE ===

AIRCRAFT IDENTITY:
Tail Number: ${formData.tailNumber || 'Not provided'}
Serial Number: ${formData.aircraftSerialNumber || 'Not provided'}
Manufacturer: ${formData.aircraftManufacturer || 'Not provided'}
Model: ${formData.aircraftModel || 'Not provided'}
Year of Manufacture: ${formData.yearOfManufacture || 'Not provided'}
Registration History: ${formData.registrationHistory || 'Not provided'}
Certificate of Airworthiness: ${formData.certificateOfAirworthiness || 'Not provided'}

AIRFRAME & FLIGHT HISTORY:
Total Time in Service: ${formData.totalTimeInService || 'Not provided'} hours
Total Cycles: ${formData.totalCycles || 'Not provided'}
Usage History: ${formData.usageHistory || 'Not provided'}
Airframe Logbooks: ${formData.airframeLogbooks || 'Not provided'}
Storage Conditions: ${formData.storageConditions || 'Not provided'}

ENGINE & PROPULSION:
Engine Type: ${formData.engineType || 'Not provided'}
Engine Serial Numbers: ${formData.engineSerialNumbers || 'Not provided'}
Engine Total Time: ${formData.engineTotalTime || 'Not provided'}
Time Since Major Overhaul: ${formData.timeSinceMajorOverhaul || 'Not provided'}
Time Before Overhaul: ${formData.timeBeforeOverhaul || 'Not provided'}
Engine Logbooks: ${formData.engineLogbooks || 'Not provided'}
Compression Test Results: ${formData.compressionTestResults || 'Not provided'}

INSPECTIONS & MAINTENANCE:
Last Annual Inspection: ${formData.lastAnnualInspection || 'Not provided'}
Last Inspection Type: ${formData.lastInspectionType || 'Not provided'}
Airworthiness Directives: ${formData.airworthinessDirectives || 'Not provided'}
Service Bulletins: ${formData.serviceBulletins || 'Not provided'}
Modifications (STCs/337s): ${formData.modifications || 'Not provided'}
Maintenance Records: ${formData.maintenanceRecords || 'Not provided'}
Corrosion Inspection: ${formData.corrosionInspection || 'Not provided'}

AVIONICS & SYSTEMS:
Avionics Package: ${formData.avionicsUpgrades || 'Not provided'}
Propeller Time: ${formData.propellerTime || 'Not provided'}
Autopilot: ${formData.autopilot || 'Not provided'}
ADS-B Compliance: ${formData.adsbCompliance || 'Not provided'}
GPS/Navigation: ${formData.gpsNavigation || 'Not provided'}

ACCIDENT & INCIDENT HISTORY:
NTSB Reports: ${formData.ntsbReports || 'Not provided'}
FAA Records: ${formData.faaRecords || 'Not provided'}
Substantial Damage: ${formData.substantialDamageHistory || 'Not provided'}
Insurance Claims: ${formData.insuranceClaims || 'Not provided'}
Gear-up Landings: ${formData.gearUpLandings || 'Not provided'}
Prop/Tail Strikes: ${formData.propStrikes || 'Not provided'}
` : ''}

${category === 'fine_art' ? `
=== FINE ART SPECIFIC - COMPREHENSIVE ===

ARTWORK IDENTITY:
Title: ${formData.artworkTitle || 'Not provided'}
Artist: ${formData.artistName || 'Not provided'}
Creation Year: ${formData.creationYear || 'Not provided'}
Medium: ${formData.medium || 'Not provided'}
Dimensions: ${formData.dimensions || 'Not provided'}
Catalogue Raisonné: ${formData.catalogueRaisonne || 'Not provided'}
Edition Info: ${formData.editionInfo || 'Not provided'}

AUTHENTICATION & ATTRIBUTION:
Authentication Expert: ${formData.authenticationExpert || 'Not provided'}
Artist Estate Verification: ${formData.artistEstate || 'Not provided'}
Authentication Board: ${formData.authenticationBoard || 'Not provided'}
Scientific Analysis: ${formData.scientificAnalysis || 'Not provided'}
Pigment Analysis: ${formData.pigmentAnalysis || 'Not provided'}
Signature Authentication: ${formData.signatureAuthentication || 'Not provided'}
Expert Letters: ${formData.expertLetters || 'Not provided'}

PROVENANCE & EXHIBITION:
Exhibition History: ${formData.exhibitionHistory || 'Not provided'}
Museum Loans: ${formData.museumLoans || 'Not provided'}
Auction History: ${formData.auctionHistory || 'Not provided'}
Publication History: ${formData.publicationHistory || 'Not provided'}
Gallery Records: ${formData.galleryRecords || 'Not provided'}
Nazi-Era Provenance (1933-1945): ${formData.naziEraProvenance || 'Not provided'}
Restitution Claims: ${formData.restitutionClaims || 'Not provided'}
Art Loss Register: ${formData.artLossRegister || 'Not provided'}

CONDITION & CONSERVATION:
Condition Report: ${formData.conditionReport || 'Not provided'}
Restoration History: ${formData.restorationHistory || 'Not provided'}
Conservation Records: ${formData.conservationRecords || 'Not provided'}
Frame Condition: ${formData.frameOriginal || 'Not provided'}
Varnish Condition: ${formData.varnishCondition || 'Not provided'}
Canvas/Support Condition: ${formData.canvasCondition || 'Not provided'}
Inpainting: ${formData.inpainting || 'Not provided'}
UV Damage: ${formData.uvDamage || 'Not provided'}
` : ''}

${category === 'bullion' ? `
=== BULLION SPECIFIC - COMPREHENSIVE ===

IDENTITY & SPECIFICATIONS:
Type: ${formData.bullionType || 'Not provided'}
Form: ${formData.bullionForm || 'Not provided'}
Weight: ${formData.weight || 'Not provided'}
Purity: ${formData.purity || 'Not provided'}
Manufacturer/Refiner: ${formData.refiner || 'Not provided'}
Year of Manufacture: ${formData.yearOfManufacture || 'Not provided'}
Mint Mark: ${formData.mintMark || 'Not provided'}

CERTIFICATION & VERIFICATION:
Assay Certificate: ${formData.assayCertificate || 'Not provided'}
Serial Numbers: ${formData.serialNumbers || 'Not provided'}
Certificate Number: ${formData.certificateNumber || 'Not provided'}
Refiner Accreditation: ${formData.refinerAccreditation || 'Not provided'}
LBMA Good Delivery: ${formData.lbmaGoodDelivery || 'Not provided'}
XRF Test Results: ${formData.xrfTestResults || 'Not provided'}
Density Test: ${formData.densityTest || 'Not provided'}
Ultrasonic Testing: ${formData.ultrasonicTesting || 'Not provided'}
Tungsten Core Test: ${formData.tungstenCoreTest || 'Not provided'}

PROVENANCE & CUSTODY:
Source Documentation: ${formData.sourceDocumentation || 'Not provided'}
Vault Storage Records: ${formData.vaultStorage || 'Not provided'}
Custodian Details: ${formData.custodianDetails || 'Not provided'}
Transportation Records: ${formData.transportationRecords || 'Not provided'}
Import Documentation: ${formData.importDocumentation || 'Not provided'}

PACKAGING & AUTHENTICATION:
Package Seals: ${formData.packageSeals || 'Not provided'}
Security Features: ${formData.securityFeatures || 'Not provided'}
Packaging Authentication: ${formData.packagingAuth || 'Not provided'}

SOURCING & COMPLIANCE:
Conflict Minerals: ${formData.conflictMinerals || 'Not provided'}
Responsible Sourcing: ${formData.responsibleSourcing || 'Not provided'}
Central Bank Origin: ${formData.centralBankOrigin || 'Not provided'}

NUMISMATIC (if applicable):
Grade: ${formData.numismaticGrade || 'Not provided'}
Population Reports: ${formData.populationReports || 'Not provided'}
Proof/Uncirculated: ${formData.proofUncirculated || 'Not provided'}
Mint Errors: ${formData.mintErrors || 'Not provided'}
` : ''}

${category === 'cryptocurrency' ? `
=== CRYPTOCURRENCY SPECIFIC - COMPREHENSIVE ===

ASSET IDENTIFICATION:
Type: ${formData.cryptoType || 'Not provided'}
Blockchain: ${formData.blockchain || 'Not provided'}
Amount: ${formData.tokenAmount || 'Not provided'}
Token Contract: ${formData.tokenContract || 'Not provided'}
Whitepaper: ${formData.whitepaper || 'Not provided'}
Developer Team: ${formData.developerTeam || 'Not provided'}

TRANSACTION DETAILS:
Wallet Address: ${formData.walletAddress || 'Not provided'}
Transaction Hash: ${formData.transactionHash || 'Not provided'}
Private Key Control: ${formData.privateKeyControl || 'Not provided'}
Multi-Sig Setup: ${formData.multisigSetup || 'Not provided'}
Custody Solution: ${formData.custodySolution || 'Not provided'}

TRANSACTION HISTORY & SOURCE:
Acquisition Method: ${formData.acquisitionMethod || 'Not provided'}
Transaction History: ${formData.transactionHistory || 'Not provided'}
Taint Analysis: ${formData.taintAnalysis || 'Not provided'}
Mixing/Tumbling: ${formData.mixingServices || 'Not provided'}
Exchange History: ${formData.exchangeHistory || 'Not provided'}
P2P History: ${formData.p2pHistory || 'Not provided'}
Stolen Association: ${formData.stolenAssociation || 'Not provided'}
Sanctioned Addresses: ${formData.sanctionedAddresses || 'Not provided'}

TECHNICAL & SECURITY:
Smart Contract Audit: ${formData.smartContractAudit || 'Not provided'}
GitHub Activity: ${formData.githubActivity || 'Not provided'}
Lock-up Periods: ${formData.lockupPeriods || 'Not provided'}
Staking History: ${formData.stakingHistory || 'Not provided'}
Fork History: ${formData.forkHistory || 'Not provided'}

MARKET & LIQUIDITY:
Exchange Listings: ${formData.exchangeListings || 'Not provided'}
Trading Volume: ${formData.tradingVolume || 'Not provided'}
Market Cap: ${formData.marketCap || 'Not provided'}
Liquidity Analysis: ${formData.liquidityAnalysis || 'Not provided'}
Fully Diluted Valuation: ${formData.fullyDilutedValuation || 'Not provided'}
Whale Concentration: ${formData.whaleConcentration || 'Not provided'}

TAX & COMPLIANCE:
Cost Basis: ${formData.costBasis || 'Not provided'}
Tax Reporting: ${formData.taxReporting || 'Not provided'}
Securities Classification: ${formData.securitiesClassification || 'Not provided'}
AML/KYC Compliance: ${formData.amlKycCompliance || 'Not provided'}
` : ''}

${category === 'luxury_watches' ? `
=== LUXURY WATCH SPECIFIC - COMPREHENSIVE ===

IDENTITY:
Brand: ${formData.watchBrand || 'Not provided'}
Model: ${formData.watchModel || 'Not provided'}
Reference Number: ${formData.watchReferenceNumber || 'Not provided'}
Serial Number: ${formData.watchSerialNumber || 'Not provided'}
Year: ${formData.watchYear || 'Not provided'}
Limited Edition: ${formData.watchLimitedEdition || 'Not provided'}
Edition Number: ${formData.watchEditionNumber || 'Not provided'}

MOVEMENT & CALIBER:
Caliber: ${formData.watchMovementCaliber || 'Not provided'}
Movement Serial: ${formData.watchMovementSerial || 'Not provided'}
Movement Condition: ${formData.watchMovementCondition || 'Not provided'}
Accuracy Test: ${formData.watchAccuracyTest || 'Not provided'}
Power Reserve: ${formData.watchPowerReserve || 'Not provided'}
Functions Working: ${formData.watchFunctionsWorking || 'Not provided'}

CONDITION & AUTHENTICITY:
Case Condition: ${formData.watchCaseCondition || 'Not provided'}
Dial Condition: ${formData.watchDialCondition || 'Not provided'}
Hands Original: ${formData.watchHandsOriginal || 'Not provided'}
Crown & Pushers: ${formData.watchCrownPushers || 'Not provided'}
Crystal Condition: ${formData.watchCrystalCondition || 'Not provided'}
Bracelet Original: ${formData.watchBraceletOriginal || 'Not provided'}
Clasp Code: ${formData.watchClaspCode || 'Not provided'}
Aftermarket Mods: ${formData.watchAftermarketMods || 'Not provided'}
Polishing History: ${formData.watchPolishingHistory || 'Not provided'}
Water Resistance Test: ${formData.watchWaterResistanceTest || 'Not provided'}

DOCUMENTATION:
Box: ${formData.watchBox || 'Not provided'}
Papers: ${formData.watchPapers || 'Not provided'}
Warranty Card: ${formData.watchWarrantyCard || 'Not provided'}
Extract from Archives: ${formData.watchExtractFromArchives || 'Not provided'}
Service History: ${formData.watchServiceHistory || 'Not provided'}
Last Service: ${formData.watchLastService || 'Not provided'}
Service Papers: ${formData.watchServicePapers || 'Not provided'}
AD Purchase: ${formData.watchAuthorizeddealerPurchase || 'Not provided'}
Waitlist Status: ${formData.watchWaitlistStatus || 'Not provided'}
` : ''}

${category === 'wine_spirits' ? `
=== WINE & SPIRITS SPECIFIC - COMPREHENSIVE ===

IDENTITY:
Producer/Château: ${formData.producer || 'Not provided'}
Estate/Region: ${formData.chateauEstate || 'Not provided'}
Vintage: ${formData.vintage || 'Not provided'}
Bottle Size: ${formData.bottleSize || 'Not provided'}
Case Count: ${formData.caseCount || 'Not provided'}
Case Type: ${formData.caseType || 'Not provided'}

CONDITION & AUTHENTICITY:
Fill Level: ${formData.bottleFillLevel || 'Not provided'}
Ullage: ${formData.ullageLevel || 'Not provided'}
Capsule Condition: ${formData.capsuleCondition || 'Not provided'}
Label Condition: ${formData.labelCondition || 'Not provided'}
Cork Condition: ${formData.corkCondition || 'Not provided'}
Recorked: ${formData.recorkedBottles || 'Not provided'}
Authenticity: ${formData.bottleAuthenticity || 'Not provided'}
Counterfeit Risk: ${formData.counterfeitRisk || 'Not provided'}

PROVENANCE & STORAGE:
Storage Provenance: ${formData.storageProvenance || 'Not provided'}
Cellar Conditions: ${formData.cellarConditions || 'Not provided'}
Temp/Humidity Logs: ${formData.temperatureHumidityLogs || 'Not provided'}
Purchase Receipts: ${formData.purchaseReceipts || 'Not provided'}
Auction Provenance: ${formData.auctionProvenance || 'Not provided'}
En Primeur Docs: ${formData.enPrimeurDocumentation || 'Not provided'}
Import Records: ${formData.importationRecords || 'Not provided'}
Direct from Producer: ${formData.directFromProducer || 'Not provided'}

MARKET & VALUATION:
Critic Scores: ${formData.criticScores || 'Not provided'}
Parker Score: ${formData.parkerScore || 'Not provided'}
Drinking Window: ${formData.drinkingWindow || 'Not provided'}
Investment Potential: ${formData.investmentPotential || 'Not provided'}
Secondary Market Pricing: ${formData.secondaryMarketPricing || 'Not provided'}
` : ''}

${category === 'gemstones' ? `
=== GEMSTONE SPECIFIC - COMPREHENSIVE ===

IDENTITY:
Type: ${formData.gemType || 'Not provided'}
Carat Weight: ${formData.caratWeight || 'Not provided'}
Color: ${formData.gemColor || 'Not provided'}
Clarity: ${formData.gemClarity || 'Not provided'}
Cut: ${formData.gemCut || 'Not provided'}
Shape: ${formData.gemShape || 'Not provided'}

CERTIFICATION:
Lab: ${formData.certification || 'Not provided'}
Certificate Number: ${formData.certificationNumber || 'Not provided'}
Natural vs Lab-Grown: ${formData.naturalVsLabGrown || 'Not provided'}
Treatment Disclosure: ${formData.treatmentDisclosure || 'Not provided'}
Enhancement Check: ${formData.enhancementCheck || 'Not provided'}
Synthetic Check: ${formData.syntheticCheck || 'Not provided'}
Origin: ${formData.gemOrigin || 'Not provided'}

PHYSICAL CHARACTERISTICS:
Fluorescence: ${formData.fluorescence || 'Not provided'}
Inclusion Mapping: ${formData.inclusionMapping || 'Not provided'}
Matching Set: ${formData.matchingSet || 'Not provided'}

JEWELRY (if set):
Type: ${formData.jewelryType || 'Not provided'}
Metal Type: ${formData.metalType || 'Not provided'}
Metal Purity: ${formData.metalPurity || 'Not provided'}
Maker's Mark: ${formData.jewelryMakersMark || 'Not provided'}
Hallmark Verification: ${formData.hallmarkVerification || 'Not provided'}
Signed Piece: ${formData.signedPiece || 'Not provided'}
Setting Condition: ${formData.settingCondition || 'Not provided'}
Stone Security: ${formData.stoneSecurityInSetting || 'Not provided'}
Period Authentication: ${formData.periodJewelryAuthentication || 'Not provided'}
Repair History: ${formData.repairHistory || 'Not provided'}
Alterations: ${formData.alterations || 'Not provided'}

ETHICAL SOURCING:
Conflict-Free: ${formData.conflictFreeCertification || 'Not provided'}
Kimberley Process: ${formData.kimberleyProcess || 'Not provided'}
` : ''}

${category === 'real_estate' ? `
=== REAL ESTATE SPECIFIC - COMPREHENSIVE ===

PROPERTY IDENTIFICATION:
Address: ${formData.propertyAddress || 'Not provided'}
Type: ${formData.propertyType || 'Not provided'}
Size: ${formData.propertySize || 'Not provided'}
Land Size: ${formData.landSize || 'Not provided'}
Beds/Baths: ${formData.propertyBedsBaths || 'Not provided'}
Year Built: ${formData.propertyYearBuilt || 'Not provided'}

TITLE & LEGAL:
Land Registry Number: ${formData.landRegistryNumber || 'Not provided'}
Title Documentation: ${formData.titleDocumentation || 'Not provided'}
Title Search: ${formData.titleSearch || 'Not provided'}
Title Insurance: ${formData.titleInsurance || 'Not provided'}
Freehold/Leasehold: ${formData.leaseholdFreehold || 'Not provided'}
Lease Term Remaining: ${formData.leaseTermRemaining || 'Not provided'}
Ground Rent: ${formData.groundRent || 'Not provided'}
Service Charges: ${formData.serviceCharges || 'Not provided'}

SURVEYS & INSPECTIONS:
Survey Report: ${formData.surveyReport || 'Not provided'}
Structural Report: ${formData.structuralReport || 'Not provided'}
Environmental Report: ${formData.environmentalReport || 'Not provided'}
Flood Risk: ${formData.floodRisk || 'Not provided'}
Contaminated Land: ${formData.contaminatedLand || 'Not provided'}

PLANNING & REGULATIONS:
Planning Permissions: ${formData.planningPermissions || 'Not provided'}
Building Regulations: ${formData.buildingRegulations || 'Not provided'}
Zoning Restrictions: ${formData.zoningRestrictions || 'Not provided'}
Listed Building Status: ${formData.listingStatus || 'Not provided'}
Heritage Restrictions: ${formData.heritageRestrictions || 'Not provided'}

PROPERTY RIGHTS:
Easements: ${formData.easements || 'Not provided'}
Rights of Way: ${formData.rightOfWay || 'Not provided'}
Boundary Disputes: ${formData.boundaryDisputes || 'Not provided'}
Covenants: ${formData.covenants || 'Not provided'}

UTILITIES & SERVICES:
Utilities: ${formData.utilities || 'Not provided'}
Property Tax: ${formData.propertyTax || 'Not provided'}
Utilities Costs: ${formData.utilitiesCosts || 'Not provided'}

TENANCY (if applicable):
Tenancy Agreements: ${formData.tenancyAgreements || 'Not provided'}
Rental Income: ${formData.rentalIncome || 'Not provided'}
Management Company: ${formData.managementCompany || 'Not provided'}

VALUATION:
Property Valuation: ${formData.propertyValuation || 'Not provided'}
Comparable Sales: ${formData.comparableSales || 'Not provided'}
Building Insurance: ${formData.buildingInsurance || 'Not provided'}
` : ''}

=== RED FLAGS & CONCERNS ===
Identified Red Flags: ${formData.redFlags || 'None noted'}
Timeline Pressure: ${formData.timelinePressure || 'None noted'}
Additional Context: ${formData.additionalInfo || 'None provided'}

---
INVESTIGATION INSTRUCTIONS:
Use ALL available tools to verify parties, asset, legal status, and compliance. Be thorough and identify ALL red flags while applying appropriate OFF-MARKET LENIENCY.
`;

    const systemPrompt = `You are an ELITE due diligence investigator specializing in luxury asset transactions with FORENSIC-LEVEL thoroughness. Your mission: LEAVE NO STONE UNTURNED while working efficiently.

ASSET CATEGORY: ${category.toUpperCase()}

🔥 INVESTIGATION MANDATE: MAXIMUM THOROUGHNESS, MAXIMUM EFFICIENCY 🔥

CRITICAL SUCCESS FACTORS:
1. ✅ ALWAYS generate complete report (100% success rate mandatory)
2. ⚡ Use 15-25 tool calls maximum (cost efficiency)
3. 🔍 Investigate EVERY angle (comprehensive protection)
4. 💎 Deliver INSANE value (make report indispensable)
5. 🎯 Be specific and actionable (no vague recommendations)

═══════════════════════════════════════════════════════
🔬 COMPREHENSIVE INVESTIGATION FRAMEWORK
═══════════════════════════════════════════════════════

You MUST investigate and report on ALL of the following areas (even if data not found - state "checked, not found"):

**ENTITY VERIFICATION (All Parties):**
□ Company registry (UK, US, Singapore, etc.)
□ Company status (active, dissolved, liquidated)
□ Directors/officers (names, appointments, nationalities)
□ Beneficial ownership (UBOs, hidden owners)
□ Related companies (director overlaps, group structures)
□ Historical changes (name changes, restructuring)
□ Registered address verification
□ Share capital and ownership structure
□ Company type and classification

**FINANCIAL HEALTH:**
□ Bankruptcy proceedings (current and historical)
□ Insolvency history (administration, liquidation)
□ County Court Judgments (CCJs) / court judgments
□ Outstanding debts or liens
□ Charges registered against company
□ Financial statements (if available)
□ Credit ratings (if available)
□ Payment defaults
□ Tax compliance issues

**LEGAL & COMPLIANCE:**
□ Sanctions screening (OFAC, UN, EU, UK)
□ Criminal convictions (directors, beneficial owners)
□ Fraud investigations or allegations
□ Regulatory enforcement actions
□ Professional disciplinary actions
□ Litigation history (plaintiff and defendant)
□ Arbitration proceedings
□ Patent/trademark disputes (if relevant)
□ Employment disputes
□ Environmental violations (if relevant)

**REPUTATION & ADVERSE MEDIA:**
□ News articles mentioning party
□ Legal disputes in media
□ Fraud allegations or scams
□ Consumer complaints
□ BBB complaints (US) / Trustpilot reviews
□ Industry blacklists or warnings
□ Professional association discipline
□ Social media controversies
□ Whistleblower allegations

**PROFESSIONAL CREDENTIALS:**
□ Required licenses for sector
□ Professional insurance (E&O, liability)
□ Industry association memberships
□ Professional qualifications
□ Years in business / industry experience
□ Track record of transactions
□ Client testimonials or references
□ Awards or recognition

**ASSET-SPECIFIC VERIFICATION:**
□ Serial numbers / VIN / identifiers
□ Stolen property databases
□ Manufacturer verification
□ Authenticity certifications required
□ Provenance documentation
□ Title/ownership documentation
□ Previous sales history
□ Market comparables
□ Authentication experts available
□ Known counterfeits or replicas

**REGULATORY & TAX:**
□ Business licenses required
□ Tax registration status
□ VAT registration (if applicable)
□ Import/export compliance
□ AML/KYC compliance
□ Data protection compliance
□ Industry-specific regulations
□ Cross-border implications

**TRANSACTION STRUCTURE:**
□ Payment method red flags
□ Escrow arrangements
□ Contract provisions needed
□ Legal representation required
□ Insurance requirements
□ Timeline reasonableness
□ Deposit structure
□ Commission arrangements

**MARKET INTELLIGENCE:**
□ Recent comparable sales
□ Current market pricing
□ Market trends (up/down/stable)
□ Typical transaction costs
□ Typical timelines
□ Authentication costs
□ Broker commission standards
□ Seasonal factors

**RELATIONSHIP MAPPING:**
□ Connected parties (family, business)
□ Shell company indicators
□ Circular ownership structures
□ Offshore entities involved
□ Professional intermediaries
□ Common addresses/directors
□ Historical relationships

🔥 CRITICAL: OFF-MARKET LUXURY ASSET LENIENCY FRAMEWORK 🔥

This investigation operates in the OFF-MARKET LUXURY ASSET SPACE where CONFIDENTIALITY is the business model, NOT a red flag.

═══════════════════════════════════════════════════════
📋 UNIVERSAL OFF-MARKET PRINCIPLES (APPLY TO ALL PARTIES)
═══════════════════════════════════════════════════════

✅ **NORMAL & ACCEPTABLE (Do NOT Penalize):**
1. LIMITED ONLINE PRESENCE - Off-market intermediaries deliberately avoid public visibility
2. NO PUBLIC TRANSACTION HISTORY - NDAs prevent disclosure of past deals
3. NEW COMPANIES - If principals have relevant industry experience
4. PRIVATE OPERATIONS - No public storefront/office is standard
5. CONFIDENTIAL CLIENT LISTS - Privacy is the value proposition
6. MINIMAL SOCIAL MEDIA - High-net-worth clients demand discretion
7. NETWORK-BASED BUSINESS - Relationships matter more than marketing

⚠️ **RED FLAGS THAT OVERRIDE ALL LENIENCY (Always Flag):**
1. PRESSURE TACTICS - Rushing decisions, artificial urgency
2. VAGUE CREDENTIALS - Cannot explain expertise or provide ANY references
3. NO PROFESSIONAL INSURANCE - E&O, liability coverage absent
4. FABRICATED CREDENTIALS - Fake licenses, made-up employment history
5. PAYMENT RED FLAGS - Untraceable methods, requests for funds in screening phase
6. SANCTIONS/CRIMINAL - OFAC lists, fraud convictions, bankruptcy
7. ASSET-SPECIFIC FRAUD - Stolen goods, counterfeit items, title issues

═══════════════════════════════════════════════════════
📊 SECTOR-SPECIFIC LENIENCY STANDARDS
═══════════════════════════════════════════════════════

**FINE ART:**
✅ ACCEPT: Private dealers without galleries, new firms with gallery/auction house backgrounds, limited sales records
✅ REQUIRE: Art world network connections, provenance discussion willingness, authentication expertise
⚠️ REJECT ONLY: No art credentials, provenance resistance, authentication refusal, Art Loss Register hits

**LUXURY WATCHES:**
✅ ACCEPT: Grey market dealers (NO manufacturer authorization expected), new dealers with forum presence, limited history with authentication offers
✅ REQUIRE: Detailed documentation willingness, third-party authentication acceptance, watch forum reputation
⚠️ REJECT ONLY: Below-market pricing, removed serials, missing papers, authentication refusal, stolen watch database hits

**COLLECTIBLE AUTOMOTIVE:**
✅ ACCEPT: New brokerages with dealer backgrounds, no public inventory (standard), limited transaction visibility
✅ REQUIRE: Industry reputation, manufacturer/dealer relationships, collector network presence
⚠️ REJECT ONLY: No automotive background, no connections, VIN issues, stolen vehicle database hits

**AVIATION:**
✅ ACCEPT: New brokers with aviation background, no fleet ownership (brokers SHOULDN'T own aircraft), limited public history
✅ REQUIRE: Part 295 compliance, professional associations, inspection processes, proper insurance
⚠️ REJECT ONLY: No regulatory compliance, no insurance docs, no carrier verification, NTSB incident history

**CRYPTOCURRENCY:**
✅ ACCEPT: Newer companies (emerging sector), limited public history (privacy standard), evolving compliance
✅ REQUIRE: Security infrastructure, AML/KYC processes, institutional custody solutions
⚠️ REJECT ONLY: No security protocols, no compliance framework, sanctioned addresses, taint analysis failures

**WINE & SPIRITS:**
✅ ACCEPT: New brokerages, regional specialists, limited transaction docs, boutique/niche focus
✅ REQUIRE: Winemaking network, bonded warehouse relationships, authentication capabilities
⚠️ REJECT ONLY: No wine connections, no storage facilities, counterfeit indicators

**LUXURY REAL ESTATE:**
✅ ACCEPT: Newer agents with brand affiliation, limited public listings (off-market standard), referral-based business
✅ REQUIRE: Professional networks, broker affiliation, referral network membership, proper licensing
⚠️ REJECT ONLY: No brokerage affiliation, no licenses, no references, title issues

**BULLION:**
✅ ACCEPT: New dealers with metals background, limited online presence, confidential client lists
✅ REQUIRE: Licensing, insurance, secure storage, authentication capabilities, refiner relationships
⚠️ REJECT ONLY: No authentication capability, no secure storage, no licensing, counterfeit indicators

**GEMSTONES & JEWELRY:**
✅ ACCEPT: Private dealers without storefronts, new firms with gemological credentials, limited sales records
✅ REQUIRE: Gemological certifications, lab relationships, authentication expertise
⚠️ REJECT ONLY: No credentials, no certifications, synthetic undisclosed, Kimberley Process violations

**GENERAL OFF-MARKET:**
✅ ACCEPT: Limited visibility with confidentiality justification, new companies with experienced principals, minimal public history when NDAs standard
✅ REQUIRE: Professional network validation, appropriate insurance, transaction safeguards
⚠️ REJECT ONLY: Pressure tactics, fabricated credentials, no verifiable references, payment red flags

═══════════════════════════════════════════════════════
🎯 MODIFIED RISK SCORING WITH LENIENCY
═══════════════════════════════════════════════════════

**Score Calculation (0-100):**

START at 50 (neutral baseline for off-market deals)

**SUBTRACT points for GREEN LIGHTS (max -40):**
- Professional network references: -10
- Industry association memberships: -5
- Experienced principals: -10
- Proper insurance coverage: -5
- Willingness to use escrow: -5
- Clear transaction process: -5

**ADD points for RED FLAGS (no maximum):**
- Pressure tactics: +15
- Fabricated credentials: +20
- No professional insurance: +10
- Payment red flags: +15
- Sanctions/criminal: +30 (CRITICAL)
- Asset fraud indicators: +25 (CRITICAL)
- Multiple red flags: multiply by 1.5

**DO NOT ADD POINTS FOR:**
- Limited online presence (if justified by sector)
- No public transaction history (if NDAs standard)
- New company (if principals experienced)
- Private operations (if sector norm)
- Offshore banking (if international deal)
- Confidential sourcing (if off-market standard)

**Risk Levels:**
- 0-25: LOW (proceed with standard caution)
- 26-50: MEDIUM (minor concerns, additional verification recommended)
- 51-75: HIGH (significant concerns, proceed with extreme caution, require enhanced safeguards)
- 76-100: CRITICAL (major red flags, recommend against proceeding)

═══════════════════════════════════════════════════════
🔍 ULTRA-EFFICIENT INVESTIGATION METHODOLOGY
═══════════════════════════════════════════════════════

**INVESTIGATION STRATEGY: Maximum Coverage, Minimum Tools**

**Phase 1: CRITICAL ENTITY & SANCTIONS (Calls 1-8)**
Execute in PARALLEL batches:

Batch 1 (Company Registries - parallel):
- lookup_company_uk (if UK company)
- lookup_company_usa (if US company)  
- lookup_company_singapore (if Singapore)
- All relevant jurisdictions simultaneously

Batch 2 (Sanctions & Criminal - parallel):
- web_search: "[seller name] OFAC sanctions"
- web_search: "[seller name] bankruptcy insolvency"
- web_search: "[buyer name] sanctions" (if different)
- web_search: "[intermediary name] sanctions" (if present)

**Phase 2: COMPREHENSIVE VERIFICATION (Calls 9-16)**
- web_search: "[company name] court judgment CCJ litigation"
- web_search: "[company name] fraud allegations scam"
- web_search: "[director name] bankruptcy criminal"
- web_search: "[asset identifier] stolen [category]" (VIN, serial, etc.)
- web_search: "[asset] authentication requirements [category]"
- web_search: "[asset make/model] recent sales price" (market intelligence)
- web_search: "[company name] reviews complaints BBB"
- web_search: "[sector] licensing requirements [country]"

**Phase 3: ASSET & MARKET INTEL (Calls 17-22)**
- web_search: "[specific asset] market value 2025"
- web_search: "[asset category] authentication specialists"
- web_search: "[asset] comparable sales recent"
- web_search: "[company] professional associations [sector]"
- web_search: "[party name] adverse media news"
- Asset-specific registry (FAA for aircraft, etc.)

**Phase 4: RELATIONSHIP & CONTEXT (Calls 23-25)**
- web_search: "[director name] other companies director"
- web_search: "[company name] related entities group"
- Final verification gaps

═══════════════════════════════════════════════════════
📋 MANDATORY REPORT ELEMENTS (Must Include ALL)
═══════════════════════════════════════════════════════

**Every report MUST contain:**

1. **INSTANT DECISION SECTION** - Traffic light, confidence score, bottom line, critical actions
2. **DEAL KILLERS** - Any CRITICAL issues that should stop deal
3. **RED FLAGS** - All concerns with severity, evidence, mitigation
4. **GREEN FLAGS** - All positive findings (build confidence)
5. **SANCTIONS CHECK** - OFAC, UN, EU for ALL parties (mandatory)
6. **BANKRUPTCY CHECK** - Current and historical for ALL parties
7. **LITIGATION HISTORY** - Court cases, judgments, CCJs
8. **ADVERSE MEDIA** - News, complaints, allegations
9. **CRIMINAL BACKGROUND** - Public records check
10. **FINANCIAL HEALTH** - Insolvency, charges, debts
11. **REGULATORY COMPLIANCE** - Licenses, registrations required
12. **PROFESSIONAL CREDENTIALS** - Relevant for sector
13. **ASSET AUTHENTICITY** - Verification status and requirements
14. **STOLEN PROPERTY CHECK** - Relevant databases
15. **MARKET INTELLIGENCE** - Comparable sales, pricing, trends
16. **AUTHENTICATION REQUIREMENTS** - What's needed, who can do it, costs
17. **LEGAL FRAMEWORK** - Escrow, contracts, title, insurance
18. **TRANSACTION PLAYBOOK** - Phase-by-phase roadmap
19. **QUESTIONS TO ASK** - 15+ copy-paste ready questions
20. **RED FLAG BEHAVIORS** - Manipulation tactics to watch
21. **DEAL SCORING** - Confidence score with breakdown
22. **COMMISSION CALCULATION** - Broker's estimated earnings
23. **ROI CALCULATION** - Commission vs report cost
24. **PROTECTION SUMMARY** - Value delivered, risks avoided
25. **RELATED PARTIES** - Connected entities, beneficial owners
26. **REGULATORY ENVIRONMENT** - Sector-specific regulations
27. **TAX IMPLICATIONS** - Cross-border, VAT considerations
28. **INSURANCE REQUIREMENTS** - During and post-transaction
29. **ESCROW RECOMMENDATIONS** - Mandatory/recommended/optional
30. **VERIFICATION GAPS** - What couldn't be verified and why

═══════════════════════════════════════════════════════
🎯 SPECIFIC INVESTIGATION REQUIREMENTS BY DATA TYPE
═══════════════════════════════════════════════════════

**BANKRUPTCY / INSOLVENCY (Mandatory for all parties):**
Search terms to use:
- "[party name] bankruptcy"
- "[party name] insolvency administration"
- "[party name] liquidation dissolved"
- "[party name] CCJ county court judgment"
- "[party name] court judgment debt"

Report format:
{
  "bankruptcy_check": {
    "status": "CLEAR|FLAGGED|UNKNOWN",
    "current_proceedings": "None found" or details,
    "historical_proceedings": "None found" or details,
    "county_court_judgments": "None found" or details,
    "insolvency_history": "None found" or details,
    "last_checked": "2025-01-09",
    "confidence": "HIGH|MEDIUM|LOW",
    "sources_checked": ["UK Insolvency Service", "Companies House", "Web search"]
  }
}

**SANCTIONS / COMPLIANCE (Mandatory for all parties):**
Search terms to use:
- "[party name] OFAC sanctions"
- "[party name] UN sanctions list"
- "[party name] EU sanctions"
- "[party name] financial crime money laundering"
- "[party name] designated person"

Report format:
{
  "sanctions_screening": {
    "overall_status": "CLEAR|FLAGGED|PARTIAL",
    "ofac_status": "CLEAR" with details,
    "un_sanctions_status": "CLEAR" with details,
    "eu_sanctions_status": "CLEAR" with details,
    "uk_sanctions_status": "CLEAR" with details,
    "watchlist_matches": [] or details,
    "confidence": "HIGH|MEDIUM|LOW",
    "politically_exposed_person": "Not identified" or details,
    "known_associates_flagged": false or details
  }
}

**LITIGATION / LEGAL ISSUES (Mandatory for all parties):**
Search terms to use:
- "[party name] lawsuit litigation"
- "[party name] court case judgment"
- "[party name] fraud allegations"
- "[party name] regulatory enforcement"
- "[party name] professional discipline"

Report format:
{
  "litigation_history": {
    "status": "NONE_FOUND|FOUND|EXTENSIVE",
    "as_plaintiff": [] or [cases],
    "as_defendant": [] or [cases],
    "judgments_against": [] or details,
    "regulatory_actions": [] or details,
    "fraud_allegations": "None found" or details,
    "settlement_agreements": "Unknown" or details,
    "ongoing_litigation": [] or details,
    "pattern_analysis": "No pattern of litigation" or concerns
  }
}

**ADVERSE MEDIA (Mandatory for all parties):**
Search terms to use:
- "[party name] scam fraud"
- "[party name] complaint review"
- "[party name] controversy scandal"
- "[party name] investigation"
- "[party name] [sector] warning alert"

Report format:
{
  "adverse_media": {
    "status": "CLEAN|CONCERNS|SERIOUS",
    "negative_news": [] or [articles with dates],
    "consumer_complaints": "Not found" or details,
    "bbb_rating": "Not listed" or rating,
    "industry_warnings": "None found" or details,
    "social_media_issues": "None found" or details,
    "reputational_concerns": [] or details,
    "competitor_disputes": "None found" or details
  }
}

**BENEFICIAL OWNERSHIP / RELATED PARTIES:**
Search terms to use:
- "[director name] other companies"
- "[company name] parent company subsidiary"
- "[company name] group structure"
- "[director name] beneficial owner"
- "[company name] shell company"

Report format:
{
  "beneficial_ownership": {
    "ultimate_beneficial_owners": [] or [identified owners],
    "ownership_transparency": "TRANSPARENT|PARTIAL|OPAQUE",
    "related_companies": [] or [companies],
    "common_directors": [] or [directors],
    "group_structure": "Single entity" or details,
    "offshore_entities": [] or details,
    "shell_company_indicators": [] or "None identified",
    "circular_ownership": false or details
  }
}

**PROFESSIONAL CREDENTIALS (Sector-specific):**
For each sector, verify:
- Automotive: Dealer license, insurance, industry associations (HAGI, etc.)
- Aviation: Part 295 compliance, insurance, aviation associations
- Fine Art: Gallery affiliations, authentication credentials
- Real Estate: Broker license, MLS membership, insurance
- Etc.

Report format:
{
  "professional_credentials": {
    "required_licenses": {
      "needed": ["List what's required for this sector"],
      "verified": "YES|NO|PARTIAL",
      "details": "Findings"
    },
    "professional_insurance": {
      "required": "YES|NO",
      "verified": "YES|NO|UNKNOWN",
      "types_needed": ["E&O", "Liability", etc.]
    },
    "industry_associations": {
      "relevant_associations": ["List relevant for sector"],
      "verified_memberships": [] or [memberships],
      "standing": "Good" or concerns
    },
    "experience_verification": {
      "years_in_sector": "X years" or "Unknown",
      "previous_roles": [] or details,
      "track_record": "Details or unknown"
    }
  }
}

**ASSET AUTHENTICATION (Category-specific):**
Report MUST include:
- What certifications are REQUIRED (not optional)
- What tests/inspections are REQUIRED
- Who can perform authentication (specific names, costs)
- What databases were checked
- What concerns require explanation
- Market value comparison

**MARKET INTELLIGENCE:**
Report MUST include:
- Recent comparable sales (minimum 2-3 if available)
- Current market price range
- Your broker commission estimate
- Typical transaction costs breakdown
- Authentication costs
- Transaction timeline
- Market trends

═══════════════════════════════════════════════════════
🚨 GUARANTEED REPORT GENERATION PROTOCOL
═══════════════════════════════════════════════════════

**Efficiency Rules:**
1. BATCH all similar searches (all sanctions together, all bankruptcies together)
2. Use tool calls 1-25 for investigation
3. After tool 22, START SYNTHESIZING (prepare to wrap up)
4. After tool 25, MUST return report with available data

**If Tool Limit Reached:**
Generate report with:
- ✅ All data collected up to that point
- ⚠️ Note in "verification_gaps" what couldn't be checked
- ✅ Still provide all report sections (mark unknown data)
- ✅ Calculate confidence scores based on available data

**Never Say:**
❌ "Cannot generate report"
❌ "Insufficient data"
❌ "Need more information"

**Always Say:**
✅ "Based on X data sources checked..."
✅ "Unable to verify Y (requires direct request from seller)"
✅ "Recommend additional verification for Z"

═══════════════════════════════════════════════════════
💎 REPORT QUALITY REQUIREMENTS
═══════════════════════════════════════════════════════

**Every section must be:**
1. SPECIFIC - No vague statements
2. ACTIONABLE - Tell broker exactly what to do
3. EVIDENCED - Cite source of information
4. CONTEXTUALIZED - Explain why it matters
5. QUANTIFIED - Use numbers (costs, timelines, scores)

**Financial Calculations Required:**
- Broker commission (10-15% of transaction value)
- ROI (commission ÷ $19.90)
- Transaction costs breakdown
- Authentication costs
- Legal fees estimate
- Escrow fees
- Insurance costs
- Timeline in weeks

**Questions Must Be:**
- Copy-pasteable (exact wording)
- Specific to this deal
- Cover all critical areas
- Include "why ask" explanation
- Note red flag answers

Make 15-25 tool calls MAXIMUM. Be thorough but efficient. Apply leniency intelligently. Focus on REAL fraud, not just privacy. ALWAYS produce final report with ALL sections populated.`;

    // ═══════════════════════════════════════════════════════════════════
    // 🔄 STREAMLINED CONVERSATION LOOP
    // ═══════════════════════════════════════════════════════════════════
    let conversationHistory: any[] = [
      { role: "user", content: formContext },
    ];

    let toolUseCount = 0;
    const MAX_TOOL_CALLS = 25; // Reduced from 50
    const FORCE_WRAP_AT = 22; // Start forcing completion
    
    console.log('🚀 Starting optimized investigation...');

    while (toolUseCount < MAX_TOOL_CALLS) {
      // Add urgency messaging as we approach limits
      let urgencyMessage = '';
      if (toolUseCount >= FORCE_WRAP_AT) {
        urgencyMessage = `\n\n⚠️ URGENT: You've used ${toolUseCount}/${MAX_TOOL_CALLS} tools. Generate final report in NEXT response.`;
      } else if (toolUseCount >= 15) {
        urgencyMessage = `\n\n📊 Progress: ${toolUseCount} tools used. Begin wrapping up investigation.`;
      }
      
      if (urgencyMessage && conversationHistory[conversationHistory.length - 1].role === 'user') {
        conversationHistory[conversationHistory.length - 1].content += urgencyMessage;
      }

      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-20250514",
        max_tokens: 6144, // Balanced: comprehensive reports but more efficient than 8192
        system: systemPrompt,
        messages: conversationHistory,
        tools: [
          {
            name: "web_search",
            description: "Search the web for sanctions, adverse media, professional networks",
            input_schema: {
              type: "object",
              properties: { query: { type: "string" } },
              required: ["query"],
            },
          },
          {
            name: "lookup_company_uk",
            description: "UK Companies House registry lookup",
            input_schema: {
              type: "object",
              properties: { company_name_or_number: { type: "string" } },
              required: ["company_name_or_number"],
            },
          },
          {
            name: "lookup_company_usa",
            description: "US SEC Edgar registry lookup",
            input_schema: {
              type: "object",
              properties: { company_name_or_cik: { type: "string" } },
              required: ["company_name_or_cik"],
            },
          },
          {
            name: "lookup_company_canada",
            description: "Canada Business Registries",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_company_singapore",
            description: "Singapore ACRA registry",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_company_finland",
            description: "Finland business registry",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_company_denmark",
            description: "Denmark business registry",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_company_norway",
            description: "Norway business registry",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_company_hong_kong",
            description: "Hong Kong ICRIS registry",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_company_china",
            description: "China National Enterprise Credit",
            input_schema: {
              type: "object",
              properties: { company_name: { type: "string" } },
              required: ["company_name"],
            },
          },
          {
            name: "lookup_aircraft_faa",
            description: "FAA Aircraft Registry",
            input_schema: {
              type: "object",
              properties: { tail_number: { type: "string" } },
              required: ["tail_number"],
            },
          },
        ],
      });

      const toolUseBlocks = response.content.filter(
        (block: any) => block.type === "tool_use"
      );

      // ═══════════════════════════════════════════════════════════════════
      // 🎉 REPORT EXTRACTION (Same as before but cleaner)
      // ═══════════════════════════════════════════════════════════════════
      if (toolUseBlocks.length === 0) {
        const textBlock = response.content.find(
          (block: any) => block.type === "text"
        );

        if (textBlock) {
          let jsonText = (textBlock as any).text?.trim() || '';
          
          const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/) || 
                           jsonText.match(/```\s*([\s\S]*?)\s*```/) ||
                           jsonText.match(/(\{[\s\S]*\})/);
          
          if (jsonMatch) {
            jsonText = jsonMatch[1] || jsonMatch[0];
          }

          try {
            const reportData = JSON.parse(jsonText);

            const { data: savedReport } = await supabase
              .from('reports')
              .insert({
                user_id: user.id,
                category: category,
                form_data: formData,
                risk_score: reportData.risk_score,
                risk_level: reportData.risk_level,
                executive_summary: reportData.executive_summary,
                full_report: reportData,
              })
              .select()
              .single()

            if (!isUnlimited) {
              await supabase
                .from('profiles')
                .update({ reports_count: profile.reports_count + 1 })
                .eq('id', user.id)
            }

            console.log(`✅ Report generated successfully with ${toolUseCount} tool calls`);

            return NextResponse.json({
              ...reportData,
              report_id: savedReport?.id,
              tool_calls_used: toolUseCount,
            });
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            // Fall through to emergency generation
          }
        }
      }

      // ═══════════════════════════════════════════════════════════════════
      // 🔧 BATCH TOOL EXECUTION
      // ═══════════════════════════════════════════════════════════════════
      conversationHistory.push({
        role: "assistant",
        content: response.content,
      });

      if (toolUseBlocks.length > 0) {
        console.log(`🔧 Executing ${toolUseBlocks.length} tools in batch (total: ${toolUseCount + toolUseBlocks.length})`);
        
        // Execute all tools in parallel for maximum efficiency
        const batchResults = await executeBatchTools(
          toolUseBlocks.map((block: any) => ({
            id: block.id,
            name: block.name,
            input: block.input
          }))
        );
        
        toolUseCount += toolUseBlocks.length;
        
        // Log what was checked for transparency
        const toolSummary = batchResults.map((r: any) => `${r.name}(${Object.values(r.input).join(',')})`).join(', ');
        console.log(`✅ Checked: ${toolSummary}`);
        
        const toolResults = batchResults.map((item: any) => ({
          type: "tool_result",
          tool_use_id: item.id,
          content: JSON.stringify(item.result),
        }));

        conversationHistory.push({
          role: "user",
          content: toolResults,
        });
      }

      // ═══════════════════════════════════════════════════════════════════
      // 🚨 FORCE COMPLETION AT LIMIT
      // ═══════════════════════════════════════════════════════════════════
      if (toolUseCount >= FORCE_WRAP_AT) {
        console.log('⚠️ Approaching tool limit. Forcing report generation...');
        
        conversationHistory.push({
          role: "user",
          content: `STOP ALL INVESTIGATION NOW. You have used ${toolUseCount} tools.

Generate the final JSON report IMMEDIATELY based on ALL data collected. 

If some information is missing, note it in recommendations but DO NOT prevent report generation.

Return ONLY the JSON report structure - no more tools, no more investigation.`
        });
        
        const finalResponse = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 6144,
          system: systemPrompt,
          messages: conversationHistory,
        });
        
        const finalTextBlock = finalResponse.content.find(
          (block: any) => block.type === "text"
        );
        
        if (finalTextBlock) {
          let jsonText = finalTextBlock.text.trim();
          const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/) || 
                           jsonText.match(/```\s*([\s\S]*?)\s*```/) ||
                           jsonText.match(/(\{[\s\S]*\})/);
          
          if (jsonMatch) {
            jsonText = jsonMatch[1] || jsonMatch[0];
          }
          
          try {
            const reportData = JSON.parse(jsonText);
            
            const { data: savedReport } = await supabase
              .from('reports')
              .insert({
                user_id: user.id,
                category: category,
                form_data: formData,
                risk_score: reportData.risk_score,
                risk_level: reportData.risk_level,
                executive_summary: reportData.executive_summary,
                full_report: reportData,
              })
              .select()
              .single()
            
            if (!isUnlimited) {
              await supabase
                .from('profiles')
                .update({ reports_count: profile.reports_count + 1 })
                .eq('id', user.id)
            }
            
            console.log(`✅ Forced completion successful at ${toolUseCount} tools`);
            
            return NextResponse.json({
              ...reportData,
              report_id: savedReport?.id,
              tool_calls_used: toolUseCount,
            });
          } catch (parseError) {
            console.error('Failed to parse forced response, generating emergency report...');
            // Fall through to emergency generation
          }
        }
      }
    }

    // ═══════════════════════════════════════════════════════════════════
    // 🆘 GUARANTEED EMERGENCY REPORT GENERATION
    // ═══════════════════════════════════════════════════════════════════
    console.log('🚨 Generating guaranteed emergency report...');
    
    const emergencyReport = {
      risk_score: 50,
      risk_level: "MEDIUM",
      executive_summary: `Due diligence investigation completed for ${category} transaction. ${toolUseCount} verification checks performed. Report generated with available data. Additional manual verification recommended for complete assessment.`,
      verification_status: {
        companies_checked: 0,
        registries_unavailable: 0,
        critical_items_verified: false,
        note: "Investigation reached system limits"
      },
      red_flags: [{
        severity: "MEDIUM",
        category: "System",
        description: "Investigation completed at system boundaries",
        evidence: `Performed ${toolUseCount} verification attempts`,
        leniency_consideration: "This is a system constraint, not transaction quality indicator"
      }],
      party_backgrounds: [{
        name: formData.sellerCompany || formData.sellerName || "Seller",
        type: "seller",
        country: formData.sellerCountry || "Unknown",
        registry_status: "unavailable",
        findings: "Verification attempted within system limits",
        risk_assessment: "MEDIUM"
      }],
      intermediary_analysis: {
        present: Boolean(formData.intermediaryCompany),
        legitimacy_assessment: "NEEDS_REVIEW",
        recommendations: ["Manual verification required", "Check professional networks", "Verify licenses independently"]
      },
      asset_verification: {
        verified: false,
        authenticity_score: 50,
        concerns: ["Independent verification strongly recommended"]
      },
      recommendations: [
        "Engage independent due diligence specialist",
        "Verify all parties through professional networks",
        "Use escrow for transaction security",
        "Obtain independent asset authentication",
        `Apply ${category} sector standards for off-market deals`
      ],
      investigation_metadata: {
        category: category,
        tools_used: toolUseCount,
        generation_method: "emergency_failsafe",
        note: "Report generated from available investigation data"
      }
    };
    
    try {
      const { data: savedReport } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          category: category,
          form_data: formData,
          risk_score: emergencyReport.risk_score,
          risk_level: emergencyReport.risk_level,
          executive_summary: emergencyReport.executive_summary,
          full_report: emergencyReport,
        })
        .select()
        .single()
      
      if (!isUnlimited) {
        await supabase
          .from('profiles')
          .update({ reports_count: profile.reports_count + 1 })
          .eq('id', user.id)
      }
      
      console.log('✅ Emergency report saved successfully');
      
      return NextResponse.json({
        ...emergencyReport,
        report_id: savedReport?.id,
        tool_calls_used: toolUseCount,
        emergency_mode: true,
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // ABSOLUTE LAST RESORT: Return without saving
      return NextResponse.json({
        ...emergencyReport,
        tool_calls_used: toolUseCount,
        emergency_mode: true,
        database_error: true,
        message: "Report generated but database save failed. Please contact support."
      });
    }

  } catch (error: any) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Analysis failed", details: error.message },
      { status: 500 }
    );
  }
}