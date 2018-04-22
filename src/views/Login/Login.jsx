import React from 'react'
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
}

const Login = ({ handleLogIn, handleSignUp }) => (
  <div className={Style.box}>
    <form 
      className={Style.login}
      onSubmit={handleLogIn}
    >
      <input
        id='username'
        name='username'
        type='text'
        placeholder='Nazwa użytkownika'
        className={Style.input}
      />
      <input
        id='password'
        name='password'
        type='password'
        placeholder='Hasło'
        className={Style.input}        
      />
      <div className={Style.buttons}>
        <Button
          className={Style.button}      
          text='Zaloguj'
          type='submit'
        />
        <Button
          className={Style.button} 
          onClick={handleSignUp}
          text='Zarejestruj'
          type='button'
        />
      </div>
    </form>
  </div>
)

export default connect(null, mapDispatchToProps)(Login)

Login.propTypes = {
  /** */
  handleLogIn:  PropTypes.func,
  /** */
  handleSignUp: PropTypes.func,
}
