import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import DeleteTool from '../delete-tool.js';

/**
 * Default Delete options.
 */
var defaultToolProps = {
  label: 'Delete'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.DELETE, DeleteTool, defaultToolProps);
