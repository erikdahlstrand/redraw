import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import HorizontalLineTool from './horizontalLine-tool.js';

/**
 * Default Horizontal Line options.
 */
var defaultToolProps = {
  label: 'Horizontal Line',
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR
};

(new Browser())
.getFromWindow('redraw')
  .registerTool(CONST.TOOL.HORIZONTAL_LINE, HorizontalLineTool, defaultToolProps);

