import { getQuestionsList } from '../store/actions/questions'

const DataManager = (store) => {
  store.dispatch(getQuestionsList)
}

export default DataManager
