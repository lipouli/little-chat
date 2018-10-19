const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// already with webpack, no need to install
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use : {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [
          argv === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
      disable: argv.mode !== 'production'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    alias: {
      Src: path.resolve(__dirname, 'src/')
    }
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
});
