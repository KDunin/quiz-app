import React from 'react'
import PropTypes from 'prop-types'
import { conditionClass } from '../../utils/classUtils'
import { isNumber } from '../../utils/typeUtils'

const Style = {
  box:     'score-counter',
  score:   'score-counter__score',
  counter: 'score-counter__counter',
  hidden:  'score-counter__hidden',
}

const ScoreCounter = ({ started, score, counter, max }) => {
  if (isNumber(score)) {
    return (
      <div className={conditionClass(started, Style.box, Style.hidden)}>
        <div className={Style.score}>{`Poprawnych: ${score}/${counter}`}</div>
      </div>
    )
  } else {
    return (
      <div className={conditionClass(started, Style.box, Style.hidden)}>
        <div className={Style.counter}>{`Pytanie: ${counter}/${max}`}</div>
      </div>
    )
  }
}

export default ScoreCounter

ScoreCounter.propTypes = {
  /** */
  started: PropTypes.bool,
  /** */
  score:   PropTypes.number,
  /** */
  counter: PropTypes.number,
  /** */
  max:     PropTypes.number,
}
