import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import ArrowTool from './arrow-tool';

/**
 * Default Arrow options.
 */
const defaultToolProps = {
  label: 'Arrow',
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR,
  size: 15,
  lineWidth: 4
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.ARROW, ArrowTool, defaultToolProps);

