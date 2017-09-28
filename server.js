const express = require('express')
const webpack = require('webpack')
const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const forwardRequest = require('forward-request')

const app = express()
const config = require('./build/webpack.dev.config')
const compiler = webpack(config)
const resolve = file => path.resolve(__dirname, file)

const port = process.env.PORT || 3001

app.use('/', express.static(resolve('public')))
app.use('/', express.static(resolve('dist')))

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler, {
    log: () => {}
}))

let ipAddress = process.env.ADDRESS || 'ews.500.com'
app.use((req, resp, next) => {
    if (req.originalUrl.indexOf('/ews') === 0) {
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


app.listen(port, function () {
    console.log(`server started at localhost:${port}`)
})
