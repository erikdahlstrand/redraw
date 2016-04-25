import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import ArrowTool from '../arrow.js';

/** Default options for arrow tools initialization */
var defaultToolProps = {
    label: 'Arrow',
    color:CONST.DEFAULT_COLOR,
    activeColor:'#55f',
    size:15,
    lineWidth: 4
};
(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.ARROW, ArrowTool, defaultToolProps);
