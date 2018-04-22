import React from 'react'
import PropTypes from 'prop-types'
import { joinClasses, conditionClass } from '../../utils/classUtils'

const Style = {
  button:     'button',
  iconButton: 'button__iconButton',
  icon:       'button__icon',
  float:      'button__float',
  disabled:   'button__disabled',
}

const Button = ({ icon, disabled, className, id, onClick, text, float, type }) => {
  if (icon) {
    return (
      <button
        className={joinClasses(Style.iconButton, className, conditionClass(disabled, Style.disabled))}
        disabled={disabled}
        onClick={onClick}
        id={id}
      >
        <i className={Style.icon}>{text}</i>
      </button> 
    )
  } else if (float) {
    return (
      <button
        className={joinClasses(Style.float, className, conditionClass(disabled, Style.disabled))}
        disabled={disabled}        
        onClick={onClick}
        id={id}
      >
        <i className={Style.icon}>{text}</i>
      </button> 
    )
  } else {
    return (
      <button 
        className={joinClasses(Style.button, className, conditionClass(disabled, Style.disabled))}
        disabled={disabled}        
        onClick={onClick}
        name={name}
        type={type}
        id={id}
      >
        {text}
      </button>
    )
  }
}

Button.propTypes = {
  /** */
  className: PropTypes.string,
  /** */
  id:        PropTypes.string,
  /** */
  text:      PropTypes.string,
  /** */
  type:      PropTypes.string,
  /** */
  float:     PropTypes.bool,
  /** */
  icon:      PropTypes.bool,
  /** */
  disabled:  PropTypes.bool,
  /** */
  onClick:   PropTypes.func,
}
export default Button
