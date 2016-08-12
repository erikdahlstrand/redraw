(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rechart"] = factory();
	else
		root["rechart"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	module.exports = __webpack_require__(20);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _canvasWrapper = __webpack_require__(3);
	
	var _canvasWrapper2 = _interopRequireDefault(_canvasWrapper);
	
	var _eventAggregator = __webpack_require__(5);
	
	var _eventAggregator2 = _interopRequireDefault(_eventAggregator);
	
	var _controlsDispatcher = __webpack_require__(6);
	
	var _controlsDispatcher2 = _interopRequireDefault(_controlsDispatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Namespace-root, that will be set to window-Object.
	 * @access private
	 */
	var redrawNs = {
	    tools: {}
	};
	
	/**
	 * Makes a blob from eg base64-string.
	 * @access private
	 * @param data {string} encodedData - to encode
	 * @returns {Blob} results
	 */
	function dataURItoBlob(encodedData) {
	    var decodedData = atob(encodedData.split(',')[1]);
	    var array = []; // 8-bit unsigned array
	    for (var i = 0; i < decodedData.length; i++) {
	        array.push(decodedData.charCodeAt(i));
	    }
	    return new Blob([new Uint8Array(array)], {
	        type: 'image/png'
	    });
	}
	
	/**
	 * If the user has defined the options.tools, then use this to
	 * extract the sepcified subset from allTools.
	 * @access private
	 * @param {Object[]} allTools - should be tools to pick from.
	 * @param {Object} options - with or without property tools.
	 * @returns {Object} containing all or the selected tools.
	 */
	function getToolsFromUserSettings(allTools, options) {
	
	    if (options && options.tools) {
	        var definedTools = {};
	        for (var t in options.tools) {
	            var toolName = options.tools[t];
	            definedTools[toolName] = allTools[toolName];
	        }
	        return definedTools;
	    } else {
	        return allTools;
	    }
	}
	
	/**
	 * Defines the options-properties allowed to infect all tools-settings.
	 * @access private
	 */
	var globalOverrides = ['color', 'activeColor'];
	
	/**
	 * Figures out which options should be applied for a particular toolName.
	 * @access private
	 * @param {Object} allProps - already defined options, that shold not be lost, but perhaps
	 * replaced if defined in precedenceProps or globalOptions.
	 * @param {Object} precedenceProps - that may have a property named toolName, that will
	 * replace options from allProps.
	 * @param {Object} globalOptions - top-level options that will overwrite allProp but not precedenceProps
	 * @param {string} toolName - name of the tool, which options is processed
	 * @returns {Object} with tool applies options
	 */
	function overwriteProps(allProps, precedenceProps, globalOptions, toolName) {
	    var results = {};
	
	    for (var p in allProps[toolName].options) {
	        if (allProps[toolName].options.hasOwnProperty(p)) {
	            if (precedenceProps[toolName] && precedenceProps[toolName] && precedenceProps[toolName].hasOwnProperty(p)) {
	                results[p] = precedenceProps[toolName][p];
	            } else if (globalOverrides.indexOf(p) > -1 && globalOptions.hasOwnProperty(p)) {
	                results[p] = globalOptions[p];
	            } else {
	                results[p] = allProps[toolName].options[p];
	            }
	        }
	    }
	    return results;
	}
	
	/**
	 * Main module, and the only public api for usage.
	 * @module redraw
	 */
	
	var Redraw = function () {
	    /**
	     * Redraw constructor. Bootstraps the canvas and tools.
	     * @constructor
	     * @param {Object} imgElement - The dom element that holds the image.
	     * @param {Object} options - Options.
	     */
	
	    function Redraw(imgElement, options) {
	        _classCallCheck(this, Redraw);
	
	        this.events = new _eventAggregator2.default();
	        options = options || {};
	        this._canvas = new _canvasWrapper2.default(imgElement, this.events, options); // Needs defactor
	
	        if (options.jsonContent) {
	            this._canvas.loadFromJSON(options.jsonContent);
	        }
	
	        this.controls = this.initializeTools(this.events, options);
	    }
	    /**
	     * Get the png-representation of the canvas.
	     * @access public
	     * @returns {string} with base64 encoded png.
	     */
	
	
	    _createClass(Redraw, [{
	        key: 'getDataUrlForExport',
	        value: function getDataUrlForExport() {
	            this._canvas.canvas.deactivateAllWithDispatch();
	            return this._canvas.canvas.toDataURL({
	                format: 'png',
	                multiplier: 1 / this._canvas.scale
	            });
	        }
	
	        /**
	         * Get the base64-encoded png-representation of the canvas.
	         * @access public
	         * @returns {string} with base64 encoded png.
	         */
	
	    }, {
	        key: 'toBase64URL',
	        value: function toBase64URL() {
	            return this.getDataUrlForExport();
	        }
	
	        /**
	         * Get the binary png-representation of the canvas.
	         * @access public
	         * @returns {Blob} with canvas as png.
	         */
	
	    }, {
	        key: 'toDataBlob',
	        value: function toDataBlob() {
	            return dataURItoBlob(this.getDataUrlForExport());
	        }
	
	        /**
	         * Get the json-representation of the canvas.
	         * @access public
	         * @param {boolean} includeImage - true if background-image should be included in the json.
	         * @returns {string} with json.
	         */
	
	    }, {
	        key: 'toJson',
	        value: function toJson(includeImage) {
	            this.controls.cancelActiveTool();
	            var jsObj = this._canvas.canvas.toObject(['lockMovementX', 'lockMovementY', 'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling', 'hasControls', 'hasRotatingPoint', 'selectable', 'fill', 'padding']);
	
	            if (!includeImage) {
	                delete jsObj.backgroundImage;
	            }
	            return JSON.stringify(jsObj);
	        }
	
	        /**
	         * Resets image and loads content from provided json.
	         * @access public
	         * @param {string} jsonRepresentation - to provide as current state of the canvas.
	         */
	
	    }, {
	        key: 'fromJson',
	        value: function fromJson(jsonRepresentation) {
	            this._canvas.loadFromJSON(jsonRepresentation);
	        }
	
	        /**
	         * Tells whether or not any objects are present in the canvas, i.e. arrows, boxes other than the image itself.
	         * @access public
	         * @returns {boolean} true if there are obejcts, i.e.
	         */
	
	    }, {
	        key: 'isEmpty',
	        value: function isEmpty() {
	            return this._canvas.getAllObjects().length === 0;
	        }
	    }, {
	        key: 'isDirty',
	        value: function isDirty() {
	            return true;
	        }
	
	        /**
	         * Returns the canvas representation, as is from Fabric.js
	         * @access public
	         * @returns {Object} canvas, see http://fabricjs.com/.
	         */
	
	    }, {
	        key: 'getCanvas',
	        value: function getCanvas() {
	            return this._canvas.canvas;
	        }
	    }, {
	        key: 'on',
	        value: function on(topic, callbackFn, subscriberId, scope) {
	            this.events.subscribeTo(topic, 'cx-' + subscriberId, callbackFn, scope);
	        }
	    }, {
	        key: 'off',
	        value: function off(topic, subscriberId) {
	            this.events.unsubscribeTo(topic, 'cx-' + subscriberId);
	        }
	
	        /**
	         * Initializes all selected tools.
	         * @param {EventAggregator} events - used for all mediated communications.
	         * @param {Object} options - settings for all tools.
	         */
	
	    }, {
	        key: 'initializeTools',
	        value: function initializeTools(events, options) {
	            var localToolSettings = {};
	            options.toolSettings = options.toolSettings || {};
	            var toolsInUse = getToolsFromUserSettings(redrawNs.tools, options);
	
	            for (var toolName in toolsInUse) {
	                var passedProps = overwriteProps(redrawNs.tools, options.toolSettings, options, toolName);
	
	                redrawNs.tools[toolName].options = passedProps;
	
	                new redrawNs.tools[toolName].toolFn(this._canvas, events, passedProps);
	            }
	            var controls = new _controlsDispatcher2.default(events, options);
	            controls.setupTools(toolsInUse, this._canvas.canvasContainer, options);
	            return controls;
	        }
	    }]);
	
	    return Redraw;
	}();
	
	redrawNs.Annotation = Redraw;
	/**
	 * Used by tools to register themselves to be available for usage.
	 * @access public
	 * @param {string} _name - name of tool.
	 * @param {function(canvas: CanvasWrapper, events: EventAggregator, passedProps: Object)} _toolFn - callback function, invoked upon initialization of the tools.
	 * @param {Object} _options - options, to be used as default ones.
	 */
	redrawNs.registerTool = function (_name, _toolFn, _options) {
	    redrawNs.tools[_name] = {
	        address: _name,
	        toolFn: _toolFn,
	        options: _options
	    };
	    // buttonCss is an attribute that applies to all tools
	    redrawNs.tools[_name].options.buttonCss = redrawNs.tools[_name].options.buttonCss || '';
	};
	
	new _browserApi2.default().appendToWindow('redraw', redrawNs);

/***/ },
/* 2 */
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* Gets the scroll position of a dom element.
	* @access private
	* @param {Object} elem - target element.
	*/
	function scrollPosition(elem) {
	    var left = 0,
	        top = 0;
	
	    do {
	        left += elem.scrollLeft;
	        top += elem.scrollTop;
	    } while (elem = elem.offsetParent);
	
	    return [left, top];
	}
	
	/**
	 * Canvas object that facilitates
	 */
	
	var Canvas = function () {
	    /**
	    * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	    * @constructor
	    * @param {Object} imgElement - dom element that will be replaced and
	    * used as background for canvas.
	    * @param {EventAggregator} eventAggregator - Event mediator.
	    * @param {Object} options - parameters used to setup looks and all tools preferences.
	    */
	
	    function Canvas(imgElement, eventAggregator, options) {
	        _classCallCheck(this, Canvas);
	
	        this.options = options;
	        this.eventAggregator = eventAggregator;
	        var parent = imgElement.parentNode;
	        var redrawWrapper = document.createElement('div');
	        redrawWrapper.className = _canvasConst2.default.CSS.PARENT;
	        this.scale = 1;
	        parent.insertBefore(redrawWrapper, imgElement);
	        parent.removeChild(imgElement);
	
	        var canvasElem = document.createElement('canvas');
	        var canvasWrapper = document.createElement('div');
	        canvasWrapper.className = _canvasConst2.default.CSS.CANVAS_WRAPPER;
	        canvasWrapper.appendChild(canvasElem);
	        redrawWrapper.appendChild(canvasWrapper);
	
	        this.canvasElem = canvasElem;
	
	        this.canvasContainer = redrawWrapper;
	        this.canvasLeft = canvasElem.offsetLeft;
	        this.canvas = new fabric.Canvas(canvasElem);
	        this.imgElement = imgElement;
	
	        /* wait until the image is surely loaded to make the setup */
	        var theCanvas = this;
	        var delayedSetup = function delayedSetup() {
	            theCanvas.setupImage();
	        };
	        var tmp = new Image();
	        tmp.addEventListener('load', delayedSetup, false);
	        tmp.src = this.imgElement.src;
	    }
	
	    _createClass(Canvas, [{
	        key: 'setupImage',
	        value: function setupImage() {
	            this.image = new fabric.Image(this.imgElement);
	            if (this.options.maxWidth && this.options.maxWidth < this.image.width) {
	                this.scale = this.options.maxWidth / this.image.width;
	            }
	            if (this.options.maxHeight && this.options.maxHeight < this.image.height) {
	                var scaleY = this.options.maxHeight / this.image.height;
	                if (this.scale > scaleY) {
	                    this.scale = scaleY;
	                }
	            }
	
	            this.width = this.scale * this.imgElement.width;
	            this.height = this.scale * this.imgElement.height;
	
	            this.canvas.setDimensions({
	                width: this.width,
	                height: this.height
	            });
	
	            this.image.setScaleX(this.scale);
	            this.image.setScaleY(this.scale);
	            var event = this.eventAggregator;
	            function getBinder(_canvas) {
	                return function () {
	                    _canvas.renderAll();
	                    event.notify('canvas-loaded', 'CANVAS');
	                };
	            }
	            this.canvas.setBackgroundImage(this.image, getBinder(this.canvas), {});
	
	            if (this.options.maxWidth && this.options.maxWidth < this.image.width) {
	                this.scale = this.options.maxWidth / this.image.width;
	            }
	            if (this.options.maxHeight && this.options.maxHeight < this.image.height) {
	                var _scaleY = this.options.maxHeight / this.image.height;
	                if (this.scale > _scaleY) {
	                    this.scale = _scaleY;
	                }
	            }
	
	            this.eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar', function (subscriptionId, sender, status) {
	                if (status === 'active') {
	                    this.canvas.defaultCursor = 'crosshair';
	                } else {
	                    this.canvas.defaultCursor = 'default';
	                }
	            }, this);
	        }
	    }, {
	        key: 'loadFromJSON',
	        value: function loadFromJSON(jsonContent) {
	            this.canvas.clear();
	            this.canvas.loadFromJSON(jsonContent, this.canvas.renderAll.bind(this.canvas));
	        }
	
	        /**
	         * Gets the top position of the canvas dom element.
	         * @access public
	         * @returns {number} position in pixels?
	         */
	
	    }, {
	        key: 'getCanvasTop',
	        value: function getCanvasTop() {
	            return this.canvasContainer.offsetTop;
	        }
	
	        /**
	         * Gets the array of all objects of the canvas.
	         * @access public
	         * @returns {Array} with canvas object, or undefined if empty.
	         */
	
	    }, {
	        key: 'getAllObjects',
	        value: function getAllObjects() {
	            return this.canvas.getObjects();
	        }
	
	        /**
	         * Set/unset whether or not it is possible to select objects of the canvas.
	         * @access pulic
	         * @param {boolean} isEnabled - true if selection is enabled, false otherwise.
	         */
	
	    }, {
	        key: 'enableSelection',
	        value: function enableSelection(isEnabled) {
	            this.canvas.selection = isEnabled; // Restore fabricjs selection-box
	            this.canvas.forEachObject(function (o) {
	                o.selectable = isEnabled;
	            });
	        }
	    }]);
	
	    return Canvas;
	}();

	exports.default = Canvas;

