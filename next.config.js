// next.config.js
const withLess = require('@zeit/next-less');
const webpack = require('webpack');

module.exports = withLess({
  /* config options here */
  webpack(config) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    );
    return config;
  },
  env: {
    PORT: '8080',
  },
});
