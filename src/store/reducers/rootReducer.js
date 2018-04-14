import { combineReducers } from 'redux'
import questions, { initialState as questionsState } from './questions'
import timer, { initialState as timerState } from './timer'
import form, { initialState as formReducer } from './form'

export const getRootReducer = () => combineReducers({
  questions,
  timer,
  form,
})

export const getInitialState = () => ({
  questions: questionsState,
  timer:     timerState,
  form:      formReducer,
})

