import weui from 'weui.js'

export default {
  error: (content, options) => {
    const opts = Object.assign({}, { className: 'weui-toptips_warn' }, options)
    weui.topTips(content, opts)
  },
  info: (content, options) => {
    const opts = Object.assign({}, { className: 'weui-toptips_info' }, options)
    weui.topTips(content, opts)
  },
  success: (content, options) => {
    const opts = Object.assign({}, { className: 'weui-toptips_primary' }, options)
    weui.topTips(content, opts)
  },
}
