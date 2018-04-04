import React from 'react'
import ProtectedRouter from '../../components/ProtectedRouter/ProtectedRouter'
import Navigation from '../../components/Navigation/Navigation'

const Style = {
  app: 'app',
}

const App = () => (
  <div className={Style.app}>
    <Navigation />
    <ProtectedRouter />
  </div>
)

export default App
