const path = require('path');
const webpack = require('webpack');
const FilemanagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtensionReloader = require('webpack-ext-reloader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const Dotenv = require('dotenv-webpack');
const { version } = require('./package.json');

const viewsPath = path.join(__dirname, 'views');
const sourcePath = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'dist');
const nodeEnv = process.env.NODE_ENV || 'development';
const targetBrowser = process.env.TARGET_BROWSER;

const isDevelopment = process.env.NODE_ENV !== 'production';

const extensionReloaderPlugin =
  nodeEnv === 'development'
    ? new ExtensionReloader({
      port: 9000,
      reloadPage: true,
      entries: {
        // TODO: reload manifest on update
        background: 'background',
        popup: 'popup',
        extensionPage: ['newtab'],
      },
    })
    : () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      this.apply = () => { };
    };

const getExtensionFileType = (browser) => {
  if (browser === 'opera') {
    return 'crx';
  }

  if (browser === 'firefox') {
    return 'xpi';
  }

  return 'zip';
};

module.exports = {
  devtool: false, // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342

  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },

  mode: nodeEnv,

  entry: {
    manifest: path.join(sourcePath, 'manifest.json'),
    content: path.join(sourcePath, 'content'),
    background: path.join(sourcePath, 'background', 'index.ts'),
    newtab: path.join(sourcePath, 'newtab', 'index.tsx'),
    popup: path.join(sourcePath, 'popup', 'index.tsx'),
  },

  output: {
    publicPath: '',
    path: path.join(destPath, targetBrowser),
    filename: 'js/[name].bundle.js',
  },

  resolve: {
    extensions: ['.svg', '.ts', '.tsx', '.js', '.json'],
    fallback: {
      zlib: false,
      fs: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify')
    },
  },

  module: {
    rules: [
      {
        test: /icons(\/|\\).*\.svg$/,
        exclude: /node_modules(\/|\\)(?!@dailydotdev)/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgo: true,
              replaceAttrValues: {
                '#fff': 'currentcolor',
                '#FFF': 'currentcolor',
                '#FFFFFF': 'currentcolor',
              },
              svgProps: {
                className: 'icon',
              },
            },
          },
        ],
      },
      {
        type: 'javascript/auto', // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true, // set to false to not use package.json version for manifest
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules(?!\/@ai-translator\/(shared))/,
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules(\/|\\)(?!@dailydotdev)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // It creates a CSS file per JS file which contains CSS
          },
          {
            loader: 'css-loader', // Takes the CSS files and returns the CSS with imports and url(...) for Webpack
            options: {
              sourceMap: true,
            },
          },

          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // Plugin to not generate js bundle for manifest entry
    new WextManifestWebpackPlugin(),
    // Generate sourcemaps
    new webpack.SourceMapDevToolPlugin({ filename: false }),
    new ForkTsCheckerWebpackPlugin(),
    // environmental variables
    new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
    new Dotenv({
      path:
        process.env.NODE_ENV === 'production' ? './.env.production' : './.env',
    }),
    new webpack.DefinePlugin({
      'process.env.CURRENT_VERSION': `'${version}'`,
    }),
    // delete previous build files
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(destPath, targetBrowser),
        path.join(
          destPath,
          `${targetBrowser}.${getExtensionFileType(targetBrowser)}`,
        ),
      ],
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(viewsPath, 'newtab.html'),
      inject: 'body',
      chunks: ['newtab'],
      hash: true,
      filename: 'newtab.html',
    }),

    new HtmlWebpackPlugin({
      template: path.join(viewsPath, 'popup.html'),
      inject: 'body',
      chunks: ['popup'],
      hash: true,
      filename: 'popup.html',
    }),

    // write css file(s) to build folder
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    // copy static assets
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
    // plugin to enable browser reloading in development mode
    extensionReloaderPlugin,
  ],

  optimization:
    process.env.NODE_ENV === 'production'
      ? {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: ['default', { discardComments: { removeAll: true } }],
            },
          }),
          // new FilemanagerPlugin(),
        ],
      }
      : {},
};
