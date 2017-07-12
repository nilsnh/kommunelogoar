import * as React from 'react'
import { Municipality } from './data/index'

interface MunicipalityCardProps {
  muni: Municipality
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

  const LogoLinks = () =>
    muni.orgnummer
      ? <div>
          <span className="u-padding-right-small">Logoar:</span>
          {[50, 100, 150, 200, 250, 'org'].map(size =>
            <a
              key={size}
              href={`http://orglogo.difi.no/api/logo/${size}/${muni.orgnummer}`}
              className="u-padding-right-small"
            >
              {size}
            </a>
          )}
        </div>
      : null

  return (
    <article className="c-municard">
      <div className="c-municard__item">
        <MuniTitle />
      </div>
      <div className="c-municard__item">
        {muni.code}
      </div>
      <div className="c-municard__item">
        <LogoLinks />
      </div>
    </article>
  )
}
