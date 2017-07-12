import * as React from 'react'

export const MunicipalityCard: React.SFC<any> = ({ muni }: any) => {
  return (
    <div className="c-municard">
      <div className="c-municard__item">
        {muni.name}
      </div>
      <div className="c-municard__item">
        {muni.code}
      </div>
    </div>
  )
}
