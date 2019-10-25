const path = require('path');
const {
  ProvidePlugin
} = require('webpack');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackRTLPlugin = require('webpack-rtl-plugin');

module.exports = env => ({
  entry: {
    percircle: './src/js/percircle.js',
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: env.development,
          },
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer'),
              env.production && require('cssnano')({})
            ].filter(plugin => !!plugin)
          }
        },
        'less-loader' // compiles Less to css
      ]
    }],
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new WebpackRTLPlugin(),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
});