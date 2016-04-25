import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

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

        eventAggregator.subscribeTo(CONST.TOOL.PIXELATE, 'PixelateTool', attachBoxListener);
        let rect, callbackCtx = this;
        let startTop, startLeft;
        let canvas = canvasWrapper.canvas;

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.PIXELATE, message);
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
            eventAggregator.unsubscribeTo('keydown', 'PixelateTool');
        }


        function drawBox(options) {
            if (rect) {
                let pointer = canvas.getPointer(options.e);

                let currWidth = pointer.x - startLeft;
                let currHeight = pointer.y - startTop;

                rect.set({
                    'width': currWidth,
                    'height': currHeight
                });

                rect.setCoords();
                canvas.renderAll();
            }
        }

        function applyFilter(index, filter, obj) {
            obj.filters[index] = filter;
            obj.applyFilters(canvas.renderAll.bind(canvas));
        }

        function drawBoxDone(options) {
            canvas.off('mouse:move', drawBox);
            canvas.off('mouse:up', drawBoxDone);
            canvas.remove(rect);

            let pointer = canvas.getPointer(options.e);
            let currWidth = pointer.x - startLeft;
            let currHeight = pointer.y - startTop;

            if (Math.abs(currWidth) > 0 && Math.abs(currHeight) > 0) {
                var pixels = canvas.getContext().getImageData(pointer.x, pointer.y, currWidth, currHeight);

                var object = fabric.util.object.clone(canvasWrapper.image);

                object.set({
                    originX: 'left',
                    originY: 'top',
                    left: 0,
                    top: 0,
                    lockMovementX:true,
                    lockMovementY:true
                });
                var x = rect;

                rect.left = rect.left - object.width / 2;
                rect.top = rect.top - object.height / 2;

                object.clipTo = function(ctx) {
                    x.render(ctx);
                };

                var f = fabric.Image.filters;
                applyFilter(0, new f.Pixelate({
                    blocksize: 5
                }), object);

                canvas.add(object);
                canvas.sendToBack(object);
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
            canvas.on('mouse:move', drawBox);
            canvas.on('mouse:up', drawBoxDone);
        }

        function attachBoxListener(topic, sender, payload) {
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
