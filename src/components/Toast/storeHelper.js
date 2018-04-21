import { hideToast } from '../../store/actions/appStatus'

export const mapStoreToProps = ({ appStatus }) => ({
  text: appStatus.toast,
})

export const mapDispatchToProps = (dispatch) => ({
  hideToast: () => dispatch(hideToast()),
})
