export interface LinkResource {
  name: string
  url: string
}

export interface EnrichResource {
  // key should be municipality number
  [key: number]: {
    homepageUrl: string
    resources?: Array<LinkResource>
  }
}

/**
 * This is where we can add additional resources to the MunicipalityCards
 */
export const MunicipalityResources: EnrichResource = {}
