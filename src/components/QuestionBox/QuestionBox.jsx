import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { joinClasses, conditionClass } from '../../utils/classUtils'
import { shuffleArray } from '../../utils/arrayUtils'

const DELAY = 1500

const Style = {
  box:     'question-box',
  hidden:  'question-box__hidden',
  text:    'question-box__text',
  expired: 'question-box__expired',
  answers: 'question-box__answers',
  answer:  'question-box__answers__answer',
  correct: 'question-box__answers__correct',
  wrong:   'question-box__answers__wrong',
}

class QuestionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: props.question,
      answers:  shuffleArray(props.answers),
      answer:   '',
      correct:  props.correct,
    }
    this.renderAnswers = this.renderAnswers.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  shouldComponentUpdate({ question, timer }, { answer }) {
    return answer !== this.state.answer || question !== this.props.question || timer !== this.props.timer
  }

  componentWillReceiveProps(nextProps) {
    const { question, answers, correct } = nextProps
    if (question === this.props.question) {
      return
    }
    
    const shuffledAnswers = shuffleArray(answers)
    this.setState({
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
      </span>)
    ) 
  }

  render() {
    const { question, started, timer, onTimeExpire } = this.props
    const { answer } = this.state

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
    }
    return (
      <div className={conditionClass(started, Style.box, Style.hidden)}>
        <span className={Style.text}>{question}</span>
        <div className={Style.answers}>
          {this.renderAnswers()}
        </div>
      </div>
    )
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
