import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom' 
import { Provider } from 'react-redux'
import initStore from './store/store'
import DataManager from './features/DataManager'
import App from './views/App/App'
import registerServiceWorker from './registerServiceWorker'
import './index.scss'

const store = initStore()

DataManager(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
