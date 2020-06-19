const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    before: function(app, server, compiler) {
      server._watch("./src/*.html");
    },
    stats: "errors-only",
    compress: true,
    port: 8080, // defaults to 8080
    host: "0.0.0.0",
    //host: process.env.HOST,
    //port: process.env.PORT,
    hot: true,
    open: true,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "test.html",
      template: "src/test.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // 3. injects styles into DOM
          "css-loader", // 2. turns css into common js
          "sass-loader" // 1.turns sass into css
        ]
      }
    ]
  }
});
