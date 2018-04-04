import { UPDATE_QUESTIONS_LIST } from '../actions/questions'

export const initialState = {
  questions: [],
}

const questionsReducer = (state = initialState, action) => { 
  switch (action.type) {
    case [UPDATE_QUESTIONS_LIST]: return state
    default: return state
  }
}
export default questionsReducer
