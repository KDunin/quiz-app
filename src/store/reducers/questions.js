import { UPDATE_QUESTIONS_LIST, ADD_NEW_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from '../actions/questions'
import { filterById, updateIfIdMatches } from '../../utils/dataUtils'

export const initialState = []

const questionsReducer = (state = initialState, { type, payload }) => { 
  switch (type) {
    case UPDATE_QUESTIONS_LIST: return payload.questions
    case ADD_NEW_QUESTION: return [payload.question, ...state]
    case UPDATE_QUESTION: return state.map(updateIfIdMatches(payload.question))
    case DELETE_QUESTION: return state.filter(filterById(payload.id))
    default: return state
  }
}
export default questionsReducer
