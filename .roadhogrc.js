export default {
  // 入口文件, 支持多入口
  "entry": "src/entry/index.js",
  "publicPath": "/",
  "outputPath": "./dist",
  "autoprefixer": {
    "browsers": [
      "iOS >= 8",
      "Android >= 4",
    ],
  },
  // 配置是否多页应用
  "multipage": false,
  // "proxy": {
  //   "/api": {
  //     "target": "http://www.abc.com/",
  //     "changeOrigin": true,
  //   }
  // },
  "define": null,
  "theme": null,
  "env": {
    "development": {
      "extraBabelPlugins": ["dva-hmr"],
    },
    "production": {},
  },
  "extraBabelPlugins": [
    "transform-runtime",
  ],
}
