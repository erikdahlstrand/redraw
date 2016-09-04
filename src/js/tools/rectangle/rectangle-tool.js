import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';

/** used during drag n drop */
var rect;

/**
 * A tool to paint rectangles.
 */
export default class RectangleTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator, toolOptions) {
        var currWidth, currHeight, startY, startX;

        eventAggregator.subscribeTo(CONST.TOOL.RECTANGLE, 'RectangleTool', attachRectangleListener);
        var callbackCtx = this;
        let canvas = canvasWrapper.canvas;

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.RECTANGLE, message);
        }

        function done() {
            notify('inactive');
            detachRectangleListener();
            canvasWrapper.enableSelection(true);
        }

        function detachRectangleListener() {
            canvas.off('mouse:down', mouseDown);
            canvas.off('mouse:move', drawRectangle);
            canvas.off('mouse:up', drawRectangleDone);

            rect = undefined;
            eventAggregator.unsubscribeTo('keydown', 'RectangleTool');
        }

        function drawRectangle(options) {

              let pointer = canvas.getPointer(options.e);

              let top, left,
                width = pointer.x - startX,
                height = pointer.y - startY;
              currHeight = Math.abs(height);
              currWidth = Math.abs(width);

              if (width < 0) {
                left = pointer.x;
              } else {
                left = startX;
              }

              if (height < 0) {
                top = pointer.y;
              } else {
                top = startY;
              }

              rect.set({
                  'top': top,
                  'left': left,
                  'width': currWidth,
                  'height': currHeight
              });

              rect.setCoords();
              canvas.renderAll();

        }
        function drawRectangleDone(options) {
            canvas.off('mouse:move', drawRectangle);
            canvas.off('mouse:up', drawRectangleDone);

            if (Math.abs(currWidth) < 5 && Math.abs(currHeight) < 5) {
                canvas.remove(rect);
                return;
            }

            rect.set({opacity: 0.5});
            canvas.renderAll();
        }


        function mouseDown(options) {
            let pointer = canvas.getPointer(options.e);
            currWidth = currHeight = 0;

            startY = pointer.y;
            startX = pointer.x;

            rect = new fabric.Rect({
                left: startX,
                top: startY,
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
            canvas.on('mouse:move', drawRectangle);
            canvas.on('mouse:up', drawRectangleDone);
        }

        function attachRectangleListener(topic, sender, payload) {
            if (payload === 'toolbar-deactivate'){
                done();
                return;
            }
            eventAggregator.subscribeTo('keydown', 'RectangleTool', function(topic, sender, keyCode) {
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
