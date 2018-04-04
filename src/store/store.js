import { createStore, compose, applyMiddleware } from 'redux'
import { getRootReducer, getInitialState } from './reducers/rootReducer'
import thunkMiddleware from './middlewares/thunkMiddleware'

const initStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  return createStore(
    getRootReducer(),
    getInitialState(),
    composeEnhancers(applyMiddleware(thunkMiddleware))
  )
}

export default initStore
