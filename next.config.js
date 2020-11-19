//const path = require('path');
//const webpack = require('webpack');
//const withPlugins = require('next-compose-plugins');
//const config = require('./server/config');
//const dev = config.nodeEnv !== 'production';
//const assetPrefix = dev ? '/' : staticCdnEndpoint

const nextConfig = {
    // 設定產出路徑為 /build 取代 /.next (for google cloud storage)
    distDir: 'build',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack', 'url-loader'],
            },
        ],
    },
    //assetPrefix,
};

module.exports = nextConfig;
