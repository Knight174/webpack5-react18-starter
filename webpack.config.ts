import { merge } from 'webpack-merge'
import commonConfig from './build/webpack.base.config'
import productionConfig from './build/webpack.prod.config'
import developmentConfig from './build/webpack.dev.config'
import { WebpackOptionsNormalized, Configuration } from 'webpack'
import measureConfig from './build/measure'

export default (env): Partial<WebpackOptionsNormalized> | Configuration => {
  const isProduction: boolean = env && env.WEBPACK_BUILD

  const config = isProduction ? productionConfig : developmentConfig
  const mergeConfig = merge(commonConfig, config)

  return measureConfig(mergeConfig)
}
