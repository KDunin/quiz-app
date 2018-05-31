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

const UPDATE_INTERVAL  = 20

class Timer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      time:      props.time,
      width:     0,
      counter:   props.time / 1000,
      increment: 100 / (props.time / UPDATE_INTERVAL),
    }
    this.runTimer = this.runTimer.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(this.counterInterval)
    clearInterval(this.timerInterval)
    const { loading, time } = nextProps
    if (!loading) {
      return
    }
    this.setState({ width: 0, counter: time / 1000, increment: 100 / (time / UPDATE_INTERVAL) }, this.runTimer)
  }
  componentWillUnmount() {
    if (this.counterInterval && this.timerInterval) {
      clearInterval(this.counterInterval)
      clearInterval(this.timerInterval)
    }
  }
  runTimer() {
    const { onTimerStop } = this.props
    const { counter, increment } = this.state
    let width = 0
    let counter2 = counter
    this.timerInterval = setInterval(() => {
      width = Math.min(100, width)
      if (width === 100) {
        clearInterval(this.counterInterval)
        clearInterval(this.timerInterval)
        onTimerStop()
      } else {
        width += increment
        this.setState({ width })
      }
    }, UPDATE_INTERVAL)
    this.counterInterval = setInterval(() => {
      --counter2
      this.setState({ counter: counter2 })
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
