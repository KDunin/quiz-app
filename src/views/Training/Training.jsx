import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import Rules from '../../components/Rules/Rules'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import ScoreCounter from '../../components/ScoreCounter/ScoreCounter'
import { randomNumber } from '../../utils/numberUtils'

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
      score:    0,
      counter:  0,
    }
    this.handleAnswer = this.handleAnswer.bind(this)
    this.handleStart = this.handleStart.bind(this)
  }

  handleAnswer(correct) {
    if (correct) {
      this.setState(prevState => 
        Object.assign({ score: ++prevState.score, counter: ++prevState.counter }, setItemsToRender(this.props.questions, this.state.question)))
    } else {
      this.setState(prevState => 
        Object.assign({ counter: ++prevState.counter }, setItemsToRender(this.props.questions, this.state.question)))
    }
  }

  handleStart() {
    const { questions } = this.props
    this.setState(Object.assign({ started: true }, setItemsToRender(questions, this.state.question)))
  }

  render() {
    const { question, answers, correct, started, score, counter } = this.state

    return (
      <div className={Style.training}>
        <Rules
          started={started}
          rules={RULES}
          onClick={this.handleStart}
        />
        <ScoreCounter
          started={started}
          score={score}
          counter={counter}
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
  const itemToRender = questions.filter(item => item.question !== question)[randomNumber(questions.length - 1)]
  
  return {
    question: itemToRender.question,
    answers:  itemToRender.answers,
    correct:  itemToRender.correct,
  }
}
