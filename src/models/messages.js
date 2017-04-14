import ACTIONS from '../actions'
import effects from '../sagas/resources'
import reducers from '../reducers/resources'
import { resName, namespace } from '../constants'

export default {
  namespace: namespace.message,
  state: { list: [] },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/messages') {
          dispatch(
            ACTIONS.RESS.getRessAction({
              resName: resName.message,
            }),
          )
        }
      })
    },
  },
  effects: { ...effects },
  reducers: { ...reducers },
}
