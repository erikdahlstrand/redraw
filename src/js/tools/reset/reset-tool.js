import CONST from '../../canvas-const';

/**
 * A tool to reset the canvas, i.e. remove all objects.
 */
export default class ResetTool {
  /**
   * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
   * @constructor
   * @param {Canvas} canvasWrapper - Canvas.
   * @param {EventAggregator} eventAggregator - Event mediator.
   */
  constructor(canvasWrapper, eventAggregator) {
    eventAggregator.subscribeTo(CONST.TOOL.RESET, 'ResetTool', initClear);

    function initClear(topic, sender, payload) {
      if (payload !== 'toolbar-deactivate' &&
        window.confirm('This will restore your image to its default state.\n' +
            'All your modifications will be deleted.\nDo you want to continue?')) {
        clearAllElements();
      }

      eventAggregator.notify('TOOL_USAGE', CONST.TOOL.RESET, 'inactive');
    }

    function clearAllElements() {
      const c = canvasWrapper.canvas;
      const all = c.getObjects();
      for (let i = all.length - 1; i >= 0; i -= 1) {
        c.remove(all[i]);
      }
    }
  }
}

