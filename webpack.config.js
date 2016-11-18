/**
 * Created by kiny on 16/11/13.
 */
const webpack = require('webpack');
const path = require('path');

var port = 8000; // 端口号

module.exports = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 通过正则匹配js,jsx文件
        loader: 'es3ify-loader', // IE8兼容
        enforce: 'post',
      },
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        include: [path.join(__dirname, 'src')],
      },
      {
        test: /\.scss$/,
        // exclude: path.resolve(__dirname, 'src/css/'), // 跳过 css 目录
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'resolve-url-loader',
          { loader: 'sass-loader', query: { sourceMap: true } },
        ],
      },
      // {
      //   test: /\.css/,
      //   loaders: [
      //     'style',
      //     'css-loader',
      //     'resolve-url',
      //   ],
      // },
      // {
      //   test: /\.scss$/,
      //   include: path.resolve(__dirname, 'src/css/'),
      //   loaders: ['style', 'css?sourceMap', 'postcss', 'resolve-url', 'sass?sourceMap'],
      // },
      { test: /\.(jpg|gif|png|ico)$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourceMap: false
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': { NODE_ENV: JSON.stringify('production') }
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    host: '192.168.0.74',
    port: port,
    hot: true,
  }
};