import { showToast } from './appStatus'
import { fetchQuestions, postNewQuestionData, postQuestionData, deleteQuestionData } from '../../data/questions'
import { deleteUserQuestionData, postUserQuestionData, postNewUserQuestionData, fetchUserQuestionsData } from '../../data/userQuestions'
import { parseQuestionServerData } from '../mappers/questions'
import { findById } from '../../utils/dataUtils'
import { getCookie } from '../../features/Cookies'
import { showForm, hideForm } from './form'

export const UPDATE_QUESTIONS_LIST = 'UPDATE_QUESTIONS_LIST'
export const ADD_NEW_QUESTION      = 'ADD_NEW_QUESTION'
export const DELETE_QUESTION       = 'DELETE_QUESTION'

export const getQuestionsList = (id) => (dispatch) => {
  switchUserTypeAction(fetchUserQuestionsData, fetchQuestions)(id)
    .then((questions) => dispatch(updateQuestionsList(questions.map(parseQuestionServerData))))
    .catch(error => dispatch(showToast(error)))
}

export const createQuestion = (data) => (dispatch) => {
  dispatch(hideForm())
  
  switchUserTypeAction(postNewUserQuestionData, postNewQuestionData)(getCookie('id'), data)
    .then((question) => dispatch(addNewQuestion(parseQuestionServerData(question))))
    .catch(error => dispatch(showToast(error)))
}

export const editQuestionForm = (id) => (dispatch, getState) => {
  const questionData = getState().questions.find(findById(id))
  
  dispatch(showForm(questionData))
}

export const editQuestion = (data) => (dispatch) => {
  dispatch(hideForm())
  
  switchUserTypeAction(postUserQuestionData, postQuestionData)(getCookie('id'), data)
    .catch(error => dispatch(showToast(error)))
}

export const deleteQuestion = (questionId) => (dispatch) => {

  switchUserTypeAction(deleteUserQuestionData, deleteQuestionData)(getCookie('id'), questionId)
    .then(() => dispatch(removeQuestion(questionId)))
    .catch(error => dispatch(showToast(error)))
}

export const updateQuestionsList = (questions) => ({
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

const switchUserTypeAction = (userAction, adminAction) => {
  const type = getCookie('type')
  if (type === 'Admin') {
    return adminAction
  }
  return userAction
}
