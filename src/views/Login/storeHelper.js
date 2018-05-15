import { userLogIn, userSignUp } from '../../store/actions/appStatus'

export const mapDispatchToProps = (dispatch) => ({
  onLogIn:  (username, password) => dispatch(userLogIn(username, password)),
  onSignUp: (username, password) => dispatch(userSignUp(username, password)),
})
