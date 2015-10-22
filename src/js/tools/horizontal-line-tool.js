import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

/**
 * A tool to create horizontal lines.
 */
export default class HorizontalLineTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator, toolOptions) {
        var canvas = canvasWrapper.canvas;
        var horizontalLine;
        eventAggregator.subscribeTo(CONST.TOOL.HLINE, 'HorizontalLineTool', HorizontalLineTool);

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.HLINE, message);
        }

        function createHorizontalLine() {

            return new fabric.Line([0, 0, canvas.width, 0], {
                left: 0,
                top: 1,
                hasControls: false,
                lockMovementX: true,
                opacity: 0.7,
                padding: 4,
                stroke: toolOptions.color,
                strokeWidth: 2
            });
        }

        function HorizontalLineTool(addr, sender, action) {
            if (action !== 'toolbar-click') {
                abort();
                return;
            }

            notify('active');

            horizontalLine = createHorizontalLine();
            canvas.add(horizontalLine);

            eventAggregator.subscribeTo('keydown', 'HorizontalLine', function(topic, sender, keyCode) {
                if (keyCode === 27) {
                    abort();
                }
            });

            function abort() {
                canvas.remove(horizontalLine);
                horizontalLine = undefined;
                // TODO unsubscribe

                detachHorizontalLineListener();
                notify('inactive');
            }

            var onMouseMove = function(options) {
                if (horizontalLine) {
                    horizontalLine.set({
                        'top': canvas.getPointer(options.e).y
                    });

                    horizontalLine.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMouseMove);

            var onMouseUp = function(options) {
                horizontalLine = createHorizontalLine();
                canvas.add(horizontalLine);
            };
            canvas.on('mouse:up', onMouseUp);

            function detachHorizontalLineListener() {
                canvas.off('mouse:move', onMouseMove);
                canvas.off('mouse:up', onMouseUp);
            }

        };
    }
}
var toolProps = {
    label: 'Limit line',
    color:CONST.DEFAULT_COLOR,
    activeColor:'#55f'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.HLINE, HorizontalLineTool, toolProps);