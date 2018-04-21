import { fetchPost } from '../utils/fetchUtils'

const SIGNIN_URL = 'auth/signin'
const SIGNUP_URL = 'auth/signup'

export const postUserCredentials = (data) => fetchPost(SIGNIN_URL, data)
export const postNewUserCredentials = (data) => fetchPost(SIGNUP_URL, data)
