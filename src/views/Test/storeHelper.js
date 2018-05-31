import { runTimer, stopTimer } from '../../store/actions/timer'

export const mapStoreToProps = ({ questions, timer }) => ({
  timer: timer.loading,
  questions,
})

export const mapDispatchToProps = (dispatch) => ({
  onTimerStart: () => dispatch(runTimer),
  onTimerStop:  () => dispatch(stopTimer),
})

export const connectOpts = {
  areStatesEqual: (next, prev) => prev.questions === next.questions,
}
