import * as React from 'react'
import MunicipalityList from './MunicipalityList'

export default () =>
  <main className="u-margin">
    <div className="u-1/3@desktop">
      <h1>
        kommunelogo. <a href="https://nilsnh.no">nilsnh.no</a>
      </h1>
      <p>
        Det er framleis for vanskeleg å finne frem til kommunelogoar. Målet med
        denne sida er å vere ei lita oversiktsressurs for å raskt kunne hente
        ned logofiler, visuell profil o.l. for kommuner.
      </p>
      <p>
        I botn ligg det bla. kommunedata i frå SSB og Difi. Meir info om
        prosjektet{' '}
        <a href="https://github.com/nilsnh/kommunelogo">finn du her</a>,
        rådataene finn du <a href="/api.json">her</a>. :)
      </p>
      <p />
    </div>
    <MunicipalityList />
  </main>
