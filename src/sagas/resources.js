import utils from '../utils'
import ACTIONS from '../actions'
import API from '../services/resources'

const filterToBase64 = utils.filterToBase64

// 处理列表资源的 uri
const handleResUri = (resName, payload) => {
  const { page, filter = {} } = payload
  const fstring = filterToBase64(filter)
  const params = []
  let query = ''

  if (page || page === 0) {
    params.push(`page=${page}`)
  }

  if (fstring) {
    params.push(`f=${fstring}`)
  }

  query = params.join('&')

  if (resName.indexOf('?') > -1) {
    return `${resName}&${query}`
  }

  return `${resName}?${query}`
}

export default {
  // 获取资源列表
  *[ACTIONS.RESS.GET](action, { call, put }) {
    const { resName, tagName, payload = {}, callback } = action
    const resUri = handleResUri(resName, payload)
    const keyName = tagName || resName
    try {
      const { result = {} } = yield call(API.GET, resUri, payload)
      const { data } = result
      yield put({
        type: ACTIONS.RESS.GET_SUCCESS,
        tagName: keyName,
        payload: data,
      })
      if (typeof callback === 'function') {
        callback(null, data)
      }
    } catch (err) {
      yield put({
        type: ACTIONS.RESS.GET_FAIL,
        tagName: keyName,
        payload: err,
      })
      if (typeof callback === 'function') {
        callback(err, null)
      }
    }
  },
  // 获取资源详情
  *[ACTIONS.RESS.GET_INFO](action, { call, put }) {
    const { resName, tagName, payload = {}, callback } = action
    const resUri = handleResUri(resName, payload)
    const keyName = tagName || resName
    try {
      const { result = {} } = yield call(API.GET, resUri, payload)
      const { data } = result
      yield put({
        type: ACTIONS.RESS.GET_INFO_SUCCESS,
        tagName: keyName,
        payload: data,
      })
      if (typeof callback === 'function') {
        callback(null, data)
      }
    } catch (err) {
      // yield put({
      //   type: ACTIONS.RESS.GET_INFO_FAIL,
      //   tagName: keyName,
      //   payload: err,
      // })
      if (typeof callback === 'function') {
        callback(err, null)
      }
    }
  },
  // 新增资源
  *[ACTIONS.RESS.POST](action, { call, put }) {
    const { resName, tagName, payload = {}, callback } = action
    const resUri = handleResUri(resName, payload)
    const keyName = tagName || resName
    try {
      const { result = {} } = yield call(API.POST, resUri, payload)
      const { data } = result
      yield put({
        type: ACTIONS.RESS.POST_SUCCESS,
        tagName: keyName,
        payload: data,
      })
      if (typeof callback === 'function') {
        callback(null, data)
      }
    } catch (err) {
      // yield put({
      //   type: ACTIONS.RESS.POST_FAIL,
      //   tagName: keyName,
      //   payload: err,
      // })
      if (typeof callback === 'function') {
        callback(err, null)
      }
    }
  },
  // 修改资源
  *[ACTIONS.RESS.PUT](action, { call, put }) {
    const { resName, tagName, payload = {}, callback } = action
    const resUri = handleResUri(resName, payload)
    const keyName = tagName || resName
    try {
      const { result = {} } = yield call(API.PUT, resUri, payload)
      const { data } = result
      yield put({
        type: ACTIONS.RESS.PUT_SUCCESS,
        tagName: keyName,
        payload: data,
      })
      if (typeof callback === 'function') {
        callback(null, data)
      }
    } catch (err) {
      // yield put({
      //   type: ACTIONS.RESS.PUT_FAIL,
      //   tagName: keyName,
      //   payload: err,
      // })
      if (typeof callback === 'function') {
        callback(err, null)
      }
    }
  },
  // 修改资源部分字段
  *[ACTIONS.RESS.PATCH](action, { call, put }) {
    const { resName, tagName, payload = {}, callback } = action
    const resUri = handleResUri(resName, payload)
    const keyName = tagName || resName
    try {
      const { result = {} } = yield call(API.PATCH, resUri, payload)
      const { data } = result
      yield put({
        type: ACTIONS.RESS.PATCH_SUCCESS,
        tagName: keyName,
        payload: data,
      })
      if (typeof callback === 'function') {
        callback(null, data)
      }
    } catch (err) {
      yield put({
        type: ACTIONS.RESS.PATCH_FAIL,
        tagName: keyName,
        payload: err,
      })
      if (typeof callback === 'function') {
        callback(err, null)
      }
    }
  },
  // 删除资源
  *[ACTIONS.RESS.REMOVE](action, { call, put }) {
    const { resName, tagName, payload = {}, callback } = action
    const resUri = handleResUri(resName, payload)
    const keyName = tagName || resName
    try {
      const { result = {} } = yield call(API.REMOVE, resUri, payload)
      const { data } = result
      yield put({
        type: ACTIONS.RESS.DELETE_SUCCESS,
        tagName: keyName,
        payload: data,
      })
      if (typeof callback === 'function') {
        callback(null, data)
      }
    } catch (err) {
      // yield put({
      //   type: ACTIONS.RESS.DELETE_FAIL,
      //   tagName: keyName,
      //   payload: err,
      // })
      if (typeof callback === 'function') {
        callback(err, null)
      }
    }
  },
}
