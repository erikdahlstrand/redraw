global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

require('babel-core/register');
require('./setup/setup')();
// global.fabric = require('../../bower_components/fabric/dist/fabric').fabric;
global.jsdom = require('jsdom').jsdom;

// Polyfill for String.prototype.includes that is not supported
// in PhantomJS. For other legacy browsers this will be polyfilled
// by the script include to polyfill.io in index.html.

/* eslint no-extend-native: off */
String.prototype.includes = function includes(val) {
  return this.indexOf(val) > -1;
};

// require all `src/js/**/app.js`
const componentsContext = require.context('../src/js/', true, /index\.js$/);
componentsContext.keys().forEach(componentsContext);

// require all `*_test.js`
const testsContext = require.context('../src/js/', true, /-test$/);
testsContext.keys().forEach(testsContext);
