import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import { isEmpty } from '../../utils/arrayUtils'

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
    }
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  componentDidMount() {
    const { questions } = this.props
    if (isEmpty(questions)) {
      return
    }
    this.setState(setItemsToRender(questions, this.state.question))
  }

  componentWillReceiveProps(nextProps) {
    this.setState(setItemsToRender(nextProps.questions, this.state.itemToRender))
  }

  handleAnswer() {
    this.setState(setItemsToRender(this.props.questions, this.state.itemToRender))
  }

  render() {
    const { question, answers, correct } = this.state
    return (
      <div className={Style.training}>
        <QuestionBox 
          question={question}
          answers={answers}
          correct={correct}
          onAnswer={this.handleAnswer}
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
