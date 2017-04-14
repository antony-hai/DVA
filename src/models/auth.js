
export default {
  namespace: 'auth',
  state: {},
  reducers: {
    init(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        const dom = document.getElementById('root');
        let newState = {};
        if (dom !== null && dom !== undefined) {
          const raw = dom.attributes['data-auth'].value;
          newState = JSON.parse(raw);
        }
        dispatch({ type: 'init', payload: newState });
      });
    },
  },
};
