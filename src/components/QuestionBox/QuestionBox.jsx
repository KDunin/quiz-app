import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'
import { shuffleArray } from '../../utils/arrayUtils'

const Style = {
  box:      'question-box',
  question: 'question-box__question',
  answers:  'question-box__answers',
  answer:   'question-box__answers__answer',
  correct:  'question-box__answers__correct',
  wrong:    'question-box__answers__wrong',
}

class QuestionBox extends PureComponent {
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

  componentWillReceiveProps(nextProps) {
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
    const { correct } = this.props
    return answers.map(text => (
      <span
        key={text}
        className={joinClasses(conditionClass(answer, text, correct), Style.answer)}
        onClick={this.handleAnswer}
      >
        {text}
      </span>)
    ) 
  }

  render() {
    const { question } = this.props
    return (
      <div className={Style.box}>
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
  question: PropTypes.string,
  /** */
  answers:  PropTypes.array,
  /** */
  correct:  PropTypes.string,
  /** */
  onAnswer: PropTypes.func,
}

const conditionClass = (answer, text, correct) => {
  if (!answer) {
    return
  } else if (text === correct) {
    return Style.correct
  } else if (answer === text) {
    return Style.wrong
  }
}
