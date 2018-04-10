const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const forwardRequest = require('forward-request')
const portfinder = require('portfinder')                   // 端口占用处理
const address = require('address')                         // 系统地址接口
const opn = require('opn')                                 // 浏览器打开

const app = express()
const config = require('./config/index')
const devConf = require('./build/webpack.dev.conf')
const compiler = webpack(devConf)
const resolve = file => path.resolve(__dirname, file)

const myPort = process.env.PORT || config.dev.port

app.use('/', express.static(resolve('public')))
app.use('/', express.static(resolve('dist')))

app.use(webpackDevMiddleware(compiler, {
    quiet: true,
    publicPath: devConf.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
    log: () => {}
}))

let ipAddress = process.env.ADDRESS || 'ews.500.com'
app.use((req, resp, next) => {
    if (req.originalUrl.indexOf('/ews') === 0) {      // 请求代理中间件
        forwardRequest({
            req,
            resp,
            host: 'ews.500.com',
            ip: ipAddress,
            // ip: '43.247.69.20',
            // ip: 'ews.500.com',
            // ip: '10.0.1.31',
            path: req.originalUrl.replace('/ews', '')
        })
    } else {
        next()
    }
})



const listenPort =  new Promise((resolve, reject) => {    // 检测端口是否被占用，如果被占用自动使用递增端口
  portfinder.basePort = myPort
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      resolve(port)
    }
  })
})

listenPort.then((port) => {
  app.listen(port, () => {
    const localhost = address.ip()
    const uri = `http://${localhost || 'localhost'}:${port}`
    console.log(`server started at ${uri}`)
    opn(uri)      // 自动打开浏览器
  })
})
