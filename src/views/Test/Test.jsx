import React, { PureComponent } from 'react'

const Style = {
  test: 'test',
}

class Test extends PureComponent {
  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    return (
      <div className={Style.test}>
        ASDFGHJJJJ
      </div>
    )
  }
}

export default Test
