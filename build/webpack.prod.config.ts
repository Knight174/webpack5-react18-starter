import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { WebpackOptionsNormalized, Configuration } from 'webpack'

const prodConfig: Partial<WebpackOptionsNormalized> | Configuration = {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          priority: -10,
          name: 'vendors'
        },
        commons: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'commons'
        }
      }
    }
  }
}

export default prodConfig
