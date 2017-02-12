import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import HorizontalLineTool from './horizontalLine-tool';

/**
 * Default Horizontal Line options.
 */
const defaultToolProps = {
  label: 'Horizontal Line',
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.HORIZONTAL_LINE, HorizontalLineTool, defaultToolProps);

