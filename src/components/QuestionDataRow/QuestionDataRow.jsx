import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'

const Style = {
  answer:  'question-data-row__answer',
  actions: 'question-data-row__actions',
}

const QuestionDataRow = ({ id, question, answers, correct, onEdit, onDelete }) => (
  <tr key={id}>
    <td>{question}</td>
    <td>
      <span className={Style.answer}>{`A: ${answers[0]}`}</span>
      <span className={Style.answer}>{`B: ${answers[1]}`}</span>
      <span className={Style.answer}>{`C: ${answers[2]}`}</span>
      <span className={Style.answer}>{`D: ${answers[3]}`}</span>
    </td>
    <td>{switchCorrectAnswer(answers, correct)}</td>
    <td className={Style.actions}>
      <Button
        id={id}
        text='edit'
        onClick={onEdit}
        icon
      />
      <Button
        id={id}
        text='delete'
        onClick={onDelete}
        icon
      />
    </td>
  </tr>
)

export default QuestionDataRow

QuestionDataRow.propTypes = {
  /** */
  id:       PropTypes.string,
  /** */
  question: PropTypes.string,
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
