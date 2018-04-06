import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Homepage from '../../views/Homepage/Homepage'
import Training from '../../views/Training/Training'
import Test from '../../views/Test/Test'

const Router = () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/training" component={Training} />
    <Route exact path="/test" component={Test} />
  </Switch>
)

export default Router
