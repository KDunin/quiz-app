import React, { PureComponent } from 'react'

const Style = {
  trening: 'trening',
}

class Trening extends PureComponent {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <span className={Style.trening}>TRENING</span>
    )
  }
}

export default Trening
