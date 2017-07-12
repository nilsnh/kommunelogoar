import * as React from 'react'
import {
  municipalities as municipalitiesData,
  Municipality
} from './data/index'
import { MunicipalityCard } from './MunicipalityCard'

interface State {
  filterText: string
  filterByResource: boolean
}

export default class MunicipalityList extends React.Component<any, State> {
  constructor() {
    super()
    this.state = {
      filterText: '',
      filterByResource: false
    }
  }

  render() {
    const shouldShow = (filterText: string, muni: Municipality) =>
      JSON.stringify(muni.name)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
    const hasLogo = (muni: Municipality) => !!muni.orgnummer

    // copy array and sort by name
    let municipalities = municipalitiesData
      .slice()
      .sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
      .reduce((acc, elem: Municipality) => {
        if (this.state.filterText && !shouldShow(this.state.filterText, elem)) {
          return acc
        }
        if (this.state.filterByResource && !hasLogo(elem)) {
          return acc
        }
        acc.push(elem)
        return acc
      }, [] as Municipality[])

    return (
      <div>
        <div className="u-padding-bottom">
          <label>
            Filtrer kommunar:
            <input
              onChange={e => this.searchHandler(e)}
              placeholder="Namn, kommunenr e.l."
            />
          </label>
        </div>
        <div className="u-padding-bottom">
          <label>
            Vis kun de med logo tilgjengelig:
            <input
              type="checkbox"
              onChange={e => this.resourceFilterHandler(e)}
            />
          </label>
        </div>
        <div className="u-padding-bottom">
          Antall: {municipalities.length}
        </div>
        {municipalities.map(elem =>
          <MunicipalityCard key={elem.code} muni={elem} />
        )}
      </div>
    )
  }

  searchHandler(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement
    this.setState(prevState => ({
      filterText: input.value
    }))
  }

  resourceFilterHandler(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement
    this.setState(prevState => ({
      filterByResource: input.checked
    }))
  }
}
