import { fetchQuestions, postNewQuestionData, postQuestionData } from '../../data/questions'
import { parseQuestionServerData } from '../mappers/questions'
import { findById } from '../../utils/dataUtils'
import { showForm, hideForm } from './form'

export const UPDATE_QUESTIONS_LIST = 'UPDATE_QUESTIONS_LIST'
export const ADD_NEW_QUESTION      = 'ADD_NEW_QUESTION'

export const getQuestionsList = (dispatch) => {

  fetchQuestions()
    .then((questions) => dispatch(updateQuestionsList(questions.map(parseQuestionServerData))))
}

export const createQuestion = (data) => (dispatch) => {
  dispatch(hideForm())

  postNewQuestionData(data)
    .then((question) => dispatch(addNewQuestion(question)))
}

export const editQuestionForm = (id) => (dispatch, getState) => {
  const questions = getState().questions
  const questionData = questions.find(findById(id))
  
  dispatch(showForm(questionData))
}

export const editQuestion = (data) => (dispatch) => {
  dispatch(hideForm())
  
  postQuestionData(data)
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
