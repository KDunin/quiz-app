import React from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  button: 'button',
}
const Button = ({ className, text, onClick }) => (
  <button 
    className={joinClasses(Style.button, className)}
    onClick={onClick}
  >
    {text}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  text:      PropTypes.string,
  onClick:   PropTypes.func,
}
export default Button
