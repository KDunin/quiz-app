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
const RULES            = 'W trybie testowym, musisz odpowiedzieć na 10 pytań, za każdą poprawną odpowiedź otrzymujesz punkt, czas na udzielenie odpowiedzi jest ograniczony i zależy od wybranego poziomu trudności.'

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
      questions: [],
      question:  '',
      correct:   '',
      answers:   [],
      score:     [],
      counter:   0,
      started:   false,
      summary:   false,
      category:  'All',
      level:     '1',
    }
    this.handleStart = this.handleStart.bind(this)
    this.handleAnswer = this.handleAnswer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTimeExpire = this.handleTimeExpire.bind(this)
    this.drawRandomQuestions = this.drawRandomQuestions.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    const { question, questions } = this.state
    return questions !== nextProps.questions || question !== nextProps.question
  }
  
  componentWillReceiveProps(nextProps) {
    const { questions } = nextProps
    if (questions === this.props.questions) {
      return
    }
    this.drawRandomQuestions(undefined, questions)
  }

  componentWillMount() {
    this.drawRandomQuestions()
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
  
  handleChange({ target }) {
    const { name, value } = target
    if (name === 'category') {
      this.setState({ [name]: value })
      this.drawRandomQuestions(value)
    } else {
      this.setState({ [name]: value })
    }
  }

  drawRandomQuestions(category = 'All', data) {
    const questions = data || this.props.questions
    if (isEmpty(questions.All)) {
      return
    }
    const randomQuestions = []
    let i = randomQuestions.length
    while (i < QUESTIONS_NUMBER) {
      const question = questions[category][randomNumber(questions[category].length)]
      if (!randomQuestions.includes(question)) {
        randomQuestions.push(question)
        i++
      }
    }
    this.setState({ questions: randomQuestions }) 
  }

  render() {
    const { question, answers, correct, started, score, counter, summary, level } = this.state
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
          mode={TEST}
          onClick={this.handleStart}
          onChange={this.handleChange}
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
            mode={TEST}
            timer={timer}
            onTimerStop={onTimerStop}
            onAnswer={this.handleAnswer}
            onTimeExpire={this.handleTimeExpire}
          />
          <Timer
            time={switchLevelToTime(level)}
          />
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
  questions:    PropTypes.object,
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

const switchLevelToTime = (level) => {
  switch (level) {
    case '1': return 15000
    case '2': return 10000
    case '3': return 5000
  }
}
