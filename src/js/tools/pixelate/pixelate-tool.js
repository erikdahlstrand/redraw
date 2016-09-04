import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';

/**
 * A tool to pixelate areas.
 */
export default class PixelateTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator, toolOptions) {

        eventAggregator.subscribeTo(CONST.TOOL.PIXELATE, 'PixelateTool', attachRectangleListener);
        let rect, callbackCtx = this;
        let startTop, startLeft;
        let canvas = canvasWrapper.canvas;

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.PIXELATE, message);
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
            eventAggregator.unsubscribeTo('keydown', 'PixelateTool');
        }


        function drawRectangle(options) {

            let pointer = canvas.getPointer(options.e);

            let top, left,
              currWidth = pointer.x - startLeft,
              currHeight = pointer.y - startTop;
            if (currWidth < 0) {
              left = pointer.x;
            } else {
              left = startLeft;
            }

            if (currHeight < 0) {
              top = pointer.y;
            } else {
              top = startTop;
            }

            rect.set({
                'top': top,
                'left': left,
                'width': Math.abs(currWidth),
                'height': Math.abs(currHeight)
            });

            rect.setCoords();
            canvas.renderAll();
        }

        function applyFilter(index, filter, obj) {
            obj.filters[index] = filter;
            obj.applyFilters(canvas.renderAll.bind(canvas));
        }

        function drawRectangleDone(options) {
            canvas.off('mouse:move', drawRectangle);
            canvas.off('mouse:up', drawRectangleDone);
            canvas.remove(rect);

            let pointer = canvas.getPointer(options.e);
            let currWidth = pointer.x - startLeft;
            let currHeight = pointer.y - startTop;

            if (Math.abs(currWidth) > 0 && Math.abs(currHeight) > 0) {
                let object = fabric.util.object.clone(canvasWrapper.image);

                let croppedDomImage = new Image();
                croppedDomImage.src = object.toDataURL({
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height
                });
                let userRect = rect;
                croppedDomImage.onload = function() {
                  let image = new fabric.Image(croppedDomImage);

                  image.set({
                      left: userRect.left,
                      top: userRect.top,
                      width: userRect.width,
                      height: userRect.height,
                      hasControls: false,
                      lockMovementX:true,
                      lockMovementY:true
                  });

                  let f = fabric.Image.filters;
                  applyFilter(0, new f.Pixelate({
                      blocksize: toolOptions.blocksize
                  }), image);

                  image.setCoords();
                  canvas.add(image);
                  canvas.sendToBack(image);
                  canvas.renderAll();
                }
            }
            canvas.renderAll();

            rect = undefined;
        }

        function mouseDown(options) {
            let pointer = canvas.getPointer(options.e);

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
            canvas.on('mouse:move', drawRectangle);
            canvas.on('mouse:up', drawRectangleDone);
        }

        function attachRectangleListener(topic, sender, payload) {
            if (payload === 'toolbar-deactivate'){
                done();
                return;
            }
            eventAggregator.subscribeTo('keydown', 'PixelateTool', function(topic, sender, keyCode) {
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
