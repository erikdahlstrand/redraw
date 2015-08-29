import CONST from '../canvas-const.js';

class RemoveTool {
    constructor(canvasWrapper, eventAggregator) {
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

        
    }
}
export default RemoveTool;