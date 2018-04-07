import { startTimer } from '../../store/actions/timer'

export const mapStoreToProps = ({ questions }) => ({
  questions,
})

export const mapDispatchToProps = (dispatch) => ({
  onTimerStart: (time) => dispatch(startTimer(time)),
})
