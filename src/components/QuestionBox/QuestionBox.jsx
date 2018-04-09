import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { joinClasses, conditionClass } from '../../utils/classUtils'
import { shuffleArray } from '../../utils/arrayUtils'

const Style = {
  box:      'question-box',
  hidden:   'question-box__hidden',
  question: 'question-box__question',
  answers:  'question-box__answers',
  answer:   'question-box__answers__answer',
  correct:  'question-box__answers__correct',
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
    }
    this.renderAnswers = this.renderAnswers.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  shouldComponentUpdate({ question }, { answer }) {
    return answer !== this.state.answer || question !== this.props.question
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.question === this.props.question) {
      return
    }
    const { question, answers, correct } = nextProps
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
    const { onAnswer } = this.props
    const answer = currentTarget.textContent
    this.setState({ answer })
    setTimeout(onAnswer, 2000)
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
    const { question, started } = this.props
    return (
      <div className={conditionClass(started, Style.box, Style.hidden)}>
        <span className={Style.question}>{question}</span>
        <div className={Style.answers}>
          {this.renderAnswers()}
        </div>
      </div>
    )
  }
}

export default QuestionBox

QuestionBox.defaultProps = {
  question: '',
  answers:  [],
}

QuestionBox.propTypes = {
  /** */
  question:  PropTypes.string,
  /** */
  answers:   PropTypes.array,
  /** */
  correct:   PropTypes.string,
  /** */
  onAnswer:  PropTypes.func,
  /** */
  className: PropTypes.string,
  /** */
  mode:      PropTypes.string,
  /** */
  started:   PropTypes.bool,
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
