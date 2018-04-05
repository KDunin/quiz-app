import { fetchQuestions, postNewQuestionData } from '../../data/questions'

export const UPDATE_QUESTIONS_LIST = 'UPDATE_QUESTIONS_LIST'
export const ADD_NEW_QUESTION      = 'ADD_NEW_QUESTION'

export const getQuestionsList = (dispatch) => {

  fetchQuestions()
    .then((response) => response.json())
    .then((questions) => dispatch(updateQuestionsList(questions)))
}

export const createNewQuestion = (data) => (dispatch) => {
  postNewQuestionData(data)
    .then((question) => dispatch(addNewQuestion(question)))
}

const updateQuestionsList = (questions) => ({
  type:    UPDATE_QUESTIONS_LIST,
  payload: {
    questions,
  },
})

const addNewQuestion = (question) => ({
  type:    ADD_NEW_QUESTION,
  payload: {
    question,
  },
})
