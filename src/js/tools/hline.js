import CONST from '../canvas-const.js';

class HorizontalLineTool {
    constructor(canvasWrapper, eventAggregator) {
        var movingRect;
        var canvas = canvasWrapper.canvas;
        eventAggregator.subscribeTo(CONST.TOOL.HLINE, 'HorizontalLineTool', HorizontalLineTool);

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.HLINE, message);
        }

        function createLineRect() {
            return new fabric.Rect({
                left: 0,
                top: 1,
                width: canvasWrapper.getWidth(),
                height: 2,
                fill: '#000',
                opacity: 0.7,
                hasControls: false,
                hasBorders: true
            });
        }

        function HorizontalLineTool(addr, sender, action) {
            if (action !== 'toolbar-click') {
                abort();
                return;
            }
            notify('active');
            movingRect = createLineRect();
            eventAggregator.subscribeTo('keydown', 'HLineTool', function(topic, sender, keyCode) {
                if (keyCode === 27) {
                    abort();
                }
            });

            function abort() {
                canvas.remove(movingRect);
                movingRect = undefined;
                eventAggregator.unsubscribe('HLineTool');

                detachHLineListener();
                notify('inactive');
            }


            var onRectMove = function(ctx) {
                if (movingRect) {
                    movingRect.set({
                        'left': 0
                    });
                }
            };
            movingRect.on('moving', onRectMove);

            canvas.add(movingRect);

            var onMove = function(options) {
                if (movingRect) {
                    movingRect.set({
                        'top': (options.e.clientY - canvasWrapper.getOffsetTop())
                    });
                    movingRect.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMove);

            function detachHLineListener() {

                canvas.off('mouse:move', onMove);
                canvas.off('mouse:up', onMUP);

            }

            var onMUP = function(options) {
                movingRect.fill = '#666';
                movingRect = createLineRect();
                canvas.add(movingRect);
            };

            canvas.on('mouse:up', onMUP);
        };
    }
}
export default HorizontalLineTool;