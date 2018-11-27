const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode:'development',
  stats: {
      colors: true
  },
  devtool: 'source-map',
  entry: './src/index.js',          
  output: {                 
    path: path.resolve(__dirname,'dist'),          
    filename: 'js/app.bundle.js', 
  }, 
  plugins:  [
      new CopyWebpackPlugin([ 
            { from: 'src/index.html' }
        ]),
  ], 
  module: {
    rules: [
      { 
        test:/\.js$/,
        exclude: /node_modules/ ,
        use: [{loader: 'babel-loader'}]
      },
      { test: /\.css/,use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 3030,
    stats:"minimal",
    open:true
  }
};