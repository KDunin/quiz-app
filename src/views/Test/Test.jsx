import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import QuestionBox from '../../components/QuestionBox/QuestionBox'
import { isEmpty } from '../../utils/arrayUtils'

const Style = {
  test: 'test',
}

class Test extends PureComponent {
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
    const { questions, onTimerStart } = this.props
    if (isEmpty(questions)) {
      return
    }
    this.setState(setItemsToRender(questions, this.state.question), onTimerStart(10000))
  }

  componentWillReceiveProps(nextProps) {
    this.setState(setItemsToRender(nextProps.questions, this.state.question))
  }

  handleAnswer() {
    const { questions, onTimerStart } = this.props
    this.setState(setItemsToRender(questions, this.state.question), onTimerStart(10000))
  }

  render() {
    const { question, answers, correct } = this.state
    return (
      <div className={Style.test}>
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

export default connect(mapStoreToProps, mapDispatchToProps)(Test)

Test.defaultProps = {
  questions: [],
}

Test.propTypes = {
  /** */
  questions:    PropTypes.array,
  /** */
  onTimerStart: PropTypes.func,
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
