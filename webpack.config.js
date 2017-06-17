const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'styles/[name].min.css',
    allChunks: true
});

const path = require('path');

module.exports = {
    entry: {
        mate: './src/styles/scss/mate.scss'
    },
    output: {
        filename: 'styles/mate.min.css',
        path: path.resolve(__dirname, './dist/assets')
        //publicPath: '/assets/'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(woff2?)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[folder]/[name].[ext]',
                        publicPath: '../',
                        outputPath: 'fonts/'
                        //useRelativePath: true,
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract([
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "resolve-url-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ])
            }
        ]
    },
    plugins: [
        extractSass
    ]
};