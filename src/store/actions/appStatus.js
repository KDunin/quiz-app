import { postUserCredentials, postNewUserCredentials } from '../../data/appStatus'
import { getQuestionsList } from './questions'
import { parseUserServerData } from '../mappers/appStatus'
import { setCookie, deleteCookie } from '../../features/Cookies'

export const APP_UPDATE_STATUS = 'APP_UPDATE_STATUS'
export const APP_REGISTER_USER = 'APP_REGISTER_USER'
export const SHOW_TOAST        = 'SHOW_TOAST'
export const HIDE_TOAST        = 'HIDE_TOAST'

export const userLogIn = (username, password) => (dispatch) => {
  postUserCredentials({ username, password })
    .then(response => {
      setCookie('id', response.id, 60)
      setCookie('type', response.type, 60)
      setCookie('token', response.token, 60)
      dispatch(updateAppStatus(parseUserServerData(response)))
      dispatch(getQuestionsList(response.id))
    })
    .catch(error => dispatch(showToast(error)))
}
export const userLogOut = () => {
  deleteCookie('token')
  window.location.assign(process.env.PUBLIC_URL)
}

export const userSignUp = (username, password) => (dispatch) => {
  postNewUserCredentials({ username, password })
    .then(() => dispatch(showToast({ message: 'Konto utworzone, możesz się zalogować!' })))
    .catch(error => dispatch(showToast(error)))
}

const updateAppStatus = (appStatus) => ({
  type:    APP_UPDATE_STATUS,
  payload: {
    appStatus,
  },
})

export const showToast = ({ message }) => ({
  type:    SHOW_TOAST,
  payload: {
    message,
  },
})

export const hideToast = () => ({
  type: HIDE_TOAST,
})
