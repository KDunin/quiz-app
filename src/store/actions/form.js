export const SHOW_FORM = 'SHOW_FORM'
export const HIDE_FORM = 'HIDE_FORM'

export const showForm = (data = {}) => ({
  type:    SHOW_FORM,
  payload: {
    data,
  },
})

export const hideForm = (data) => ({
  type:    HIDE_FORM,
  payload: {
    data,
  },
}) 
