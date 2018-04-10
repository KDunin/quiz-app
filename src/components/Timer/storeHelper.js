import { stopTimer } from '../../store/actions/timer'

export const mapStoreToProps = ({ timer }) => ({
  loading: timer.loading,
})

export const mapDispatchToProps = (dispatch) => ({
  onTimerStop: () => dispatch(stopTimer),
})
