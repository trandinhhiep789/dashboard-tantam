import React from 'react'
import ReactDOM from 'react-dom/client'

import './i18n'
import App from './App'
import reportWebVitals from './reportWebVitals'

import 'antd/dist/antd.css'
import './css/global-style.css'

import store from './app/store'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import ErrorBoundary from './ui-component/error-boundary/ErrorBoundary'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
    <React.Suspense fallback={<div></div>}>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </React.Suspense>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
