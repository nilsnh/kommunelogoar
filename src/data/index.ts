import {
  LinkResource,
  MunicipalityResources
} from './municipality-data-resources'
import { DifiMunicipalities } from './municipality-data-difi'
import { SSBMunicipalities, SSBMunicipality } from './municipality-data-ssb'

export interface Municipality extends SSBMunicipality {
  title: string
  orgnummer: string
  homepageUrl?: string
  resources?: Array<LinkResource>
}

export const municipalities: Municipality[] = SSBMunicipalities.reduce(
  (acc, elem: Municipality) => {
    Object.assign(elem, getDifiData(elem))
    Object.assign(elem, getEnrichmentData(elem))
    acc.push(elem)
    return acc
  },
  [] as Array<Municipality>
)

function getDifiData(muni: Municipality) {
  let result = {}
  DifiMunicipalities.map(difiMuni => {
    if (difiMuni.title.toLowerCase().indexOf(muni.name.toLowerCase()) !== -1) {
      result = difiMuni
    }
  })
  return result
}

function getEnrichmentData(muni: Municipality) {
  if (MunicipalityResources[muni.code]) {
    return MunicipalityResources[muni.code]
  }
  return {}
}
