import { resolve } from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import dirname from './names'
import { WebpackOptionsNormalized, Configuration } from 'webpack'

const commonConfig: Partial<WebpackOptionsNormalized> | Configuration = {
  entry: './src/main.tsx',
  output: {
    filename: 'js/[name].[contenthash:6].js',
    assetModuleFilename: 'assets/[name]_[hash][ext]',
    path: resolve(dirname, '../dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve(dirname, '../src')
    }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.([jt]sx?)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript'
              ]
            }
          }
          // {
          //   loader: 'swc-loader',
          //   options: {
          //     jsc: {
          //       parser: {
          //         syntax: 'typescript',
          //         tsx: true
          //       }
          //     },
          //     minify: true
          //   }
          // }
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import "~@/style/_var.scss";
              `
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp|tiff)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name]_[hash][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        }
      },
      {
        test: /\.(otf|eot|woff2?|ttf|svg)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name]_[hash][ext]'
        }
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      title: 'Webpack5 + React18'
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:6].css'
    })
  ]
}

export default commonConfig
