import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import TextTool from '../text-tool.js';

/**
 * Default Text options.
 */
var defaultToolProps = {
  label: 'Text',
  fontFamily: 'arial',
  fontSize: 18,
  color: CONST.DEFAULT_COLOR,
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.TEXT, TextTool, defaultToolProps);
