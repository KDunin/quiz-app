import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { joinClasses } from '../../utils/classUtils'
import { mapDispatchToProps } from './storeHelper'
import { connect } from 'react-redux'

const Style = {
  homepage:   'homepage',
  info:       'homepage__info',
  copyrights: 'homepage__copyrights',
  contact:    'homepage__contact',
  animation:  'animation-fade-in',
}
class Homepage extends PureComponent {
  constructor() {
    super()

    this.copyToClipboard = this.copyToClipboard.bind(this)
  }

  copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    this.props.onTextCopy()
  }

  render() {
    return (
      <div className={ Style.homepage }>
        <div className={ joinClasses(Style.info, Style.animation) }>
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
        <div className={ Style.copyrights }>
          <div className={ Style.contact }>
            <i onClick={ () => this.copyToClipboard('669363935') } className="fas fa-phone"></i>
            <i onClick={ () => this.copyToClipboard('duninwasowiczk@gmail.com') } className="far fa-envelope"></i>
            <a href="https://github.com/KDunin" target="blank"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/krzysztof-dunin-w%C4%85sowicz-770781159" target="blank"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Homepage)

Homepage.propTypes = {
  /** */
  onTextCopy: PropTypes.func,
}
