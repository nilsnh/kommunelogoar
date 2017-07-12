import * as React from 'react'
import { Route } from 'react-router-dom'
import MunicipalityList from './MunicipalityList'
import Municipality from './Municipality'

export default () =>
  <div>
    <Route exact={true} path="/">
      <div>
        <h1>kommunelogo.nilsnh.no</h1>
        <p>
          Det er framleis for vanskeleg å finne frem til kommunelogoar. Denne
          sida freister å bøte på denne mangelen.
        </p>
        <p>Ynskjer du å bidra? Les meir her.</p>
        <MunicipalityList />
      </div>
    </Route>
    <div>
      <Route path="/kommune/:code" component={Municipality} />
    </div>
  </div>
