import 'ignore-styles'
import logger from 'debug'
import express from 'express'
import path from 'path'

import react from './middleware/react'
import reactRoutes from '../app/routes'

const debug = logger('server:debug')
const info = logger('server:info')
const error = logger('server:error')

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'client')))
} else {
  const webpack = require('webpack')
  const webpackConfig = require('../../webpack.config')
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
  }))
  app.use(express.static(path.resolve(__dirname, '..')))
}

app.use(react(reactRoutes))

const PORT = process.env.APP_PORT || 3000
app.listen(PORT, () => {
  info(`Listenting on port ${PORT}`)
})
