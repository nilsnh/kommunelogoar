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
          <h2 className="u-margin-bottom-none">
            {muni.name}
          </h2>
        </a>
      )
    }
    return (
      <h2 className="u-margin-bottom-none">
        {muni.name}
      </h2>
    )
  }

  const LogoLinks = () =>
    muni.logos
      ? <ul className="o-list-inline">
          <li className="o-list-inline__item">
            <span className="u-padding-right-small">Logoar:</span>
          </li>
          {muni.logos.map(logo =>
            <li key={logo.size} className="o-list-inline__item">
              <a href={logo.url} className="u-padding-right-small">
                {logo.size}
              </a>
            </li>
          )}
        </ul>
      : null

  return (
    <article className="u-padding-bottom">
      <MuniTitle />
      Kommunenr: {muni.code}
      <LogoLinks />
    </article>
  )
}
