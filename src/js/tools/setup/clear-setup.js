import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import ResetTool from '../clear-tool.js';


var toolProps = {
    label: 'Clear'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.CLEAR, ResetTool, toolProps);
