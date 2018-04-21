import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { conditionClass, joinClasses } from '../../utils/classUtils'

const Style = {
  box:     'score-counter',
  score:   'score-counter__score',
  counter: 'score-counter__counter',
  ul:      'score-counter__ul',
  li:      'score-counter__ul__li',
  active:  'score-counter__ul__li--active',
  correct: 'score-counter__ul__li--correct',
  wrong:   'score-counter__ul__li--wrong',
  hidden:  'score-counter__hidden',
}

class ScoreCounter extends PureComponent {

  renderListItems(max, counter, score) {
    
    return new Array(max).fill().map((item, index) => {
      const active = counter === index
      const correct = score[index]
      return (
        <li 
          key={index} 
          className={conditionClasses(index, active, correct, counter)}
        >
          {index+1}
        </li>
      )
    })
  }

  render() {
    const { started, score, counter, max, mode } = this.props

    if (mode !== 'test') {
      return (
        <div className={conditionClass(started, Style.box, Style.hidden)}>
          <div className={Style.score}>{`Poprawnych: ${score}/${counter}`}</div>
        </div>
      )
    } else {
      return (
        <div className={conditionClass(started, Style.box, Style.hidden)}>
          <ul className={Style.ul}>
            {this.renderListItems(max, counter, score)}
          </ul>
        </div>
      )
    }
  }
}

export default ScoreCounter

ScoreCounter.propTypes = {
  /** */
  started: PropTypes.bool,
  /** */
  score:   PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  /** */
  counter: PropTypes.number,
  /** */
  max:     PropTypes.number,
  /** */
  mode:    PropTypes.string,
}

const conditionClasses = (index, active, correct, counter) => {
  if (active) {
    return joinClasses(Style.li, Style.active)
  } else if (correct) {
    return joinClasses(Style.li, Style.correct)
  } else if ( counter > index  && !correct) {
    return joinClasses(Style.li, Style.wrong)
  } else {
    return Style.li
  }
}
