import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login/Login'
import Toast from '../../components/Toast/Toast'
import Router from '../../components/Router/Router'
import Navigation from '../../components/Navigation/Navigation'
import { getCookie } from '../../features/Cookies'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'

const Style = {
  app: 'app',
}

/** */
const App = () => {
  if (window.location.href.includes('/privacy')) {
    return (
      <div className={ Style.app }>
        <PrivacyPolicy />
      </div>
    )
  }
  if (!getCookie('token')) {
    return (
      <div className={ Style.app }>
        <Login />
        <Toast />
      </div>
    )
  }
  return (
    <BrowserRouter basename={ process.env.PUBLIC_URL }>
      <div className={ Style.app }>
        <Navigation />
        <Router />
        <Toast />
      </div>
    </BrowserRouter>
  )
}

export default connect(mapStoreToProps)(App)

App.propTypes = {
  /** */
  loggedIn: PropTypes.bool.isRequired,
}

App.defaultProps = {
  loggedIn: false,
}
