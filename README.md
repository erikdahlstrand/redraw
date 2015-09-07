# rechartjs
Simple HTML5 Chart tools for the awesome [FabricJs](http://fabricjs.com/).

## Setup
### For development
```Shell
npm install
npm install webpack -g
npm install webpack-dev-server -g
npm install -g bower
bower install

webpack-dev-server --progress --colors
```

### Build
```Shell
webpack --progress --colors
```

## Technology
### Development
* [Webpack, getting started](http://webpack.github.io/docs/tutorials/getting-started/)
* https://github.com/petehunt/webpack-howto
* [ES2015, by Babel](https://babeljs.io/docs/learn-es2015/)
* [Jest](https://facebook.github.io/jest/docs/manual-mocks.html#content)

### Settings
* [Configuring ESLint](http://eslint.org/docs/user-guide/configuring.html)
* [Sublime Linter User Settings](http://bl.ocks.org/bretdavidson/3189814)
* [JSHint options](http://jshint.com/docs/options/)

### Future work
* Rewrite to use [EventEmitter](https://www.npmjs.com/package/event-emitter)