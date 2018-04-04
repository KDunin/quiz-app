import { combineReducers } from 'redux'
import questions, { initialState as questionsState } from './questions'

export const getRootReducer = () => combineReducers({
  questions,
})

export const getInitialState = () => ({
  questions: questionsState,
})

