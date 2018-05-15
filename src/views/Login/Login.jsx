import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'
import Button from '../../components/Button/Button'

const Style = {
  box:     'login',
  login:   'login__form',
  input:   'login__input',
  buttons: 'login__buttons',
  button:  'login__button',
  error:   'login__error',
}

class Login extends PureComponent {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error:    false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.renderError = this.renderError.bind(this)
  }
  
  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  renderError() {
    const { username, password, error } = this.state
    if ( (!username || !password) && error ) {
      return (
        <div className={Style.error}>Uzupełnij pola!</div>
      )
    }
  }

  handleSignIn(e) {
    e.preventDefault()
    const { username, password } = this.state
    if (!username || !password) {
      return this.setState({ error: true })
    }
    this.props.onLogIn(username, password)
  }

  handleSignUp(e) {
    e.preventDefault()
    const { username, password } = this.state
    if (!username || !password) {
      return this.setState({ error: true })
    }
    this.props.onSignUp(username, password)
  }

  render() {
    const { error } = this.state

    return (
      <div className={Style.box}>
        <form 
          className={Style.login}
          onSubmit={this.handleSignIn}
        >
          <input
            id='username'
            name='username'
            type='text'
            placeholder='Nazwa użytkownika'
            className={Style.input}
            onChange={this.handleChange}
          />
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Hasło'
            className={Style.input}
            onChange={this.handleChange}
          />
          {this.renderError(error)}
          <div className={Style.buttons}>
            <Button
              className={Style.button}      
              text='Zaloguj'
              type='submit'
            />
            <Button
              className={Style.button} 
              onClick={this.handleSignUp}
              text='Zarejestruj'
              type='button'
            />
          </div>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Login)

Login.propTypes = {
  /** */
  onLogIn:  PropTypes.func,
  /** */
  onSignUp: PropTypes.func,
}
