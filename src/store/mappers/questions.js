export const parseQuestionServerData = ({ _id, question, answers, correct, user  }) => ({
  id: _id,
  question,
  answers,
  correct,
  user,
})
