import { UPDATE_QUESTIONS_LIST, ADD_NEW_QUESTION, UPDATE_QUESTION, DELETE_QUESTION } from '../actions/questions'
import { filterById, updateIfIdMatches } from '../../utils/dataUtils'

export const initialState = {
  All: [],
}

const questionsReducer = (state = initialState, { type, payload }) => { 
  switch (type) {
    case UPDATE_QUESTIONS_LIST: return payload.questions
    case ADD_NEW_QUESTION: return Object.assign({}, state, { All: [payload.question, ...state.All] })
    case UPDATE_QUESTION: return Object.assign({}, state, { All: state.All.map(updateIfIdMatches(payload.question)) })
    case DELETE_QUESTION: return Object.assign({}, state, { All: state.All.filter(filterById(payload.id)) })
    default: return state
  }
}
export default questionsReducer
