import React, { Component } from 'react'

const Style = {
  homepage: 'homepage',
  title:    'homepage__title',
}

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'select',
    }
  }
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

export default Homepage
