import { userLogIn } from '../../store/actions/appStatus'

export const mapDispatchToProps = (dispatch) => ({
  handleLogIn: (event) => {
    event.preventDefault()
    const username = document.querySelector('#username')
    const password = document.querySelector('#password')
    dispatch(userLogIn(username.value, password.value))
  },
})
