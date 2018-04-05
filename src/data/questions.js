import { fetchGet, postForm } from "../utils/fetchUtils"

const QUESTIONS_URL = 'api/questions'

export const fetchQuestions = () => fetchGet(QUESTIONS_URL)
export const postNewQuestionData = (data) => postForm(QUESTIONS_URL, data)
