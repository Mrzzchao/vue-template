/**
 * Created by MChao on 2017/9/10.
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    performance: {
        maxEntrypointSize: 300000,
        hints: 'warning'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.[hash].css',
            disable: false,
            allChunks: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true,
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
                use: ExtractTextPlugin.extract({
                        use: 'css-loader?minimize',
                        fallback: 'vue-style-loader'
                    })
            }
        ]
    }
}

module.exports = config
