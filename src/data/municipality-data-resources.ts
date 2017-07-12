export interface LinkResource {
  name: string
  url: string
}

export interface EnrichResource {
  [key: number]: {
    homepageUrl: string
    resources: Array<LinkResource>
  }
}

export const MunicipalityResources: EnrichResource = {
  1622: {
    homepageUrl: 'https://www.agdenes.kommune.no',
    resources: []
  }
}
