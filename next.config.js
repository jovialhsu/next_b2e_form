const path = require("path");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

//const dev = config.nodeEnv !== 'production';
//const assetPrefix = dev ? '/' : staticCdnEndpoint
const config = require("./server/config");
const nextConfig = {
  // 設定產出路徑為 /build 取代 /.next (for google cloud storage)
  distDir: "build",
  assetPrefix: "/join",
  // basePath: '/join',
  publicRuntimeConfig: {
    basePath: "/join",
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};

// webpack: (config) => {
//     config.plugins.push(
//         new CompressionPlugin({
//             filename: '[path].gz[query]',
//             algorithm: 'gzip',
//             test: /\.js$|\.css$|\.html$/,
//             threshold: 10240,
//             minRatio: 0.8,
//         })
//     );
// },

module.exports = nextConfig;
