import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Home from './component/page/home'
import Error404 from './component/page/error404'

export default (
  <Route path="/">
    <IndexRoute component={Home}/>
    <Route path='*' statusCode={404} component={Error404} />
  </Route>
)
