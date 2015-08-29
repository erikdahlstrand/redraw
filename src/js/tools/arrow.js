import CONST from '../canvas-const.js';

var circleMarkerRadius = 8;
var indicationLength = 20;
var arrowColor = '#444';
var dragArrowColor = '#888';
var arrow,canvas;

var circleMarker, line, start, end;;

class ArrowTool {
    constructor(canvasWrapper, eventAggregator) {
        this.eventAggregator = eventAggregator;
        this.canvasWrapper = canvasWrapper;
        var callee = this;
        this.eventAggregator.subscribeTo(
            CONST.TOOL.ARROW,
            'ArrowTool', function() {
                callee.startArrow();
            });
        canvas = canvasWrapper.canvas;

        this.moveFn = function(options) {
            callee.onMove(options);
        };
        this.upFn = function(options) {
            callee.onMUP(options);
        };
    }

    notify(message) {
        this.eventAggregator.notify('TOOL_USAGE', CONST.TOOL.ARROW, message);
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
        arrow = new fabric.Triangle({
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

        if (circleMarker) {
            canvas.remove(circleMarker);
            circleMarker = undefined;
        }
        if (arrow) {
            canvas.remove(arrow);
            arrow = undefined;    
        }
        if (line) {
            canvas.remove(line);
            arrow = line = undefined;    
        }
        this.detachArrowListeners();
        this.eventAggregator.unsubscribeTo('keydown', 'ArrowTool');
        this.notify('inactive');
    }
    detachArrowListeners() {
        canvas.off('mouse:move', this.moveFn);
        canvas.off('mouse:up', this.upFn);
    }

    onMove(options) {
        if (circleMarker) {
            circleMarker.set({
                'top': (options.e.clientY - this.canvasWrapper.getOffsetTop())
            });
            circleMarker.set({
                'left': options.e.clientX - this.canvasWrapper.getOffsetLeft()
            });
            circleMarker.setCoords();
        }
        if (start) {
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
    };
    onMUP(options) {
        if (!start) {
            start = {
                top: circleMarker.get('top'),
                left: circleMarker.get('left')
            };
            line.set({
                'x1': start.left
            });
            line.set({
                'y1': start.top
            });
            line.set({
                'x2': start.left
            });
            line.set({
                'y2': start.top
            });
            canvas.add(line);
            canvas.remove(circleMarker);
            circleMarker = undefined;
        } else if (!end) {
            end = {
                top: options.e.clientY - this.canvasWrapper.getOffsetTop(),
                left: options.e.clientX - this.canvasWrapper.getOffsetLeft()
            };
            this.detachArrowListeners();
            arrow.fill = arrowColor;
            var group = new fabric.Group([line, arrow], {
                hasControls: false,
                hasBorders: true,
                selectable: true
            });
            line.stroke = arrowColor;

            canvas.add(group);
            canvas.remove(line);
            canvas.remove(arrow);
            arrow = line = undefined;
            this.notify('inactive');
        }
        canvas.renderAll();
    }

    startArrow(topic, sender, payload) {
        if (payload === 'toolbar-deactivate'){
            this.abort();
            return;
        }
        var callee = this;
        this.eventAggregator.subscribeTo('keydown', 'ArrowTool', function(topic, sender, keyCode) {
            if (keyCode === 27) {
                callee.abort();
            }
        });
        start = end = undefined;
        this.notify('active');
        circleMarker = new fabric.Circle({
            radius: circleMarkerRadius,
            fill: arrowColor,
            opacity: 0.7,
            left: 100,
            top: 0,
            selectable: false,
            originX: 'center',
            originY: 'center'
        });
        canvas.add(circleMarker);

        line = new fabric.Line([0, 0, 300, 300], {
            strokeWidth: 5,
            stroke: dragArrowColor,
            originX: 'center',
            originY: 'center',
            hasControls: false,
            hasBorders: true,
            selectable: true
        });
        
        canvas.on('mouse:move', this.moveFn);
        canvas.on('mouse:up', this.upFn);
    }
}
export default ArrowTool;