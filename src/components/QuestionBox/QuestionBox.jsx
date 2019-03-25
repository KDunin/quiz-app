import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { joinClasses, conditionClass } from '../../utils/classUtils'
import { shuffleArray } from '../../utils/arrayUtils'

const DELAY = 3000

const Style = {
  box:      'question-box',
  hidden:   'question-box__hidden',
  visible:  'question-box__visible',
  text:     'question-box__text',
  expired:  'question-box__expired',
  question: 'question-box__question',
  answers:  'question-box__answers',
  answer:   'question-box__answers__answer',
  correct:  'animation-correct-answer',
  wrong:    'question-box__answers__wrong',
}

class QuestionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: props.question,
      answers:  shuffleArray(props.answers),
      answer:   '',
      correct:  props.correct,
      animate:  false,
    }
    this.renderAnswers = this.renderAnswers.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { question, answers, correct } = nextProps
    if (question === this.props.question) {
      return
    }
    
    const shuffledAnswers = shuffleArray(answers)
    this.setState({
      animate: true,
      answer:  '',
      answers: shuffledAnswers,
      correct,
      question,
    })
  }

  handleAnswer({ currentTarget }) {
    if (this.state.answer) {
      return
    }
    const { onAnswer, onTimerStop, mode } = this.props
    const answer = currentTarget.textContent
    this.setState({ answer })
    if (mode === 'test') {
      onTimerStop()
    }
    setTimeout(() => {
      this.setState({ animate: false })
    }, DELAY-400)
    setTimeout(onAnswer.bind(null, answer === this.state.correct), DELAY)
  }

  renderAnswers() {
    const { answers, answer } = this.state
    const { correct, mode } = this.props
    return answers.map(text => (
      <span
        key={text}
        className={joinClasses(switchConditionClass(mode)(answer, text, correct), Style.answer)}
        onClick={this.handleAnswer}
      >
        {text}
      </span>
    )) 
  }

  render() {
    const { question, started, timer, onTimeExpire } = this.props
    const { answer, animate } = this.state

    if (!timer && started && !answer) {
      return (
        <div className={joinClasses(Style.box, Style.expired)}>
          <div className={Style.text}>Czas upłynął</div>
          <Button
            text='Następne pytanie'
            onClick={onTimeExpire}
          />
        </div>
      )
    } else {
      return (
        <div className={conditionClass(started, Style.box, Style.hidden)}>
          <div className={conditionClass(animate, Style.visible, Style.hidden)}>
            <span className={Style.text}>{question}</span>
            <div className={Style.answers}>
              {this.renderAnswers()}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default QuestionBox

QuestionBox.defaultProps = {
  /** */
  question: '',
  /** */
  answers:  [],
  /** */
  timer:    true,
}

QuestionBox.propTypes = {
  /** */
  question:     PropTypes.string,
  /** */
  answers:      PropTypes.array,
  /** */
  correct:      PropTypes.string,
  /** */
  onAnswer:     PropTypes.func,
  /** */
  className:    PropTypes.string,
  /** */
  mode:         PropTypes.string,
  /** */
  started:      PropTypes.bool,
  /** */
  timer:        PropTypes.bool,
  /** */
  onTimeExpire: PropTypes.func,
  /** */
  onTimerStop:  PropTypes.func,
}

const switchConditionClass = (mode) => {
  switch (mode) {
    case 'training': return trainingConditionClass
    case 'test':     return testConditionClass
  }
}

const trainingConditionClass = (answer, text, correct) => {
  if (!answer) {
    return
  } else if (text === correct) {
    return Style.correct
  } else if (answer === text) {
    return Style.wrong
  }
}

const testConditionClass = (answer, text, correct) => {
  if (text === answer && answer === correct) {
    return Style.correct
  } else if (text === answer && answer !== correct) {
    return Style.wrong
  }
}
