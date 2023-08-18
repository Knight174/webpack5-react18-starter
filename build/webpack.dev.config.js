const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')

const devConfig = {
  mode: 'development',
  cache: {
    type: 'filesystem'
  },
  optimization: {
    usedExports: true
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
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

module.exports = devConfig
