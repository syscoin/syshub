const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    url: require.resolve("url/"),
    crypto: require.resolve("crypto-browserify"),
    util: require.resolve("util/"),
    stream: require.resolve("stream-browserify"),
    vm: require.resolve("vm-browserify"),
    // buffer: require.resolve("buffer"),
    // process: require.resolve("process/browser"),
  };
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      // Buffer: ["buffer", "Buffer"], // Automatically provide Buffer
      process: "process/browser",
    }),
  ];
  return config;
};
