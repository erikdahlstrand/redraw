(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["chartpen"] = factory();
	else
		root["chartpen"] = factory();
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

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _browserApi = __webpack_require__(1);
	
	var _browserApi2 = _interopRequireDefault(_browserApi);
	
	var _canvasWrapper = __webpack_require__(2);
	
	var _canvasWrapper2 = _interopRequireDefault(_canvasWrapper);
	
	var _eventAggregator = __webpack_require__(4);
	
	var _eventAggregator2 = _interopRequireDefault(_eventAggregator);
	
	var _controlsDispatcher = __webpack_require__(5);
	
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
	     * Tells whether or not any objects are present in the canvas, i.e. arrows, rectangles other than the image itself.
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
	
	  // buttonClass is an attribute that applies to all tools
	  redrawNs.tools[_name].options.buttonClass = redrawNs.tools[_name].options.buttonClass || '';
	};
	
	new _browserApi2.default().appendToWindow('redraw', redrawNs);

/***/ },
/* 1 */
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
	        tools: []
	      };
	    }
	  }]);
	
	  return Browser;
	}();
	
	exports.default = Browser;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _canvasConst = __webpack_require__(3);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Gets the scroll position of a dom element.
	 * @access private
	 * @param {Object} elem - target element.
	 */
	function scrollPosition(elem) {
	  var left = 0;
	  var top = 0;
	
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
	    var _this = this;
	    var delayedSetup = function delayedSetup() {
	      _this.setupImage();
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  TOOL: {
	    ARROW: 'arrow',
	    DELETE: 'delete',
	    HORIZONTAL_LINE: 'horizontalLine',
	    PIXELATE: 'pixelate',
	    RECTANGLE: 'rectangle',
	    RESET: 'reset',
	    TEXT: 'text'
	  },
	  DEFAULT_COLOR: '#33e',
	  DEFAULT_ACTIVE_COLOR: '#55f',
	  CSS: {
	    ACTIVE_BUTTON: 'active',
	    DISABLED_BUTTON: 'disabled',
	    BUTTON: 'redraw-btn',
	    PARENT: 'redraw-parent',
	    TOOLBAR: 'redraw-toolbar',
	    CANVAS_WRAPPER: 'redraw-canvas'
	  }
	};

/***/ },
/* 4 */
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
	
	      this.subscriptionsByTopic[topic].push({
	        subscriber: subscriberId,
	        callbackFn: onNotifyFn,
	        invokationScope: _invokationScope
	      });
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _canvasConst = __webpack_require__(3);
	
	var _canvasConst2 = _interopRequireDefault(_canvasConst);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	  var activeTool = void 0;
	
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
	    addClasses(container, options.toolbarClass);
	
	    if (mainOptions.toolbarFirst === true) {
	      domParent.insertBefore(container, domParent.firstChild);
	    } else {
	      domParent.appendChild(container);
	    }
	
	    for (var toolName in tools) {
	      var btn = document.createElement('button');
	      btn.innerHTML = tools[toolName].options.label;
	
	      btn.classList.add(_canvasConst2.default.CSS.BUTTON);
	
	      addClasses(btn, mainOptions.buttonClass);
	      addClasses(btn, tools[toolName].options.buttonClass);
	
	      btn.onclick = notifyActive(tools[toolName].address);
	      this.toolsInUse[tools[toolName].address] = btn;
	      container.appendChild(btn);
	    }
	
	    var btnActiveCss = mainOptions.buttonActiveClass || _canvasConst2.default.CSS.ACTIVE_BUTTON;
	    var btnDisabledCss = mainOptions.buttonDisabledClass || _canvasConst2.default.CSS.DISABLED_BUTTON;
	
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
	        this.toolsInUse[sender].classList.remove(btnDisabledCss);
	      } else {
	        this.toolsInUse[sender].classList.add(btnDisabledCss);
	      }
	    }, this);
	  };
	};
	
	exports.default = ControlsDispatcher;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redraw.js.map