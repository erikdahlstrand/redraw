import Browser from './browser-api.js';
import Canvas from './canvas-wrapper.js';
import EventAggregator from './event-aggregator.js';
import ControlsDispatcher from './controls/controls-dispatcher.js';

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
        for (let t in options.tools) {
            let toolName = options.tools[t];
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
            } else if (globalOverrides.indexOf(p) > -1 && globalOptions.hasOwnProperty(p)){
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
class Redraw {
    /**
     * Redraw constructor. Bootstraps the canvas and tools.
     * @constructor
     * @param {Object} imgElement - The dom element that holds the image.
     * @param {Object} options - Options.
     */
    constructor(imgElement, options) {
        this.events = new EventAggregator();
        options = options || {};
        this._canvas = new Canvas(imgElement, this.events, options); // Needs defactor

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
    getDataUrlForExport() {
        this._canvas.canvas.deactivateAllWithDispatch();
        return this._canvas.canvas.toDataURL(
            {
                format:'png',
                multiplier: 1/this._canvas.scale
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
        var jsObj = this._canvas.canvas.toObject(['lockMovementX', 'lockMovementY',
            'lockRotation', 'lockScalingX', 'lockScalingY', 'lockUniScaling',
            'hasControls', 'hasRotatingPoint', 'selectable', 'fill', 'padding']);


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
        this._canvas.loadFromJSON(jsonRepresentation);
    }

    /**
     * Tells whether or not any objects are present in the canvas, i.e. arrows, rectangles other than the image itself.
     * @access public
     * @returns {boolean} true if there are obejcts, i.e.
     */
    isEmpty() {
        return (this._canvas.getAllObjects().length === 0);
    }

    isDirty() {
        return true;
    }


    /**
     * Returns the canvas representation, as is from Fabric.js
     * @access public
     * @returns {Object} canvas, see http://fabricjs.com/.
     */
    getCanvas() {
        return this._canvas.canvas;
    }

    on(topic, callbackFn, subscriberId, scope) {
        this.events.subscribeTo(topic, 'cx-' + subscriberId, callbackFn, scope);
    }

    off(topic, subscriberId) {
        this.events.unsubscribeTo(topic, 'cx-' + subscriberId);
    }

    /**
     * Initializes all selected tools.
     * @param {EventAggregator} events - used for all mediated communications.
     * @param {Object} options - settings for all tools.
     */
    initializeTools(events, options) {
        var localToolSettings = {};
        options.toolSettings = options.toolSettings || {};
        var toolsInUse = getToolsFromUserSettings(redrawNs.tools, options);

        for (var toolName in toolsInUse) {
            var passedProps = overwriteProps(redrawNs.tools, options.toolSettings, options, toolName);

            redrawNs.tools[toolName].options = passedProps;

            new redrawNs.tools[toolName].toolFn(this._canvas, events, passedProps);
        }
        var controls = new ControlsDispatcher(events, options);
        controls.setupTools(toolsInUse, this._canvas.canvasContainer, options);
        return controls;
    }
}

redrawNs.Annotation = Redraw;
/**
 * Used by tools to register themselves to be available for usage.
 * @access public
 * @param {string} _name - name of tool.
 * @param {function(canvas: CanvasWrapper, events: EventAggregator, passedProps: Object)} _toolFn - callback function, invoked upon initialization of the tools.
 * @param {Object} _options - options, to be used as default ones.
 */
redrawNs.registerTool = function(_name, _toolFn, _options) {
    redrawNs.tools[_name] = {
        address: _name,
        toolFn: _toolFn,
        options: _options
    };
    // buttonCss is an attribute that applies to all tools
    redrawNs.tools[_name].options.buttonCss = redrawNs.tools[_name].options.buttonCss || '';
};

(new Browser()).appendToWindow('redraw', redrawNs);



