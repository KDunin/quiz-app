import { showToast } from "../../store/actions/appStatus"

export const mapDispatchToProps = (dispatch) => ({
  onTextCopy: () => dispatch(showToast({ message: 'Successfully copied to clipboard!' })),
})
