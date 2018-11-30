'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const utils = require('./utils')
// 覆盖ant-mobile主题
const antTheme = paths.appPackageJson.antTheme

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  // entry: [
  //   // We ship a few polyfills by default:
  //   require.resolve('./polyfills'),
  //   // Include an alternative client for WebpackDevServer. A client's job is to
  //   // connect to WebpackDevServer by a socket and get notified about changes.
  //   // When you save a file, the client will either apply hot updates (in case
  //   // of CSS changes), or refresh the page (in case of JS changes). When you
  //   // make a syntax error, this client will display a syntax error overlay.
  //   // Note: instead of the default WebpackDevServer client, we use a custom one
  //   // to bring better experience for Create React App users. You can replace
  //   // the line below with these two lines if you prefer the stock client:
  //   // require.resolve('webpack-dev-server/client') + '?/',
  //   // require.resolve('webpack/hot/dev-server'),
  //   require.resolve('react-dev-utils/webpackHotDevClient'),
  //   // Finally, this is your app's code:
  //   paths.appIndexJs,
  //   // We include the app code last so that if there is a runtime error during
  //   // initialization, it doesn't blow up the WebpackDevServer client, and
  //   // changing JS code would still trigger a refresh.
  // ],
  // 改动后:入口会自动扫描生成,直接在src/views/目录下新建入口js文件即可
  entry: utils.getEntriesDev(), 
  // entry: {
  //   index: [
  //     require.resolve('./polyfills'),
  //     require.resolve('react-dev-utils/webpackHotDevClient'),
  //     paths.appIndexJs,
  //   ],
  // },
  output: {
    path:paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[name].bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.scss', '.less'],
    alias: {
      
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      'src': paths.appSrc,
      'pages': paths.appPages,
      'common': paths.appCommon,
      'components': paths.appComponents,
      'service': paths.appService,
      'store': paths.appStore,
      'router': paths.appRouter,
      'utils': paths.appUtils,
      'assets': paths.appAssets,
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // TODO: Disable require.ensure as it's not a standard language feature.
      // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
      // { parser: { requireEnsure: false } },

      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // "url" loader works like "file" loader except that it embeds assets
          // smaller than specified limit in bytes as data URLs to avoid requests.
          // A missing `test` is equivalent to a match.
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // Process JS with Babel.
          {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              // presets: [
              //   ["env", {
              //     "modules": false,
              //     "targets": {
              //       "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
              //     }
              //   }],
              //   "stage-2"
              // ],
              // plugins: [
              //   "babel-plugin-transform-decorators-legacy",
              //   "transform-runtime",
              //   "react-hot-loader/babel",
              //   [
              //     "import", {
              //       libraryName: "antd-mobile",
              //       style: true   // true => 加载less版本antd-mobile ; "css" => 加载css版本antd-mobile
              //     }
              //   ]
              // ]
            },
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          /**
           * 只对非node_modules和非assets目录开启css模块化
           */
          {
            test: /\.(css|scss)$/,
            exclude: [
              /node_modules/, 
              /src\/assets/,
            ], // 不处理node_modules和assets目录
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  module: true, // 开启css模块化
                  localIdentName: '[local]-[hash:6]',  // css类名格式
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('sass-loader')
              }
            ],
          },
          /**
           * less处理,只对非node_modules和非assets目录开启css模块化.
           */
          {
            test: /\.less$/,
            exclude: [
              /node_modules/, 
              /src\/assets/,
            ], // 不处理node_modules和assets目录
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  module: true, // 开启css模块化
                  localIdentName: '[local]-[hash:6]',  // css类名格式
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'),
                // 似乎这里可以不配置
                // options: {
                //   modifyVars: antTheme, // 覆盖ant-mobile主题
                //   include: /node_modules/,
                // },
              }
            ],
          },
          /**
           * node_modules和assets目录专用,
           * 如:ant-mobile,单独开启css/less编译,不带css模块化;
           * 配置覆盖ant-mobile主题.
           */
          {
            test: /\.(less|css)$/,
            include: [
              /node_modules/,
              /src\/assets/,
            ],  // 只处理node_modules和assets目录
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              {
                loader: require.resolve('less-loader'),
                options: {
                  modifyVars: antTheme, // 覆盖ant-mobile主题
                  include: /node_modules/,
                  javascriptEnabled: true,
                },
              }
            ],
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
    ],
  },
  plugins: [
    // 自动加载模块，而不必到处 import 或 require.
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      PropTypes: 'prop-types',
    }),
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin(env.raw),
    // Generates an `index.html` file with the <script> injected.
    // 自动扫描html模版,生成new HtmlWebpackPlugin()配置
    ...utils.getHtmlWebpackPluginsDev(),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   chunks: ['index'],
    //   template: paths.appHtml,
    //   filename: 'index.html',
    // }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   chunks: ['list'],
    //   template: paths.appPublic + '/template/list.html',
    //   filename: 'list.html',
    // }),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false,
  },
};
