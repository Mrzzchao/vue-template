/**
 * Created by MChao on 2017/9/10.
 */
const fs = require('fs')
const path = require('path')
const express = require('express')
const forwardRequest = require('forward-request')
const {createBundleRenderer} = require('vue-server-renderer')

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 3000


const template = fs.readFileSync(resolve('./public/index.tpl.html'), 'utf-8')

function createRender(bundle, options) {
    if(isProd) {

    }
}

app = express()

app.get('*', (req, res) => {

})