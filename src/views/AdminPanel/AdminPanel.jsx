import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import UniversalTable from '../../components/UniversalTable/UniversalTable'
import QuestionForm from '../../components/QuestionForm/QuestionForm'
import QuestionDataRow from '../../components/QuestionDataRow/QuestionDataRow'
import Button from '../../components/Button/Button'
import { joinClasses, conditionClass } from '../../utils/classUtils'

const TABLE_HEADERS = ['Kategoria', 'Pytanie', 'Opcje', 'Odpowiedź', 'Akcje']

const Style = {
  wrapper: 'admin-panel',
  add:     'admin-panel__add fas fa-plus',
  close:   'admin-panel__close',
}

const AdminPanel = ({ questions, onQuestionAdd, onQuestionEdit, onQuestionDelete, isForm, onFormHide }) => (
  <div className={Style.wrapper}>
    <QuestionForm />
    <UniversalTable
      data={questions}
      headers={TABLE_HEADERS}
      renderRow={renderQuestionDataRow(onQuestionEdit, onQuestionDelete)}
    />
    <Button 
      className={joinClasses(Style.add, conditionClass(isForm, Style.close, ''))}
      onClick={isForm ? onFormHide : onQuestionAdd}
      float
    />
  </div>
)

export default connect(mapStoreToProps, mapDispatchToProps)(AdminPanel)

AdminPanel.propTypes = {
  /** */
  questions:        PropTypes.array,
  /** */
  isForm:           PropTypes.bool,
  /** */
  onQuestionAdd:    PropTypes.func,
  /** */
  onQuestionEdit:   PropTypes.func,
  /** */
  onQuestionDelete: PropTypes.func,
  /** */
  onFormHide:       PropTypes.func,
}

const renderQuestionDataRow = (onEdit, onDelete) => (props, index) => (
  <QuestionDataRow
    key={index}
    onEdit={onEdit}
    onDelete={onDelete}
    {...props}
  />
)
