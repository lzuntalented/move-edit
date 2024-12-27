const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const mainKey = `main-${+new Date()}`;
module.exports = {
  entry: {
    [mainKey]: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true },
      },
      {
        test: /\.(scss|css)?$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ // Also generate a test.html
      chunks: [],
      filename: 'index.html',
      template: './public/index.html',
      templateParameters: {
        jsPath: mainKey,
      },
    }),
  ],
  mode: process.NODE_ENV,
  devServer: {
    port: 9000,
  },
};
