import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import { getCookie } from '../../features/Cookies'

const Style = {
  answer:  'question-data-row__answer',
  actions: 'question-data-row__actions',
}

const QuestionDataRow = ({ id, question, answers, user, correct, category, onEdit, onDelete }) => (
  <tr key={id}>
    <td>{category}</td>
    <td>{question}</td>
    <td>
      <span className={Style.answer}>{`A: ${answers[0]}`}</span>
      <span className={Style.answer}>{`B: ${answers[1]}`}</span>
      <span className={Style.answer}>{`C: ${answers[2]}`}</span>
      <span className={Style.answer}>{`D: ${answers[3]}`}</span>
    </td>
    <td>{switchCorrectAnswer(answers, correct)}</td>
    {shouldBeDisabled(user) ?
      <td className={Style.actions} title="Nie możesz edytować pytań dodanych przez inną osobę">
        <i className="fas fa-ban"></i>
      </td>
      :
      <td className={Style.actions}>
        <Button
          id={id}
          className='fas fa-pen'
          onClick={onEdit}
          disabled={shouldBeDisabled(user)}
          icon
        />
        <Button
          id={id}
          className='fas fa-trash'
          onClick={onDelete}
          disabled={shouldBeDisabled(user)}
          icon
        />
      </td>
    }
  </tr>
)

export default QuestionDataRow

QuestionDataRow.propTypes = {
  /** */
  id:       PropTypes.string,
  /** */
  user:     PropTypes.string,
  /** */
  question: PropTypes.string,
  /** */
  category: PropTypes.string,
  /** */
  answers:  PropTypes.array,
  /** */
  correct:  PropTypes.string,
  /** */
  onEdit:   PropTypes.func,
  /** */
  onDelete: PropTypes.func,
}

const switchCorrectAnswer = (answers, correct) => {
  switch (correct) {
    case answers[0]: return 'A'
    case answers[1]: return 'B'
    case answers[2]: return 'C'
    case answers[3]: return 'D'
  }
}

const shouldBeDisabled = (user) => {
  const role = getCookie('type')
  return !user && role !== 'Admin' 
}
