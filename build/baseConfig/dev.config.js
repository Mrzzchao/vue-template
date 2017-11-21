/**
 * Created by MChao on 2017/9/10.
 */
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')

const config = {
    devtool: '#cheap-module-source-map',
    performance: {
        maxEntrypointSize: 300000,
        hints: false
    },
    module: {
        rules: [
            {
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
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'style-loader']
            }
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new vConsolePlugin({
            enable: true
        })
    ]
}

module.exports = config
