import React from 'react'
import { Router } from 'dva/router'
import App from '../components/App'
import NotFound from '../components/NotFound'

const cached = {}

function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      component: App,
      indexRoute: {
        onEnter({ location }, replace) {
          if (location.pathname === '/') {
            replace('/messages')
          }
        },
      },
      childRoutes: [
        {
          path: 'messages',
          getComponent(state, callback) {
            require.ensure([], (require) => {
              registerModel(app, require('../models/messages'))
              callback(null, require('../components/Messages'))
            })
          },
        },
      ],
    },
    {
      path: "*",
      component: NotFound,
    },
  ]
  return (
    <Router history={history} routes={routes} />
  )
}


export default RouterConfig
