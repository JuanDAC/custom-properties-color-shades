const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const extensions = ['.js', '.mjs'];


module.exports = {
    resolve: {
        extensions,
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    }
}