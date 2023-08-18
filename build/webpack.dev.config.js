const path = require('path');

const devConfig = {
  mode: 'development',
  cache: {
    type: 'filesystem',
  },
  optimization: {
    usedExports: true,
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
          '^/api': '',
        },
      },
    },
  },
};

module.exports = devConfig;
