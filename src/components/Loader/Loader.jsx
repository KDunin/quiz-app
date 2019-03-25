import React from 'react'
import PropTypes from 'prop-types'

const Style = {
  wrapper: 'loader',
  blocks:  'loader__blocks',
  block:   'loader__blocks__block animation-grow',
  text:    'loader__text',
  hidden:  'loader--hidden',
}

export const Loader = ({ loading }) => 
  loading ? (
    <div className={Style.wrapper}>
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

Loader.propTypes = {
  loading: PropTypes.bool,
}
