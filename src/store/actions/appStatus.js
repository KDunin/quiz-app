import { postUserCredentials } from '../../data/appStatus'

export const userLogIn = (username, password) => () => {

  postUserCredentials({ username, password })
}
