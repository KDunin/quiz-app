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
      <div>Uwaga</div>
      <br />
      <ul>
        <li>Aplikacja w trakcie budowy - dostępne jest tylko 10 pytań.</li>
        <li>Na widoku pytania można podejrzeć wszystkie pytania wraz z odpowiedziami oraz dodawać/usuwać/edytować własne pytania, przypisane do konta.</li>
      </ul>
    </div>
  </div>
)

export default Homepage

