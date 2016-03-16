import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import BoxTool from '../box.js';

/**
 * Default options.
 */
var defaultToolProps = {
    label: 'Box',
    color:CONST.DEFAULT_COLOR
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.BOX, BoxTool, defaultToolProps);
