import { resetTimer } from '../../store/actions/timer'

export const mapStoreToProps = ({ timer }) => ({
  time:    timer.time,
  loading: timer.loading,
})

export const mapDispatchToProps = (dispatch) => ({
  onTimerReset: () => dispatch(resetTimer),
})
