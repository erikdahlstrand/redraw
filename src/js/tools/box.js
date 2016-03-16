import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

/** used during drag n drop */
var rect;
/**
 * A tool to paint boxes.
 */
export default class BoxTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator, toolOptions) {

        eventAggregator.subscribeTo(CONST.TOOL.BOX, 'BoxTool', attachBoxListener);
        var callbackCtx = this;
        let canvas = canvasWrapper.canvas;

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.BOX, message);
        }

        function done() {
            notify('inactive');
            detachBoxListener();
            canvasWrapper.enableSelection(true);
        }

        function detachBoxListener() {
            canvas.off('mouse:down', mouseDown);
            canvas.off('mouse:move', drawBox);
            canvas.off('mouse:up', drawBoxDone);

            rect = undefined;
            eventAggregator.unsubscribeTo('keydown', 'BoxTool');
        }

        var currWidth, currHeight;

        function drawBox(options) {
            if (rect) {
                let pointer = canvas.getPointer(options.e);

                currWidth = pointer.x - startLeft;
                currHeight = pointer.y - startTop;

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

            rect.set({opacity: 0.5});
            canvas.renderAll();
        }

        var currWidth, currHeight, startTop, startLeft;

        function mouseDown(options) {
            let pointer = canvas.getPointer(options.e);
            currWidth = currHeight = 0;

            startTop = pointer.y;
            startLeft = pointer.x;

            rect = new fabric.Rect({
                left: startLeft,
                top: startTop,
                width: 4,
                borderColor: toolOptions.color,
                height: 4,
                fill: toolOptions.color,
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
            }, callbackCtx);
            canvasWrapper.enableSelection(false);
            notify('active');

            canvas.on('mouse:down', mouseDown);
        }
    }
}
