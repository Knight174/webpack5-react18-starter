const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = {
  entry: './src/main.tsx',
  output: {
    filename: 'js/[name].[contenthash:6].js',
    assetModuleFilename: 'assets/[name]_[hash][ext]',
    path: resolve(__dirname, '../dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.([jt]sx?)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
            minify: true,
          },
        },
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
              `,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|bmp|tiff)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name]_[hash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
      {
        test: /\.(otf|eot|woff2?|ttf|svg)$/,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name]_[hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style/[name].[contenthash:6].css',
    }),
  ],
};

module.exports = commonConfig;
