import 'weui'
import dva from 'dva'
import { useRouterHistory } from 'dva/router'
import { createHashHistory } from 'history'
import createLoading from 'dva-loading'
import utils from '../utils'
import './index.less'

// 1. Initialize
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
  onError(error) {
    utils.debug(error)
  },
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require("../models/auth"))

// 4. Router
app.router(require('../routes'))

// 5. Start
app.start('#root')
