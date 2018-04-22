import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'

const Style = {
  box: 'toast animation-toast',
}

class Toast extends PureComponent {
  constructor() {
    super()
    this.hideToast = this.hideToast.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== '') {
      this.hideToast()
    }
  }
  hideToast() {
    setTimeout(() => {
      this.props.hideToast()
    }, 3000)
  }
  render() {
    const { text } = this.props
    if (!text) {
      return <div />
    }
    return (
      <div className={Style.box}>
        <div>
          {text}
        </div>
      </div>
    )
  }
}
  
export default connect(mapStoreToProps, mapDispatchToProps)(Toast)

Toast.propTypes = {
  /** */
  text:      PropTypes.string,
  /** */
  hideToast: PropTypes.func,
}
