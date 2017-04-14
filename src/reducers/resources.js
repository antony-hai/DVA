import ACTIONS from '../actions'

export default {
  [ACTIONS.RESS.GET](state) {
    const { list = [] } = state
    return { ...state, list }
  },
  [ACTIONS.RESS.GET_SUCCESS](state, action) {
    const { payload = {} } = action
    const { data = [] } = payload
    return { ...state, list: data }
  },
  [ACTIONS.RESS.GET_FAIL](state) {
    const { list = [] } = state
    return { ...state, list }
  },
}
