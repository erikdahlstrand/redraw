import Browser from './browser-api.js';
import Canvas from './canvas-wrapper.js';
import EventAggregator from './event-aggregator.js';
import ControlsDispatcher from './controls/controls-dispatcher.js';

var redrawNs = {
    tools: {}
};

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

var globalOverrides = ['color', 'activeColor'];

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
 * Main module.
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
        var events = new EventAggregator();
        options = options || {};
        this._canvas = new Canvas(imgElement, options); // Needs defactor

        if (options.jsonContent) {
            this._canvas.canvas.loadFromJSON(options.jsonContent);
        }


        var controlsDispatcher = new ControlsDispatcher(events);
        this.tools = [];
        this.initializeTools(events, options);
    }
    getDataUrlForExport() {
        this._canvas.canvas.deactivateAllWithDispatch();
        return this._canvas.canvas.toDataURL(
            {
                format:'png',
                multiplier: 1/this._canvas.scale
            });
    }
    toBase64URL() {
        return this.getDataUrlForExport();
    }
    toDataBlob() {
        return dataURItoBlob(this.getDataUrlForExport());
    }
    toJson(includeImage) {
        var x = this._canvas.canvas.toObject();
        if (!includeImage) {
            delete x.backgroundImage;
        }
        return JSON.stringify(x);
    }

    fromJson(jsonRepresentation) {
        var c = this._canvas.canvas;
        c.clear();

        c.loadFromJSON(jsonRepresentation, c.renderAll.bind(c));
    }

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
    }
}

redrawNs.Annotation = Redraw;
redrawNs.registerTool = function(_name, _toolFn, _options) {
    redrawNs.tools[_name] = {
        address: _name,
        toolFn: _toolFn,
        options: _options
    };
    // buttonCss is an attribute that applies to all tools
    redrawNs.tools[_name].options.buttonCss = redrawNs.tools[_name].options.buttonCss || '';
};


var b = new Browser();

b.appendToWindow('redraw', redrawNs);



