import { municipalities, Municipality } from './data/index'
import * as fs from 'fs'

const apiData = municipalities.map(muni => {
  const { name, code, homepageUrl, orgnummer, resources, logos } = muni
  return {
    name,
    code,
    homepageUrl,
    orgNumber: orgnummer, // Difi does not have org numbers for all munis
    logos, // is empty if muni does not have org number
    additionalResources: resources
  }
})

process.stdout.write(JSON.stringify(apiData))
