import CONST from '../canvas-const.js';
var rect;
class BoxTool {
    constructor(canvasWrapper, eventAggregator) {
        eventAggregator.subscribeTo(CONST.TOOL.BOX, 'BoxTool', attachBoxListener);

        let canvas = canvasWrapper.canvas;

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.BOX, message);
        }

        function done() {
            console.log('box done', rect);
        
            notify('inactive');
            detachBoxListener();
            canvasWrapper.enableSelection(true);
        }

        function detachBoxListener() {
            if (rect) {
                canvas.off('mouse:down', mouseDown);
                canvas.off('mouse:move', drawBox);
                canvas.off('mouse:up', drawBoxDone);
                
                rect = undefined;
                eventAggregator.unsubscribeTo('keydown', 'BoxTool');
            }
        }
        var currWidth, currHeight;

        function drawBox(options) {
            if (rect) {                
                currWidth = (options.e.clientX - canvasWrapper.getOffsetLeft()) - startLeft;
                currHeight = (options.e.clientY - canvasWrapper.getOffsetTop()) - startTop;

                rect.set({
                    'width': currWidth
                });
                rect.set({
                    'height': currHeight
                });
                rect.setCoords();
                canvas.renderAll();
            }
        }
        function drawBoxDone(options) {
            canvas.off('mouse:move', drawBox);
            canvas.off('mouse:up', drawBoxDone);

            if (Math.abs(currWidth) < 5 && Math.abs(currHeight) < 5) {
                canvas.remove(rect);
                return;
            }
            rect.set({opacity: 0.2})
            canvas.renderAll();
        }

        var currWidth, currHeight, startTop, startLeft;

        function mouseDown(options) {
            
            currWidth = currHeight = 0;
            startTop = (options.e.clientY - canvasWrapper.getOffsetTop());
            startLeft = (options.e.clientX - canvasWrapper.getOffsetLeft());

            rect = new fabric.Rect({
                left: startLeft,
                top: startTop,
                width: 4,
                borderColor: '#444',
                height: 4,
                fill: '#888',
                opacity: 0.3,
                hasControls: true,
                hasRotatingPoint:false,
                originX:'left',
                originY:'top',
                selectable: false
            });

            canvas.add(rect);
            rect.setCoords();
            canvas.renderAll();
            canvas.on('mouse:move', drawBox);
            canvas.on('mouse:up', drawBoxDone);
        }

        function attachBoxListener(topic, sender, payload) {
            if (payload === 'toolbar-deactivate'){
                done();
                return;
            }
            eventAggregator.subscribeTo('keydown', 'BoxTool', function(topic, sender, keyCode) {
                if (keyCode === 27) {
                    done();
                }
            });
            canvasWrapper.enableSelection(false);
            notify('active');
            
            canvas.on('mouse:down', mouseDown);
        }
    }
}
export default BoxTool;