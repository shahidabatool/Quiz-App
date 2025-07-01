const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@react-pdf-viewer']
    }
  }, argv);

  // Add resolve fallbacks
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    asset: require.resolve('assert'),
  };

  // Add rule for PDF files
  config.module.rules.push({
    test: /\.pdf$/,
    type: 'asset/resource',
    generator: {
      filename: 'static/[hash][ext][query]'
    }
  });

  // Add CopyWebpackPlugin to copy files from public to dist
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: ''
        }
      ]
    })
  );

  return config;
}; 