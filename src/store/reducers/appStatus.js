import { APP_UPDATE_STATUS, SHOW_TOAST, HIDE_TOAST } from '../actions/appStatus'
export const initialState = {
  loggedIn: false,
  toast:    '',
}

const appStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_UPDATE_STATUS: return Object.assign({}, state, { loggedIn: true , ...action.payload.appStatus })
    case SHOW_TOAST: return Object.assign({}, state, { toast: action.payload.message })
    case HIDE_TOAST: return Object.assign({}, state, { toast: '' })
    default: return state
  }
}

export default appStatusReducer
