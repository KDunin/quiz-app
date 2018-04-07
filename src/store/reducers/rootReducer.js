import { combineReducers } from 'redux'
import questions, { initialState as questionsState } from './questions'
import timer, { initialState as timerState } from './timer'

export const getRootReducer = () => combineReducers({
  questions,
  timer,
})

export const getInitialState = () => ({
  questions: questionsState,
  timer:     timerState,
})

