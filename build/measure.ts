import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'

const isMEASURE = process.env.MEASURE

// handle MiniCssExtractPlugin bug in SpeedMeasurePlugin: https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
const handleConfigWithMiniCssExtractPlugin = (config) => {
  const cssPluginIndex = config.plugins.findIndex(
    (e) => e.constructor.name === 'MiniCssExtractPlugin'
  )
  const cssPlugin = config.plugins[cssPluginIndex]
  const configToExport = new SpeedMeasurePlugin().wrap(config)
  configToExport.plugins[cssPluginIndex] = cssPlugin
  return configToExport
}

const measureConfig = (config) => {
  const configToExport = handleConfigWithMiniCssExtractPlugin(config)

  return isMEASURE ? configToExport : config
}

export { measureConfig, isMEASURE }
