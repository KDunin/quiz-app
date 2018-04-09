import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { conditionClass } from '../../utils/classUtils'

const Style = {
  box:    'rules',
  rules:  'rules__text',
  button: 'rules__start',
  hidden: 'rules__hidden',
}

const Rules = ({ started, onClick, rules }) => (
  <div className={conditionClass(!started, Style.box, Style.hidden)}>
    <div className={Style.rules}>
      {rules}
    </div>
    <Button 
      className={Style.button}
      onClick={onClick}
      text='Start'
    />
  </div>
)
export default Rules

Rules.propTypes = {
  /** */
  className: PropTypes.string,
  /** */
  rules:     PropTypes.string,
  /** */
  onClick:   PropTypes.func,
  /** */
  started:   PropTypes.bool,
}
