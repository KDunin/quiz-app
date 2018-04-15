import { editQuestionForm, deleteQuestion } from '../../store/actions/questions'
import { hideForm, showForm } from '../../store/actions/form'

export const mapStoreToProps = ({ questions, form }) => ({
  form: form.visible,
  questions,
})

export const mapDispatchToProps = (dispatch) => ({
  onFormHide:       () => dispatch(hideForm()),
  onQuestionEdit:   ({ currentTarget }) => dispatch(editQuestionForm(currentTarget.id)),
  onQuestionAdd:    () => dispatch(showForm()),
  onQuestionDelete: ({ currentTarget }) => dispatch(deleteQuestion(currentTarget.id)),
})
