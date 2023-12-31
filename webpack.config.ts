import { merge } from 'webpack-merge'
import { WebpackOptionsNormalized, Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import commonConfig from './build/webpack.base.config'
import productionConfig from './build/webpack.prod.config'
import developmentConfig from './build/webpack.dev.config'
import { measureConfig, isMEASURE } from './build/measure'

export default (env): Partial<WebpackOptionsNormalized> | Configuration => {
  const isProduction: boolean = env && env.WEBPACK_BUILD

  const config = isProduction ? productionConfig : developmentConfig
  const mergeConfig = isMEASURE
    ? merge(commonConfig, config, {
        plugins: [new BundleAnalyzerPlugin()]
      })
    : merge(commonConfig, config)

  return measureConfig(mergeConfig)
}
