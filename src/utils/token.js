const storage = window.localStorage
const tokenName = '_token'

export default {
  set(value) {
    storage.setItem(tokenName, value)
  },
  get() {
    return storage.getItem(tokenName)
  },
}
