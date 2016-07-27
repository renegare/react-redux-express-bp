import React from 'react'
import {renderToString} from 'react-dom/server'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { match, RouterContext} from 'react-router'

export default (routes) => (req, res, next) => {
  // Create a new Redux store instance
  const store = createStore((state={}) => state)

  match({routes, location: req.url}, (err, redirect, props) => {

    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>
    )

    const route = props.routes.slice(-1).pop()
    // @todo component should ideally have a say on this
    res.status(route && route.statusCode? route.statusCode : 200)
      .send(`
        <!DOCTYPE html>
        <html lang="en-GB">
          <head>
            <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
            <title>Carbon Cleaning Services Ltd</title>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700" rel="stylesheet" type="text/css">
            <link rel="stylesheet" href="/styles.css">
          </head>
          <body>
            <section id="root">${html}</section>
            <script charset="utf-8" src="/app.bundle.js"></script>
          </body>
        </html>
      `)
  })
}
