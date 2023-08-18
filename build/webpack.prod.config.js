const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
  ],
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 30000000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          priority: -10,
          name: 'vendors',
        },
        commons: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'commons',
        },
      },
    },
  },
};

module.exports = prodConfig;
