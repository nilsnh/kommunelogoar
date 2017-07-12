import * as React from 'react'
import { SSBMunicipality } from './municipality-data-ssb'
import { LinkResource } from './municipality-data-resources'

interface Muni extends SSBMunicipality {
  homepageUrl?: string
  resources?: Array<LinkResource>
}

interface MunicipalityCardProps {
  muni: Muni
}

export const MunicipalityCard: React.SFC<MunicipalityCardProps> = ({
  muni
}) => {
  const MuniTitle = () => {
    if (muni.homepageUrl) {
      return (
        <a href={muni.homepageUrl}>
          {muni.name}
        </a>
      )
    }
    return (
      <span>
        {muni.name}
      </span>
    )
  }

  return (
    <article className="c-municard">
      <div className="c-municard__item">
        <MuniTitle />
      </div>
      <div className="c-municard__item">
        {muni.code}
      </div>
      {muni.resources &&
        muni.resources.map(elem =>
          <div className="c-municard__item">
            <a href={elem.url}>
              {elem.name}
            </a>
          </div>
        )}
    </article>
  )
}
