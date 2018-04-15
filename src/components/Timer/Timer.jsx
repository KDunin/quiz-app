import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'

const Style = {
  timer:    'timer',
  bar:      'timer__bar',
  animate:  'timer__animate',
  progress: 'timer__bar__progress',
  counter:  'timer__counter',
  hidden:   'timer__hidden',
}

const TIME             = 10000
const UPDATE_INTERVAL  = 20
const UPDATE_INCREMENT = 100 / (TIME / UPDATE_INTERVAL)
const COUNTER          = TIME/1000

class Timer extends PureComponent {
  constructor() {
    super()
    this.state = {
      width:   0,
      counter: COUNTER,
    }
    this.runTimer = this.runTimer.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.counterInterval)
    clearInterval(this.timerInterval)
    if (!nextProps.loading) {
      return
    }
    this.setState({ width: 0, counter: COUNTER }, this.runTimer)
  }
  componentWillUnmount() {
    if (this.counterInterval && this.timerInterval) {
      clearInterval(this.counterInterval)
      clearInterval(this.timerInterval)
    }
  }
  runTimer() {
    const { onTimerStop } = this.props
    let width = 0
    let counter = COUNTER
    this.timerInterval = setInterval(() => {
      width = Math.min(100, width)
      if (width === 100) {
        clearInterval(this.counterInterval)
        clearInterval(this.timerInterval)
        onTimerStop()
      } else {
        width += UPDATE_INCREMENT
        this.setState({ width })
      }
    }, UPDATE_INTERVAL)
    this.counterInterval = setInterval(() => {
      --counter
      this.setState({ counter })
    }, 1000)
  }

  render() {
    const { width, counter } = this.state

    return (
      <div className={Style.timer}>
        <div className={Style.bar}><div style={{ width: `${width}%` }} className={Style.progress}><span className={Style.counter}>{counter + 's'}</span></div></div>
      </div>
    )
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Timer)

Timer.propTypes = {
  /** */
  time:        PropTypes.number,
  /** */
  loading:     PropTypes.bool,
  /** */
  onTimerStop: PropTypes.func,
}
