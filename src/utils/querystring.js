export default {
  /**
   * 搜索字符串转JSON对象
   * @param  <string> key=word&limit=10
   * @return <object> { key: 'word', limit: '10' }
   */
  parse(str) {
    return str.split('&').reduce((res, item) => {
      const arr = item.split('=')
      const key = decodeURIComponent(arr[0])
      const val = decodeURIComponent(arr[1])
      return { ...res, [key]: val }
    }, {})
  },
  /**
   * JSON对象转搜索字符串
   * @param  <object> { key: 'word', limit: '10' }
   * @return <string> key=word&limit=10
   */
  stringify(obj) {
    return Object.keys(obj).reduce((res, key) => {
      const val = obj[key]
      const str = encodeURIComponent(`${key}=${val}`)
      return res.concat(str)
    }, []).join('&')
  },
}
