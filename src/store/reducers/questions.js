import { UPDATE_QUESTIONS_LIST, ADD_NEW_QUESTION } from '../actions/questions'
import { QUESTIONS } from '../../questions.js'

export const initialState = QUESTIONS

const questionsReducer = (state = initialState, { type, payload }) => { 
  switch (type) {
    case UPDATE_QUESTIONS_LIST: return payload.questions
    case ADD_NEW_QUESTION: return [...state, payload.question]
    default: return state
  }
}
export default questionsReducer
