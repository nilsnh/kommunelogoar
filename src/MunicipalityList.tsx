import * as React from 'react'
import ssbMunicipalities from './municipality-data-ssb'
import { SSBMunicipality } from './municipality-data-ssb'
import { MunicipalityCard } from './MunicipalityCard'

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
        <div className="u-padding-bottom">
          <label>
            Filtrer kommunar:
            <input
              onChange={e => this.onChangeHandler(e)}
              placeholder="Namn, kommunenr e.l."
            />
          </label>
        </div>
        <div className="u-padding-bottom">
          <label>
            Vis kun de med logo tilgjengelig:
            <input type="checkbox" />
          </label>
        </div>
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
