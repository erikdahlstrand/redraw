import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import RectangleTool from './rectangle-tool';

/**
 * Default Rectangle options.
 */
const defaultToolProps = {
  label: 'Rectangle',
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR,
  opacity: 0.5,
  activeOpacity: 0.3
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.RECTANGLE, RectangleTool, defaultToolProps);

