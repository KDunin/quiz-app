import React from 'react'
import Router from '../../components/Router/Router'
import Navigation from '../../components/Navigation/Navigation'

const Style = {
  app: 'app',
}

const App = () => (
  <div className={Style.app}>
    <Navigation />
    <Router />
  </div>
)

export default App
