import { UPDATE_QUESTIONS_LIST, ADD_NEW_QUESTION, DELETE_QUESTION } from '../actions/questions'
import { QUESTIONS } from '../../questions.js'
import { filterById } from '../../utils/dataUtils'

export const initialState = QUESTIONS

const questionsReducer = (state = initialState, { type, payload }) => { 
  switch (type) {
    case UPDATE_QUESTIONS_LIST: return payload.questions
    case ADD_NEW_QUESTION: return [...state, payload.question]
    case DELETE_QUESTION: return state.filter(filterById(payload.id))
    default: return state
  }
}
export default questionsReducer
