/**
 * Created by MChao on 2017/9/8.
 */
'use strict'
const devWebpackConfig = require("./webpack.dev.conf")
const utils = require('./utils')
const config = require('../config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // 报错提示插件
const portfinder = require('portfinder')
module.exports = new Promise((resolve, reject) => {    // 检测端口是否被占用，如果被占用自动使用递增端口
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
