const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssUrlRelativePlugin = require("css-url-relative-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  output: {
    filename: "js/[name].[contenthash].bundle.js", // up to us
    path: path.resolve(__dirname, "dist") // up to us
  },
  optimization: {
    splitChunks: {
      chunks: "initial"
    },
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      // perhaps move to common
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CssUrlRelativePlugin(),
    new MiniCssExtractPlugin({
      //filename: "styles/[name].[contentHash].css"
      filename: "styles/[name].[chunkhash].css"
    })
    //new FaviconsWebpackPlugin("./src/images/icons/favicon.png"),
    // new FaviconsWebpackPlugin({
    //   logo: "./src/images/icons/favicon.png",
    //   prefix: "icons-[hash]/",
    //   emitStats: false,
    //   statsFilename: "iconstats-[hash].json",
    //   persistentCache: true,
    //   inject: true,
    //   background: "#fff",
    //   title: "Webpack App",
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: false,
    //     coast: false,
    //     favicons: true,
    //     firefox: false,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   }
    // })
  ],
  module: {
    rules: [
      {
        // maybe move to common
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. extract css into files from js
          "css-loader", // 2. turns css into common js
          "postcss-loader",
          "sass-loader" // 1.turns sass into css
        ]
      }
    ]
  }
});

// // Favicon
// exports.favIcon = () => ({
//   plugins: [
//     new FaviconsWebpackPlugin({
//       logo: "./src/images/icons/favicon.svg",
//       prefix: "icons-[hash]/",
//       emitStats: false,
//       statsFilename: "iconstats-[hash].json",
//       persistentCache: true,
//       inject: true,
//       background: "#fff",
//       title: "Webpack App",
//       icons: {
//         android: true,
//         appleIcon: true,
//         appleStartup: false,
//         coast: false,
//         favicons: true,
//         firefox: false,
//         opengraph: false,
//         twitter: false,
//         yandex: false,
//         windows: false
//       }
//     })
//   ]
// });
