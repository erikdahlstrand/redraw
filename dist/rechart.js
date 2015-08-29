/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _browserApiJs = __webpack_require__(1);

	var _browserApiJs2 = _interopRequireDefault(_browserApiJs);

	var _canvasWrapperJs = __webpack_require__(2);

	var _canvasWrapperJs2 = _interopRequireDefault(_canvasWrapperJs);

	var _eventAggregatorJs = __webpack_require__(3);

	var _eventAggregatorJs2 = _interopRequireDefault(_eventAggregatorJs);

	var _toolsArrowJs = __webpack_require__(4);

	var _toolsArrowJs2 = _interopRequireDefault(_toolsArrowJs);

	var _toolsBoxJs = __webpack_require__(6);

	var _toolsBoxJs2 = _interopRequireDefault(_toolsBoxJs);

	var _toolsClearToolJs = __webpack_require__(7);

	var _toolsClearToolJs2 = _interopRequireDefault(_toolsClearToolJs);

	var _toolsDumpToolJs = __webpack_require__(8);

	var _toolsDumpToolJs2 = _interopRequireDefault(_toolsDumpToolJs);

	var _toolsHlineJs = __webpack_require__(9);

	var _toolsHlineJs2 = _interopRequireDefault(_toolsHlineJs);

	var _toolsRemoveToolJs = __webpack_require__(10);

	var _toolsRemoveToolJs2 = _interopRequireDefault(_toolsRemoveToolJs);

	var _toolsTextJs = __webpack_require__(11);

	var _toolsTextJs2 = _interopRequireDefault(_toolsTextJs);

	var _controlsHorizontalBarJs = __webpack_require__(12);

	var _controlsHorizontalBarJs2 = _interopRequireDefault(_controlsHorizontalBarJs);

	function setupTool(domId, toolResource, canvasTool, eventAggregator) {
	    var toolInstance = new toolResource(canvasTool, eventAggregator);

	    if (!toolInstance.init) {
	        console.log('Tool ' + domId + ' has no init function!');
	    } else {
	        toolInstance.init();
	    }
	    return toolInstance;
	}

	var RechartJs = function RechartJs(domId, imagePath, options) {
	    _classCallCheck(this, RechartJs);

	    var events = new _eventAggregatorJs2['default']();

	    var canvas = new _canvasWrapperJs2['default'](domId, imagePath);

	    var c = canvas.canvas;
	    var toolbar = new _controlsHorizontalBarJs2['default'](events, document.getElementById(domId));

	    var hasToolsDef = !!options && !!options.tools;

	    if (!hasToolsDef || options.tools.indexOf('rectangle') >= 0) setupTool('action_box', _toolsBoxJs2['default'], canvas, events);
	    if (!hasToolsDef || options.tools.indexOf('reset') >= 0) setupTool('action_clear', _toolsClearToolJs2['default'], canvas, events);
	    if (!hasToolsDef || options.tools.indexOf('text') >= 0) setupTool('action_text', _toolsTextJs2['default'], canvas, events);
	    if (!hasToolsDef || options.tools.indexOf('hline') >= 0) setupTool('action_hline', _toolsHlineJs2['default'], canvas, events, document.getElementById('action_hline'));
	    if (!hasToolsDef || options.tools.indexOf('arrow') >= 0) setupTool('action_arrow', _toolsArrowJs2['default'], canvas, events);
	    if (!hasToolsDef || options.tools.indexOf('remove') >= 0) setupTool('action_remove', _toolsRemoveToolJs2['default'], canvas, events);
	    if (!hasToolsDef || options.tools.indexOf('dump') >= 0) setupTool('action_dump', _toolsDumpToolJs2['default'], canvas, events);

	    // var oRemoveBtn = document.querySelector('#action_remove');

	    // var onSelect = function(options) {
	    //     oRemoveBtn.className = c.getActiveObject() ? '' : 'inactive';
	    // };
	    // c.on('object:selected', onSelect).on('selection:cleared', onSelect);
	};

	new _browserApiJs2['default']().appendToWindow('RechartJs', RechartJs);

	exports['default'] = RechartJs;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var isBrowser = typeof window !== 'undefined';

	var Browser = (function () {
	    function Browser() {
	        _classCallCheck(this, Browser);

	        this.document = isBrowser ? document : {};
	        this.window = isBrowser ? window : {};
	    }

	    _createClass(Browser, [{
	        key: 'appendToWindow',
	        value: function appendToWindow(attributeName, obj) {

	            if (isBrowser) {
	                window[attributeName] = obj;
	                return true;
	            }
	            return false;
	        }
	    }]);

	    return Browser;
	})();

	exports['default'] = Browser;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CANVAS_WIDTH = 582;
	var CANVAS_HEIGHT = 345;
	var functionRepository = {},
	    serviceRepository = {};

	function scrollPosition(elem) {
		var left = 0,
		    top = 0;

		do {
			left += elem.scrollLeft;
			top += elem.scrollTop;
		} while (elem = elem.offsetParent);

		return [left, top];
	}

	var Canvas = (function () {
		function Canvas(domId, imagePath) {
			_classCallCheck(this, Canvas);

			var canvasElem = document.createElement("canvas");
			var innerDiv = document.createElement("div");

			var canvasWrapper = document.getElementById(domId);

			canvasWrapper.appendChild(innerDiv);
			innerDiv.appendChild(canvasElem);
			this.setCanvasProps(canvasElem, canvasWrapper, innerDiv, imagePath);
		}

		_createClass(Canvas, [{
			key: "setCanvasProps",
			value: function setCanvasProps(_canvasElem, overallWrapper, canvasContainer, _imagePath) {

				this.canvasElem = _canvasElem;

				this.overallWrapper = overallWrapper;
				this.canvasTop = this.canvasElem.offsetTop;
				this.canvasContainer = canvasContainer;

				this.canvasLeft = _canvasElem.offsetLeft;

				this.imagePath = _imagePath;

				this.canvas = this.initFabricjsCanvas(this.canvasElem);
			}
		}, {
			key: "getCanvasTop",
			value: function getCanvasTop() {
				return this.canvasContainer.offsetTop;
			}
		}, {
			key: "initFabricjsCanvas",
			value: function initFabricjsCanvas(canvasElem) {
				var fabricCanvas = new fabric.Canvas(canvasElem);

				/* fabric.Image.fromURL('demo/chart.png', function(oImg) {
	     canvas.add(oImg);
	   });/*/
				fabricCanvas.setDimensions({ width: CANVAS_WIDTH, height: CANVAS_HEIGHT });

				fabricCanvas.setBackgroundImage(this.imagePath, fabricCanvas.renderAll.bind(fabricCanvas), {
					width: fabricCanvas.width,
					height: fabricCanvas.height,
					// Needed to position backgroundImage at 0/0
					originX: 'left',
					originY: 'top'
				});
				return fabricCanvas;
			}
		}, {
			key: "getWidth",
			value: function getWidth() {
				return CANVAS_WIDTH;
			}
		}, {
			key: "getOffsetLeft",
			value: function getOffsetLeft() {
				return this.canvasLeft - scrollPosition(this.canvasElem)[0];
			}
		}, {
			key: "getOffsetTop",
			value: function getOffsetTop() {
				return this.getCanvasTop() - scrollPosition(this.canvasElem)[1];
			}
		}]);

		return Canvas;
	})();

	exports["default"] = Canvas;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventAggregator = (function () {
	    function EventAggregator() {
	        _classCallCheck(this, EventAggregator);

	        this.subscriptions = {};
	        this.subscriptionsByTopic = {};
	    }

	    _createClass(EventAggregator, [{
	        key: "subscribe",
	        value: function subscribe(subscriber, onNotifyFn) {
	            this.subscriptions[subscriber] = onNotifyFn;
	        }
	    }, {
	        key: "subscribeTo",
	        value: function subscribeTo(topic, subscriberId, onNotifyFn) {

	            if (!this.subscriptionsByTopic[topic]) {
	                this.subscriptionsByTopic[topic] = [];
	            }
	            this.subscriptionsByTopic[topic].push({ subscriber: subscriberId, callbackFn: onNotifyFn });
	        }

	        // ToDo needs test
	    }, {
	        key: "unsubscribe",
	        value: function unsubscribe(_subscriber) {
	            delete this.subscriptions[_subscriber];
	            for (var i in this.subscriptionsByTopic) {

	                for (var j in this.subscriptionsByTopic[i]) {
	                    if (this.subscriptionsByTopic[i][j].subscriber === _subscriber) {
	                        this.subscriptionsByTopic[i].splice(j, 1);
	                    }
	                }
	            }
	        }

	        // ToDo needs test
	    }, {
	        key: "unsubscribeTo",
	        value: function unsubscribeTo(topic, _subscriber) {
	            for (var j in this.subscriptionsByTopic[topic]) {
	                if (this.subscriptionsByTopic[topic][j].subscriber === _subscriber) {
	                    this.subscriptionsByTopic[topic].splice(j, 1);
	                }
	            }
	        }
	    }, {
	        key: "notify",
	        value: function notify(topic, sender, payload) {
	            for (var s1 in this.subscriptions) {
	                this.subscriptions[s1].apply(undefined, [topic, sender, payload]);
	            }
	            for (var s2 in this.subscriptionsByTopic[topic]) {
	                this.subscriptionsByTopic[topic][s2].callbackFn.apply(undefined, [topic, sender, payload]);
	            }
	        }
	    }]);

	    return EventAggregator;
	})();

	exports["default"] = EventAggregator;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var circleMarkerRadius = 8;
	var indicationLength = 20;
	var arrowColor = '#444';
	var dragArrowColor = '#888';
	var arrow, canvas;

	var circleMarker, line, start, end;;

	var ArrowTool = (function () {
	    function ArrowTool(canvasWrapper, eventAggregator) {
	        _classCallCheck(this, ArrowTool);

	        this.eventAggregator = eventAggregator;
	        this.canvasWrapper = canvasWrapper;
	        var callee = this;
	        this.eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.ARROW, 'ArrowTool', function () {
	            callee.startArrow();
	        });
	        canvas = canvasWrapper.canvas;

	        this.moveFn = function (options) {
	            callee.onMove(options);
	        };
	        this.upFn = function (options) {
	            callee.onMUP(options);
	        };
	    }

	    _createClass(ArrowTool, [{
	        key: 'notify',
	        value: function notify(message) {
	            this.eventAggregator.notify('TOOL_USAGE', _canvasConstJs2['default'].TOOL.ARROW, message);
	        }

	        // Cred till http://stackoverflow.com/questions/29890294/arrow-shape-using-fabricjs
	    }, {
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
	            if (arrow) {
	                canvas.remove(arrow);
	            }
	            arrow = new fabric.Triangle({
	                angle: angle,
	                fill: dragArrowColor,
	                top: y2,
	                left: x2,
	                height: indicationLength,
	                width: indicationLength,
	                originX: 'center',
	                originY: 'center',
	                selectable: false
	            });

	            canvas.add(arrow);
	        }
	    }, {
	        key: 'abort',
	        value: function abort() {

	            if (circleMarker) {
	                canvas.remove(circleMarker);
	                circleMarker = undefined;
	            }
	            if (arrow) {
	                canvas.remove(arrow);
	                arrow = undefined;
	            }
	            if (line) {
	                canvas.remove(line);
	                arrow = line = undefined;
	            }
	            this.detachArrowListeners();
	            this.eventAggregator.unsubscribeTo('keydown', 'ArrowTool');
	            this.notify('inactive');
	        }
	    }, {
	        key: 'detachArrowListeners',
	        value: function detachArrowListeners() {
	            canvas.off('mouse:move', this.moveFn);
	            canvas.off('mouse:up', this.upFn);
	        }
	    }, {
	        key: 'onMove',
	        value: function onMove(options) {
	            if (circleMarker) {
	                circleMarker.set({
	                    'top': options.e.clientY - this.canvasWrapper.getOffsetTop()
	                });
	                circleMarker.set({
	                    'left': options.e.clientX - this.canvasWrapper.getOffsetLeft()
	                });
	                circleMarker.setCoords();
	            }
	            if (start) {
	                var _x2 = options.e.clientX - this.canvasWrapper.getOffsetLeft();
	                var _y2 = options.e.clientY - this.canvasWrapper.getOffsetTop();
	                line.set({
	                    'x2': _x2
	                });
	                line.set({
	                    'y2': _y2
	                });

	                this.moveArrowIndicator([start.left, start.top, _x2, _y2]);
	            }

	            canvas.renderAll();
	        }
	    }, {
	        key: 'onMUP',
	        value: function onMUP(options) {
	            if (!start) {
	                start = {
	                    top: circleMarker.get('top'),
	                    left: circleMarker.get('left')
	                };
	                line.set({
	                    'x1': start.left
	                });
	                line.set({
	                    'y1': start.top
	                });
	                line.set({
	                    'x2': start.left
	                });
	                line.set({
	                    'y2': start.top
	                });
	                canvas.add(line);
	                canvas.remove(circleMarker);
	                circleMarker = undefined;
	            } else if (!end) {
	                end = {
	                    top: options.e.clientY - this.canvasWrapper.getOffsetTop(),
	                    left: options.e.clientX - this.canvasWrapper.getOffsetLeft()
	                };
	                this.detachArrowListeners();
	                arrow.fill = arrowColor;
	                var group = new fabric.Group([line, arrow], {
	                    hasControls: false,
	                    hasBorders: true,
	                    selectable: true
	                });
	                line.stroke = arrowColor;

	                canvas.add(group);
	                canvas.remove(line);
	                canvas.remove(arrow);
	                arrow = line = undefined;
	                this.notify('inactive');
	            }
	            canvas.renderAll();
	        }
	    }, {
	        key: 'startArrow',
	        value: function startArrow(topic, sender, payload) {
	            if (payload === 'toolbar-deactivate') {
	                this.abort();
	                return;
	            }
	            var callee = this;
	            this.eventAggregator.subscribeTo('keydown', 'ArrowTool', function (topic, sender, keyCode) {
	                if (keyCode === 27) {
	                    callee.abort();
	                }
	            });
	            start = end = undefined;
	            this.notify('active');
	            circleMarker = new fabric.Circle({
	                radius: circleMarkerRadius,
	                fill: arrowColor,
	                opacity: 0.7,
	                left: 100,
	                top: 0,
	                selectable: false,
	                originX: 'center',
	                originY: 'center'
	            });
	            canvas.add(circleMarker);

	            line = new fabric.Line([0, 0, 300, 300], {
	                strokeWidth: 5,
	                stroke: dragArrowColor,
	                originX: 'center',
	                originY: 'center',
	                hasControls: false,
	                hasBorders: true,
	                selectable: true
	            });

	            canvas.on('mouse:move', this.moveFn);
	            canvas.on('mouse:up', this.upFn);
	        }
	    }]);

	    return ArrowTool;
	})();

	exports['default'] = ArrowTool;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports['default'] = {
		TOOL: {
			ARROW: 'arr_t',
			BOX: 'box_t',
			CLEAR: 'cl_t',
			DUMP: 'dump_t',
			HLINE: 'hline_t',
			REMOVE: 'rem_t',
			TEXT: 'txt_t'
		}
	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var rect;

	var BoxTool = function BoxTool(canvasWrapper, eventAggregator) {
	    _classCallCheck(this, BoxTool);

	    eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.BOX, 'BoxTool', attachBoxListener);

	    var canvas = canvasWrapper.canvas;

	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConstJs2['default'].TOOL.BOX, message);
	    }

	    function done() {
	        if (rect) {
	            notify('inactive');
	            detachBoxListener();
	            canvas.selection = true; // Restore fabricjs selection-box
	            canvas.forEachObject(function (o) {
	                o.selectable = true;
	            });
	        }
	    }

	    function detachBoxListener() {
	        if (rect) {
	            canvas.off('mouse:down', mouseDown);
	            canvas.off('mouse:move', drawBox);
	            canvas.off('mouse:up', drawBoxDone);

	            rect = undefined;
	            eventAggregator.unsubscribeTo('keydown', 'BoxTool');
	        }
	    }
	    var currWidth, currHeight;

	    function drawBox(options) {
	        if (rect) {
	            currWidth = options.e.clientX - canvasWrapper.getOffsetLeft() - startLeft;
	            currHeight = options.e.clientY - canvasWrapper.getOffsetTop() - startTop;

	            rect.set({
	                'width': currWidth
	            });
	            rect.set({
	                'height': currHeight
	            });
	            rect.setCoords();
	            canvas.renderAll();
	        }
	    }
	    function drawBoxDone(options) {
	        canvas.off('mouse:move', drawBox);
	        canvas.off('mouse:up', drawBoxDone);

	        if (Math.abs(currWidth) < 5 && Math.abs(currHeight) < 5) {
	            canvas.remove(rect);
	            return;
	        }
	        rect.set({ opacity: 0.2 });
	        canvas.renderAll();
	    }

	    var currWidth, currHeight, startTop, startLeft;

	    function mouseDown(options) {

	        currWidth = currHeight = 0;
	        startTop = options.e.clientY - canvasWrapper.getOffsetTop();
	        startLeft = options.e.clientX - canvasWrapper.getOffsetLeft();

	        rect = new fabric.Rect({
	            left: startLeft,
	            top: startTop,
	            width: 4,
	            borderColor: '#444',
	            height: 4,
	            fill: '#888',
	            opacity: 0.3,
	            hasControls: true,
	            hasRotatingPoint: false,
	            originX: 'left',
	            originY: 'top',
	            selectable: false
	        });

	        canvas.add(rect);
	        rect.setCoords();
	        canvas.renderAll();
	        canvas.on('mouse:move', drawBox);
	        canvas.on('mouse:up', drawBoxDone);
	    }

	    function mouseClick(options) {
	        notify('inactive');
	        detachBoxListener();
	    }

	    function attachBoxListener(topic, sender, payload) {
	        if (payload === 'toolbar-deactivate') {
	            done();
	            return;
	        }
	        eventAggregator.subscribeTo('keydown', 'BoxTool', function (topic, sender, keyCode) {
	            if (keyCode === 27) {
	                done();
	            }
	        });
	        canvas.selection = false; // Disable fabricjs selection-box
	        canvas.forEachObject(function (o) {
	            o.selectable = false;
	        });
	        notify('active');

	        canvas.on('mouse:down', mouseDown);
	    }
	};

	exports['default'] = BoxTool;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var ResetTool = function ResetTool(canvasWrapper, eventAggregator) {
		_classCallCheck(this, ResetTool);

		eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.CLEAR, 'ResetTool', initClear);
		function initClear(topic, sender, payload) {
			if (payload !== 'toolbar-deactivate' && confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
				clearAllElements();
			}
		}

		function clearAllElements() {
			var c = canvasWrapper.canvas;
			var all = c.getObjects();
			for (var i = all.length - 1; i >= 0; i--) {
				c.remove(all[i]);
			}
		}
	};

	exports['default'] = ResetTool;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var DumpTool = function DumpTool(canvasWrapper, eventAggregator) {
	    _classCallCheck(this, DumpTool);

	    eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.DUMP, 'DumpTool', dumpJson);
	    function dumpJson() {
	        var oContainer = document.querySelector('#dumpArea');

	        oContainer.innerHTML = JSON.stringify(canvas, null, 2);
	        oContainer.className = oContainer.className.indexOf('active') >= 0 ? '' : 'active';
	    };
	};

	exports['default'] = DumpTool;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var HorizontalLineTool = function HorizontalLineTool(canvasWrapper, eventAggregator) {
	    _classCallCheck(this, HorizontalLineTool);

	    var movingRect;
	    var canvas = canvasWrapper.canvas;
	    eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.HLINE, 'HorizontalLineTool', _HorizontalLineTool);

	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConstJs2['default'].TOOL.HLINE, message);
	    }

	    function createLineRect() {
	        return new fabric.Rect({
	            left: 0,
	            top: 1,
	            width: canvasWrapper.getWidth(),
	            height: 2,
	            fill: '#000',
	            opacity: 0.7,
	            hasControls: false,
	            hasBorders: true
	        });
	    }

	    function _HorizontalLineTool(addr, sender, action) {
	        if (action !== 'toolbar-click') {
	            abort();
	            return;
	        }
	        notify('active');
	        movingRect = createLineRect();
	        eventAggregator.subscribeTo('keydown', 'HLineTool', function (topic, sender, keyCode) {
	            if (keyCode === 27) {
	                abort();
	            }
	        });

	        function abort() {
	            canvas.remove(movingRect);
	            movingRect = undefined;
	            eventAggregator.unsubscribe('HLineTool');

	            detachHLineListener();
	            notify('inactive');
	        }

	        var onRectMove = function onRectMove(ctx) {
	            if (movingRect) {
	                movingRect.set({
	                    'left': 0
	                });
	            }
	        };
	        movingRect.on('moving', onRectMove);

	        canvas.add(movingRect);

	        var onMove = function onMove(options) {
	            if (movingRect) {
	                movingRect.set({
	                    'top': options.e.clientY - canvasWrapper.getOffsetTop()
	                });
	                movingRect.setCoords();
	                canvas.renderAll();
	            }
	        };
	        canvas.on('mouse:move', onMove);

	        function detachHLineListener() {

	            canvas.off('mouse:move', onMove);
	            canvas.off('mouse:up', onMUP);
	        }

	        var onMUP = function onMUP(options) {
	            movingRect.fill = '#666';
	            movingRect = createLineRect();
	            canvas.add(movingRect);
	        };

	        canvas.on('mouse:up', onMUP);
	    };
	};

	exports['default'] = HorizontalLineTool;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var RemoveTool = function RemoveTool(canvasWrapper, eventAggregator) {
	    _classCallCheck(this, RemoveTool);

	    var remove = function remove() {
	        var c = canvasWrapper.canvas;
	        if (c.getActiveObject()) {
	            c.remove(c.getActiveObject());
	        }
	    };

	    eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.REMOVE, 'RemoveTool', remove);
	    eventAggregator.subscribe('RemoveTool', function (eventType, keyCode) {
	        if (eventType === 'keydown' && keyCode === 46) {
	            remove();
	        }
	    });
	};

	exports['default'] = RemoveTool;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var editorHeight = 30;
	var editor, canvas;

	var TextTool = function TextTool(canvasWrapper, eventAggregator) {
	    _classCallCheck(this, TextTool);

	    canvas = canvasWrapper.canvas;
	    eventAggregator.subscribeTo(_canvasConstJs2['default'].TOOL.TEXT, 'TextTool', textTool);
	    eventAggregator.subscribeTo('keydown', 'TextTool', function (topic, sender, keyCode) {
	        if (keyCode === 27) {
	            abort();
	        }
	    });

	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConstJs2['default'].TOOL.TEXT, message);
	    }

	    function abort() {
	        if (editor) {
	            canvas.remove(editor);
	            editor = undefined;
	            notify('inactive');
	        }
	    }
	    function textTool(topic, sender, payload) {
	        if (payload !== 'toolbar-click') {
	            abort();
	            return;
	        }
	        notify('active');
	        editor = new fabric.IText('Click to leave a comment', {
	            fontFamily: 'arial black',
	            fontSize: 18,
	            left: 100,
	            top: -40,
	            hasControls: false
	        });

	        canvas.add(editor);

	        var onMove = function onMove(options) {
	            if (editor) {
	                editor.set({
	                    'top': options.e.clientY - canvasWrapper.getOffsetTop()
	                });
	                editor.set({
	                    'left': options.e.clientX - canvasWrapper.getOffsetLeft()
	                });
	                editor.setCoords();
	                canvas.renderAll();
	            }
	        };
	        canvas.on('mouse:move', onMove);

	        function detachTextListener() {
	            if (editor) {
	                canvas.off('mouse:move', onMove);
	                canvas.off('mouse:up', detachTextListener);
	                editor.setCoords();
	                editor = undefined;
	                canvas.renderAll();
	                notify('inactive');
	            }
	        }
	        canvas.on('mouse:up', detachTextListener);
	    }
	};

	exports['default'] = TextTool;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _canvasConstJs = __webpack_require__(5);

	var _canvasConstJs2 = _interopRequireDefault(_canvasConstJs);

	var tools = [{ id: 'action_box', content: '<i class="fa fa-square-o"></i>', address: _canvasConstJs2['default'].TOOL.BOX }, { id: 'action_arrow', content: '<i class="fa fa-long-arrow-right"></i>', address: _canvasConstJs2['default'].TOOL.ARROW }, { id: 'action_hline', content: '<i class="fa fa-minus-square-o"></i>', address: _canvasConstJs2['default'].TOOL.HLINE }, { id: 'action_text', content: '<i class="fa fa-font"></i>', address: _canvasConstJs2['default'].TOOL.TEXT }, { id: 'action_remove', content: '<i class="fa fa-trash-o"></i>', address: _canvasConstJs2['default'].TOOL.REMOVE }, { id: 'action_clear', content: '<i class="fa fa-bar-chart"></i>', address: _canvasConstJs2['default'].TOOL.CLEAR }, { id: 'action_dump', content: '<i class="fa fa-floppy-o"></i>', address: _canvasConstJs2['default'].TOOL.DUMP }];

	function findTool(_address) {
	    for (var i in tools) {
	        if (tools[i].address === _address) {
	            return tools[i];
	        }
	    }
	}

	var HorizontalBar = function HorizontalBar(eventAggregator, rootNode) {
	    _classCallCheck(this, HorizontalBar);

	    var activeTool;
	    function notifyActive(topic) {
	        return function () {
	            if (activeTool) {
	                eventAggregator.notify(activeTool, 'toolbar', 'toolbar-deactivate');
	            }
	            if (activeTool !== topic) {
	                activeTool = topic;
	                eventAggregator.notify(topic, 'toolbar', 'toolbar-click');
	            } else {
	                activeTool = undefined;
	            }
	        };
	    }
	    var div = document.createElement('div');
	    div.id = 'toolbar';

	    rootNode.insertBefore(div, rootNode.childNodes[0]);

	    var ul = document.createElement('ul');
	    div.appendChild(ul);
	    for (var i in tools) {
	        var t = document.createElement('li');
	        t.id = tools[i].id;
	        t.innerHTML = tools[i].content;
	        t.onclick = notifyActive(tools[i].address);

	        ul.appendChild(t);
	    }

	    eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar', function (subscriptionId, sender, status) {
	        var currTool = findTool(sender);

	        if (status !== 'active') {
	            if (sender === activeTool) {
	                activeTool = undefined;
	            }
	            document.getElementById(currTool.id).className = '';
	        } else {
	            document.getElementById(currTool.id).className = 'active';
	        }
	    });

	    document.onkeydown = function (e) {
	        if (e.keyCode === 46 || e.keyCode === 27) {
	            eventAggregator.notify('keydown', 'toolbar', e.keyCode);
	        }
	    };
	};

	exports['default'] = HorizontalBar;
	module.exports = exports['default'];

/***/ }
/******/ ]);