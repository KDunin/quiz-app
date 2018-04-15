import { postForm } from '../utils/fetchUtils'

const SIGNIN_URL = 'api/auth/signin'

export const postUserCredentials = (data) => postForm(SIGNIN_URL, data)
