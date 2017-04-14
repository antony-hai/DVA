import utils from './utils'
import token from './token'
import message from './message'
import handleForm from './handleForm'
import querystring from './querystring'

export default {
  ...utils,
  ...handleForm,
  token,
  message,
  querystring,
}
