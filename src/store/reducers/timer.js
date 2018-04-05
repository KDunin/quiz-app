import { START_TIMER, RESET_TIMER } from '../actions/timer'
export const initialState = {
  time:    4000,
  loading: false,
}

const questionsReducer = (state = initialState, { type, payload }) => { 
  switch (type) {
    case START_TIMER: return Object.assign({}, state, { loading: true, time: payload.time })
    case RESET_TIMER: return Object.assign({}, state, { loading: false })
    default: return state
  }
}
export default questionsReducer
