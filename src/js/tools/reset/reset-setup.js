import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import ResetTool from './reset-tool';

/**
 * Default Reset options.
 */
const defaultToolProps = {
  label: 'Reset'
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.RESET, ResetTool, defaultToolProps);

