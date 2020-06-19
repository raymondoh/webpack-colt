const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js"
  },

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: [
              "img:data-src",
              "img:src",
              "img: srcset",
              ":srcset",
              "link:href",
              "source:src",
              "source:srcset",
              "audio:src",
              "video:src"
            ],
            minimize: false // change to true
          }
        }
      },

      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images",
            esModule: false
          }
        }
      },
      {
        test: /\.(mov|mp4|webm)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "videos",
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts"
          }
        }
      }
    ]
  }
};
