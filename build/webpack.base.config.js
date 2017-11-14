/**
 * Created by MChao on 2017/9/10.
 */
const path = require('path')
const srcPath = path.resolve(__dirname, '../src')
const merge = require('webpack-merge')
const baseProConf = require('./baseConfig/prod.config')
const baseDevConf = require('./baseConfig/dev.config')
const isProd = process.env.NODE_ENV === 'production'

const config = merge(isProd ? baseProConf : baseDevConf, {
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        alias: {
            '~': srcPath,
            'vue$': 'vue/dist/vue.esm.js',
            '~common': path.join(srcPath, 'common'),
            '~components': path.join(srcPath, 'components'),
            '~directives': path.join(srcPath, 'directives'),
            '~store': path.join(srcPath, 'store'),
            '~pages': path.join(srcPath, 'pages'),
            'assets': path.join(srcPath, 'assets'),
            '~assets': path.join(srcPath, 'assets')
        }
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 3000,
                    name: '[name].[hash].[ext]'
                }
            }
        ]
    },
})

modules.exports = config


