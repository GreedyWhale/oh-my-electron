/*
 * @Description: webpack 基本配置
 * @Author: MADAO
 * @Date: 2022-09-13 16:50:19
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-14 11:02:18
 */
const webpack = require('webpack');
const path = require('path');

const { APP_ENV = 'production' } = process.env;
const rootPath = path.join(__dirname, '../../');

const config =  {
  mode: APP_ENV,
  devtool: APP_ENV === 'production' ? false : 'eval-cheap-module-source-map',
  plugins: [
    new webpack.EnvironmentPlugin(['APP_ENV']),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, exclude: /node_modules/, use: ['babel-loader'] }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': rootPath,
      '/assets/images': path.join(rootPath, '/assets/images'),
      '/assets/fonts': path.join(rootPath, '/assets/fonts'),
    },
  },
};

module.exports = {
  config,
  rootPath,
}
