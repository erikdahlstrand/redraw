import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import ArrowTool from '../arrow.js';

/** Default options for tools initialization */
var toolProps = {
    label: 'Arrow',
    color:CONST.DEFAULT_COLOR,
    activeColor:'#55f'
};
if (!global && window && window.redraw) {
    window.redraw.registerTool(CONST.TOOL.ARROW, ArrowTool, toolProps);
}
