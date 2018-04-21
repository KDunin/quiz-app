import { fetchGet, fetchPost, fetchPatch, fetchDelete } from "../utils/fetchUtils"

const QUESTIONS_URL = 'questions'

export const fetchQuestions = () => fetchGet(QUESTIONS_URL)
export const postNewQuestionData = (id, data) => fetchPost(QUESTIONS_URL, data)
export const postQuestionData = (id, data) => fetchPatch(`${QUESTIONS_URL}/${data.id}`, data)
export const deleteQuestionData = (id, questionId) => fetchDelete(`${QUESTIONS_URL}/${questionId}`)
