const path = require('path');
const webpackConfig = require('./webpack.config');

delete webpackConfig.entry;

module.exports = config => {
  const preprocessors = ['webpack', 'sourcemap'];

  const settings = {
    browsers: ['PhantomJS'], /* 'Chrome' */
    frameworks: ['jasmine'],
    // this is the entry file for all our tests.
    files: ['test/index.js'],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      'test/index.js': preprocessors
    },
    // use the webpack config
    webpack: webpackConfig,
    // avoid walls of useless text
    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    plugins: [
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-mocha-reporter'
    ].concat(require('karma-webpack')),
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: !config.tdd
  };

  if (config.coverage) {
    // http://www.aptoma.com/es6-code-coverage-babel-jspm-karma-jasmine-istanbul/

    settings.webpack.module.preLoaders = [
      // transpile all files except testing sources with babel as usual
      {
        test: /\.js$/,
        exclude: [
          path.resolve('src/js/'),
          path.resolve('node_modules/')
        ],
        loader: 'babel'
      },
      // transpile and instrument only testing sources with babel-istanbul
      {
        test: /\.js$/,
        include: path.resolve('src/js/'),
        loader: 'babel-istanbul',
        query: {
          cacheDirectory: true,
          embedSource: true,
          noAutoWrap: true
        }
      }
    ];

    settings.coverageReporter = {
      instrumenters: { isparta: require('isparta') },
      reporters: [
        { type: 'lcov', dir: './coverage' },
        { type: 'text', dir: './coverage' }
      ]
    };

    settings.reporters.push('coverage');

    preprocessors.push('coverage');
  }

  config.set(settings);
};
