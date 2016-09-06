import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import RectangleTool from './rectangle-tool.js';

/**
 * Default Rectangle options.
 */
var defaultToolProps = {
  label: 'Rectangle',
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR,
  opacity: 0.5,
  activeOpacity: 0.3
};

(new Browser())
.getFromWindow('redraw')
  .registerTool(CONST.TOOL.RECTANGLE, RectangleTool, defaultToolProps);

