const path = require('path');
const CSPHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'jsbin'),
    filename: 'polymer-app.js'
  },
  plugins: [
    new CSPHtmlWebpackPlugin({
      'script-src': "'self' https://unpkg.com",
      'object-src': "'none'",
      'style-src': "'self'",
      'img-src': "'self'",
      'media-src': "'self'"
    })
  ]
};