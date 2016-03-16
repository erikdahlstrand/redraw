import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import HorizontalLineTool from '../horizontal-line-tool.js';

var toolProps = {
    label: 'Limit line',
    color:CONST.DEFAULT_COLOR,
    activeColor:'#55f'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.HLINE, HorizontalLineTool, toolProps);
