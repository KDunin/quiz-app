import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import Rules from '../../components/Rules/Rules'

export const TEST = 'test'
const RULES = 'W trybie testowym, musisz odpowiedziec na 10 losowych pytan, za kazda poprawna odpowiedz otrzymujesz punkt, czas na odpowiedz jest ograniczony.'

const Style = {
  test:   'test',
  hidden: 'test__hidden',
}

class Test extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      question: '',
      correct:  '',
      answers:  [],
      started:  false,
    }
    this.handleAnswer = this.handleAnswer.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleTimeExpire = this.handleTimeExpire.bind(this)
  }

  handleAnswer() {
    const { questions, onTimerStart } = this.props
    this.setState(setItemsToRender(questions, this.state.question), onTimerStart)
  }

  handleStart() {
    const { questions, onTimerStart } = this.props
    this.setState(Object.assign({ started: true }, setItemsToRender(questions, this.state.question)), onTimerStart)
  }

  handleTimeExpire() {
    const { questions, onTimerStart } = this.props
    this.setState(setItemsToRender(questions, this.state.question), onTimerStart)
  }
  render() {
    const { question, answers, correct, started } = this.state
    const { timer, onTimerStop } = this.props
    
    return (
      <div className={Style.test}>
        <Rules
          started={started}
          rules={RULES}
          onClick={this.handleStart}
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
  const rndNumber = Math.floor(Math.random() * (questions.length - 1))
  const itemToRender = questions.filter(item => item.question !== question)[rndNumber]
  return {
    question: itemToRender.question,
    answers:  itemToRender.answers,
    correct:  itemToRender.correct,
  }
}
