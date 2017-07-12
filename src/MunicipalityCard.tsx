import * as React from 'react'
import { Link } from 'react-router-dom'

export const MunicipalityCard: React.SFC<any> = ({ muni }: any) => {
  return (
    <div className="c-municard">
      <Link className="c-municard__item" to={`/kommune/${muni.code}`}>
        {muni.name}
      </Link>
      <div className="c-municard__item">
        {muni.code}
      </div>
    </div>
  )
}