/***/ },
/* 4 */
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
			CANVAS_WRAPPER: 'redraw_canvas',
			TOOLBAR: 'redraw_toolbar',
			BUTTON: 'redraw_btn',
			ACTIVE_BUTTON: 'active'
		}
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	* Mediator for events.
	*/
	
	var EventAggregator = function () {
	    /**
	     * Contructor that initializes internal stuff.
	     * @constructor
	     */
	
	    function EventAggregator() {
	        _classCallCheck(this, EventAggregator);
	
	        this.subscriptionsByTopic = {};
	    }
	
	    /**
	     * Registers a subscriber for a specific event topic.
	     * @param {string} topic - name of the event type / topic.
	     * @param {string} subscriberId - id the subscriber, must be unique.
	     * @param {function(topic: string, sender: string, payload: Object)} onNotifyFn - callback
	     * invoked upon when upon notification.
	     * @param {Object} [_invokationScope] - scope to be used when invoking callback.
	     */
	
	
	    _createClass(EventAggregator, [{
	        key: "subscribeTo",
	        value: function subscribeTo(topic, subscriberId, onNotifyFn, _invokationScope) {
	            if (!this.subscriptionsByTopic[topic]) {
	                this.subscriptionsByTopic[topic] = [];
	            }
	
	            this.subscriptionsByTopic[topic].push({ subscriber: subscriberId, callbackFn: onNotifyFn, invokationScope: _invokationScope });
	        }
	
	        // ToDo needs test
	        /**
	         * Unregisters a subscriber from a specific event topic.
	         * @param {string} topic - name of the event type / topic.
	         * @param {string} _subscriber - id the unique subscriber.
	         */
	
	    }, {
	        key: "unsubscribeTo",
	        value: function unsubscribeTo(topic, _subscriber) {
	            for (var j in this.subscriptionsByTopic[topic]) {
	                if (this.subscriptionsByTopic[topic][j].subscriber === _subscriber) {
	                    this.subscriptionsByTopic[topic].splice(j, 1);
	                }
	            }
	        }
	
	        /**
	         * Called to notify all subscribers of this topic
	         * @param {string} topic - name of the event type / topic.
	         * @param {string} sender - address of the sender.
	         * @param {Object} payload - any data to pass to the subscriber.
	         */
	
	    }, {
	        key: "notify",
	        value: function notify(topic, sender, payload) {
	            for (var s2 in this.subscriptionsByTopic[topic]) {
	                var scope = undefined;
	                if (this.subscriptionsByTopic[topic][s2].invokationScope) {
	                    scope = this.subscriptionsByTopic[topic][s2].invokationScope;
	                }
	                this.subscriptionsByTopic[topic][s2].callbackFn.apply(scope, [topic, sender, payload]);
	            }
	        }
	    }]);
	
	    return EventAggregator;
	}();

	exports.default = EventAggregator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Css class for all buttons of the toolbar.
	 */
	var BUTTON_CLASS = 'redraw_btn';
	
	/**
	 * Adds a class to the array of classes.
	 * @private
	 */
	function addClasses(btnObj, classes) {
	    if (!classes) return;
	    var allClasses = classes.split(' ');
	
	    allClasses.forEach(function (clazz) {
	        btnObj.classList.add(clazz);
	    });
	}
	
	/**
	 * Main manager for the toolbar.
	 */
	
	var ControlsDispatcher =
	/**
	 * Controls contructor. Is provided with canvas-wrapper and options to initialize to toolbar.
	 * @constructor
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 * @param {Object} options - from user.
	 */
	function ControlsDispatcher(eventAggregator, options) {
	    _classCallCheck(this, ControlsDispatcher);
	
	    this.toolsInUse = {};
	    var activeTool, delBtn;
	
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
	
	    this.cancelActiveTool = function () {
	
	        if (activeTool) {
	            eventAggregator.notify(activeTool, 'toolbar', 'toolbar-deactivate');
	            activeTool = undefined;
	        }
	    };
	
	    var manageKeys = function manageKeys(e) {
	        if (e.keyCode === 46 || e.keyCode === 27) {
	            eventAggregator.notify('keydown', 'toolbar', e.keyCode);
	        }
	    };
	
	    window.addEventListener('keydown', manageKeys, false);
	
	    this.setupTools = function (tools, domParent, mainOptions) {
	        var container = document.createElement('div');
	
	        addClasses(container, _canvasConst2.default.CSS.TOOLBAR);
	        addClasses(container, options.toolbarCss);
	
	        if (mainOptions.toolbarFirst === true) {
	            domParent.insertBefore(container, domParent.firstChild);
	        } else {
	            domParent.appendChild(container);
	        }
	
	        for (var toolName in tools) {
	            var btn = document.createElement('button');
	            btn.innerHTML = tools[toolName].options.label;
	
	            btn.classList.add(_canvasConst2.default.CSS.BUTTON);
	
	            addClasses(btn, mainOptions.buttonCss);
	            addClasses(btn, tools[toolName].options.buttonCss);
	
	            btn.onclick = notifyActive(tools[toolName].address);
	            this.toolsInUse[tools[toolName].address] = btn;
	            container.appendChild(btn);
	        }
	
	        var btnActiveCss = mainOptions.buttonActiveCss || _canvasConst2.default.CSS.ACTIVE_BUTTON;
	
	        eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar', function (subscriptionId, sender, status) {
	            var currTool = this.toolsInUse[sender];
	
	            if (status !== 'active') {
	                if (sender === activeTool) {
	                    activeTool = undefined;
	                }
	                currTool.classList.remove(btnActiveCss);
	            } else {
	                currTool.classList.add(btnActiveCss);
	            }
	        }, this);
	
	        eventAggregator.subscribeTo('tool-enabled', 'toolbar', function (subscriptionId, sender, isEnabled) {
	            if (isEnabled) {
	                this.toolsInUse[sender].classList.remove('disabled');
	            } else {
	                this.toolsInUse[sender].classList.add('disabled');
	            }
	        }, this);
	    };
	};
	
	exports.default = ControlsDispatcher;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/** length of arrow head */
	var indicationLength = 8;
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
	
	        /** eventAggregator for madiated cummunications */
	        this.eventAggregator = eventAggregator;
	        /** main api to use for canvas manipulation */
	        this.canvasWrapper = canvasWrapper;
	        /** coords for the elements of the arrow */
	        this.arrow = this.canvas = this.start = this.end = undefined;
	        /** options */
	        this.options = toolOptions;
	
	        var callee = this;
	
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
	                height: this.options.size,
	                width: this.options.size,
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
	                strokeWidth: this.options.lineWidth,
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

	exports.default = ArrowTool;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/** used during drag n drop */
	var rect;
	/**
	 * A tool to paint boxes.
	 */
	
	var BoxTool =
	/**
	 * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	 * @constructor
	 * @param {Canvas} canvasWrapper - Canvas.
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 */
	function BoxTool(canvasWrapper, eventAggregator, toolOptions) {
	    _classCallCheck(this, BoxTool);
	
	    var currWidth, currHeight, startY, startX;
	
	    eventAggregator.subscribeTo(_canvasConst2.default.TOOL.BOX, 'BoxTool', attachBoxListener);
	    var callbackCtx = this;
	    var canvas = canvasWrapper.canvas;
	
	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.BOX, message);
	    }
	
	    function done() {
	        notify('inactive');
	        detachBoxListener();
	        canvasWrapper.enableSelection(true);
	    }
	
	    function detachBoxListener() {
	        canvas.off('mouse:down', mouseDown);
	        canvas.off('mouse:move', drawBox);
	        canvas.off('mouse:up', drawBoxDone);
	
	        rect = undefined;
	        eventAggregator.unsubscribeTo('keydown', 'BoxTool');
	    }
	
	    function drawBox(options) {
	
	        var pointer = canvas.getPointer(options.e);
	
	        var top = void 0,
	            left = void 0,
	            width = pointer.x - startX,
	            height = pointer.y - startY;
	        currHeight = Math.abs(height);
	        currWidth = Math.abs(width);
	
	        if (width < 0) {
	            left = pointer.x;
	        } else {
	            left = startX;
	        }
	
	        if (height < 0) {
	            top = pointer.y;
	        } else {
	            top = startY;
	        }
	
	        rect.set({
	            'top': top,
	            'left': left,
	            'width': currWidth,
	            'height': currHeight
	        });
	
	        rect.setCoords();
	        canvas.renderAll();
	    }
	    function drawBoxDone(options) {
	        canvas.off('mouse:move', drawBox);
	        canvas.off('mouse:up', drawBoxDone);
	
	        if (Math.abs(currWidth) < 5 && Math.abs(currHeight) < 5) {
	            canvas.remove(rect);
	            return;
	        }
	
	        rect.set({ opacity: 0.5 });
	        canvas.renderAll();
	    }
	
	    function mouseDown(options) {
	        var pointer = canvas.getPointer(options.e);
	        currWidth = currHeight = 0;
	
	        startY = pointer.y;
	        startX = pointer.x;
	
	        rect = new fabric.Rect({
	            left: startX,
	            top: startY,
	            width: 4,
	            borderColor: toolOptions.color,
	            height: 4,
	            fill: toolOptions.color,
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
	
	    function attachBoxListener(topic, sender, payload) {
	        if (payload === 'toolbar-deactivate') {
	            done();
	            return;
	        }
	        eventAggregator.subscribeTo('keydown', 'BoxTool', function (topic, sender, keyCode) {
	            if (keyCode === 27) {
	                done();
	            }
	        }, callbackCtx);
	        canvasWrapper.enableSelection(false);
	        notify('active');
	
	        canvas.on('mouse:down', mouseDown);
	    }
	};
	
	exports.default = BoxTool;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A tool to pixelate areas.
	 */
	
	var PixelateTool =
	/**
	 * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	 * @constructor
	 * @param {Canvas} canvasWrapper - Canvas.
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 */
	function PixelateTool(canvasWrapper, eventAggregator, toolOptions) {
	    _classCallCheck(this, PixelateTool);
	
	    eventAggregator.subscribeTo(_canvasConst2.default.TOOL.PIXELATE, 'PixelateTool', attachBoxListener);
	    var rect = void 0,
	        callbackCtx = this;
	    var startTop = void 0,
	        startLeft = void 0;
	    var canvas = canvasWrapper.canvas;
	
	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.PIXELATE, message);
	    }
	
	    function done() {
	        notify('inactive');
	        detachBoxListener();
	        canvasWrapper.enableSelection(true);
	    }
	
	    function detachBoxListener() {
	        canvas.off('mouse:down', mouseDown);
	        canvas.off('mouse:move', drawBox);
	        canvas.off('mouse:up', drawBoxDone);
	
	        rect = undefined;
	        eventAggregator.unsubscribeTo('keydown', 'PixelateTool');
	    }
	
	    function drawBox(options) {
	
	        var pointer = canvas.getPointer(options.e);
	
	        var top = void 0,
	            left = void 0,
	            currWidth = pointer.x - startLeft,
	            currHeight = pointer.y - startTop;
	        if (currWidth < 0) {
	            left = pointer.x;
	        } else {
	            left = startLeft;
	        }
	
	        if (currHeight < 0) {
	            top = pointer.y;
	        } else {
	            top = startTop;
	        }
	
	        rect.set({
	            'top': top,
	            'left': left,
	            'width': Math.abs(currWidth),
	            'height': Math.abs(currHeight)
	        });
	
	        rect.setCoords();
	        canvas.renderAll();
	    }
	
	    function applyFilter(index, filter, obj) {
	        console.log(obj.filters, index);
	        console.log('alpha');
	        obj.filters[index] = filter;
	        console.log('bravo');
	        obj.applyFilters(canvas.renderAll.bind(canvas));
	        console.log('charlie');
	    }
	
	    function drawBoxDone(options) {
	        canvas.off('mouse:move', drawBox);
	        canvas.off('mouse:up', drawBoxDone);
	        canvas.remove(rect);
	
	        var pointer = canvas.getPointer(options.e);
	        var currWidth = pointer.x - startLeft;
	        var currHeight = pointer.y - startTop;
	
	        if (Math.abs(currWidth) > 0 && Math.abs(currHeight) > 0) {
	            var object = fabric.util.object.clone(canvasWrapper.image);
	
	            var cropped = new Image();
	            cropped.src = object.toDataURL({
	                left: rect.left,
	                top: rect.top,
	                width: rect.width,
	                height: rect.height
	            });
	
	            var image = new fabric.Image(cropped);
	
	            image.set({
	                left: rect.left,
	                top: rect.top,
	                width: rect.width,
	                height: rect.height,
	                hasControls: false,
	                lockMovementX: true,
	                lockMovementY: true
	            });
	
	            var f = fabric.Image.filters;
	            console.log('image', image.width, image.height);
	            applyFilter(0, new f.Pixelate({
	                blocksize: toolOptions.blocksize
	            }), image);
	
	            image.setCoords();
	            canvas.add(image);
	            canvas.sendToBack(image);
	            canvas.renderAll();
	        }
	        canvas.renderAll();
	
	        rect = undefined;
	    }
	
	    function mouseDown(options) {
	        var pointer = canvas.getPointer(options.e);
	
	        startTop = pointer.y;
	        startLeft = pointer.x;
	
	        rect = new fabric.Rect({
	            left: startLeft,
	            top: startTop,
	            width: 4,
	            borderColor: toolOptions.color,
	            height: 4,
	            fill: toolOptions.color,
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
	
	    function attachBoxListener(topic, sender, payload) {
	        if (payload === 'toolbar-deactivate') {
	            done();
	            return;
	        }
	        eventAggregator.subscribeTo('keydown', 'PixelateTool', function (topic, sender, keyCode) {
	            if (keyCode === 27) {
	                done();
	            }
	        }, callbackCtx);
	        canvasWrapper.enableSelection(false);
	        notify('active');
	
	        canvas.on('mouse:down', mouseDown);
	    }
	};
	
	exports.default = PixelateTool;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A tool to reset the canvas, i.e. remove all objects.
	 */
	
	var ResetTool =
	/**
	 * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	 * @constructor
	 * @param {Canvas} canvasWrapper - Canvas.
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 */
	function ResetTool(canvasWrapper, eventAggregator) {
		_classCallCheck(this, ResetTool);
	
		eventAggregator.subscribeTo(_canvasConst2.default.TOOL.CLEAR, 'ResetTool', initClear);
		function initClear(topic, sender, payload) {
			if (payload !== 'toolbar-deactivate' && confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
				clearAllElements();
			}
			eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.CLEAR, 'inactive');
		}
	
		function clearAllElements() {
			var c = canvasWrapper.canvas;
			var all = c.getObjects();
			for (var i = all.length - 1; i >= 0; i--) {
				c.remove(all[i]);
			}
		}
	};
	
	exports.default = ResetTool;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * A tool to create horizontal lines.
	 */
	
	var HorizontalLineTool =
	/**
	 * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	 * @constructor
	 * @param {Canvas} canvasWrapper - Canvas.
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 */
	function HorizontalLineTool(canvasWrapper, eventAggregator, toolOptions) {
	    _classCallCheck(this, HorizontalLineTool);
	
	    var canvas = canvasWrapper.canvas;
	    var horizontalLine;
	    eventAggregator.subscribeTo(_canvasConst2.default.TOOL.HLINE, 'HorizontalLineTool', _HorizontalLineTool);
	
	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.HLINE, message);
	    }
	
	    function createHorizontalLine() {
	
	        return new fabric.Line([0, 0, canvas.width, 0], {
	            left: 0,
	            top: 1,
	            hasControls: false,
	            lockMovementX: true,
	            opacity: 0.7,
	            padding: 4,
	            stroke: toolOptions.color,
	            strokeWidth: 2
	        });
	    }
	
	    function _HorizontalLineTool(addr, sender, action) {
	        if (action !== 'toolbar-click') {
	            abort();
	            return;
	        }
	
	        notify('active');
	
	        horizontalLine = createHorizontalLine();
	        canvas.add(horizontalLine);
	
	        eventAggregator.subscribeTo('keydown', 'HorizontalLine', function (topic, sender, keyCode) {
	            if (keyCode === 27) {
	                abort();
	            }
	        });
	
	        function abort() {
	            canvas.remove(horizontalLine);
	            horizontalLine = undefined;
	            // TODO unsubscribe
	
	            detachHorizontalLineListener();
	            notify('inactive');
	        }
	
	        var onMouseMove = function onMouseMove(options) {
	            if (horizontalLine) {
	                horizontalLine.set({
	                    'top': canvas.getPointer(options.e).y
	                });
	
	                horizontalLine.setCoords();
	                canvas.renderAll();
	            }
	        };
	        canvas.on('mouse:move', onMouseMove);
	
	        var onMouseUp = function onMouseUp(options) {
	            horizontalLine = createHorizontalLine();
	            canvas.add(horizontalLine);
	        };
	        canvas.on('mouse:up', onMouseUp);
	
	        function detachHorizontalLineListener() {
	            canvas.off('mouse:move', onMouseMove);
	            canvas.off('mouse:up', onMouseUp);
	        }
	    };
	};
	
	exports.default = HorizontalLineTool;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * A tool to remove selected elements from canvas!
	                                                                                                                                                           */
	
	
	/**
	 * A tool to remove selected elements from canvas.
	 */
	
	var RemoveTool =
	/**
	 * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	 * @constructor
	 * @param {Canvas} canvasWrapper - Canvas.
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 */
	function RemoveTool(canvasWrapper, eventAggregator) {
	    _classCallCheck(this, RemoveTool);
	
	    eventAggregator.notify('tool-enabled', _canvasConst2.default.TOOL.REMOVE, false);
	    /**
	    * Called upon removal.
	    */
	    var remove = function remove() {
	        var c = canvasWrapper.canvas;
	        if (c.getActiveObject()) {
	            c.remove(c.getActiveObject());
	        }
	        eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.REMOVE, 'inactive');
	    };
	
	    eventAggregator.subscribeTo(_canvasConst2.default.TOOL.REMOVE, 'RemoveTool', remove);
	
	    eventAggregator.subscribeTo('keydown', 'RemoveTool', function (topic, sender, keyCode) {
	        if (keyCode === 46) {
	            remove();
	        }
	    });
	
	    canvasWrapper.canvas.on('object:selected', function (o) {
	        eventAggregator.notify('tool-enabled', _canvasConst2.default.TOOL.REMOVE, true);
	    });
	    canvasWrapper.canvas.on('selection:cleared', function (o) {
	        eventAggregator.notify('tool-enabled', _canvasConst2.default.TOOL.REMOVE, false);
	    });
	};
	
	exports.default = RemoveTool;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var editorHeight = 30;
	
	/**
	 * A tool to create a text editor in the canvas.
	 */
	
	var TextTool =
	/**
	 * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
	 * @constructor
	 * @param {Canvas} canvasWrapper - Canvas.
	 * @param {EventAggregator} eventAggregator - Event mediator.
	 */
	function TextTool(canvasWrapper, eventAggregator, toolOptions) {
	    _classCallCheck(this, TextTool);
	
	    var canvas = canvasWrapper.canvas;
	    var editor;
	    eventAggregator.subscribeTo(_canvasConst2.default.TOOL.TEXT, 'TextTool', textTool);
	    eventAggregator.subscribeTo('keydown', 'TextTool', function (topic, sender, keyCode) {
	        if (keyCode === 27) {
	            abort();
	        }
	    });
	
	    function notify(message) {
	        eventAggregator.notify('TOOL_USAGE', _canvasConst2.default.TOOL.TEXT, message);
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
	            fontFamily: toolOptions.fontFamily,
	            fontSize: toolOptions.fontSize,
	            left: 100,
	            top: -40,
	            fill: toolOptions.color,
	            hasControls: false
	        });
	
	        canvas.add(editor);
	
	        var onMove = function onMove(options) {
	            if (editor) {
	                var pointer = canvas.getPointer(options.e);
	                editor.set({
	                    'top': pointer.y,
	                    'left': pointer.x
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
	
	exports.default = TextTool;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _arrow = __webpack_require__(7);
	
	var _arrow2 = _interopRequireDefault(_arrow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** Default options for arrow tools initialization */
	var defaultToolProps = {
	    label: 'Arrow',
	    color: _canvasConst2.default.DEFAULT_COLOR,
	    activeColor: '#55f',
	    size: 15,
	    lineWidth: 4
	};
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.ARROW, _arrow2.default, defaultToolProps);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _box = __webpack_require__(8);
	
	var _box2 = _interopRequireDefault(_box);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Default options.
	 */
	var defaultToolProps = {
	  label: 'Box',
	  color: _canvasConst2.default.DEFAULT_COLOR
	};
	
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.BOX, _box2.default, defaultToolProps);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _pixelate = __webpack_require__(9);
	
	var _pixelate2 = _interopRequireDefault(_pixelate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Default pixelate options.
	 */
	var defaultToolProps = {
	    label: 'Pixelate',
	    color: _canvasConst2.default.DEFAULT_COLOR,
	    blocksize: 8
	};
	
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.PIXELATE, _pixelate2.default, defaultToolProps);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _clearTool = __webpack_require__(10);
	
	var _clearTool2 = _interopRequireDefault(_clearTool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var toolProps = {
	    label: 'Clear'
	};
	
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.CLEAR, _clearTool2.default, toolProps);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _horizontalLineTool = __webpack_require__(11);
	
	var _horizontalLineTool2 = _interopRequireDefault(_horizontalLineTool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var toolProps = {
	    label: 'Limit line',
	    color: _canvasConst2.default.DEFAULT_COLOR,
	    activeColor: '#55f'
	};
	
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.HLINE, _horizontalLineTool2.default, toolProps);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _removeTool = __webpack_require__(12);
	
	var _removeTool2 = _interopRequireDefault(_removeTool);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var toolProps = {
	    label: 'Delete'
	};
	
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.REMOVE, _removeTool2.default, toolProps);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _canvasConst = __webpack_require__(4);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	var _browserApi = __webpack_require__(2);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _text = __webpack_require__(13);
	
	var _text2 = _interopRequireDefault(_text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Default options for text tools initialization.
	 */
	var toolProps = {
	    label: 'Text',
	    fontFamily: 'arial',
	    fontSize: 18,
	    color: _canvasConst2.default.DEFAULT_COLOR
	};
	new _browserApi2.default().getFromWindow('redraw').registerTool(_canvasConst2.default.TOOL.TEXT, _text2.default, toolProps);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redraw.js.map