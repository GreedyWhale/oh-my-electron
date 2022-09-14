/*
 * @Description: electron renderer 打包配置
 * @Author: MADAO
 * @Date: 2022-09-13 16:03:27
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-14 16:32:42
 */
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const base = require('./base.config');

module.exports = merge(base.config, {
  target: 'electron20.1-renderer',
  entry: {
    app: path.join(base.rootPath, '/renderer/App.tsx')
  },
  output: {
    path: path.join(base.rootPath, 'dist'),
    filename: 'renderer/[name]_[contenthash].js',
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!main/**', '!preload/**'],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(base.rootPath, '/public'),
        to: path.join(base.rootPath, '/dist/'),
      }],
    }),
    new HtmlWebpackPlugin({
      title: 'oh-my-electron',
      filename: 'index.html',
      template: path.join(base.rootPath, '/renderer/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'renderer/css/[name].css',
    }),
  ],
  watchOptions: {
    ignored: ['**/main', '**/preload', '**/node_modules'],
  },
});
