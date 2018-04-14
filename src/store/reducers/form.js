import { SHOW_FORM, HIDE_FORM } from '../actions/form'

export const initialState = {
  visible: false,
  data:    {},
}

const formReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_FORM: return Object.assign({}, state, { visible: true, data: payload.data })
    case HIDE_FORM: return Object.assign({}, state, { visible: false, data: {} })
    default: return state
  }
}

export default formReducer
