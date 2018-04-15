import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import Homepage from '../../views/Homepage/Homepage'
import Training from '../../views/Training/Training'
import Test from '../../views/Test/Test'
import AdminPanel from '../../views/AdminPanel/AdminPanel'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Routes = [{
  path:      '/',
  component: Homepage,
  exact:     true,
},{
  path:      '/training',
  component: Training,
  exact:     false,
},{
  path:      '/test',
  component: Test,
  exact:     false,
},{
  path:      '/admin',
  component: AdminPanel,
  exact:     false,
}]

const timeout = { enter: 600, exit: 0 }
/* eslint-disable react/prop-types */
const Router = ({ location }) => {
  const currentKey = location.pathname.split('/')[1] || '/'
  return (
    <TransitionGroup>
      <CSSTransition
        key={currentKey}
        classNames='fade'
        timeout={timeout}
      >
        <Switch location={location}>
          {renderRoutes()}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )}

export default withRouter(Router)

const renderRoutes = () => (
  Routes.map(({ path, component, exact }, index) => {
    return (
      <Route
        key={index}
        path={path}
        component={component}
        exact={exact}
      /> 
    )
  })
)
