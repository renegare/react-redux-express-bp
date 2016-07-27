import './styles.scss'

import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import routes from './routes'

const initialState = {}

const store = createStore(
  (state={}) => state,
  initialState,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>, document.getElementById('root'))
