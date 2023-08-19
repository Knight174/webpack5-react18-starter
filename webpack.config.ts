import { merge } from 'webpack-merge'
import commonConfig from './build/webpack.base.config'
import productionConfig from './build/webpack.prod.config'
import developmentConfig from './build/webpack.dev.config'
import { WebpackOptionsNormalized, Configuration } from 'webpack'

export default (env): Partial<WebpackOptionsNormalized> | Configuration => {
  const isProduction: boolean = env && env.WEBPACK_BUILD
  const config = isProduction ? productionConfig : developmentConfig
  return merge(commonConfig, config)
}
