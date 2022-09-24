/*
 * @Description: electron main 打包配置
 * @Author: MADAO
 * @Date: 2022-09-13 16:03:27
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-24 13:32:00
 */
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const base = require('./base.config');

module.exports = merge(base.config, {
  target: 'electron-main',
  entry: {
    main: path.join(base.srcPath, '/main/index.ts'),
  },
  output: {
    path: path.join(base.rootPath, 'dist/main'),
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ],
  watchOptions: {
    ignored: [
      '**/preload',
      '**/renderer',
    ],
  },
});
