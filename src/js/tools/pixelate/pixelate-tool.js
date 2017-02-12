import CONST from '../../canvas-const';

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
    let rect;
    const _this = this;
    let startTop;
    let startLeft;
    const canvas = canvasWrapper.canvas;

    eventAggregator.subscribeTo(CONST.TOOL.PIXELATE, 'PixelateTool', attachRectangleListener);

    function notify(message) {
      eventAggregator.notify('TOOL_USAGE', CONST.TOOL.PIXELATE, message);
    }

    function drawRectangle(options) {
      const pointer = canvas.getPointer(options.e);
      let top;
      let left;
      const currWidth = pointer.x - startLeft;
      const currHeight = pointer.y - startTop;

      if (currWidth < 0) {
        left = pointer.x;
      } else {
        left = startLeft;
      }

      if (currHeight < 0) {
        top = pointer.y;
      } else {
        top = startTop;
      }

      rect.set({
        top,
        left,
        width: Math.abs(currWidth),
        height: Math.abs(currHeight)
      });

      rect.setCoords();
      canvas.renderAll();
    }

    const applyFilter = (index, filter, obj) => {
      obj.filters[index] = filter;// eslint-disable-line no-param-reassign
      obj.applyFilters(canvas.renderAll.bind(canvas));
    };

    const drawRectangleDone = (options) => {
      canvas.off('mouse:move', drawRectangle);
      canvas.off('mouse:up', drawRectangleDone);
      canvas.remove(rect);

      const pointer = canvas.getPointer(options.e);
      const currWidth = pointer.x - startLeft;
      const currHeight = pointer.y - startTop;

      if (Math.abs(currWidth) > 0 && Math.abs(currHeight) > 0) {
        const object = fabric.util.object.clone(canvasWrapper.image);

        const croppedDomImage = new Image();
        croppedDomImage.src = object.toDataURL({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        });
        const userRect = rect;
        croppedDomImage.onload = () => {
          const image = new fabric.Image(croppedDomImage);

          image.set({
            left: userRect.left,
            top: userRect.top,
            width: userRect.width,
            height: userRect.height,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true
          });

          const f = fabric.Image.filters;
          applyFilter(0, new f.Pixelate({
            blocksize: toolOptions.blocksize
          }), image);

          image.setCoords();
          canvas.add(image);
          canvas.sendToBack(image);
          canvas.renderAll();
        };
      }

      canvas.renderAll();
      rect = undefined;
    };

    function mouseDown(options) {
      const pointer = canvas.getPointer(options.e);

      startTop = pointer.y;
      startLeft = pointer.x;

      rect = new fabric.Rect({
        left: startLeft,
        top: startTop,
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

    function detachRectangleListener() {
      canvas.off('mouse:down', mouseDown);
      canvas.off('mouse:move', drawRectangle);
      canvas.off('mouse:up', drawRectangleDone);

      rect = undefined;
      eventAggregator.unsubscribeTo('keydown', 'PixelateTool');
    }

    function done() {
      notify('inactive');
      detachRectangleListener();
      canvasWrapper.enableSelection(true);
    }

    function attachRectangleListener(topic, sender, payload) {
      if (payload === 'toolbar-deactivate') {
        done();
        return;
      }

      eventAggregator.subscribeTo('keydown', 'PixelateTool',
        (abortTopic, abortSender, abortKeyCode) => {
          if (abortKeyCode === 27) {
            done();
          }
        }, _this);

      canvasWrapper.enableSelection(false);
      notify('active');

      canvas.on('mouse:down', mouseDown);
    }
  }
}

