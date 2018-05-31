import React from 'react'
import { joinClasses } from '../../utils/classUtils'

const Style = {
  homepage:   'homepage',
  info:       'homepage__info',
  copyrights: 'homepage__copyrights',
  contact:    'homepage__contact',
  animation:  'animation-fade-in',
}

const Homepage = () => (
  <div className={Style.homepage}>
    <div className={joinClasses(Style.info, Style.animation)}>
      <h3>Front-end:</h3>
      <br />
      <ul>
        <li>React</li>
        <li>Redux</li>
      </ul>
      <br />
      <span>Repozytorium:</span>
      <ul>
        <li><a href="https://github.com/KDunin/quiz-app">https://github.com/KDunin/quiz-app</a></li>
      </ul> 
      <br />
      <span>Hosting: </span>
      <ul>
        <li><a href="https://pages.github.com/">https://pages.github.com/</a></li>
      </ul> 
      <br />
      <h3>Back-end:</h3>
      <br />
      <ul>
        <li>Express</li>
        <li>Mongodb</li>
      </ul>
      <br />
      <span>Repozytorium:</span>
      <ul>
        <li><a href="https://github.com/KDunin/quiz-backend">https://github.com/KDunin/quiz-backend</a></li>
      </ul> 
      <br />
      <span>Hosting:</span>
      <ul>
        <li><a href="https://www.heroku.com/">https://www.heroku.com/</a></li>
        <li><a href="https://mlab.com/">https://mlab.com/</a></li>
      </ul>
    </div>
    <div className={Style.copyrights}>
      <div className={Style.contact}>
        <span>Telefon: 669363935</span>
        <span>Email: duninwasowiczk@gmail.com</span>
      </div>
    </div>
  </div>
)

export default Homepage
