import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import TextTool from './text-tool';

/**
 * Default Text options.
 */
const defaultToolProps = {
  label: 'Text',
  fontFamily: 'arial',
  fontSize: 18,
  color: CONST.DEFAULT_COLOR,
  activeColor: CONST.DEFAULT_ACTIVE_COLOR
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.TEXT, TextTool, defaultToolProps);

