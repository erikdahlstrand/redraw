import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import ResetTool from '../reset-tool.js';

/**
 * Default Reset options.
 */
var defaultToolProps = {
  label: 'Reset'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.RESET, ResetTool, defaultToolProps);
