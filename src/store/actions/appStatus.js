import { postUserCredentials, postNewUserCredentials, postGoogleCredentials, postFacebookCredentials } from '../../data/appStatus'
import { getQuestionsList } from './questions'
import { parseUserServerData } from '../mappers/appStatus'
import { setCookie, deleteCookie } from '../../features/Cookies'

export const APP_UPDATE_STATUS = 'APP_UPDATE_STATUS'
export const APP_REGISTER_USER = 'APP_REGISTER_USER'
export const SHOW_LOADER       = 'SHOW_LOADER'
export const HIDE_LOADER       = 'HIDE_LOADER'
export const SHOW_TOAST        = 'SHOW_TOAST'
export const HIDE_TOAST        = 'HIDE_TOAST'

export const userLogIn = (username, password) => (dispatch) => {
  dispatch(showLoader())

  postUserCredentials({ username, password })
    .then(response => {
      handleSignInResponse(response, dispatch)
    })
    .catch(error => {
      dispatch(hideLoader())
      dispatch(showToast(error))
    })
}

export const userLogOut = () => {
  deleteCookie('id')
  deleteCookie('type')
  deleteCookie('token')
  window.location.assign(process.env.PUBLIC_URL)
}

export const userSignUp = (username, password) => (dispatch) => {
  dispatch(showLoader())

  postNewUserCredentials({ username, password })
    .then(() => {
      dispatch(showToast({ message: 'Konto utworzone, możesz się zalogować!' }))
      dispatch(hideLoader())
    })
    .catch(error => {
      dispatch(showToast(error))
      dispatch(hideLoader())
    })
}

export const googleSignIn = (email, token) => (dispatch) => {
  postGoogleCredentials({ email, token })
    .then(response => {
      handleSignInResponse(response, dispatch)
    })
    .catch(error => {
      dispatch(showToast(error))
    })
}

export const facebookSignIn = (id, email) => (dispatch) => {
  postFacebookCredentials({ id, email })
    .then(response => {
      handleSignInResponse(response, dispatch)
    })
    .catch(error => {
      dispatch(showToast(error))
    })
}

const handleSignInResponse = (data, dispatch) => {
  setCookie('id', data.id, 60)
  setCookie('type', data.type, 60)
  setCookie('token', data.token, 60)
  dispatch(updateAppStatus(parseUserServerData(data)))
  dispatch(getQuestionsList(data.id))
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

export const showLoader = () => ({
  type: SHOW_LOADER,
})

export const hideLoader = () => ({
  type: HIDE_LOADER,
})
