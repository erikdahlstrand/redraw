import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

/** length of arrow head */
var indicationLength = 8;
/** line used during drag n drop */
var line;

/**
 * A tool to paint arrows.
 */
export default class ArrowTool {
    /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Canvas} canvasWrapper - Canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     */
    constructor(canvasWrapper, eventAggregator, toolOptions, fabric) {
        /** eventAggregator for madiated cummunications */
        this.eventAggregator = eventAggregator;
        /** main api to use for canvas manipulation */
        this.canvasWrapper = canvasWrapper;
        /** coords for the elements of the arrow */
        this.arrow = this.canvas = this.start = this.end = undefined;
        /** options */
        this.options = toolOptions;

        var callee = this;

        this.eventAggregator.subscribeTo(
            CONST.TOOL.ARROW,
            'ArrowTool',
            function() {
                callee.initListeners.apply(callee, arguments);
            });
        /** shorthand to canvas */
        this.canvas = canvasWrapper.canvas;

        this.moveFn = function(options) {
            callee.onMove(options);
        };
        this.downFn = function(options) {
            callee.onMouseDown(options);
        };
        this.upFn = function(options) {
            callee.onMUP(options);
        };
        this.notify = function(message) {
            this.eventAggregator.notify('TOOL_USAGE', CONST.TOOL.ARROW, message);
        };

        this.done = function() {
            this.canvasWrapper.enableSelection(true);
            this.removeCanvasListeners();
            this.notify('inactive');
        };
    }

    /**
     * Move the head of the arrow.
     * Cred for http://stackoverflow.com/questions/29890294/arrow-shape-using-fabricjs
     * @private
     * @param {Object} points - 4d.
     */
    moveArrowIndicator(points) {
        var x1 = points[0],
            y1 = points[1],
            x2 = points[2],
            y2 = points[3],

            dx = x2 - x1,
            dy = y2 - y1,

            angle = Math.atan2(dy, dx);

        angle *= 180 / Math.PI;
        angle += 90;
        if (this.arrow) {
            this.canvas.remove(this.arrow);
        }
        this.arrow = new fabric.Triangle({
            angle: angle,
            fill: this.options.activeColor,
            top: y2,
            left: x2,
            height: this.options.size,
            width: this.options.size,
            originX: 'center',
            originY: 'center',
            selectable: false
        });

        this.canvas.add(this.arrow);
    }

    /**
     * Cancels this paint operation, i.e. removes any ongoing paint-objects och de-registers listeners.
     * @private
     */
    abort() {
        if (this.arrow) {
            this.canvas.remove(this.arrow);
            this.arrow = undefined;
        }
        if (line) {
            this.canvas.remove(line);
            line = undefined;
        }
        this.eventAggregator.unsubscribeTo('keydown', 'ArrowTool');
        this.done();
    }

    /**
     * Function callback, invoked when mouse moves, even before mouse has been pressed.
     * @private
     * @param {Object} options - for the event.
     */
    onMove(options) {

        if (this.start && !this.end) {
            let pointer = this.canvas.getPointer(options.e);

            line.set({
                'x2': pointer.x
            });
            line.set({
                'y2': pointer.y
            });

            this.moveArrowIndicator([this.start.left, this.start.top, pointer.x, pointer.y]);
        }

        this.canvas.renderAll();
    }

    /**
     * Function callback, invoked on mouse up.
     * @private
     * @param {Object} options - for the event.
     */
    onMUP(options) {
        let pointer = this.canvas.getPointer(options.e);
        this.end = {
            top: pointer.y,
            left: pointer.x
        };

        var perimeter = Math.abs(this.end.top - this.start.top) + Math.abs(this.end.left - this.start.left);

        if (perimeter > 10) {
            if (this.arrow) {
                this.arrow.fill = this.options.color;
            }
            var group = new fabric.Group([line, this.arrow], {
                hasControls: false,
                hasBorders: true,
                selectable: false,
                fill: this.options.color
            });
            line.stroke = this.options.color;

            this.canvas.add(group);
        }

        this.canvas.remove(line);
        this.canvas.remove(this.arrow);
        this.arrow = line = this.start = this.end = undefined;
        this.canvas.renderAll();
    }

    /**
     * Function callback, invoked on mouse down.
     * @private
     * @param {Object} options - for the event.
     */
    onMouseDown(options) {
        let pointer = this.canvas.getPointer(options.e);
        this.start = {
            top: pointer.y,
            left: pointer.x
        };


        line = new fabric.Line([this.start.left, this.start.top, this.start.left, this.start.top], {
            strokeWidth: this.options.lineWidth,
            stroke: this.options.activeColor,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: true,
            selectable: true
        });

        this.canvas.add(line);
    }

    /**
     * Function callback, invoked when toolbar is clicked.
     * @private
     * @param {string} topic - .
     * @param {string} sender - .
     * @param {string} payload - value shold be "toolbar-deactivate" if tool is active.
     */
    initListeners(topic, sender, payload) {
        if (payload === 'toolbar-deactivate'){
            this.abort();
            return;
        }
        var me = this;

        this.eventAggregator.subscribeTo('keydown', 'ArrowTool',
            function(topic, sender, keyCode) {

                if (keyCode === 27) {
                    me.abort.apply(me);
                }
            });
        this.start = this.end = undefined;

        this.canvasWrapper.enableSelection(false);

        this.notify('active');

        this.canvas.on('mouse:down', this.downFn);
        this.canvas.on('mouse:move', this.moveFn);
        this.canvas.on('mouse:up', this.upFn);
    }
    /**
     * Removes listeners.
     * @private
     */
    removeCanvasListeners() {
        this.canvas.off('mouse:down', this.downFn);
        this.canvas.off('mouse:move', this.moveFn);
        this.canvas.off('mouse:up', this.upFn);
    }
}
