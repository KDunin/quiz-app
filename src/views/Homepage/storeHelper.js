import { createNewQuestion } from '../../store/actions/questions'

export const mapDispatchToProps = (dispatch) => ({
  createQuestion: (data) => dispatch(createNewQuestion(data)),
})
