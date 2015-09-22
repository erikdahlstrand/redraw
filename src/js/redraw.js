import Browser from './browser-api.js';
import Canvas from './canvas-wrapper.js';
import EventAggregator from './event-aggregator.js';
import ControlsDispatcher from './controls/controls-dispatcher.js';

var redrawNs = {tools: {}};
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

		this.canvas = new Canvas(imgElement); // Needs defactor

		var controlsDispatcher = new ControlsDispatcher(events);
		this.tools = [];
		this.initializeTools(events, this.canvas.canvasContainer);
    }

    initializeTools (events) {
    	var controls = new ControlsDispatcher(events);
    	controls.setupTools(redrawNs.tools, this.canvas.canvasContainer);

		for (var toolName in redrawNs.tools) {
			new redrawNs.tools[toolName].toolFn(this.canvas, events);
		}
    }
}


redrawNs.registerTool = function(_name, _toolFn, _options) {
	console.log('registerTool',_name, _toolFn, _options);
	redrawNs.tools[_name] = {address: _name, toolFn: _toolFn, options: _options};

};



var b = new Browser();
b.appendToWindow('Redraw', Redraw);
b.appendToWindow('redraw', redrawNs);