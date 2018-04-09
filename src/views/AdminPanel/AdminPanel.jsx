import React , { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps } from './storeHelper'
import UniversalTable from '../../components/UniversalTable/UniversalTable'
import QuestionForm from '../../components/QuestionForm/QuestionForm'
import QuestionDataRow from '../../components/QuestionDataRow/QuestionDataRow'
import Button from '../../components/Button/Button'

const TABLE_HEADERS = ['Pytanie', 'Opcje', 'Odpowiedź', 'Akcje']

const Style = {
  wrapper: 'admin-panel',
}

class AdminPanel extends PureComponent {
  constructor() {
    super()
    this.state = {
      questionForm: false,
    }
    this.showForm = this.showForm.bind(this)
  }

  showForm() {
    const { questionForm } = this.state
    this.setState({
      questionForm: !questionForm,
    })
  }

  render() {
    const { questionForm } = this.state
    const { questions } = this.props

    return (
      <div className={Style.wrapper}>
        <QuestionForm
          visible={questionForm}
          onSubmit={this.showForm}
        />
        <UniversalTable
          data={questions}
          headers={TABLE_HEADERS}
          renderRow={renderQuestionDataRow}
        />
        <Button 
          text={questionForm ? "close" : "add"}
          className={Style.add}
          onClick={this.showForm}
          float
        />
      </div>
    )
  }
}

export default connect(mapStoreToProps)(AdminPanel)

AdminPanel.propTypes = {
  /** */
  questions: PropTypes.array,
}

const renderQuestionDataRow = (props) => (
  <QuestionDataRow
    {...props}
  />
)
