import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import QuestionBox from '../../components/QuestionBox/QuestionBox'

const Style = {
  test: 'test',
}

class Test extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      itemToRender: { answers: [] },
    }
    this.handleAnswer = this.handleAnswer.bind(this)
  }

  componentWillMount() {
    this.setState(setItemsToRender(this.props.questions, this.state.itemToRender))
  }

  componentWillReceiveProps(nextProps) {
    this.setState(setItemsToRender(nextProps.questions, this.state.itemToRender))
  }

  handleAnswer() {
    this.setState(setItemsToRender(this.props.questions, this.state.itemToRender))
  }

  render() {
    const { itemToRender } = this.state
    return (
      <div className={Style.test}>
        <QuestionBox 
          itemToRender={itemToRender}
          onAnswer={this.handleAnswer}
        />
      </div>
    )
  }
}

export default connect(mapStoreToProps, null)(Test)

const setItemsToRender = (questions, renderedItem) => {
  const rndNumber = Math.floor(Math.random() * (questions.length - 1))
  const itemToRender = questions.filter(item => item !== renderedItem)[rndNumber]
  return {
    itemToRender,
  }
}
