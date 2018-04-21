import { userLogOut } from '../../store/actions/appStatus'

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(userLogOut),
})
