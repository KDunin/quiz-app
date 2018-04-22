import React from 'react'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  homepage:  'homepage',
  title:     'homepage__title',
  animation: 'animation-fade-in',
}

const Homepage = () => (
  <div className={Style.homepage}>
    <div className={joinClasses(Style.title, Style.animation)}>
      IT quiz
    </div>
  </div>
)

export default Homepage

