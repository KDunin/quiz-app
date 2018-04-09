import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'

const Style = {
  homepage: 'homepage',
  title:    'homepage__title',
}

class Homepage extends Component {

  render() {
    return (
      <div className={Style.homepage}>
        <span className={Style.title}>
          Super quiz
        </span>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Homepage)

