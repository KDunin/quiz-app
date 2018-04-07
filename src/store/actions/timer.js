export const START_TIMER = 'START_TIMER'
export const RESET_TIMER = 'RESET_TIMER'

export const startTimer = (time) => (dispatch) => {
  dispatch(runTimer(time))
}

export const resetTimer = (dispatch) => {
  dispatch(stopTimer())
}

const runTimer = (time) => ({
  type:    START_TIMER,
  payload: {
    time,
  },
})

const stopTimer = () => ({
  type: RESET_TIMER,
})
