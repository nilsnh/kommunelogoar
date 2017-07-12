import * as React from 'react'
import { Link } from 'react-router-dom'
import ssbMunicipalities from './ssb-2017-municipality-data'
import { SSBMunicipality } from './ssb-2017-municipality-data'

const MunicipalityCard: React.SFC<any> = ({ muni }: any) => {
  return (
    <div>
      <Link to={`/kommune/${muni.code}`}>
        {muni.name}
      </Link>
    </div>
  )
}

export default class MunicipalityList extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      filterText: ''
    }
  }

  render() {
    // copy array and sort by name
    let municipalities = ssbMunicipalities.slice().sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    if (this.state.filterText) {
      municipalities = municipalities.filter(
        elem =>
          JSON.stringify(elem.name)
            .toLowerCase()
            .indexOf(this.state.filterText.toLowerCase()) !== -1
      )
    }
    return (
      <div>
        <label>
          Filtrer kommunar:
          <input
            onChange={e => this.onChangeHandler(e)}
            placeholder="Namn, kommunenr e.l."
          />
        </label>
        <br />
        {municipalities.map((elem: SSBMunicipality) =>
          <MunicipalityCard key={elem.code} muni={elem} />
        )}
      </div>
    )
  }

  onChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement
    this.setState(prevState => ({
      filterText: input.value
    }))
  }
}
