import { createQuestion, editQuestion } from '../../store/actions/questions'
import { isEmptyObject } from '../../utils/objectUtils'

export const mapStoreToProps = ({ form }) => {
  const { data, visible } = form
  if (isEmptyObject(data)) {
    return ({
      id:       null,
      question: '',
      a:        '',
      b:        '',
      c:        '',
      d:        '',
      correct:  '',
      visible,
    })
  }
  const answers = data.answers || []

  return ({
    id:       data.id,
    question: data.question,
    a:        answers[0],
    b:        answers[1],
    c:        answers[2],
    d:        answers[3],
    correct:  data.correct,
    visible,
  })
}

export const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(switchSubmitAction(data.id)(data)),
})

export const switchSubmitAction = (id) => id ? editQuestion : createQuestion
