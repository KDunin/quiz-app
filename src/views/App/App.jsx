import React from 'react'
import Router from '../../components/Router/Router'
import Navigation from '../../components/Navigation/Navigation'
import Timer from '../../components/Timer/Timer'

const Style = {
  app: 'app',
}

const App = () => (
  <div className={Style.app}>
    <Navigation />
    <Timer />
    <Router />
  </div>
)

export default App
