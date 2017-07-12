import * as React from 'react'
import { Link } from 'react-router-dom'
import ssbMunicipalities from './ssb-2017-municipality-data'

export default ({ match }: any) => {
  const matchingMunicipality = ssbMunicipalities.filter(
    elem => elem.code === Number.parseInt(match.params.code)
  )
  let municipality = { name: 'Fant ikke kommune' }
  if (matchingMunicipality) {
    municipality = matchingMunicipality[0]
  }
  return (
    <div>
      <p>
        <Link to="/">Tilbake</Link>
      </p>
      <p>
        Valgt kommune: {municipality.name}
      </p>
    </div>
  )
}
