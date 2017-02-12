import CONST from '../../canvas-const';
import Browser from '../../browser-api';
import DeleteTool from './delete-tool';

/**
 * Default Delete options.
 */
const defaultToolProps = {
  label: 'Delete'
};

Browser.getFromWindow('redraw')
  .registerTool(CONST.TOOL.DELETE, DeleteTool, defaultToolProps);

