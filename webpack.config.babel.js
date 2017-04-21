import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  devtool: 'cheap-module-source-map',

  entry: [
    './app/index.js'
  ],

  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      // Transpile .js and .jsx files using Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      // Extract all .global.css to style.css as is
      {
        test: /\.global\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        })
      },
      // Pipe other styles through css modules and append to style.css
      {
        test: /^((?!\.global).)*\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            }
          }
        })
      },
      // The "file" loader for svg
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules']
  },

  plugins: [
    // create css bundle
    new ExtractTextPlugin('style.css'),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      inject: true
    })
  ],
};