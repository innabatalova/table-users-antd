import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store/store'

import App from './App'

import './index.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

