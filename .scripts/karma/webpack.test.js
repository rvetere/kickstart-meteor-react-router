/**
 * @file    webpack test config
 * @author  Remo Vetere <remo.vetere@gmail.com>
 * @date    11.06.2016
 */

const path = require('path');
const modules = [
  'src',
  'node_modules',
];

module.exports = {
  context: path.resolve(process.cwd(), 'src'),
  devtool : 'inline-source-map',

  module: {
    noParse: [
      /node_modules(\\|\/)acorn/,
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
            'babel-preset-stage-0',
            'react'
          ],
          plugins: [
            'babel-root-slash-import',
            'transform-decorators-legacy'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test   : /\.json$/,
        loader : 'json-loader',
      },
      // sinon.js--aliased for enzyme--expects/requires global vars.
      // See https://github.com/webpack/webpack/issues/304
      {
        test   : /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader : 'imports?define=>false,require=>false',
      },
      {
        test   : /\.jpe?g$|\.gif$|\.png$/i,
        loader : 'null-loader',
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories : modules,
    modules,
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
    'meteor/underscore': true,
    'meteor/meteor': true,
    'meteor/meteor-base': true,
    'meteor/mobile-experience': true,
    'meteor/npm-mongo': true,
    'meteor/babel-compiler': true,
    'meteor/ecmascript': true,
    'meteor/base64': true,
    'meteor/ejson': true,
    'meteor/id-map': true,
    'meteor/ordered-dict': true,
    'meteor/tracker': true,
    'meteor/modules-runtime': true,
    'meteor/modules': true,
    'meteor/es5-shim': true,
    'meteor/promise': true,
    'meteor/ecmascript-runtime': true,
    'meteor/babel-runtime': true,
    'meteor/random': true,
    'meteor/mongo-id': true,
    'meteor/diff-sequence': true,
    'meteor/geojson-utils': true,
    'meteor/minimongo': true,
    'meteor/check': true,
    'meteor/retry': true,
    'meteor/ddp-common': true,
    'meteor/ddp-client': true,
    'meteor/rate-limit': true,
    'meteor/ddp-rate-limiter': true,
    'meteor/logging': true,
    'meteor/routepolicy': true,
    'meteor/deps': true,
    'meteor/htmljs': true,
    'meteor/html-tools': true,
    'meteor/blaze-tools': true,
    'meteor/spacebars-compiler': true,
    'meteor/jquery': true,
    'meteor/observe-sequence': true,
    'meteor/reactive-var': true,
    'meteor/blaze': true,
    'meteor/spacebars': true,
    'meteor/ui': true,
    'meteor/boilerplate-generator': true,
    'meteor/webapp-hashing': true,
    'meteor/webapp': true,
    'meteor/callback-hook': true,
    'meteor/ddp-server': true,
    'meteor/ddp': true,
    'meteor/allow-deny': true,
    'meteor/binary-heap': true,
    'meteor/mongo': 'window',
    'meteor/tmeasday:check-npm-versions': true,
    'meteor/react-meteor-data': true,
    'meteor/webpack:reload': true,
    'meteor/webpack:core-config': true,
    'meteor/webpack:assets': true,
    'meteor/webpack:css': true,
    'meteor/webpack:json': true,
    'meteor/webpack:webpack': true,
    'meteor/webpack:react': true,
    'meteor/webpack:sass': true,
    'meteor/webpack:postcss': true,
    'meteor/accounts-ui': true,
    'meteor/npm-bcrypt': true,
    'meteor/accounts-base': true,
    'meteor/sha': true,
    'meteor/srp': true,
    'meteor/email': true,
    'meteor/accounts-password': true,
    'meteor/blaze-html-templates': true,
    'meteor/standard-minifier-css': true,
    'meteor/standard-minifier-js': true,
    'meteor/meteorhacks:inject-data': true,
    'meteor/meteorhacks:picker': true,
    'meteor/livedata': true,
    'meteor/meteorhacks:fast-render': true,
    'meteor/url': true,
    'meteor/reactrouter:react-router-ssr': 'window',
    'meteor/jsx': true,
    'meteor/thereactivestack:blazetoreact': true,
    'meteor/autoupdate': true,
    'meteor/appcache': true,
    'meteor/hot-code-push': true,
    'meteor/launch-screen': true,
    'meteor/templating': true,
    'meteor/reload': true,
    'meteor/null': true,
    'meteor/service-configuration': true,
  }
};
