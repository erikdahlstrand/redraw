import CONST from '../../canvas-const.js';
import Browser from '../../browser-api.js';
import PixelateTool from './pixelate-tool.js';

/**
 * Default Pixelate options.
 */
var defaultToolProps = {
  label: 'Pixelate',
  activeColor: CONST.DEFAULT_COLOR,
  activeOpacity: 0.3,
  blocksize: 8
};

(new Browser())
.getFromWindow('redraw')
  .registerTool(CONST.TOOL.PIXELATE, PixelateTool, defaultToolProps);

