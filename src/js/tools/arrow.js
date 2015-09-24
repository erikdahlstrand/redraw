import CONST from '../canvas-const.js';
import Browser from '../browser-api.js';

var f = require('fabric').fabric;

var indicationLength = 20;
var arrowColor = '#444';
var dragArrowColor = '#888';


var circleMarker, line;

class ArrowTool {
    constructor(canvasWrapper, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.canvasWrapper = canvasWrapper;
        this.arrow = this.canvas = this.start = this.end = undefined;

        var callee = this;

        this.eventAggregator.subscribeTo(
            CONST.TOOL.ARROW,
            'ArrowTool',
            function() {
                callee.initListeners.apply(callee, arguments);
            });

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

    // Cred till http://stackoverflow.com/questions/29890294/arrow-shape-using-fabricjs
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
        this.arrow = new f.Triangle({
            angle: angle,
            fill: dragArrowColor,
            top: y2,
            left: x2,
            height: indicationLength,
            width: indicationLength,
            originX: 'center',
            originY: 'center',
            selectable: false
        });

        this.canvas.add(this.arrow);
    }

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

    onMove(options) {

        if (this.start && !this.end) {
            
            let _x2 = options.e.clientX - this.canvasWrapper.getOffsetLeft();
            let _y2 = options.e.clientY - this.canvasWrapper.getOffsetTop();
            line.set({
                'x2': _x2
            });
            line.set({
                'y2': _y2
            });

            this.moveArrowIndicator([this.start.left, this.start.top, _x2, _y2]);
        }

        this.canvas.renderAll();
    }

    onMUP(options) {
        this.end = {
            top: options.e.clientY - this.canvasWrapper.getOffsetTop(),
            left: options.e.clientX - this.canvasWrapper.getOffsetLeft()
        };

        var perimeter = Math.abs(this.end.top - this.start.top) + Math.abs(this.end.left - this.start.left);

        if (perimeter > 10) {
            if (this.arrow) {
                this.arrow.fill = arrowColor;
            }
            var group = new f.Group([line, this.arrow], {
                hasControls: false,
                hasBorders: true,
                selectable: false
            });
            line.stroke = arrowColor;

            this.canvas.add(group);
        }
        
        this.canvas.remove(line);
        this.canvas.remove(this.arrow);
        this.arrow = line = this.start = this.end = undefined;
        this.canvas.renderAll();
    }

    onMouseDown(options) {
        this.start = {
            top: options.e.clientY - this.canvasWrapper.getOffsetTop(),
            left: options.e.clientX - this.canvasWrapper.getOffsetLeft()
        };
        

        line = new f.Line([this.start.left, this.start.top, this.start.left, this.start.top], {
            strokeWidth: 5,
            stroke: dragArrowColor,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: true,
            selectable: true
        });

        this.canvas.add(line);
    }

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
    removeCanvasListeners() {
        this.canvas.off('mouse:down', this.downFn);
        this.canvas.off('mouse:move', this.moveFn);
        this.canvas.off('mouse:up', this.upFn);
    }
}
var toolProps = {
    label: 'Arrow'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.ARROW, ArrowTool, toolProps);
export default ArrowTool;