import belgiumEor from './belgium-eor.json'
import belgiumContractor from './belgium-contractor.json'
import chinaEor from './china-eor.json'
import czechRepublicEor from './czech-republic-eor.json'
import czechRepublicContractor from './czech-republic-contractor.json'
import franceEor from './france-eor.json'
import franceContractor from './france-contractor.json'
import germanyEor from './germany-eor.json'
import germanyContractor from './germany-contractor.json'
import hongKongEor from './hong-kong-eor.json'
import indiaEor from './india-eor.json'
import indiaContractor from './india-contractor.json'
import italyEor from './italy-eor.json'
import italyContractor from './italy-contractor.json'
import netherlandsEor from './netherlands-eor.json'
import netherlandsContractor from './netherlands-contractor.json'
import polandEor from './poland-eor.json'
import polandContractor from './poland-contractor.json'
import spainEor from './spain-eor.json'
import spainContractor from './spain-contractor.json'
import uaeEor from './uae-eor.json'
import uaeContractor from './uae-contractor.json'
import unitedKingdomEor from './united-kingdom-eor.json'
import unitedKingdomContractor from './united-kingdom-contractor.json'

export type ServiceType = 'eor' | 'contractor'

export interface CountryConfig {
  route: string
  name: string
  type: ServiceType
  dataKey: string
  image?: string
}

export interface CountryData {
  metadata: {
    title: string
    description?: string
    [key: string]: unknown
  }
  [key: string]: any
}

const COUNTRY_DATA_MAP: Record<string, CountryData> = {
  'belgium-eor': belgiumEor as CountryData,
  'belgium-contractor': belgiumContractor as CountryData,
  'china-eor': chinaEor as CountryData,
  'czech-republic-eor': czechRepublicEor as CountryData,
  'czech-republic-contractor': czechRepublicContractor as CountryData,
  'france-eor': franceEor as CountryData,
  'france-contractor': franceContractor as CountryData,
  'germany-eor': germanyEor as CountryData,
  'germany-contractor': germanyContractor as CountryData,
  'hong-kong-eor': hongKongEor as CountryData,
  'india-eor': indiaEor as CountryData,
  'india-contractor': indiaContractor as CountryData,
  'italy-eor': italyEor as CountryData,
  'italy-contractor': italyContractor as CountryData,
  'netherlands-eor': netherlandsEor as CountryData,
  'netherlands-contractor': netherlandsContractor as CountryData,
  'poland-eor': polandEor as CountryData,
  'poland-contractor': polandContractor as CountryData,
  'spain-eor': spainEor as CountryData,
  'spain-contractor': spainContractor as CountryData,
  'uae-eor': uaeEor as CountryData,
  'uae-contractor': uaeContractor as CountryData,
  'united-kingdom-eor': unitedKingdomEor as CountryData,
  'united-kingdom-contractor': unitedKingdomContractor as CountryData,
}

export const COUNTRY_CONFIG: Record<string, CountryConfig> = {
  '/belgium': { route: '/belgium', name: 'Belgium', type: 'eor', dataKey: 'belgium-eor' },
  '/belgium-contractor': { route: '/belgium-contractor', name: 'Belgium Contractor', type: 'contractor', dataKey: 'belgium-contractor' },
  '/china': { route: '/china', name: 'China', type: 'eor', dataKey: 'china-eor' },
  '/czech-republic': { route: '/czech-republic', name: 'Czech Republic', type: 'eor', dataKey: 'czech-republic-eor' },
  '/czech-republic-contractor': { route: '/czech-republic-contractor', name: 'Czech Republic Contractor', type: 'contractor', dataKey: 'czech-republic-contractor' },
  '/france': { route: '/france', name: 'France', type: 'eor', dataKey: 'france-eor' },
  '/france-contractor': { route: '/france-contractor', name: 'France Contractor', type: 'contractor', dataKey: 'france-contractor' },
  '/germany': { route: '/germany', name: 'Germany', type: 'eor', dataKey: 'germany-eor' },
  '/germany-contractor': { route: '/germany-contractor', name: 'Germany Contractor', type: 'contractor', dataKey: 'germany-contractor' },
  '/hong-kong': { route: '/hong-kong', name: 'Hong Kong', type: 'eor', dataKey: 'hong-kong-eor' },
  '/india': { route: '/india', name: 'India', type: 'eor', dataKey: 'india-eor' },
  '/india-contractor': { route: '/india-contractor', name: 'India Contractor', type: 'contractor', dataKey: 'india-contractor' },
  '/italy': { route: '/italy', name: 'Italy', type: 'eor', dataKey: 'italy-eor' },
  '/italy-contractor': { route: '/italy-contractor', name: 'Italy Contractor', type: 'contractor', dataKey: 'italy-contractor' },
  '/netherlands': { route: '/netherlands', name: 'Netherlands', type: 'eor', dataKey: 'netherlands-eor' },
  '/netherlands-contractor': { route: '/netherlands-contractor', name: 'Netherlands Contractor', type: 'contractor', dataKey: 'netherlands-contractor' },
  '/poland': { route: '/poland', name: 'Poland', type: 'eor', dataKey: 'poland-eor' },
  '/poland-contractor': { route: '/poland-contractor', name: 'Poland Contractor', type: 'contractor', dataKey: 'poland-contractor' },
  '/spain': { route: '/spain', name: 'Spain', type: 'eor', dataKey: 'spain-eor' },
  '/spain-contractor': { route: '/spain-contractor', name: 'Spain Contractor', type: 'contractor', dataKey: 'spain-contractor' },
  '/uae': { route: '/uae', name: 'UAE', type: 'eor', dataKey: 'uae-eor' },
  '/uae-contractor': { route: '/uae-contractor', name: 'UAE Contractor', type: 'contractor', dataKey: 'uae-contractor' },
  '/united-kingdom': { route: '/united-kingdom', name: 'United Kingdom', type: 'eor', dataKey: 'united-kingdom-eor' },
  '/united-kingdom-contractor': { route: '/united-kingdom-contractor', name: 'United Kingdom Contractor', type: 'contractor', dataKey: 'united-kingdom-contractor' },
}

export function loadCountryData(dataKey: string): CountryData | null {
  return COUNTRY_DATA_MAP[dataKey] ?? null
}
