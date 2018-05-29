const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: {
    index: ['./examples/index.js']
  },
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle-[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
}