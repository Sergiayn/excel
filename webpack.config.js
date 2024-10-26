const path = require('path')
const HtmlWeboackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src', 'core'),
        }
    },
    plugins: [
        new HtmlWeboackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src','favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        })
    ]
}
