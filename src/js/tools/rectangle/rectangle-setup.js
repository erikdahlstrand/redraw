import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import RectangleTool from './rectangle-tool.js';

/**
 * Default Rectangle options.
 */
var defaultToolProps = {
  label: 'Rectangle',
  color: CONST.DEFAULT_COLOR
};

(new Browser())
.getFromWindow('redraw')
  .registerTool(CONST.TOOL.RECTANGLE, RectangleTool, defaultToolProps);

