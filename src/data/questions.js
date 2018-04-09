import { fetchGet, fetchPost } from "../utils/fetchUtils"

const QUESTIONS_URL = 'api/questions'

export const fetchQuestions = () => fetchGet(QUESTIONS_URL)
export const postNewQuestionData = (data) => fetchPost(QUESTIONS_URL, data)
