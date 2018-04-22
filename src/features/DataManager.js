import { getQuestionsList } from '../store/actions/questions'
import { isEmpty } from '../utils/arrayUtils'
import { getCookie } from './Cookies'

const DataManager = ({ dispatch, getState }) => {
  const { questions } = getState()
  const token = getCookie('token')
  if (isEmpty(questions) && token) {
    dispatch(getQuestionsList(getCookie('id')))
  }
}

export default DataManager
