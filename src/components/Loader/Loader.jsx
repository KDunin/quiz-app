import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'
import PropTypes from 'prop-types'

const Style = {
  wrapper: 'loader',
  blocks:  'loader__blocks',
  block:   'loader__blocks__block animation-grow',
  text:    'loader__text',
  hidden:  'loader--hidden',
}

export class Loader extends PureComponent {
  render() {
    const { loading } = this.props
    return loading ? (
      <div className={Style.wrapper}>
        <div className={Style.text}>Logowanie, proszę czekać...</div>
        <div className={Style.blocks}>
          <div className={Style.block}></div>
          <div className={Style.block}></div>
          <div className={Style.block}></div>
          <div className={Style.block}></div>
          <div className={Style.block}></div>
        </div>
      </div>
    ) : (
      <div className={Style.hidden}></div>
    )
  }
}

export default connect(mapDispatchToProps)(Loader)

Loader.propTypes = {
  loading: PropTypes.bool,
}
