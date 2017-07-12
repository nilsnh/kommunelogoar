import * as React from 'react'
import { Link } from 'react-router-dom'
import ssbMunicipalities from './ssb-2017-municipality-data'
import { SSBMunicipality } from './ssb-2017-municipality-data'

export default () =>
  <ul>
    {ssbMunicipalities.map((elem: SSBMunicipality) =>
      <li key={elem.code}>
        <Link to={`/kommune/${elem.code}`}>
          {elem.name}
        </Link>
      </li>
    )}
  </ul>
