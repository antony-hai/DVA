import fetch from 'dva/fetch'
import cookie from 'js-cookie'
import utils from '../utils'

const qs = utils.querystring
const token = utils.token

function errorMessage({ status, statusText }) {
  return `${status} ${statusText}`
}

function check401(response) {
  if (response.status === 401) {
    window.location.href = '/401'
  }
  return response
}

function check404(response) {
  if (response.status === 404) {
    return Promise.reject(errorMessage(response))
  }
  return response
}

function parseJSON(response) {
  return response.json().then((result) => {
    return { ...response, result }
  })
}

function errorMessageParse(response) {
  const { success, message } = response.result
  if (!success) {
    if (response.result.exception) {
      const { exception: { error_msg: errMsg } } = response.result
      return Promise.reject(`${message}:${errMsg}}`)
    }
    return Promise.reject(message)
  }
  return response
}

function getConentType(type) {
  switch (type) {
    case 'urlencode':
      return 'application/x-www-form-urlencoded'
    case 'form':
      return 'multipart/form-data'
    default:
      return 'application/json'
  }
}

function handleFormData(data) {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key])
  })
  return formData
}

function handleParams(data, type) {
  switch (type) {
    case 'form':
      return handleFormData(data)
    case 'urlencode':
      return qs.stringify(data)
    default:
      return JSON.stringify(data)
  }
}

function handleRequestUrl(url, query) {
  return url.indexOf('?') > -1 ? `${url}&${query}` : `${url}?${query}`
}

export default function request(url, options = {}) {
  const opts = { ...options, credentials: 'include' }
  const dataType = opts.dataType ? opts.dataType : 'json'
  const method = opts.method ? opts.method : 'GET'
  const data = opts.data
  let requestUrl = url

  if (dataType) {
    opts.headers = { 'Content-type': getConentType(dataType) }
  }

  if (typeof data === 'object') {
    if (method.toUpperCase() === 'GET') {
      requestUrl = handleRequestUrl(requestUrl, qs.stringify(data))
    } else {
      const newData = Object.assign({ _token: token.get() || '' }, data)
      opts.body = handleParams(newData, dataType)
    }
  }

  opts.headers = {
    ...opts.headers,
    authorization: cookie.get('authorization') || '',
    'X-CSRF-TOKEN': cookie.get('XSRF-TOKEN') || '',
  }

  return fetch(requestUrl, opts)
    .then(check401)
    .then(check404)
    .then(parseJSON)
    .then(errorMessageParse)
    .catch((err) => { throw err })
}
