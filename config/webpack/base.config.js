/*
 * @Description: webpack 基本配置
 * @Author: MADAO
 * @Date: 2022-09-13 16:50:19
 * @LastEditors: MADAO
 * @LastEditTime: 2022-09-14 15:25:40
 */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      { test: /\.tsx?$/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(scss|css)$/,
        use: [
          APP_ENV === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: '[name]-[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'renderer/images/[contenthash].[ext]',
        },
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
        generator: {
          filename: 'renderer/static/[contenthash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'renderer/fonts/[contenthash].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|swf|ogv)$/,
        type: 'asset/resource',
        generator: {
          filename: 'renderer/videos/[contenthash].[ext]',
        },
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '~': rootPath,
      '/renderer/assets/images': path.join(rootPath, '/renderer/assets/images'),
      '/renderer/assets/fonts': path.join(rootPath, '/renderer/assets/fonts'),
    },
  },
};

module.exports = {
  config,
  rootPath,
}
