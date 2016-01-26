import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

/**
 * A tool to reset the canvas, i.e. remove all objects.
 */
export default class ResetTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator) {
    	eventAggregator.subscribeTo(CONST.TOOL.CLEAR, 'ResetTool', initClear);
		function initClear(topic, sender, payload) {
			if (payload !== 'toolbar-deactivate' &&
				confirm('This will restore your image to its default state.\nAll your modifications will be deleted.\nDo you want to continue?')) {
				clearAllElements();
				eventAggregator.notify('TOOL_USAGE', CONST.TOOL.CLEAR, 'inactive');
			}
		}	

		function clearAllElements() {
			var c = canvasWrapper.canvas;
			var all = c.getObjects();
			for (var i = all.length - 1; i >= 0; i--) {
				c.remove(all[i]);
			}
		}
    }
}
var toolProps = {
    label: 'Clear'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.CLEAR, ResetTool, toolProps);