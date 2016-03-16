/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mochaGlobals = __webpack_require__(2).globals;
	
	window.mocha.setup('bdd');
	window.onload = function () {
	  window.mocha.checkLeaks();
	  window.mocha.globals(Object.keys(mochaGlobals));
	  window.mocha.run();
	  __webpack_require__(3)(window);
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		"globals": {
			"expect": true,
			"mock": true,
			"sandbox": true,
			"spy": true,
			"stub": true,
			"window": true,
			"useFakeServer": true,
			"useFakeTimers": true,
			"useFakeXMLHttpRequest": true
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	module.exports = function (root) {
	  root = root ? root : global;
	  root.expect = root.chai.expect;
	
	  beforeEach(function () {
	    // Using these globally-available Sinon features is preferrable, as they're
	    // automatically restored for you in the subsequent `afterEach`
	    root.sandbox = root.sinon.sandbox.create();
	    root.stub = root.sandbox.stub.bind(root.sandbox);
	    root.spy = root.sandbox.spy.bind(root.sandbox);
	    root.mock = root.sandbox.mock.bind(root.sandbox);
	    root.useFakeTimers = root.sandbox.useFakeTimers.bind(root.sandbox);
	    root.useFakeXMLHttpRequest = root.sandbox.useFakeXMLHttpRequest.bind(root.sandbox);
	    root.useFakeServer = root.sandbox.useFakeServer.bind(root.sandbox);
	  });
	
	  afterEach(function () {
	    delete root.stub;
	    delete root.spy;
	    root.sandbox.restore();
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _arrow = __webpack_require__(5);
	
	var _arrow2 = _interopRequireDefault(_arrow);
	
	var _browserApi = __webpack_require__(7);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	describe('rechart', function () {
	  describe('Greet function', function () {
	    var arrowTool = void 0;
	    beforeEach(function () {
	      // spy(rechart, 'greet');
	
	      sinon.mock(_browserApi2.default).expects("getFromWindow").atLeast(1).returns({ registerTool: function registerTool() {
	          // body...
	        } });
	      var fabric = {};
	      var triangleSpy = spy(fabric, 'Triangle');
	      var lineSpy = spy(fabric, 'Line');
	      var groupSpy = spy(fabric, 'Group');
	
	      arrowTool = (0, _arrow2.default)({}, {}, {}, fabric);
	    });
	
	    it('should have been run once', function () {
	
	      expect(_browserApi2.default.appendToWindow).to.have.been.calledOnce;
	    });
	
	    it('should have always returned hello', function () {
	      expect(rechart.greet).to.have.always.returned('hello');
	    });
	  });
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _canvasConst = __webpack_require__(6);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(7);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/** length of arrow head */
	var indicationLength = 20;
	/** line used during drag n drop */
	var line;
	
	/**
	 * A tool to paint arrows.
	 */
	
	var ArrowTool = function () {
	    /**
	     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	     * @constructor
	     * @param {Canvas} canvasWrapper - Canvas.
	     * @param {EventAggregator} eventAggregator - Event mediator.
	     */
	
	    function ArrowTool(canvasWrapper, eventAggregator, toolOptions, fabric) {
	        _classCallCheck(this, ArrowTool);
	
	        console.log('##### alpha *******************');
	        /** eventAggregator for madiated cummunications */
	        this.eventAggregator = eventAggregator;
	        /** main api to use for canvas manipulation */
	        this.canvasWrapper = canvasWrapper;
	        /** coords for the elements of the arrow */
	        this.arrow = this.canvas = this.start = this.end = undefined;
	        /** options */
	        this.options = toolOptions;
	
	        var callee = this;
	        console.log('##### bravo');
	
	        this.eventAggregator.subscribeTo(_canvasConst2.default.TOOL.ARROW, 'ArrowTool', function () {
	            callee.initListeners.apply(callee, arguments);
	        });
	        /** shorthand to canvas */
	        this.canvas = canvasWrapper.canvas;
	
	        this.moveFn = function (options) {
	            callee.onMove(options);
	        };
	        this.downFn = function (options) {
	            callee.onMouseDown(options);
	        };
	        this.upFn = function (options) {
	            callee.onMUP(options);
	        };
	        this.notify = function (message) {
	            this.eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.ARROW, message);
	        };
	
	        this.done = function () {
	            this.canvasWrapper.enableSelection(true);
	            this.removeCanvasListeners();
	            this.notify('inactive');
	        };
	        console.log('##### charlie');
	    }
	
	    /**
	     * Move the head of the arrow.
	     * Cred for http://stackoverflow.com/questions/29890294/arrow-shape-using-fabricjs
	     * @private
	     * @param {Object} points - 4d.
	     */
	
	
	    _createClass(ArrowTool, [{
	        key: 'moveArrowIndicator',
	        value: function moveArrowIndicator(points) {
	            var x1 = points[0],
	                y1 = points[1],
	                x2 = points[2],
	                y2 = points[3],
	                dx = x2 - x1,
	                dy = y2 - y1,
	                angle = Math.atan2(dy, dx);
	
	            angle *= 180 / Math.PI;
	            angle += 90;
	            if (this.arrow) {
	                this.canvas.remove(this.arrow);
	            }
	            this.arrow = new fabric.Triangle({
	                angle: angle,
	                fill: this.options.activeColor,
	                top: y2,
	                left: x2,
	                height: indicationLength,
	                width: indicationLength,
	                originX: 'center',
	                originY: 'center',
	                selectable: false
	            });
	
	            this.canvas.add(this.arrow);
	        }
	
	        /**
	         * Cancels this paint operation, i.e. removes any ongoing paint-objects och de-registers listeners.
	         * @private
	         */
	
	    }, {
	        key: 'abort',
	        value: function abort() {
	            if (this.arrow) {
	                this.canvas.remove(this.arrow);
	                this.arrow = undefined;
	            }
	            if (line) {
	                this.canvas.remove(line);
	                line = undefined;
	            }
	            this.eventAggregator.unsubscribeTo('keydown', 'ArrowTool');
	            this.done();
	        }
	
	        /**
	         * Function callback, invoked when mouse moves, even before mouse has been pressed.
	         * @private
	         * @param {Object} options - for the event.
	         */
	
	    }, {
	        key: 'onMove',
	        value: function onMove(options) {
	
	            if (this.start && !this.end) {
	                var pointer = this.canvas.getPointer(options.e);
	
	                line.set({
	                    'x2': pointer.x
	                });
	                line.set({
	                    'y2': pointer.y
	                });
	
	                this.moveArrowIndicator([this.start.left, this.start.top, pointer.x, pointer.y]);
	            }
	
	            this.canvas.renderAll();
	        }
	
	        /**
	         * Function callback, invoked on mouse up.
	         * @private
	         * @param {Object} options - for the event.
	         */
	
	    }, {
	        key: 'onMUP',
	        value: function onMUP(options) {
	            var pointer = this.canvas.getPointer(options.e);
	            this.end = {
	                top: pointer.y,
	                left: pointer.x
	            };
	
	            var perimeter = Math.abs(this.end.top - this.start.top) + Math.abs(this.end.left - this.start.left);
	
	            if (perimeter > 10) {
	                if (this.arrow) {
	                    this.arrow.fill = this.options.color;
	                }
	                var group = new fabric.Group([line, this.arrow], {
	                    hasControls: false,
	                    hasBorders: true,
	                    selectable: false,
	                    fill: this.options.color
	                });
	                line.stroke = this.options.color;
	
	                this.canvas.add(group);
	            }
	
	            this.canvas.remove(line);
	            this.canvas.remove(this.arrow);
	            this.arrow = line = this.start = this.end = undefined;
	            this.canvas.renderAll();
	        }
	
	        /**
	         * Function callback, invoked on mouse down.
	         * @private
	         * @param {Object} options - for the event.
	         */
	
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(options) {
	            var pointer = this.canvas.getPointer(options.e);
	            this.start = {
	                top: pointer.y,
	                left: pointer.x
	            };
	
	            line = new fabric.Line([this.start.left, this.start.top, this.start.left, this.start.top], {
	                strokeWidth: 5,
	                stroke: this.options.activeColor,
	                originX: 'center',
	                originY: 'center',
	                hasControls: false,
	                hasBorders: true,
	                selectable: true
	            });
	
	            this.canvas.add(line);
	        }
	
	        /**
	         * Function callback, invoked when toolbar is clicked.
	         * @private
	         * @param {string} topic - .
	         * @param {string} sender - .
	         * @param {string} payload - value shold be "toolbar-deactivate" if tool is active.
	         */
	
	    }, {
	        key: 'initListeners',
	        value: function initListeners(topic, sender, payload) {
	            if (payload === 'toolbar-deactivate') {
	                this.abort();
	                return;
	            }
	            var me = this;
	
	            this.eventAggregator.subscribeTo('keydown', 'ArrowTool', function (topic, sender, keyCode) {
	
	                if (keyCode === 27) {
	                    me.abort.apply(me);
	                }
	            });
	            this.start = this.end = undefined;
	
	            this.canvasWrapper.enableSelection(false);
	
	            this.notify('active');
	
	            this.canvas.on('mouse:down', this.downFn);
	            this.canvas.on('mouse:move', this.moveFn);
	            this.canvas.on('mouse:up', this.upFn);
	        }
	        /**
	         * Removes listeners.
	         * @private
	         */
	
	    }, {
	        key: 'removeCanvasListeners',
	        value: function removeCanvasListeners() {
	            this.canvas.off('mouse:down', this.downFn);
	            this.canvas.off('mouse:move', this.moveFn);
	            this.canvas.off('mouse:up', this.upFn);
	        }
	    }]);
	
	    return ArrowTool;
	}();
	/** Default options for tools initialization */
	
	
	exports.default = ArrowTool;
	var toolProps = {
	    label: 'Arrow',
	    color: _canvasConst2.default.DEFAULT_COLOR,
	    activeColor: '#55f'
	};
	_browserApi2.default.getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.ARROW, ArrowTool, toolProps);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		TOOL: {
			ARROW: 'arrow',
			BOX: 'box',
			PIXELATE: 'pixel',
			CLEAR: 'clear',
			DUMP: 'dump',
			HLINE: 'hline',
			REMOVE: 'delete',
			TEXT: 'text'
		},
		DEFAULT_COLOR: '#33e',
		CSS: {
			PARENT: 'redraw_parent',
			TOOLBAR: 'redraw_toolbar',
			BUTTON: 'redraw_btn',
			ACTIVE_BUTTON: 'active'
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var isBrowser = typeof window !== 'undefined';
	
	/**
	 * Facade of the browser apis. The main purpose id to facilitate testing.
	 */
	
	var Browser = function () {
	    /**
	     * Contructor that determines if there is a browser present.
	     * @constructor
	     */
	
	    function Browser() {
	        _classCallCheck(this, Browser);
	
	        this.document = isBrowser ? document : {};
	        this.window = isBrowser ? window : {};
	    }
	
	    /**
	     * Appends property to the browser window object.
	     * @param {string} attributeName - Name of the property to create/assign.
	     * @param {Object} obj - value to set.
	     */
	
	
	    _createClass(Browser, [{
	        key: 'appendToWindow',
	        value: function appendToWindow(attributeName, obj) {
	
	            if (isBrowser) {
	                window[attributeName] = obj;
	                return true;
	            }
	            return false;
	        }
	
	        /**
	         * Use to retrieve property from the browser window object.
	         * @param {string} attributeName - Name of the property to create/assign.
	         * @returns {Object} obj - retrieved value, or mock if not browser.
	         */
	
	    }, {
	        key: 'getFromWindow',
	        value: function getFromWindow(attributeName) {
	            if (window) {
	                return window[attributeName];
	            }
	            return {
	                getFromWindow: function getFromWindow() {},
	                tools: [] };
	        }
	    }]);
	
	    return Browser;
	}();

	exports.default = Browser;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzkwMTg4YWQxNjUxZDg4YWM1MjAiLCJ3ZWJwYWNrOi8vLy4vdGVzdC9zZXR1cC9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3Rlc3Qvc2V0dXAvLmdsb2JhbHMuanNvbiIsIndlYnBhY2s6Ly8vLi90ZXN0L3NldHVwL3NldHVwLmpzIiwid2VicGFjazovLy8uL3Rlc3QvdW5pdC9hcnJvdy10ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy90b29scy9hcnJvdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2FudmFzLWNvbnN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9icm93c2VyLWFwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsS0FBSSxlQUFlLG9CQUFRLENBQVIsRUFBMkIsT0FBM0I7O0FBRW5CLFFBQU8sS0FBUCxDQUFhLEtBQWIsQ0FBbUIsS0FBbkI7QUFDQSxRQUFPLE1BQVAsR0FBZ0IsWUFBVztBQUN6QixVQUFPLEtBQVAsQ0FBYSxVQUFiLEdBRHlCO0FBRXpCLFVBQU8sS0FBUCxDQUFhLE9BQWIsQ0FBcUIsT0FBTyxJQUFQLENBQVksWUFBWixDQUFyQixFQUZ5QjtBQUd6QixVQUFPLEtBQVAsQ0FBYSxHQUFiLEdBSHlCO0FBSXpCLHVCQUFRLENBQVIsRUFBbUIsTUFBbkIsRUFKeUI7RUFBWCxDOzs7Ozs7QUNIaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7Ozs7QUNaQSxRQUFP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LENBRlc7Y0FBZjtBQUlBLG9CQUFPLEtBQVAsQ0FOK0I7Ozs7Ozs7Ozs7O3VDQWNyQixlQUFlO0FBQ3pCLGlCQUFJLE1BQUosRUFBWTtBQUNSLHdCQUFPLE9BQU8sYUFBUCxDQUFQLENBRFE7Y0FBWjtBQUdGLG9CQUFPO0FBQ0wsZ0NBQWMseUJBQVcsRUFBWDtBQUNaLHdCQUFPLEVBQVAsRUFGSixDQUoyQjs7OztZQTdCWiIsImZpbGUiOiJfX3NwZWMtYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc5MDE4OGFkMTY1MWQ4OGFjNTIwXG4gKiovIiwidmFyIG1vY2hhR2xvYmFscyA9IHJlcXVpcmUoJy4vLmdsb2JhbHMuanNvbicpLmdsb2JhbHM7XG5cbndpbmRvdy5tb2NoYS5zZXR1cCgnYmRkJyk7XG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5tb2NoYS5jaGVja0xlYWtzKCk7XG4gIHdpbmRvdy5tb2NoYS5nbG9iYWxzKE9iamVjdC5rZXlzKG1vY2hhR2xvYmFscykpO1xuICB3aW5kb3cubW9jaGEucnVuKCk7XG4gIHJlcXVpcmUoJy4vc2V0dXAnKSh3aW5kb3cpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zZXR1cC9icm93c2VyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwiZ2xvYmFsc1wiOiB7XG5cdFx0XCJleHBlY3RcIjogdHJ1ZSxcblx0XHRcIm1vY2tcIjogdHJ1ZSxcblx0XHRcInNhbmRib3hcIjogdHJ1ZSxcblx0XHRcInNweVwiOiB0cnVlLFxuXHRcdFwic3R1YlwiOiB0cnVlLFxuXHRcdFwid2luZG93XCI6IHRydWUsXG5cdFx0XCJ1c2VGYWtlU2VydmVyXCI6IHRydWUsXG5cdFx0XCJ1c2VGYWtlVGltZXJzXCI6IHRydWUsXG5cdFx0XCJ1c2VGYWtlWE1MSHR0cFJlcXVlc3RcIjogdHJ1ZVxuXHR9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90ZXN0L3NldHVwLy5nbG9iYWxzLmpzb25cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJvb3QpIHtcbiAgcm9vdCA9IHJvb3QgPyByb290IDogZ2xvYmFsO1xuICByb290LmV4cGVjdCA9IHJvb3QuY2hhaS5leHBlY3Q7XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpIHtcbiAgICAvLyBVc2luZyB0aGVzZSBnbG9iYWxseS1hdmFpbGFibGUgU2lub24gZmVhdHVyZXMgaXMgcHJlZmVycmFibGUsIGFzIHRoZXkncmVcbiAgICAvLyBhdXRvbWF0aWNhbGx5IHJlc3RvcmVkIGZvciB5b3UgaW4gdGhlIHN1YnNlcXVlbnQgYGFmdGVyRWFjaGBcbiAgICByb290LnNhbmRib3ggPSByb290LnNpbm9uLnNhbmRib3guY3JlYXRlKCk7XG4gICAgcm9vdC5zdHViID0gcm9vdC5zYW5kYm94LnN0dWIuYmluZChyb290LnNhbmRib3gpO1xuICAgIHJvb3Quc3B5ID0gcm9vdC5zYW5kYm94LnNweS5iaW5kKHJvb3Quc2FuZGJveCk7XG4gICAgcm9vdC5tb2NrID0gcm9vdC5zYW5kYm94Lm1vY2suYmluZChyb290LnNhbmRib3gpO1xuICAgIHJvb3QudXNlRmFrZVRpbWVycyA9IHJvb3Quc2FuZGJveC51c2VGYWtlVGltZXJzLmJpbmQocm9vdC5zYW5kYm94KTtcbiAgICByb290LnVzZUZha2VYTUxIdHRwUmVxdWVzdCA9IHJvb3Quc2FuZGJveC51c2VGYWtlWE1MSHR0cFJlcXVlc3QuYmluZChyb290LnNhbmRib3gpO1xuICAgIHJvb3QudXNlRmFrZVNlcnZlciA9IHJvb3Quc2FuZGJveC51c2VGYWtlU2VydmVyLmJpbmQocm9vdC5zYW5kYm94KTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSByb290LnN0dWI7XG4gICAgZGVsZXRlIHJvb3Quc3B5O1xuICAgIHJvb3Quc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vdGVzdC9zZXR1cC9zZXR1cC5qc1xuICoqLyIsImltcG9ydCBBcnJvd1Rvb2wgZnJvbSAnLi4vLi4vc3JjL2pzL3Rvb2xzL2Fycm93JztcbmltcG9ydCBCcm93c2VyIGZyb20gJy4uLy4uL3NyYy9qcy9icm93c2VyLWFwaSc7XG5cblxuZGVzY3JpYmUoJ3JlY2hhcnQnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdHcmVldCBmdW5jdGlvbicsICgpID0+IHtcbiAgICBsZXQgYXJyb3dUb29sO1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgLy8gc3B5KHJlY2hhcnQsICdncmVldCcpO1xuXG5cbiAgICAgIHNpbm9uLm1vY2soQnJvd3NlcikuZXhwZWN0cyhcImdldEZyb21XaW5kb3dcIikuYXRMZWFzdCgxKS5yZXR1cm5zKHtyZWdpc3RlclRvb2w6ZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBib2R5Li4uXG4gICAgICB9fSk7XG4gICAgICB2YXIgZmFicmljID0ge307XG4gICAgICB2YXIgdHJpYW5nbGVTcHkgPSBzcHkoZmFicmljLCAnVHJpYW5nbGUnKVxuICAgICAgdmFyIGxpbmVTcHkgPSBzcHkoZmFicmljLCAnTGluZScpXG4gICAgICB2YXIgZ3JvdXBTcHkgPSBzcHkoZmFicmljLCAnR3JvdXAnKVxuXG5cbiAgICAgIGFycm93VG9vbCA9IEFycm93VG9vbCh7fSwge30sIHt9LCBmYWJyaWMpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBoYXZlIGJlZW4gcnVuIG9uY2UnLCAoKSA9PiB7XG5cbiAgICAgIGV4cGVjdChCcm93c2VyLmFwcGVuZFRvV2luZG93KS50by5oYXZlLmJlZW4uY2FsbGVkT25jZTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgaGF2ZSBhbHdheXMgcmV0dXJuZWQgaGVsbG8nLCAoKSA9PiB7XG4gICAgICBleHBlY3QocmVjaGFydC5ncmVldCkudG8uaGF2ZS5hbHdheXMucmV0dXJuZWQoJ2hlbGxvJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3Rlc3QvdW5pdC9hcnJvdy10ZXN0LmpzXG4gKiovIiwiaW1wb3J0IENPTlNUIGZyb20gJy4uL2NhbnZhcy1jb25zdC5qcyc7XG5pbXBvcnQgQnJvd3NlciBmcm9tICcuLi9icm93c2VyLWFwaS5qcyc7XG5cbi8qKiBsZW5ndGggb2YgYXJyb3cgaGVhZCAqL1xudmFyIGluZGljYXRpb25MZW5ndGggPSAyMDtcbi8qKiBsaW5lIHVzZWQgZHVyaW5nIGRyYWcgbiBkcm9wICovXG52YXIgbGluZTtcblxuLyoqXG4gKiBBIHRvb2wgdG8gcGFpbnQgYXJyb3dzLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcnJvd1Rvb2wge1xuICAgIC8qKlxuICAgICAqIFRvb2xzIGNvbnRydWN0b3IuIElzIHByb3ZpZGVkIHdpdGggY2FudmFzLXdyYXBwZXIgYW5kIGV2ZW50QWdncmVnYXRvciBieSBjb250cmFjdC5cbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge0NhbnZhc30gY2FudmFzV3JhcHBlciAtIENhbnZhcy5cbiAgICAgKiBAcGFyYW0ge0V2ZW50QWdncmVnYXRvcn0gZXZlbnRBZ2dyZWdhdG9yIC0gRXZlbnQgbWVkaWF0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY2FudmFzV3JhcHBlciwgZXZlbnRBZ2dyZWdhdG9yLCB0b29sT3B0aW9ucywgZmFicmljKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCcjIyMjIyBhbHBoYSAqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICAgIC8qKiBldmVudEFnZ3JlZ2F0b3IgZm9yIG1hZGlhdGVkIGN1bW11bmljYXRpb25zICovXG4gICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yID0gZXZlbnRBZ2dyZWdhdG9yO1xuICAgICAgICAvKiogbWFpbiBhcGkgdG8gdXNlIGZvciBjYW52YXMgbWFuaXB1bGF0aW9uICovXG4gICAgICAgIHRoaXMuY2FudmFzV3JhcHBlciA9IGNhbnZhc1dyYXBwZXI7XG4gICAgICAgIC8qKiBjb29yZHMgZm9yIHRoZSBlbGVtZW50cyBvZiB0aGUgYXJyb3cgKi9cbiAgICAgICAgdGhpcy5hcnJvdyA9IHRoaXMuY2FudmFzID0gdGhpcy5zdGFydCA9IHRoaXMuZW5kID0gdW5kZWZpbmVkO1xuICAgICAgICAvKiogb3B0aW9ucyAqL1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0b29sT3B0aW9ucztcblxuICAgICAgICB2YXIgY2FsbGVlID0gdGhpcztcbmNvbnNvbGUubG9nKCcjIyMjIyBicmF2bycpO1xuXG4gICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnN1YnNjcmliZVRvKFxuICAgICAgICAgICAgQ09OU1QuVE9PTC5BUlJPVyxcbiAgICAgICAgICAgICdBcnJvd1Rvb2wnLFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2FsbGVlLmluaXRMaXN0ZW5lcnMuYXBwbHkoY2FsbGVlLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIC8qKiBzaG9ydGhhbmQgdG8gY2FudmFzICovXG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzV3JhcHBlci5jYW52YXM7XG5cbiAgICAgICAgdGhpcy5tb3ZlRm4gPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICBjYWxsZWUub25Nb3ZlKG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRvd25GbiA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGNhbGxlZS5vbk1vdXNlRG93bihvcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51cEZuID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgY2FsbGVlLm9uTVVQKG9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vdGlmeSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLm5vdGlmeSgnVE9PTF9VU0FHRScsIENPTlNULlRPT0wuQVJST1csIG1lc3NhZ2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXNXcmFwcGVyLmVuYWJsZVNlbGVjdGlvbih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2FudmFzTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSgnaW5hY3RpdmUnKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc29sZS5sb2coJyMjIyMjIGNoYXJsaWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRoZSBoZWFkIG9mIHRoZSBhcnJvdy5cbiAgICAgKiBDcmVkIGZvciBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI5ODkwMjk0L2Fycm93LXNoYXBlLXVzaW5nLWZhYnJpY2pzXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcG9pbnRzIC0gNGQuXG4gICAgICovXG4gICAgbW92ZUFycm93SW5kaWNhdG9yKHBvaW50cykge1xuICAgICAgICB2YXIgeDEgPSBwb2ludHNbMF0sXG4gICAgICAgICAgICB5MSA9IHBvaW50c1sxXSxcbiAgICAgICAgICAgIHgyID0gcG9pbnRzWzJdLFxuICAgICAgICAgICAgeTIgPSBwb2ludHNbM10sXG5cbiAgICAgICAgICAgIGR4ID0geDIgLSB4MSxcbiAgICAgICAgICAgIGR5ID0geTIgLSB5MSxcblxuICAgICAgICAgICAgYW5nbGUgPSBNYXRoLmF0YW4yKGR5LCBkeCk7XG5cbiAgICAgICAgYW5nbGUgKj0gMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgYW5nbGUgKz0gOTA7XG4gICAgICAgIGlmICh0aGlzLmFycm93KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5hcnJvdyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcnJvdyA9IG5ldyBmYWJyaWMuVHJpYW5nbGUoe1xuICAgICAgICAgICAgYW5nbGU6IGFuZ2xlLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5vcHRpb25zLmFjdGl2ZUNvbG9yLFxuICAgICAgICAgICAgdG9wOiB5MixcbiAgICAgICAgICAgIGxlZnQ6IHgyLFxuICAgICAgICAgICAgaGVpZ2h0OiBpbmRpY2F0aW9uTGVuZ3RoLFxuICAgICAgICAgICAgd2lkdGg6IGluZGljYXRpb25MZW5ndGgsXG4gICAgICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgc2VsZWN0YWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkKHRoaXMuYXJyb3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbmNlbHMgdGhpcyBwYWludCBvcGVyYXRpb24sIGkuZS4gcmVtb3ZlcyBhbnkgb25nb2luZyBwYWludC1vYmplY3RzIG9jaCBkZS1yZWdpc3RlcnMgbGlzdGVuZXJzLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYWJvcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFycm93KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5hcnJvdyk7XG4gICAgICAgICAgICB0aGlzLmFycm93ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaW5lKSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUobGluZSk7XG4gICAgICAgICAgICBsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnVuc3Vic2NyaWJlVG8oJ2tleWRvd24nLCAnQXJyb3dUb29sJyk7XG4gICAgICAgIHRoaXMuZG9uZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxiYWNrLCBpbnZva2VkIHdoZW4gbW91c2UgbW92ZXMsIGV2ZW4gYmVmb3JlIG1vdXNlIGhhcyBiZWVuIHByZXNzZWQuXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIGZvciB0aGUgZXZlbnQuXG4gICAgICovXG4gICAgb25Nb3ZlKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAodGhpcy5zdGFydCAmJiAhdGhpcy5lbmQpIHtcbiAgICAgICAgICAgIGxldCBwb2ludGVyID0gdGhpcy5jYW52YXMuZ2V0UG9pbnRlcihvcHRpb25zLmUpO1xuXG4gICAgICAgICAgICBsaW5lLnNldCh7XG4gICAgICAgICAgICAgICAgJ3gyJzogcG9pbnRlci54XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmUuc2V0KHtcbiAgICAgICAgICAgICAgICAneTInOiBwb2ludGVyLnlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLm1vdmVBcnJvd0luZGljYXRvcihbdGhpcy5zdGFydC5sZWZ0LCB0aGlzLnN0YXJ0LnRvcCwgcG9pbnRlci54LCBwb2ludGVyLnldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FudmFzLnJlbmRlckFsbCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxiYWNrLCBpbnZva2VkIG9uIG1vdXNlIHVwLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBmb3IgdGhlIGV2ZW50LlxuICAgICAqL1xuICAgIG9uTVVQKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBvaW50ZXIgPSB0aGlzLmNhbnZhcy5nZXRQb2ludGVyKG9wdGlvbnMuZSk7XG4gICAgICAgIHRoaXMuZW5kID0ge1xuICAgICAgICAgICAgdG9wOiBwb2ludGVyLnksXG4gICAgICAgICAgICBsZWZ0OiBwb2ludGVyLnhcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgcGVyaW1ldGVyID0gTWF0aC5hYnModGhpcy5lbmQudG9wIC0gdGhpcy5zdGFydC50b3ApICsgTWF0aC5hYnModGhpcy5lbmQubGVmdCAtIHRoaXMuc3RhcnQubGVmdCk7XG5cbiAgICAgICAgaWYgKHBlcmltZXRlciA+IDEwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcnJvdykge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJyb3cuZmlsbCA9IHRoaXMub3B0aW9ucy5jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBncm91cCA9IG5ldyBmYWJyaWMuR3JvdXAoW2xpbmUsIHRoaXMuYXJyb3ddLCB7XG4gICAgICAgICAgICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGhhc0JvcmRlcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZmlsbDogdGhpcy5vcHRpb25zLmNvbG9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpbmUuc3Ryb2tlID0gdGhpcy5vcHRpb25zLmNvbG9yO1xuXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5hZGQoZ3JvdXApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXMucmVtb3ZlKGxpbmUpO1xuICAgICAgICB0aGlzLmNhbnZhcy5yZW1vdmUodGhpcy5hcnJvdyk7XG4gICAgICAgIHRoaXMuYXJyb3cgPSBsaW5lID0gdGhpcy5zdGFydCA9IHRoaXMuZW5kID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNhbnZhcy5yZW5kZXJBbGwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiBjYWxsYmFjaywgaW52b2tlZCBvbiBtb3VzZSBkb3duLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBmb3IgdGhlIGV2ZW50LlxuICAgICAqL1xuICAgIG9uTW91c2VEb3duKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IHBvaW50ZXIgPSB0aGlzLmNhbnZhcy5nZXRQb2ludGVyKG9wdGlvbnMuZSk7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB7XG4gICAgICAgICAgICB0b3A6IHBvaW50ZXIueSxcbiAgICAgICAgICAgIGxlZnQ6IHBvaW50ZXIueFxuICAgICAgICB9O1xuXG5cbiAgICAgICAgbGluZSA9IG5ldyBmYWJyaWMuTGluZShbdGhpcy5zdGFydC5sZWZ0LCB0aGlzLnN0YXJ0LnRvcCwgdGhpcy5zdGFydC5sZWZ0LCB0aGlzLnN0YXJ0LnRvcF0sIHtcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiA1LFxuICAgICAgICAgICAgc3Ryb2tlOiB0aGlzLm9wdGlvbnMuYWN0aXZlQ29sb3IsXG4gICAgICAgICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgICAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxuICAgICAgICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxuICAgICAgICAgICAgaGFzQm9yZGVyczogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMuYWRkKGxpbmUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIGNhbGxiYWNrLCBpbnZva2VkIHdoZW4gdG9vbGJhciBpcyBjbGlja2VkLlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvcGljIC0gLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZW5kZXIgLSAuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSB2YWx1ZSBzaG9sZCBiZSBcInRvb2xiYXItZGVhY3RpdmF0ZVwiIGlmIHRvb2wgaXMgYWN0aXZlLlxuICAgICAqL1xuICAgIGluaXRMaXN0ZW5lcnModG9waWMsIHNlbmRlciwgcGF5bG9hZCkge1xuICAgICAgICBpZiAocGF5bG9hZCA9PT0gJ3Rvb2xiYXItZGVhY3RpdmF0ZScpe1xuICAgICAgICAgICAgdGhpcy5hYm9ydCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3Iuc3Vic2NyaWJlVG8oJ2tleWRvd24nLCAnQXJyb3dUb29sJyxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHRvcGljLCBzZW5kZXIsIGtleUNvZGUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChrZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgICAgICAgICBtZS5hYm9ydC5hcHBseShtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3RhcnQgPSB0aGlzLmVuZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0aGlzLmNhbnZhc1dyYXBwZXIuZW5hYmxlU2VsZWN0aW9uKGZhbHNlKTtcblxuICAgICAgICB0aGlzLm5vdGlmeSgnYWN0aXZlJyk7XG5cbiAgICAgICAgdGhpcy5jYW52YXMub24oJ21vdXNlOmRvd24nLCB0aGlzLmRvd25Gbik7XG4gICAgICAgIHRoaXMuY2FudmFzLm9uKCdtb3VzZTptb3ZlJywgdGhpcy5tb3ZlRm4pO1xuICAgICAgICB0aGlzLmNhbnZhcy5vbignbW91c2U6dXAnLCB0aGlzLnVwRm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxpc3RlbmVycy5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlbW92ZUNhbnZhc0xpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5jYW52YXMub2ZmKCdtb3VzZTpkb3duJywgdGhpcy5kb3duRm4pO1xuICAgICAgICB0aGlzLmNhbnZhcy5vZmYoJ21vdXNlOm1vdmUnLCB0aGlzLm1vdmVGbik7XG4gICAgICAgIHRoaXMuY2FudmFzLm9mZignbW91c2U6dXAnLCB0aGlzLnVwRm4pO1xuICAgIH1cbn1cbi8qKiBEZWZhdWx0IG9wdGlvbnMgZm9yIHRvb2xzIGluaXRpYWxpemF0aW9uICovXG52YXIgdG9vbFByb3BzID0ge1xuICAgIGxhYmVsOiAnQXJyb3cnLFxuICAgIGNvbG9yOkNPTlNULkRFRkFVTFRfQ09MT1IsXG4gICAgYWN0aXZlQ29sb3I6JyM1NWYnXG59O1xuQnJvd3Nlci5nZXRGcm9tV2luZG93KCdyZWRyYXcnKS5yZWdpc3RlclRvb2woQ09OU1QuVE9PTC5BUlJPVywgQXJyb3dUb29sLCB0b29sUHJvcHMpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvdG9vbHMvYXJyb3cuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCB7XG5cdFRPT0w6IHtcblx0XHRBUlJPVzonYXJyb3cnLFxuXHRcdEJPWDonYm94Jyxcblx0XHRQSVhFTEFURToncGl4ZWwnLFxuXHRcdENMRUFSOidjbGVhcicsXG5cdFx0RFVNUDonZHVtcCcsXG5cdFx0SExJTkU6J2hsaW5lJyxcblx0XHRSRU1PVkU6J2RlbGV0ZScsXG5cdFx0VEVYVDondGV4dCdcblx0fSxcblx0REVGQVVMVF9DT0xPUjogJyMzM2UnLFxuXHRDU1M6IHtcblx0XHRQQVJFTlQ6J3JlZHJhd19wYXJlbnQnLFxuXHRcdFRPT0xCQVI6J3JlZHJhd190b29sYmFyJyxcblx0XHRCVVRUT046J3JlZHJhd19idG4nLFxuXHRcdEFDVElWRV9CVVRUT046J2FjdGl2ZSdcblx0fVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NhbnZhcy1jb25zdC5qc1xuICoqLyIsInZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcblxuLyoqXG4gKiBGYWNhZGUgb2YgdGhlIGJyb3dzZXIgYXBpcy4gVGhlIG1haW4gcHVycG9zZSBpZCB0byBmYWNpbGl0YXRlIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyb3dzZXIge1xuICAgIC8qKlxuICAgICAqIENvbnRydWN0b3IgdGhhdCBkZXRlcm1pbmVzIGlmIHRoZXJlIGlzIGEgYnJvd3NlciBwcmVzZW50LlxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gaXNCcm93c2VyID8gZG9jdW1lbnQgOiB7fTtcbiAgICAgICAgdGhpcy53aW5kb3cgPSBpc0Jyb3dzZXIgPyB3aW5kb3cgOiB7fTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmRzIHByb3BlcnR5IHRvIHRoZSBicm93c2VyIHdpbmRvdyBvYmplY3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWUgLSBOYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBjcmVhdGUvYXNzaWduLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSB2YWx1ZSB0byBzZXQuXG4gICAgICovXG4gICAgYXBwZW5kVG9XaW5kb3coYXR0cmlidXRlTmFtZSwgb2JqKSB7XG5cbiAgICAgICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgICAgICAgd2luZG93W2F0dHJpYnV0ZU5hbWVdID0gb2JqO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSB0byByZXRyaWV2ZSBwcm9wZXJ0eSBmcm9tIHRoZSBicm93c2VyIHdpbmRvdyBvYmplY3QuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGF0dHJpYnV0ZU5hbWUgLSBOYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBjcmVhdGUvYXNzaWduLlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IG9iaiAtIHJldHJpZXZlZCB2YWx1ZSwgb3IgbW9jayBpZiBub3QgYnJvd3Nlci5cbiAgICAgKi9cbiAgICBnZXRGcm9tV2luZG93KGF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgICAgaWYgKHdpbmRvdykge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0RnJvbVdpbmRvdzpmdW5jdGlvbigpIHsgfSxcbiAgICAgICAgICB0b29sczogW119O1xuICAgIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2Jyb3dzZXItYXBpLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==