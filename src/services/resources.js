import request from './request'

// 获取资源列表
async function get(url) {
  return request(`/${url}`)
}

// 新增资源
async function post(resName, data) {
  const { dataType, ...postData } = data
  return request(`/${resName}`, {
    method: 'POST',
    data: postData,
    dataType,
  })
}

// 修改资源
async function put(resName, data) {
  const { id, dataType, ...postData } = data
  return request(`/${resName}/${id}`, {
    method: 'PUT',
    data: postData,
    dataType,
  })
}

// 修改资源的部分字段
async function patch(resName, data) {
  const { id, dataType, ...postData } = data
  return request(`/${resName}/${id}`, {
    method: 'PATCH',
    data: postData,
    dataType,
  })
}

// 删除资源
async function remove(resName, data) {
  const { id, dataType, action = '' } = data
  return request(`/${resName}/${id}/${action}`, {
    method: 'DELETE',
    dataType,
  })
}

export default {
  GET: get,
  PUT: put,
  POST: post,
  PATCH: patch,
  REMOVE: remove,
}
