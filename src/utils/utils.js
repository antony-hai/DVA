import moment from 'moment'
import emoji from '../assets/emoji'

export default {
  debug(msg) {
    if (window.console) {
      console.log(msg)
    }
  },
  when(func, timeout = 100) {
    return new Promise((resolve, reject) => {
      if (typeof func === 'function') {
        func()
        setTimeout(() => resolve(), timeout)
      } else {
        reject()
      }
    })
  },
  // 获取QQ表情
  getEmoji(str = '', config = { base: 'qqemoji', prefix: 'qqemoji' }) {
    const re = /(\[{1}[^[\]]+\]{1})/gi
    const matchs = str.match(re)
    let text = str
    // 没有匹配到表情符号时，返回原有内容
    if (!matchs) {
      return text
    }
    matchs.forEach((value) => {
      const index = emoji.indexOf(value.toUpperCase())
      if (index > -1) {
        const elem = `<span class="${config.base} ${config.prefix}${index}"></span>`
        text = text.replace(value, elem)
      }
    })
    return text
  },
  // 时间格式转换
  moment(date, format = 'YYYY-MM-DD') {
    const formatDate = (d, f) => {
      const t = moment(d).format(f)
      return t === 'Invalid date' ? '' : t
    }

    if (Array.isArray(date)) {
      return date.reduce((result, item) => {
        const d = formatDate(item, format)
        return [...result, d]
      }, [])
    }
    return formatDate(date, format)
  },
  /**
   * 获取用户的访问设备：手机(mobile)/电脑(web)
   * @return <string>
   */
  getPlatformName() {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.indexOf('mobile') > -1) {
      return 'mobile'
    }
    return 'web'
  },
  /**
   * 链接自动识别
   * @param  <string>
   * @return <string>
   */
  linkAutoAble(str) {
    const re = /(https?:\/\/)?([a-z0-9-]+(\.[a-z0-9-]+)+([\w\-.,@?^=%&:/~+#]+)?)/gi
    return str.replace(re, '<a href="$1$2">$1$2</a>')
  },
  /**
   * 处理 action type
   * @param  <string>
   * @return <string>
   */
  handleActionType(type, namespace) {
    return namespace ? `${namespace}/${type}` : type
  },
  /**
   * 处理搜索条件
   * @param  <object> { a: '1', b: '2' }
   * @return <string> base64 string
   */
  filterToBase64(filter) {
    const buffer = Object.keys(filter).length > 0 ? (new Buffer(JSON.stringify(filter))) : ''
    const base64String = buffer.toString('base64').replace(/={1,2}$/, '')
    return base64String
  },
}
