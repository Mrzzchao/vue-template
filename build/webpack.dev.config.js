/**
 * Created by MChao on 2017/9/10.
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')      // 很好的错误提示工具
const base = require('./webpack.base.config.js')
let entry = {}

// 添加热加载
Object.keys(base.entry).filter(key => key !== 'vendor').forEach(key => {
    entry[key] = ['webpack-hot-middleware/client?reload=true'].concat(base.entry[key])
})
base.entry = entry

module.exports = merge(base, {
	devtool: '#cheap-module-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsPlugin()
	],
	module: {
		rules:
        [{   // vue组件加载器
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				extractCSS: false,
				preserveWhitespace: false,
				postcss: [
					require('autoprefixer')({
						browsers: ['last 3 versions']
					})
				]
			}
		},
        {   // 将css注入到Html文件
			test: /\.css$/,
			use: ['vue-style-loader', 'style-loader', 'css-loader']
		}]
	},
    performance: {
        maxEntrypointSize: 300000,
        hints: false
    }
})
