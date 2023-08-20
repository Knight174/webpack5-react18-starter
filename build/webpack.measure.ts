import { merge } from 'webpack-merge'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import commonConfig from './webpack.base.config'
import productionConfig from './webpack.prod.config'

const smp = new SpeedMeasurePlugin()

export default () => {
  return smp.wrap(merge(commonConfig, productionConfig))
}
