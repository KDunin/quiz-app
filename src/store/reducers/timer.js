import { START_TIMER, STOP_TIMER } from '../actions/timer'
export const initialState = {
  loading: false,
}

const questionsReducer = (state = initialState, { type }) => { 
  switch (type) {
    case START_TIMER: return { loading: true }
    case STOP_TIMER: return { loading: false }
    default: return state
  }
}
export default questionsReducer
