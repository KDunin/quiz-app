import React from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  button: 'button',
}
const Button = ({ className, text }) => (
  <button 
    className={joinClasses(Style.button, className)}
  >
    {text}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  text:      PropTypes.string,
}
export default Button
