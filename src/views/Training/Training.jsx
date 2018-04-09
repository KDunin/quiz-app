import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import Rules from '../../components/Rules/Rules'

export const TRAINING = 'training'
const RULES = 'W trybie treningowy, czas na odpowiedz jest nieograniczony, przy wybraniu bledniej odpowiedzi, zostanie podswietlona rowniez poprawna odpowiedz.'

const Style = {
  training: 'training',
}

class Trening extends PureComponent {
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
  }

  handleAnswer() {
    this.setState(setItemsToRender(this.props.questions, this.state.itemToRender))
  }

  handleStart() {
    const { questions } = this.props
    this.setState(Object.assign({ started: true }, setItemsToRender(questions, this.state.question)))
  }

  render() {
    const { question, answers, correct, started } = this.state
    return (
      <div className={Style.training}>
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
          mode={TRAINING}
        />
      </div>
    )
  }
}

export default connect(mapStoreToProps, null)(Trening)

Trening.propTypes = {
  /** */
  questions: PropTypes.array,
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
