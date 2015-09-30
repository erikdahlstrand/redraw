import Browser from './browser-api.js';
import Canvas from './canvas-wrapper.js';
import EventAggregator from './event-aggregator.js';
import ControlsDispatcher from './controls/controls-dispatcher.js';

var redrawNs = {tools: {}};

   function dataURItoBlob(encodedData) {
    var decodedData = atob(encodedData.split(',')[1]);
    var array = []; // 8-bit unsigned array
    for(var i = 0; i < decodedData.length; i++) {
      array.push(decodedData.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
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

		this._canvas = new Canvas(imgElement); // Needs defactor

		if (options.jsonContent) {
			this._canvas.canvas.loadFromJSON(options.jsonContent);
		}
		

		var controlsDispatcher = new ControlsDispatcher(events);
		this.tools = [];
		this.initializeTools(events, this._canvas.canvasContainer);
    }

    toBase64URL() {
    	return this._canvas.canvas.toDataURL('png');
    }
    toDataBlob() {
		return dataURItoBlob(this._canvas.canvas.toDataURL('png'));
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

    initializeTools (events) {
    	var controls = new ControlsDispatcher(events);
    	controls.setupTools(redrawNs.tools, this._canvas.canvasContainer);

		for (var toolName in redrawNs.tools) {
			new redrawNs.tools[toolName].toolFn(this._canvas, events);
		}
    }
}

redrawNs.Annotation = Redraw;
redrawNs.registerTool = function(_name, _toolFn, _options) {
	redrawNs.tools[_name] = {address: _name, toolFn: _toolFn, options: _options};
};


var b = new Browser();
//b.appendToWindow('Redraw', Redraw);
b.appendToWindow('redraw', redrawNs);