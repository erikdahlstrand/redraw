import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

class RemoveTool {
    constructor(canvasWrapper, eventAggregator) {
        eventAggregator.notify('tool-enabled', CONST.TOOL.REMOVE, false);
        var remove = function() {
            var c = canvasWrapper.canvas;
            if (c.getActiveObject()) {
                c.remove(c.getActiveObject());
            }
        };

        eventAggregator.subscribeTo(CONST.TOOL.REMOVE, 'RemoveTool', remove);

        eventAggregator.subscribe('RemoveTool', function(eventType, keyCode) {
            if (eventType === 'keydown' && keyCode === 46) {
                remove();
            }
        });
        canvasWrapper.canvas.on('object:selected', function(o) {
            eventAggregator.notify('tool-enabled', CONST.TOOL.REMOVE, true);
        });
        canvasWrapper.canvas.on('selection:cleared', function(o) {
            eventAggregator.notify('tool-enabled', CONST.TOOL.REMOVE, false);
        });
    }
}
var toolProps = {
    label: 'Delete'
};
(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.REMOVE, RemoveTool, toolProps);
export default RemoveTool;