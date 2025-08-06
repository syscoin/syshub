const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    url: require.resolve("url/"),
    crypto: require.resolve("crypto-browserify"),
    util: require.resolve("util/"),
    stream: require.resolve("stream-browserify"),
    vm: require.resolve("vm-browserify"),
    buffer: require.resolve("buffer/"),
    // process: require.resolve("process/browser"),
  };
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"], // Automatically provide Buffer
      process: "process/browser",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/images"),
          to: "assets/images",
        },
      ],
    }),
  ];

  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)$/i,
    type: "asset/resource",
    generator: {
      filename: "assets/images/[name][ext]",
    },
  });

  return config;
};
