const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const config = require('./build/webpack.config')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
    log: () => {}
}))

app.listen(3000, function () {
    console.log('listen at port 3000')
})
