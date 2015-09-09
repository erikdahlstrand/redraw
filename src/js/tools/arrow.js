import CONST from '../canvas-const.js';
import FabricProvider from './sample.js';
var f = require('fabric').fabric;

var circleMarkerRadius = 8;
var indicationLength = 20;
var arrowColor = '#444';
var dragArrowColor = '#888';
var arrow,canvas;

var circleMarker, line, start, end;

class ArrowTool {
    constructor(canvasWrapper, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.canvasWrapper = canvasWrapper;
        var callee = this;

        this.eventAggregator.subscribeTo(
            CONST.TOOL.ARROW,
            'ArrowTool', function() {
                callee.initListeners.apply(callee, arguments);
            });

        canvas = canvasWrapper.canvas;

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
        if (arrow) {
            canvas.remove(arrow);
        }
        arrow = new f.Triangle({
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

        canvas.add(arrow);
    }

    abort() {
        console.log('ARROW abort');
        if (arrow) {
            canvas.remove(arrow);
            arrow = undefined;    
        }
        if (line) {
            canvas.remove(line);
            line = undefined;    
        }
        this.eventAggregator.unsubscribeTo('keydown', 'ArrowTool');
        this.done();
    }

    onMove(options) {

        if (start && !end) {
            
            let _x2 = options.e.clientX - this.canvasWrapper.getOffsetLeft();
            let _y2 = options.e.clientY - this.canvasWrapper.getOffsetTop();
            line.set({
                'x2': _x2
            });
            line.set({
                'y2': _y2
            });

            this.moveArrowIndicator([start.left, start.top, _x2, _y2]);
        }

        canvas.renderAll();
    }

    onMUP(options) {
        end = {
            top: options.e.clientY - this.canvasWrapper.getOffsetTop(),
            left: options.e.clientX - this.canvasWrapper.getOffsetLeft()
        };

        var perimeter = Math.abs(end.top - start.top) + Math.abs(end.left - start.left);

        if (perimeter > 10) {
            if (arrow) {
                arrow.fill = arrowColor;
            }
            var group = new f.Group([line, arrow], {
                hasControls: false,
                hasBorders: true,
                selectable: false
            });
            line.stroke = arrowColor;

            canvas.add(group);
        }
        
        canvas.remove(line);
        canvas.remove(arrow);
        arrow = line = start = end = undefined;
        canvas.renderAll();
    }

    onMouseDown(options) {
        start = {
            top: options.e.clientY - this.canvasWrapper.getOffsetTop(),
            left: options.e.clientX - this.canvasWrapper.getOffsetLeft()
        };
        

        line = new f.Line([start.left, start.top, start.left, start.top], {
            strokeWidth: 5,
            stroke: dragArrowColor,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: true,
            selectable: true
        });

        canvas.add(line);
    }

    initListeners(topic, sender, payload) {
        console.log('ARROW init', payload);
        if (payload === 'toolbar-deactivate'){
            this.abort();
            return;
        }
        var me = this;
        this.eventAggregator.subscribeTo('keydown', 'ArrowTool', function(topic, sender, keyCode) {
            if (keyCode === 27) {
                me.abort.apply(me);
            }
        });
        start = end = undefined;

        this.canvasWrapper.enableSelection(false);

        this.notify('active');

        canvas.on('mouse:down', this.downFn);
        canvas.on('mouse:move', this.moveFn);
        canvas.on('mouse:up', this.upFn);
    }
    removeCanvasListeners() {
        canvas.off('mouse:down', this.downFn);
        canvas.off('mouse:move', this.moveFn);
        canvas.off('mouse:up', this.upFn);
    }
}
export default ArrowTool;