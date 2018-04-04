import { fetchQuestions } from '../../data/questions'

export const UPDATE_QUESTIONS_LIST = 'UPDATE_QUESTIONS_LIST'

export const getQuestionsList = () => {

  fetchQuestions()
  // .then(response => response.json())
  // .then((questions) => dispatch(updateQuestionsList(questions))) //TODO change it after server will be working
}

// const updateQuestionsList = (questions) => ({
//   type:    UPDATE_QUESTIONS_LIST,
//   payload: {
//     questions,
//   },
// })
