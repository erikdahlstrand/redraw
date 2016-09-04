import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';

var editorHeight = 30;

/**
 * A tool to create a text editor in the canvas.
 */
export default class TextTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator, toolOptions) {
        var canvas = canvasWrapper.canvas;
        var editor;
        eventAggregator.subscribeTo(CONST.TOOL.TEXT, 'TextTool', textTool);
        eventAggregator.subscribeTo('keydown', 'TextTool', function(topic, sender, keyCode) {
            if (keyCode === 27) {
                abort();
            }
        });

        function notify(message) {
            eventAggregator.notify('TOOL_USAGE', CONST.TOOL.TEXT, message);
        }

        function abort() {
            if (editor) {
                canvas.remove(editor);
                editor = undefined;
                notify('inactive');
            }
        }
        function textTool(topic, sender, payload) {
            if (payload!=='toolbar-click') {
                abort();
                return;
            }
            notify('active');
            editor = new fabric.IText('Click to leave a comment', {
                fontFamily: toolOptions.fontFamily,
                fontSize: toolOptions.fontSize,
                left: 100,
                top: -40,
                fill: toolOptions.color,
                hasControls: false
            });

            canvas.add(editor);

            var onMove = function(options) {
                if (editor) {
                    let pointer = canvas.getPointer(options.e);
                    editor.set({
                        'top': pointer.y,
                        'left': pointer.x
                    });
                    editor.setCoords();
                    canvas.renderAll();
                }
            };
            canvas.on('mouse:move', onMove);

            function detachTextListener() {
                if (editor) {
                    canvas.off('mouse:move', onMove);
                    canvas.off('mouse:up', detachTextListener);
                    editor.setCoords();
                    editor = undefined;
                    canvas.renderAll();
                    notify('inactive');
                }
            }
            canvas.on('mouse:up', detachTextListener);
        }
    }
}
