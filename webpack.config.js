const path = require('path');
const GoogleFontsPlugin = require("@beyonk/google-fonts-webpack-plugin")
const HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
  entry : './src/index.js',
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
      {test : /\.css$/, use:['style-loader', 'css-loader']}
    ]
  },
  mode:'development',
  plugins : [
    new HtmlWebpackPlugin ({
      template : 'public/index.html',
      favicon: 'public/policeman.ico'
    }),
    new GoogleFontsPlugin({fonts: [
      { family: "Nunito" },
    ]})
  ]

}
