import CONST from '../../canvas-const';

/** used during drag n drop */
let rect;

/**
 * A tool to paint rectangles.
 */
export default class RectangleTool {
  /**
   * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
   * @constructor
   * @param {Canvas} canvasWrapper - Canvas.
   * @param {EventAggregator} eventAggregator - Event mediator.
   */
  constructor(canvasWrapper, eventAggregator, toolOptions) {
    let currWidth;
    let currHeight;
    let startY;
    let startX;
    const _this = this;
    const canvas = canvasWrapper.canvas;

    eventAggregator.subscribeTo(CONST.TOOL.RECTANGLE, 'RectangleTool', attachRectangleListener);

    function notify(message) {
      eventAggregator.notify('TOOL_USAGE', CONST.TOOL.RECTANGLE, message);
    }

    function done() {
      notify('inactive');
      detachRectangleListener();
      canvasWrapper.enableSelection(true);
    }

    function drawRectangle(options) {
      const pointer = canvas.getPointer(options.e);
      let top;
      let left;
      const width = pointer.x - startX;
      const height = pointer.y - startY;
      currHeight = Math.abs(height);
      currWidth = Math.abs(width);

      if (width < 0) {
        left = pointer.x;
      } else {
        left = startX;
      }

      if (height < 0) {
        top = pointer.y;
      } else {
        top = startY;
      }

      rect.set({
        top,
        left,
        width: currWidth,
        height: currHeight
      });

      rect.setCoords();
      canvas.renderAll();
    }

    const drawRectangleDone = () => {
      canvas.off('mouse:move', drawRectangle);
      canvas.off('mouse:up', drawRectangleDone);

      if (Math.abs(currWidth) < 5 && Math.abs(currHeight) < 5) {
        canvas.remove(rect);
        return;
      }

      rect.set({
        borderColor: toolOptions.color,
        fill: toolOptions.color,
        opacity: toolOptions.opacity
      });
      canvas.renderAll();
    };

    function detachRectangleListener() {
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:move', drawRectangle);
      canvas.off('mouse:up', drawRectangleDone);

      rect = undefined;
      eventAggregator.unsubscribeTo('keydown', 'RectangleTool');
    }

    function mouseDown(options) {
      const pointer = canvas.getPointer(options.e);
      currWidth = 0;
      currHeight = 0;

      startY = pointer.y;
      startX = pointer.x;

      rect = new fabric.Rect({
        left: startX,
        top: startY,
        width: 4,
        borderColor: toolOptions.activeColor,
        height: 4,
        fill: toolOptions.activeColor,
        opacity: toolOptions.activeOpacity,
        hasControls: true,
        hasRotatingPoint: false,
        originX: 'left',
        originY: 'top',
        selectable: false
      });

      canvas.add(rect);
      rect.setCoords();
      canvas.renderAll();
      canvas.on('mouse:move', drawRectangle);
      canvas.on('mouse:up', drawRectangleDone);
    }

    function attachRectangleListener(topic, sender, payload) {
      if (payload === 'toolbar-deactivate') {
        done();
        return;
      }

      eventAggregator.subscribeTo('keydown', 'RectangleTool', (resetTopic, resetSender, resetKeyCode) => {
        if (resetKeyCode === 27) {
          done();
        }
      }, _this);

      canvasWrapper.enableSelection(false);
      notify('active');

      canvas.on('mouse:down', mouseDown);
    }
  }
}

