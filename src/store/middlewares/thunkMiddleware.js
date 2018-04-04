import { isFunction } from '../../utils/typeUtils'

const thunkMiddleware = (store) => (next) => (action) =>
  isFunction(action)
    ? action(store.dispatch, store.getState)
    : next(action)

export default thunkMiddleware
