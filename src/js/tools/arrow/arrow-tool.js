import CONST from '../../canvas-const';

let line;
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
  constructor(canvasWrapper, eventAggregator, toolOptions) {
    const _this = this;

    /** eventAggregator for madiated cummunications */
    this.eventAggregator = eventAggregator;
    /** main api to use for canvas manipulation */
    this.canvasWrapper = canvasWrapper;
    /** coords for the elements of the arrow */
    this.arrow = undefined;
    this.canvas = undefined;
    this.start = undefined;
    this.end = undefined;
    /** options */
    this.options = toolOptions;

    this.eventAggregator.subscribeTo(
      CONST.TOOL.ARROW,
      'ArrowTool',
      (...args) => {
        _this.initListeners(...args);
      });
    /** shorthand to canvas */
    this.canvas = canvasWrapper.canvas;

    this.moveFn = (options) => {
      _this.onMove(options);
    };

    this.downFn = (options) => {
      _this.onMouseDown(options);
    };

    this.upFn = (options) => {
      _this.onMUP(options);
    };

    this.notify = (message) => {
      _this.eventAggregator.notify('TOOL_USAGE', CONST.TOOL.ARROW, message);
    };

    this.done = () => {
      _this.canvasWrapper.enableSelection(true);
      _this.removeCanvasListeners();
      _this.notify('inactive');
    };
  }

  /**
   * Move the head of the arrow.
   * Cred for http://stackoverflow.com/questions/29890294/arrow-shape-using-fabricjs
   * @private
   * @param {Object} points - 4d.
   */
  moveArrowIndicator(points) {
    const x1 = points[0];
    const y1 = points[1];
    const x2 = points[2];
    const y2 = points[3];
    const dx = x2 - x1;
    const dy = y2 - y1;
    let angle = Math.atan2(dy, dx);

    angle *= 180 / Math.PI;
    angle += 90;

    if (this.arrow) {
      this.canvas.remove(this.arrow);
    }

    this.arrow = new fabric.Triangle({
      angle,
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
   * Cancels this paint operation, i.e. removes any ongoing paint-objects och de-registers
   * listeners.
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
    if (this.start && !this.end && line) {
      const pointer = this.canvas.getPointer(options.e);

      line.set({
        x2: pointer.x,
        y2: pointer.y
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
    const pointer = this.canvas.getPointer(options.e);
    this.end = {
      top: pointer.y,
      left: pointer.x
    };

    const perimeter = Math.abs(this.end.top - this.start.top) +
      Math.abs(this.end.left - this.start.left);

    if (perimeter > 10) {
      if (this.arrow) {
        this.arrow.fill = this.options.color;
      }

      const group = new fabric.Group([line, this.arrow], {
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
    this.arrowd = undefined;
    line = undefined;
    this.startd = undefined;
    this.end = undefined;
    this.canvas.renderAll();
  }

  /**
   * Function callback, invoked on mouse down.
   * @private
   * @param {Object} options - for the event.
   */
  onMouseDown(options) {
    const pointer = this.canvas.getPointer(options.e);
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

  initListeners(topic, sender, payload) {
    const _this = this;

    if (payload === 'toolbar-deactivate') {
      this.abort();
      return;
    }

    this.eventAggregator.subscribeTo('keydown', 'ArrowTool',
      (abortionTopic, abortionSender, abortionKeyCode) => {
        if (abortionKeyCode === 27) {
          _this.abort.apply(_this);
        }
      });

    this.start = undefined;
    this.end = undefined;

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

