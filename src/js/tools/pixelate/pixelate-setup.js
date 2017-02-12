import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import PixelateTool from './pixelate-tool';

/**
 * Default Pixelate options.
 */
const defaultToolProps = {
  label: 'Pixelate',
  activeColor: CONST.DEFAULT_ACTIVE_COLOR,
  activeOpacity: 0.3,
  blocksize: 8
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.PIXELATE, PixelateTool, defaultToolProps);

