const path = require('path')
const HtmlWeboackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'
    const isDev = !isProd
    const filename = ext => isProd ? `[name].bundle.${ext}?v=[contenthash]` : `[name].bundle.${ext}`

    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: ['@babel/polyfill','./index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: filename('js')
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
            }),
            new MiniCssExtractPlugin({
                filename: filename('css'),
            }),
            new CleanWebpackPlugin()
        ],
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    }
}
