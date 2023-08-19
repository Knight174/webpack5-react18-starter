import { join } from 'path'
import ESLintPlugin from 'eslint-webpack-plugin'
import dirname from './names'
import { WebpackOptionsNormalized } from 'webpack'

const devConfig: Partial<WebpackOptionsNormalized> = {
  mode: 'development',
  cache: {
    type: 'filesystem'
  },
  optimization: {
    usedExports: true
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: join(dirname, 'dist'),
    open: true,
    compress: true,
    port: 8080,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://res.abeim.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  plugins: [
    new ESLintPlugin({
      fix: true,
      extensions: ['js', 'ts', 'tsx', 'json'],
      exclude: '/node_modules/'
    })
  ]
}

export default devConfig
