import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import ArrowTool from './arrow-tool.js';

/**
 * Default Arrow options.
 */
var defaultToolProps = {
  label: 'Arrow',
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR,
  size: 15,
  lineWidth: 4
};

(new Browser())
.getFromWindow('redraw')
  .registerTool(CONST.TOOL.ARROW, ArrowTool, defaultToolProps);

