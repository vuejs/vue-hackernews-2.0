const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const isProd = process.env.NODE_ENV === 'production'
const mode = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  mode,
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../public')
    }
  },
  //https://stackoverflow.com/questions/49017682/webpack-4-migration-commonschunkplugin
  optimization: {
    splitChunks: {
      cacheGroups: {
        manifest: {
          test: /manifest/
        },
        vendors: {
          name: "vendors"
        }
      }
    },
    // mimimize default in production
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(styl(us))?$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        //exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader',
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require("postcss-import"),
                //require("tailwindcss"),
                require("autoprefixer")
              ]
            }
          } 
        ],
      }

    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: 'common.[chunkhash].css'
        })
      ]
    : [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({}),
        new FriendlyErrorsPlugin()
      ]
}
