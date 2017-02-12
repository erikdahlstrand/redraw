import CONST from '../../canvas-const';

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
    const canvas = canvasWrapper.canvas;
    let editor;

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

    eventAggregator.subscribeTo(CONST.TOOL.TEXT, 'TextTool', textTool);
    eventAggregator.subscribeTo('keydown', 'TextTool', (topic, sender, keyCode) => {
      if (keyCode === 27) {
        abort();
      }
    });

    function textTool(topic, sender, payload) {
      if (payload !== 'toolbar-click') {
        abort();
        return;
      }

      notify('active');
      editor = new fabric.IText('Click to leave a comment', {
        fontFamily: toolOptions.fontFamily,
        fontSize: toolOptions.fontSize,
        left: 100,
        top: -40,
        fill: toolOptions.activeColor,
        hasControls: false
      });

      canvas.add(editor);

      const onMove = (options) => {
        if (editor) {
          const pointer = canvas.getPointer(options.e);
          editor.set({
            top: pointer.y,
            left: pointer.x
          });
          editor.setCoords();
          canvas.renderAll();
        }
      };

      canvas.on('mouse:move', onMove);

      function detachTextListener() {
        if (editor) {
          editor.set({
            fill: toolOptions.color
          });
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

