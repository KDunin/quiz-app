import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'

const Style = {
  timer: 'timer',
  bar:   'timer__bar',
}

class Timer extends PureComponent {
  constructor() {
    super()
    this.state = {
      width:   0,
      loading: false,
    }
    this.runTimer = this.runTimer.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      return
    }
    this.runTimer()
    this.setState({ loading: nextProps.loading, width: 0 })
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  runTimer() {
    const { time, onTimerReset } = this.props
    let width = width || 0
    const increment = 100 / (time / 20)
    this.interval = setInterval(() => {
      if (width >= 100-increment) {
        clearInterval(this.interval)
        onTimerReset()
        this.setState({ loading: false })
      }
      width += increment
      this.setState({ width })
    }, 20)
  }

  render() {
    const { width, loading } = this.state
    if (loading) {
      return (
        <div className={Style.timer}>
          <div style={{ width: `${width}%` }} className={Style.bar}></div>
        </div>
      )
    }
    return (
      <div></div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Timer)

Timer.propTypes = {
  /** */
  time:         PropTypes.number,
  /** */
  loading:      PropTypes.func,
  /** */
  onTimerReset: PropTypes.func,
}
