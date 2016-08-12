import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import PixelateTool from '../pixelate.js';

/**
 * Default pixelate options.
 */
var defaultToolProps = {
    label: 'Pixelate',
    color: CONST.DEFAULT_COLOR,
    blocksize: 8
};

(new Browser()).getFromWindow('redraw').registerTool(CONST.TOOL.PIXELATE, PixelateTool, defaultToolProps);
