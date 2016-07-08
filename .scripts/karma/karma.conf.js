/**
 * @file    karma test runner config
 * @author  Remo Vetere <remo.vetere@gmail.com>
 * @date    11.06.2016
 */

const webpackConfig = require('./webpack.test');
const path = require('path');

module.exports = (config) => config.set({
  frameworks: ['mocha'],
  reporters: ['mocha'],

  autoWatch : false,
  singleRun : true,

  browsers: process.env.CIRCLECI
    ? ['ChromeCircle']
    : process.env.APPVEYOR
    ? ['IE'] : ['jsdom'],

  files : [
    {
      pattern  : './test-bundler.js',
      watched  : false,
      served   : true,
      included : true,
    },
  ],

  preprocessors: {
    './test-bundler.js': ['webpack', 'sourcemap']
  },

  webpack: webpackConfig,

  // Make Webpack bundle generation quiet.
  webpackMiddleware: {
    noInfo: true
  },

  logLevel: config.LOG_INFO,
  specReporter: {
    suppressPassed: true
  },

  plugins: [
    'karma-webpack',
    'karma-mocha',
    'karma-sourcemap-loader',
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-safari-launcher',
    'karma-ie-launcher',
    'karma-mocha-reporter',
    'karma-spec-reporter',
    'karma-jsdom-launcher'
  ],

  customLaunchers: {
    ChromeCircle: {
      base: 'Chrome',
      flags: ['--no-sandbox'],
    },
  },
});
