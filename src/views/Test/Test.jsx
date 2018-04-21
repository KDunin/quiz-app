import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import Timer from '../../components/Timer/Timer'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import Rules from '../../components/Rules/Rules'
import ScoreCounter from '../../components/ScoreCounter/ScoreCounter'
import { randomNumber } from '../../utils/numberUtils'
import { isEmpty } from '../../utils/arrayUtils'
import { conditionClass } from '../../utils/classUtils'

const QUESTIONS_NUMBER = 10
export const TEST      = 'test'
const RULES            = 'W trybie testowym, musisz odpowiedziec na 10 losowych pytan, za kazda poprawna odpowiedz otrzymujesz punkt, czas na odpowiedz jest ograniczony.'

const Style = {
  test:      'test',
  score:     'test__score',
  hidden:    'test__hidden',
  animation: 'animation-fade-in',
}

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: drawRandomQuestions(props.questions),
      question:  '',
      correct:   '',
      answers:   [],
      score:     [],
      counter:   0,
      started:   false,
      summary:   false,
    }
    this.handleAnswer = this.handleAnswer.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleTimeExpire = this.handleTimeExpire.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const { question, questions } = this.state
    return  questions !== nextProps.questions || question !== nextProps.question
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questions === this.props.questions) {
      return
    }
    this.setState({
      questions: nextProps.questions,
    })
  }

  componentWillUnmount() {
    this.props.onTimerStop()
  }

  handleAnswer(correct) {
    const { questions, question, score } = this.state
    const { onTimerStart } = this.props
    if (isEmpty(questions)) {
      if (correct) {
        return this.setState({ summary: true, score: [...score, 1] })
      }
      return this.setState({ summary: true, score: [...score, 0] })
    }
    if (correct) {
      this.setState(prevState => 
        Object.assign({ score: [...score, 1], counter: ++prevState.counter }, setItemsToRender(questions, question)), onTimerStart)
    } else {
      this.setState(prevState => 
        Object.assign({ score: [...score, 0], counter: ++prevState.counter }, setItemsToRender(questions, question)), onTimerStart)
    }
  }

  handleStart() {
    const { questions, question } = this.state
    const { onTimerStart } = this.props
    this.setState(Object.assign({ started: true }, setItemsToRender(questions, question)), onTimerStart)
  }

  handleTimeExpire() {
    const { questions, question, score } = this.state
    const { onTimerStart } = this.props
    this.setState(prevState => 
      Object.assign({ score: [...score, 0], counter: ++prevState.counter }, setItemsToRender(questions, question)), onTimerStart)
  }

  render() {
    const { question, answers, correct, started, score, counter, summary } = this.state
    const { timer, onTimerStop } = this.props
    if (summary) {
      return (
        <span className={Style.score}>
          TWÓJ WYNIK TO {score.filter(item => item).length}
        </span>
      )
    }
    return (
      <div className={Style.test}>
        <Rules
          started={started}
          rules={RULES}
          onClick={this.handleStart}
        />
        <div className={conditionClass(started, Style.animation, Style.hidden)}>
          <ScoreCounter
            started={started}
            counter={counter}
            max={QUESTIONS_NUMBER}
            score={score}
            mode={TEST}
          />
          <QuestionBox
            started={started}
            question={question}
            answers={answers}
            correct={correct}
            onAnswer={this.handleAnswer}
            mode={TEST}
            timer={timer}
            onTimeExpire={this.handleTimeExpire}
            onTimerStop={onTimerStop}
          />
          <Timer />
        </div>
      </div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Test)

Test.defaultProps = {
  questions: [],
}

Test.propTypes = {
  /** */
  questions:    PropTypes.array,
  /** */
  timer:        PropTypes.bool,
  /** */
  onTimerStart: PropTypes.func,
  /** */
  onTimerStop:  PropTypes.func,
}


const setItemsToRender = (questions, question) => {
  const itemToRender = questions.filter(item => item.question !== question)[randomNumber(questions.length - 1)]
  const newQuestions = questions.filter(item => item !== itemToRender)
  return {
    question:  itemToRender.question,
    answers:   itemToRender.answers,
    correct:   itemToRender.correct,
    questions: newQuestions,
  }
}

const drawRandomQuestions = (questions) => {
  if (isEmpty(questions)) {
    return
  }
  const randomQuestions = []
  let i = randomQuestions.length
  while (i < QUESTIONS_NUMBER) {
    const question = questions[randomNumber(questions.length)]
    if (!randomQuestions.includes(question)) {
      randomQuestions.push(question)
      i++
    }
  }
  return randomQuestions
}
