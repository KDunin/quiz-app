import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import Button from '../../components/Button/Button'
import { Loader } from '../../components/Loader/Loader'

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
      username: 'user',
      password: 'user',
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
    const { error, username, password } = this.state
    const { loading } = this.props

    return (
      <div className={Style.box}>
        <h2>Możesz założyć własne konto, lub skorzystać z domyślnego.</h2>
        <form 
          className={Style.login}
          onSubmit={this.handleSignIn}
        >
          <input
            id='username'
            name='username'
            type='text'
            placeholder='Nazwa użytkownika'
            value={username}
            className={Style.input}
            onChange={this.handleChange}
          />
          <input
            id='password'
            name='password'
            type='password'
            value={password}
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
              disabled={loading}
            />
            <Button
              className={Style.button} 
              onClick={this.handleSignUp}
              text='Zarejestruj'
              type='button'
              disabled={loading}
            />
          </div>
        </form>
        <Loader
          loading={loading}
        />
      </div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login)

Login.propTypes = {
  /** */
  loading:  PropTypes.bool,
  /** */
  onLogIn:  PropTypes.func,
  /** */
  onSignUp: PropTypes.func,
}
