import Browser from './browser-api';
import Canvas from './canvas-wrapper';
import EventAggregator from './event-aggregator';
import ControlsDispatcher from './controls/controls-dispatcher';

/**
 * Namespace-root, that will be set to window-Object.
 * @access private
 */
const RedrawNs = {
  tools: {}
};

/**
 * Makes a blob from eg base64-string.
 * @access private
 * @param data {string} encodedData - to encode
 * @returns {Blob} results
 */
function dataURItoBlob(encodedData) {
  const decodedData = atob(encodedData.split(',')[1]);
  const array = []; // 8-bit unsigned array
  for (let i = 0; i < decodedData.length; i += 1) {
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
    const definedTools = {};
    Object.keys(options.tools).forEach((t) => {
      const toolName = options.tools[t];
      definedTools[toolName] = allTools[toolName];
    });

    return definedTools;
  }
  return allTools;
}

/**
 * Defines the options-properties allowed to infect all tools-settings.
 * @access private
 */
const globalOverrides = ['color', 'activeColor'];

/**
 * Figures out which options should be applied for a particular toolName.
 * @access private
 * @param {Object} allProps - already defined options, that shold not be lost, but perhaps
 * replaced if defined in precedenceProps or globalOptions.
 * @param {Object} precedenceProps - that may have a property named toolName, that will
 * replace options from allProps.
 * @param {Object} globalOptions - top-level options that will overwrite allProp
 * but not precedenceProps
 * @param {string} toolName - name of the tool, which options is processed
 * @returns {Object} with tool applies options
 */
function overwriteProps(allProps, precedenceProps, globalOptions, toolName) {
  const results = {};
  Object.keys(allProps[toolName].options).forEach((p) => {
    if (Object.prototype.hasOwnProperty.call(allProps[toolName].options, p)) {
      if (precedenceProps && precedenceProps[toolName] &&
      Object.prototype.hasOwnProperty.call(precedenceProps[toolName], p)) {
        results[p] = precedenceProps[toolName][p];
      } else if (globalOverrides.indexOf(p) > -1 &&
          Object.prototype.hasOwnProperty.call(globalOptions, p)) {
        results[p] = globalOptions[p];
      } else {
        results[p] = allProps[toolName].options[p];
      }
    }
  });

  return results;
}

/**
 * Main module, and the only public api for usage.
 * @module redraw
 */
class Redraw {
  /**
   * Redraw constructor. Bootstraps the canvas and tools.
   * @constructor
   * @param {Object} imgElement - The dom element that holds the image.
   * @param {Object} options - Options.
   */
  constructor(imgElement, options = {}) {
    this.events = new EventAggregator();
    this.canvasWrapper = new Canvas(imgElement, this.events, options); // Needs defactor

    if (options.jsonContent) {
      this.canvasWrapper.loadFromJSON(options.jsonContent);
    }

    this.controls = this.initializeTools(this.events, options);
  }
  /**
   * Get the png-representation of the canvas.
   * @access public
   * @returns {string} with base64 encoded png.
   */
  getDataUrlForExport() {
    this.canvasWrapper.canvas.deactivateAllWithDispatch();
    return this.canvasWrapper.canvas.toDataURL({
      format: 'png',
      multiplier: 1 / this.canvasWrapper.scale
    });
  }

  /**
   * Get the base64-encoded png-representation of the canvas.
   * @access public
   * @returns {string} with base64 encoded png.
   */
  toBase64URL() {
    return this.getDataUrlForExport();
  }

  /**
   * Get the binary png-representation of the canvas.
   * @access public
   * @returns {Blob} with canvas as png.
   */
  toDataBlob() {
    return dataURItoBlob(this.getDataUrlForExport());
  }

  /**
   * Get the json-representation of the canvas.
   * @access public
   * @param {boolean} includeImage - true if background-image should be included in the json.
   * @returns {string} with json.
   */
  toJson(includeImage) {
    this.controls.cancelActiveTool();
    const jsObj = this.canvasWrapper.canvas.toObject(['lockMovementX', 'lockMovementY',
      'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling',
      'hasControls', 'hasRotatingPoint', 'selectable', 'fill', 'padding'
    ]);

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
  fromJson(jsonRepresentation) {
    this.canvasWrapper.loadFromJSON(jsonRepresentation);
  }

  /**
   * Tells whether or not any objects are present in the canvas, i.e. arrows, rectangles other
   * than the image itself.
   * @access public
   * @returns {boolean} true if there are obejcts, i.e.
   */
  isEmpty() {
    return (this.canvasWrapper.getAllObjects()
      .length === 0);
  }

  isDirty() { // eslint-disable-line class-methods-use-this
    return true;
  }

  /**
   * Returns the canvas representation, as is from Fabric.js
   * @access public
   * @returns {Object} canvas, see http://fabricjs.com/.
   */
  getCanvas() {
    return this.canvasWrapper.canvas;
  }

  on(topic, callbackFn, subscriberId, scope) {
    this.events.subscribeTo(topic, `cx-${subscriberId}`, callbackFn, scope);
  }

  off(topic, subscriberId) {
    this.events.unsubscribeTo(topic, `cx-${subscriberId}`);
  }

  /**
   * Initializes all selected tools.
   * @param {EventAggregator} events - used for all mediated communications.
   * @param {Object} options - settings for all tools.
   */
  initializeTools(events, options = {}) {
    const toolsInUse = getToolsFromUserSettings(RedrawNs.tools, options);

    Object.keys(toolsInUse).forEach((toolName) => {
      const passedProps = overwriteProps(RedrawNs.tools, options.toolSettings, options, toolName);
      RedrawNs.tools[toolName].options = passedProps;
      new RedrawNs.tools[toolName].toolFn(this.canvasWrapper, events, passedProps);
    });

    const controls = new ControlsDispatcher(events, options);
    controls.setupTools(toolsInUse, this.canvasWrapper.canvasContainer, options);
    return controls;
  }
}

RedrawNs.Annotation = Redraw;
/**
 * Used by tools to register themselves to be available for usage.
 * @access public
 * @param {string} inName - name of tool.
 * @param {function(canvas: CanvasWrapper, events: EventAggregator, passedProps: Object)} inToolFn
 * - callback function, invoked upon initialization of the tools.
 * @param {Object} inOptions - options, to be used as default ones.
 */
RedrawNs.registerTool = (inName, inToolFn, inOptions) => {
  RedrawNs.tools[inName] = {
    address: inName,
    toolFn: inToolFn,
    options: inOptions
  };

  // buttonClass is an attribute that applies to all tools
  RedrawNs.tools[inName].options.buttonClass = RedrawNs.tools[inName].options.buttonClass || '';
};

Browser.appendToWindow('redraw', RedrawNs);

