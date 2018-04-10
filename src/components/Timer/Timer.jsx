import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapStoreToProps, mapDispatchToProps } from './storeHelper'
import { conditionClass } from '../../utils/classUtils'

const Style = {
  timer:  'timer',
  bar:    'timer__bar',
  hidden: 'timer__hidden',
}

const TIME = 10000

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
    clearInterval(this.interval)
    if (!nextProps.loading) {
      this.setState({ loading: false })
      return
    }
    this.setState({ loading: true, width: 0 }, this.runTimer)
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  runTimer() {
    const { onTimerStop } = this.props
    let width = width || 0
    const increment = 100 / (TIME / 20)
    this.interval = setInterval(() => {
      if (width >= 100-increment) {
        clearInterval(this.interval)
        onTimerStop()
        this.setState({ loading: false })
      }
      width += increment
      this.setState({ width })
    }, 20)
  }

  render() {
    const { width, loading } = this.state

    return (
      <div className={conditionClass(loading, Style.timer, Style.hidden)}>
        <div style={{ width: `${width}%` }} className={Style.bar}></div>
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
