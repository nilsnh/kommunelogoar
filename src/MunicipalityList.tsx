import * as React from 'react'
import * as queryString from 'query-string'
import * as Fuse from 'fuse.js'
import {
  municipalities as municipalitiesData,
  Municipality
} from './data/index'
import { MunicipalityCard } from './MunicipalityCard'

interface State {
  filterText: string
  filterByResource: boolean
  municipalities: any
}

export default class MunicipalityList extends React.Component<any, State> {
  // track pending state updates, see usage below
  timedActions: {
    [key: string]: any // id of setTimeout
  } = {}

  constructor() {
    super()
    const stateTemplate = {
      filterText: '',
      filterByResource: false
    }
    this.state = Object.assign(
      stateTemplate,
      // parse url to see if state has been persisted there
      queryString.parse(window.location.hash),
      {
        municipalities: new Fuse(municipalitiesData, {
          keys: ['name'],
          minMatchCharLength: 1,
          threshold: 0.5,
          location: 0,
          distance: 10,
          shouldSort: true,
          tokenize: true,
          matchAllTokens: true
        })
      }
    )
  }

  render() {
    const hasLogo = (muni: Municipality) => !!muni.orgnummer

    // copy array and sort by name
    let municipalities =
      this.state.filterText.length > 0
        ? this.state.municipalities.search(this.state.filterText)
        : municipalitiesData

    municipalities = municipalities
      .slice()
      .reduce((acc: Array<Municipality>, elem: Municipality) => {
        if (this.state.filterByResource && !hasLogo(elem)) {
          return acc
        }
        acc.push(elem)
        return acc
      }, [] as Municipality[])
      .sort((a: Municipality, b: Municipality) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name > b.name) {
          return 1
        } else {
          return 0
        }
      })

    return (
      <div>
        <div className="u-padding-bottom">
          <label>
            Filtrer kommunar:
            <input
              onChange={e => this.searchHandler(e)}
              defaultValue={this.state.filterText}
              placeholder="Namn, kommunenr e.l."
            />
          </label>
        </div>
        <div className="u-padding-bottom">
          <label>
            Vis kun dei med logo tilgjengelig:
            <input
              type="checkbox"
              defaultChecked={this.state.filterByResource}
              onChange={e => this.resourceFilterHandler(e)}
            />
          </label>
        </div>
        <div className="u-padding-bottom">
          Antall: {municipalities.length}
        </div>
        <div className="o-layout">
          {municipalities.map((elem: Municipality) =>
            <div
              key={elem.code}
              className="o-layout__item u-1/1 u-1/3@tablet u-1/6@desktop u-1/10@wide"
            >
              <MunicipalityCard muni={elem} />
            </div>
          )}
        </div>
      </div>
    )
  }

  searchHandler(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement
    const updateValue = { filterText: input.value }
    this.doTimedUpdate('searchHandler', updateValue, 100)
  }

  resourceFilterHandler(e: React.FormEvent<HTMLInputElement>) {
    const input = e.target as HTMLInputElement
    const updateValue = {
      filterByResource: input.checked
    }
    this.doTimedUpdate('resourceFilterHandler', updateValue, 100)
  }

  doTimedUpdate(timerKey: string, newState: any, waitForMilliseconds: number) {
    this.clearTimeoutFor(timerKey)
    this.timedActions[timerKey] = setTimeout(() => {
      this.setState(
        prevState => newState,
        () => {
          this.persistToQueryParam(newState)
          this.clearTimeoutFor(timerKey)
        }
      )
    }, waitForMilliseconds)
  }

  clearTimeoutFor(key: string) {
    const timedActionId = this.timedActions[key]
    if (timedActionId) {
      window.clearTimeout(timedActionId)
    }
  }

  /**
   * Persist state to url. Remove state from url if values are falsy
   */
  persistToQueryParam(newState: State) {
    const newQueryParams = Object.assign(
      queryString.parse(window.location.hash),
      newState
    )
    if (
      (newQueryParams.filterByResource === 'false' ||
        !newQueryParams.filterByResource) &&
      !newQueryParams.filterText
    ) {
      // hack to forget #hash
      // source: https://stackoverflow.com/a/5298684
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      )
    } else {
      window.location.hash = queryString.stringify(newQueryParams)
    }
  }
}
