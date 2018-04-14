export const parseQuestionServerData = ({ _id, question, answers, correct  }) => ({
  id: _id,
  question,
  answers,
  correct,
})
