import { combineReducers } from 'redux'
import questions, { initialState as questionsState } from './questions'
import timer, { initialState as timerState } from './timer'
import form, { initialState as formReducer } from './form'
import appStatus, { initialState as appStatusReducer } from './appStatus'

export const getRootReducer = () => combineReducers({
  appStatus,
  questions,
  timer,
  form,
})

export const getInitialState = () => ({
  appStatus: appStatusReducer,
  questions: questionsState,
  form:      formReducer,
  timer:     timerState,
})

