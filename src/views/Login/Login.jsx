import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import Button from '../../components/Button/Button'
import { Loader } from '../../components/Loader/Loader'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  view:     'login',
  box:      'login__box',
  form:     'login__form',
  user:     'login__user',
  input:    'login__input',
  icon:     'login__icon',
  field:    'login__field',
  label:    'login__label',
  buttons:  'login__buttons',
  button:   'login__button',
  error:    'login__error',
  google:   'fab fa-google',
  facebook: 'fab fa-facebook-f',
}

const GOOGLE_BUTTON_ID = 'google-sign-in-button'
const FB_ERROR = 'Musisz zalogować się do facebooka'

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
    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this)
    this.handleFacebookSignIn = this.handleFacebookSignIn.bind(this)
  }

  componentDidMount() {
    window.gapi && window.gapi.signin2.render(
      GOOGLE_BUTTON_ID, {
        width:     50,
        height:    50,
        theme:     'dark',
        onsuccess: this.handleGoogleSignIn,
      }
    )
  }

  handleChange({ target }) {
    this.setState({ [ target.name ]: target.value })
  }

  renderError() {
    const { username, password, error } = this.state
    if ((!username || !password) && error) {
      return (
        <div className={ Style.error }>Uzupełnij pola!</div>
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

  handleGoogleSignIn(googleUser) {
    const profile = googleUser.getBasicProfile()
    const token = googleUser.getAuthResponse().id_token
    const email = profile.getEmail()

    this.props.onGoogleLogIn(email, token)
  }

  handleFacebookSignIn(e) {
    e.preventDefault()

    window.FB.login(response => {
      if (response.status !== 'connected') {
        this.props.throwError(FB_ERROR)
        return
      }

      window.FB.api('me?fields=id,email', facebookUser => {
        const { email, id } = facebookUser

        this.props.onFacebookLogIn(id, email)
      })
    }, { scope: 'public_profile,email' })
  }

  render() {
    const { error, username, password } = this.state
    const { loading } = this.props

    return (
      <div className={ Style.view }>
        <div className={ Style.box }>
          <div className={ Style.user }>
            <i className="fas fa-user"></i>
          </div>
          <form
            className={ Style.form }
            onSubmit={ this.handleSignIn }
          >
            <label className={ Style.label } htmlFor="username">Username</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'far fa-user') }></i>
              <input
                id='username'
                name='username'
                type='text'
                placeholder='Nazwa użytkownika'
                value={ username }
                className={ Style.field }
                onChange={ this.handleChange }
              />
            </div>
            <label className={ Style.label } htmlFor="password">Password</label>
            <div className={ Style.input }>
              <i className={ joinClasses(Style.icon, 'fas fa-lock') }></i>
              <input
                id='password'
                name='password'
                type='password'
                value={ password }
                placeholder='Hasło'
                className={ Style.field }
                onChange={ this.handleChange }
              />
            </div>
            { this.renderError(error) }
            <div className={ Style.buttons }>
              <Button
                className={ Style.button }
                text='Zaloguj'
                type='submit'
                disabled={ loading }
              />
              <Button
                className={ Style.button }
                onClick={ this.handleSignUp }
                text='Zarejestruj'
                type='button'
                disabled={ loading }
              />
              <div id={ GOOGLE_BUTTON_ID } />
              <Button
                className={ Style.facebook }
                onClick={ (e) => this.handleFacebookSignIn(e) }
                disabled={ loading }
                type='button'
                icon
              />
            </div>
          </form>
          <Loader loading={ loading } />
        </div>
      </div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login)

Login.propTypes = {
  /** */
  loading:         PropTypes.bool,
  /** */
  onLogIn:         PropTypes.func,
  /** */
  onSignUp:        PropTypes.func,
  /** */
  onGoogleLogIn:   PropTypes.func,
  /** */
  onFacebookLogIn: PropTypes.func,
  /** */
  throwError:      PropTypes.func,
}
