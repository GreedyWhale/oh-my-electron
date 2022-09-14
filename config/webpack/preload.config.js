/*
 * @Description: electron preload 打包配置
 * @Author: MADAO
 * @Date: 2022-09-13 16:03:27
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-13 16:03:58
 */
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');


const base = require('./base.config');

module.exports = merge(base.config, {
  target: 'electron20.1-preload',
  entry: path.join(base.rootPath, '/preload/index.ts'),
  output: {
    path: path.join(base.rootPath, 'dist/preload'),
    filename: 'index.js',
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
  watchOptions: {
    ignored: ['**/renderer', '**/main', '**/node_modules'],
  },
});