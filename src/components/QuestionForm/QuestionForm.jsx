import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps } from './storeHelper'
import Button from '../Button/Button'
import { conditionClass } from '../../utils/classUtils'

const Style = {
  form:     'question-form',
  textarea: 'question-form__textarea',
  button:   'question-form__button',
  hidden:   'question-form__hidden',
}

class QuestionForm extends Component {
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

  handleSubmit(event) {
    event.preventDefault()
    const { question, a, b, c, d, correct } = this.state

    this.props.createQuestion({
      answers: [a, b, c, d],
      question,
      correct,
    })
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  render() {
    const { question, a, b, c, d, correct } = this.state 
    const { visible, onSubmit } = this.props

    return (
      <form className={conditionClass(visible, Style.form, Style.hidden)} onSubmit={this.handleSubmit}>
        <span className={Style.label}>Pytanie</span>
        <textarea 
          name="question"
          value={question}
          onChange={this.handleChange}
          className={Style.textarea}
          rows={5}
          required
        />
        <span className={Style.label}>Opcja A</span>
        <textarea 
          name="a"
          value={a}
          onChange={this.handleChange}
          className={Style.textarea}
          rows={3}
          required
        />
        <span className={Style.label}>Opcja B</span>
        <textarea
          name="b"
          value={b}
          onChange={this.handleChange}
          className={Style.textarea}
          rows={3}
          required
        />
        <span className={Style.label}>Opcja C</span>
        <textarea
          name="c"
          value={c}
          onChange={this.handleChange}
          className={Style.textarea}
          rows={3}
          required
        />
        <span className={Style.label}>Opcja D</span>
        <textarea
          name="d"
          value={d}
          onChange={this.handleChange}
          className={Style.textarea}
          rows={3}
          required
        />
        <span className={Style.label}>Odpowiedź</span>
        <select
          name="correct"
          value={correct}
          onChange={this.handleChange}
          className={Style.textarea}
        >
          <option value={a}>A</option>
          <option value={b}>B</option>
          <option value={c}>C</option>
          <option value={d}>D</option>
        </select>
        <Button
          className={Style.button}
          onClick={onSubmit}
          text='Dodaj pytanie'
        />
      </form>
    )
  }
}

export default connect(null, mapDispatchToProps)(QuestionForm)

QuestionForm.propTypes = {
  /** */
  createQuestion: PropTypes.func,
  /** */
  visible:        PropTypes.bool,
  /** */
  onSubmit:       PropTypes.func,
}
