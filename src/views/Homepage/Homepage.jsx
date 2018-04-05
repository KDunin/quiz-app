import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'

const Style = {
  homepage: 'homepage',
  title:    'homepage__title',
  form:     'homepage__form',
}

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: 'Które z poniższych urządzeń pracuje jako urządzenie analogowe?',
      a:        'Switch',
      b:        'Hub',
      c:        'Router',
      d:        'Bridge',
      correct:  'Hub',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }
  handleSubmit(event) {
    event.preventDefault()
    alert("nie")
    // const { question, a, b, c, d, correct } = this.state

    // this.props.createQuestion({
    //   answers: [a, b, c, d],
    //   question,
    //   correct,
    // })
  }

  render() {
    const { question, a, b, c, d, correct } = this.state 
    return (
      <div className={Style.homepage}>
        <span className={Style.title}>
          Super quiz
        </span>
        <div>
          <form className={Style.form} onSubmit={this.handleSubmit}>
            <input 
              name="question"
              type="text"
              placeholder="Pytanie"
              value={question}
              onChange={this.handleChange}
            />
            <input
              name="a"
              type="text"
              placeholder="A"
              value={a}
              onChange={this.handleChange}
            />
            <input
              name="b"
              type="text"
              placeholder="B"
              value={b}
              onChange={this.handleChange}
            />
            <input
              name="c"
              type="text"
              placeholder="C"
              value={c}
              onChange={this.handleChange}
            />
            <input
              name="d"
              type="text"
              placeholder="D"
              value={d}
              onChange={this.handleChange}
            />
            <input
              name="correct"
              type="text"
              placeholder="Odpowiedz"
              value={correct}
              onChange={this.handleChange}
            />
            <button
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Homepage)
