const path = require('path');
const merge = require('webpack-merge');
const webpackCommon = require('./common.config');
let { lightFilenamePart } = require('./build-utils');

// webpack plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  let mode = argv.mode ? argv.mode : 'development';
  lightFilenamePart = mode === 'development' ? lightFilenamePart : lightFilenamePart + '.min';

  return merge.smart(webpackCommon, {
    bail: false,
    mode: 'production',

    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: `[name]${lightFilenamePart}.js`,
      chunkFilename: `[id]-[chunkhash]${lightFilenamePart}.js`
    },

    // eslint-disable-next-line no-undef
    optimization: optimization(mode),
    // eslint-disable-next-line no-undef
    plugins: plugins(mode)
  });
};

function optimization(mode) {
  console.log('mode', mode);
  if (mode !== 'production') {
    return;
  }

  return {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: {
            drop_debugger: true,
            drop_console: true
          },
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  };
}

function plugins(mode) {
  let plugins = [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode)
      }
    }),
    new MiniCssExtractPlugin({
      filename: `[name]${lightFilenamePart}.css`,
      chunkFilename: '[name].css'
    }),
    // new BundleAnalyzerPlugin() // TODO: add a switch for this
  ];
  if (mode !== 'development') {
    plugins.push(new OptimizeCssAssetsPlugin({}));
  }
  console.log(plugins);
  return plugins;
}
