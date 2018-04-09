import React from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  button:     'button',
  iconButton: 'button__iconButton',
  icon:       'button__icon',
  float:      'button__float',
}

const Button = ({ className, text, onClick, icon, float }) => (
  switchButtonType(icon, float, className, text, onClick)
)

Button.propTypes = {
  /** */
  className: PropTypes.string,
  /** */
  text:      PropTypes.string,
  /** */
  onClick:   PropTypes.func,
  /** */
  icon:      PropTypes.bool,
}
export default Button

const switchButtonType = (icon, float, className, text, onClick) => {
  if (icon) {
    return (
      <button
        className={Style.iconButton}
        onClick={onClick}
      >
        <i className={Style.icon}>{text}</i>
      </button> 
    )
  } else if (float) {
    return (
      <button
        className={Style.float}
        onClick={onClick}
      >
        <i className={Style.icon}>{text}</i>
      </button> 
    )
  } else {
    
    return (
      <button 
        className={joinClasses(Style.button, className)}
        onClick={onClick}
      >
        {text}
      </button>
    )
  }
}
