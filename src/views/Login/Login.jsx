import React from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'
import Button from '../../components/Button/Button'

const Login = ({ handleLogIn }) => (
  <div>
    <form onSubmit={handleLogIn}>
      <input id='username' name='username' type='text' placeholder='Twoj nick' />
      <input id='password' name='password' type='password' placeholder='haslo'/>
      <Button
        text='Zaloguj'
      />
    </form>
  </div>
)

export default connect(null, mapDispatchToProps)(Login)
