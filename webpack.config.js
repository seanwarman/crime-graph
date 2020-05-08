const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
  entry : './src/App.js',
  devServer: {
    port: 3000
  },
  output : {
    path : path.resolve(__dirname , 'dist'),
    filename: 'index_bundle.js'
  },
  module : {
    rules : [
      {test : /\.(js)$/, use:'babel-loader'},
      {test : /\.css$/, use:['style-loader', 'css-loader']},
      {test : /\.(png|jpe?g|gif)$/i, use:['file-loader']},
      {test : /\.(png|jpe?g|gif)$/i, use:['file-loader']},
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  mode:'development',
  plugins : [
    new HtmlWebpackPlugin ({
      template: 'public/index.html',
      favicon: 'public/policeman.ico'
    })
  ]

}
