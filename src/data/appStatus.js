import { fetchPost, fetchGet } from '../utils/fetchUtils'

const SIGNIN_URL = 'auth/signin'
const SIGNUP_URL = 'auth/signup'
const GOOGLE_SIGN_IN = 'auth/google'
const FACEBOOK_SIGN_IN = 'auth/facebook'
const WAKE_UP_URL = ''

export const postUserCredentials = (data) => fetchPost(SIGNIN_URL, data)
export const postNewUserCredentials = (data) => fetchPost(SIGNUP_URL, data)
export const postGoogleCredentials = (data) => fetchPost(GOOGLE_SIGN_IN, data)
export const postFacebookCredentials = (data) => fetchPost(FACEBOOK_SIGN_IN, data)
export const wakeUpServer = () => fetchGet(WAKE_UP_URL) 
