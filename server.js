const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('./build/webpack.dev.config')
const compiler = webpack(config)
const resolve = file => path.resolve(__dirname, file)

const port = process.env.PORT || 3000

app.use('/', express.static(resolve('public')))

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
    log: () => {}
}))

app.listen(port, function () {
    console.log(`server started at localhost:${port}`)
})
