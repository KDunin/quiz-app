import React from 'react'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import Router from '../../components/Router/Router'
import Navigation from '../../components/Navigation/Navigation'
import Login from '../Login/Login'

const Style = {
  app: 'app',
}

const App = () => {
  const loggedIn = false
  if (!loggedIn) {
    return (
      <div className={Style.app}>
        <Login />
      </div>
    )
  }
  return (
    <div className={Style.app}>
      <Navigation />
      <Router />
    </div>
  )
} 

export default connect(mapStoreToProps)(App)
