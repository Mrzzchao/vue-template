'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')                                  // 对象合并
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')                // 文件复制插件
const HtmlWebpackPlugin = require('html-webpack-plugin')                // 模板输出插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // 报错提示插件
const vConsolePlugin = require('vconsole-webpack-plugin')               // 移动端控制台

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)


// 添加热加载
let entry = {}
Object.keys(baseWebpackConfig.entry).forEach(key => {
  entry[key] = ['webpack-hot-middleware/client?reload=true'].concat(baseWebpackConfig.entry[key])
})
baseWebpackConfig.entry = entry

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  mode: 'development',
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin. 静态资源地址
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay           // 展现满屏错误提示
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,   // url公共路径
    proxy: config.dev.proxyTable,              // 请求代理
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    // new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new vConsolePlugin({
      enable: config.dev.isOpenVCon
    })
  ]
})

module.exports = devWebpackConfig
