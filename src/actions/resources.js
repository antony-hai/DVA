import { handleActionType } from '../utils'

const handleAction = (actionType, options = {}) => {
  /**
   * options 包含字段如下：
   * namespace: string
   * resName: string
   * tagName: string
   * payload: json
   * callback: function
  */
  if (!options.resName) {
    throw new Error('resources name is empty.')
  }
  const type = handleActionType(actionType, options.namespace)
  return { type, ...options }
}

export default {
  GET: 'get',
  GET_SUCCESS: 'get/success',
  GET_FAIL: 'get/fail',

  GET_INFO: 'get/info',
  GET_INFO_SUCCESS: 'get/info/success',
  GET_INFO_FAIL: 'get/info/fail',

  POST: 'post',
  POST_SUCCESS: 'post/success',
  POST_FAIL: 'post/fail',

  PUT: 'put',
  PUT_SUCCESS: 'put/success',
  PUT_FAIL: 'put/fail',

  PATCH: 'patch',
  PATCH_SUCCESS: 'patch/success',
  PATCH_FAIL: 'patch/fail',

  DELETE: 'delete',
  DELETE_SUCCESS: 'delete/success',
  DELETE_FAIL: 'delete/fail',

  // 获取资源列表
  getRessAction(options = {}) {
    return handleAction(this.GET, options)
  },
  // 获取资源详情
  getRessInfoAction(options = {}) {
    return handleAction(this.GET_INFO, options)
  },
  // 添加一条资源
  postRessAction(options = {}) {
    return handleAction(this.POST, options)
  },
  // 修改资源信息
  putRessAction(options = {}) {
    return handleAction(this.PUT, options)
  },
  // 修改资源部分信息
  patchRessAction(options = {}) {
    return handleAction(this.PATCH, options)
  },
  // 删除一条资源
  deleteRessAction(options = {}) {
    return handleAction(this.DELETE, options)
  },
}
