import * as React from 'react'
import MunicipalityList from './MunicipalityList'

export default () =>
  <main className="u-margin">
    <div className="u-1/3@desktop">
      <h1>kommunelogo. nilsnh.no</h1>
      <p>
        Det er framleis for vanskeleg å finne frem til kommunelogoar. Målet med
        denne sida er å vere ein oversiktsressurs for å raskt kunne hente ned
        logofiler, visuell profil o.l. for kommuner.
      </p>
      <p>Ynskjer du å bidra? Les meir her.</p>
    </div>
    <MunicipalityList />
  </main>
