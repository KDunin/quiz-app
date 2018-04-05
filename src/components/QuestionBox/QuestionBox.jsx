import React, { PureComponent } from 'react'
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
      answers: [],
      answer:  '',
      correct: false,
    }
    this.renderAnswers = this.renderAnswers.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
  }
  componentWillMount() {
    const { itemToRender } = this.props
    const answers = shuffleArray(itemToRender.answers)
    this.setState({
      answer:  '',
      correct: false,
      answers,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { itemToRender } = nextProps
    const answers = shuffleArray(itemToRender.answers)
    this.setState({
      answer:  '',
      correct: false,
      answers,
    })
  }

  handleAnswer({ currentTarget }) {
    if (this.state.answer) {
      return
    }
    const { itemToRender, onAnswer } = this.props
    const answer = currentTarget.textContent
    const correct = currentTarget.textContent === itemToRender.correct
    this.setState({ answer, correct })
    setTimeout(onAnswer, 2000)
  }

  renderAnswers() {
    const { answers, answer, correct } = this.state
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
    const { itemToRender } = this.props
    return (
      <div className={Style.box}>
        <span className={Style.question}>{itemToRender.question}</span>
        <div className={Style.answers}>
          {this.renderAnswers()}
        </div>
      </div>
    )
  }
}

export default QuestionBox

QuestionBox.defaultProps = {
  itemToRender: { question: '', answers: [] },
}

const conditionClass = (answer, text, correct) => {
  if (answer !== text ) {
    return
  } else if (answer === text && !correct) {
    return Style.wrong
  } else {
    return Style.correct
  }
}
