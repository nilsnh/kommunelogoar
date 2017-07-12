import * as React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import MunicipalityList from './MunicipalityList'
import Municipality from './Municipality'

export default () =>
  <div>
    <Route exact={true} path="/" component={MunicipalityList} />
    <div>
      <Route path="/kommune/:code" component={Municipality} />
    </div>
  </div>
