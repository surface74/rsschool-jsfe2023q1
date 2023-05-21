/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function devServer(isDevelopmentMode) {
  return !isDevelopmentMode
    ? {}
    : {
      devServer: {
        open: true,
        hot: true,
        compress: true,
        port: 3000,
      },
    };
}

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: 'source-map',
  entry: {
    app: './minesweeper/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './minesweeper/src/index.html',
      filename: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './minesweeper/public',
        },
        {
          from: './minesweeper/src/assets/audio',
          to: './assets/audio',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
  ...devServer(develop),
});
