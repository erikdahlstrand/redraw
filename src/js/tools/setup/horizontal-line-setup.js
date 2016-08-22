import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import HorizontalLineTool from '../horizontal-line-tool.js';

/**
 * Default Horizontal Line options.
 */
var defaultToolProps = {
  label: 'Horizontal Line',
  color: CONST.DEFAULT_COLOR,
  activeColor: '#55f'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.HORIZONTAL_LINE, HorizontalLineTool, defaultToolProps);
