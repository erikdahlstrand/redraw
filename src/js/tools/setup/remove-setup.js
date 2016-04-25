import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import RemoveTool from '../remove-tool.js';

var toolProps = {
    label: 'Delete'
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.REMOVE, RemoveTool, toolProps);
