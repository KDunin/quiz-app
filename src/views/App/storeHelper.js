export const mapStoreToProps = ({ appStatus }) => ({
  isLoggedIn: appStatus.loggedIn,
})
