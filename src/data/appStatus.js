import { fetchPost, fetchGet } from '../utils/fetchUtils'

const SIGNIN_URL = 'auth/signin'
const SIGNUP_URL = 'auth/signup'
const WAKE_UP_URL = ''

export const postUserCredentials = (data) => fetchPost(SIGNIN_URL, data)
export const postNewUserCredentials = (data) => fetchPost(SIGNUP_URL, data)
export const wakeUpServer = () => fetchGet(WAKE_UP_URL) 
