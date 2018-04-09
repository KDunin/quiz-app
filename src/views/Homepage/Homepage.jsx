import React from 'react'

const Style = {
  homepage: 'homepage',
  title:    'homepage__title',
}

const Homepage = () => (
  <div className={Style.homepage}>
    <span className={Style.title}>
      Super quiz
    </span>
  </div>
)

export default Homepage

