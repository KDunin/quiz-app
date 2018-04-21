import { fetchGet, fetchPost, fetchDelete, fetchPatch } from '../utils/fetchUtils'

const USER_QUESTIONS_URL = 'user/'

export const fetchUserQuestionsData = (id) => fetchGet(`${USER_QUESTIONS_URL}${id}`)
export const postNewUserQuestionData = (id, data) => fetchPost(`${USER_QUESTIONS_URL}${id}`, data)
export const postUserQuestionData = (id, data) => fetchPatch(`${USER_QUESTIONS_URL}${id}/questions/${data.id}`, data)
export const deleteUserQuestionData = (id, questionId) => fetchDelete(`${USER_QUESTIONS_URL}${id}/questions/${questionId}`)
