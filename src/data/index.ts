import { LinkResource } from './municipality-data-resources'
import { DifiMunicipalities } from './municipality-data-difi'
import { SSBMunicipalities, SSBMunicipality } from './municipality-data-ssb'

export interface Municipality extends SSBMunicipality {
  title: string
  orgnummer: string
  homepageUrl?: string
  logos?: Array<{
    size: string
    url: string
  }>
  resources?: Array<LinkResource>
}

export const municipalities: Municipality[] = SSBMunicipalities.reduce(
  (acc, elem: Municipality) => {
    Object.assign(elem, getDifiData(elem))
    Object.assign(elem, buildHomepageUrl(elem))
    acc.push(elem)
    return acc
  },
  [] as Array<Municipality>
)

function getDifiData(muni: Municipality) {
  let result = {}
  DifiMunicipalities.map(difiMuni => {
    const trimmedTitle = difiMuni.title.replace(/kommune/gi, '').trim()
    if (trimmedTitle.toLowerCase() === muni.name.toLowerCase()) {
      result = difiMuni
    }
  })
  return result
}

function buildHomepageUrl(muni: Municipality) {
  let urlName = muni.name
    .replace(/æ/gi, 'ae')
    .replace(/ø/gi, 'o')
    .replace(/å/gi, 'a')
  return {
    homepageUrl: `http://www.${urlName}.kommune.no`
  }
}
