import { fetchQuestions, postNewQuestionData, postQuestionData, deleteQuestionData } from '../../data/questions'
import { parseQuestionServerData } from '../mappers/questions'
import { findById } from '../../utils/dataUtils'
import { showForm, hideForm } from './form'

export const UPDATE_QUESTIONS_LIST = 'UPDATE_QUESTIONS_LIST'
export const ADD_NEW_QUESTION      = 'ADD_NEW_QUESTION'
export const DELETE_QUESTION       = 'DELETE_QUESTION'

export const getQuestionsList = (dispatch) => {

  fetchQuestions()
    .then((questions) => dispatch(updateQuestionsList(questions.map(parseQuestionServerData))))
}

export const createQuestion = (data) => (dispatch) => {
  dispatch(hideForm())

  postNewQuestionData(data)
    .then((question) => dispatch(addNewQuestion(parseQuestionServerData(question))))
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

export const deleteQuestion = (id) => (dispatch) => {

  deleteQuestionData(id)
    .then(() => dispatch(removeQuestion(id)))
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

const removeQuestion = (id) => ({
  type:    DELETE_QUESTION,
  payload: {
    id,
  },
})
