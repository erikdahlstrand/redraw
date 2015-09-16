import CONST from './canvas-const.js';
import Browser from './browser-api.js';
import Canvas from './canvas-wrapper.js';
import EventAggregator from './event-aggregator.js';

import ArrowTool from './tools/arrow.js';
import BoxTool from './tools/box.js';
import ResetTool from './tools/clear-tool.js';
import DumpTool from './tools/dump-tool.js';
import HorizontalLineTool from './tools/hline.js';
import RemoveTool from './tools/remove-tool.js';
import TextTool from './tools/text.js';
import HorizontalBar from './controls/horizontal-bar.js';


function setupTool(domId, toolResource, canvasTool, eventAggregator) {
    var toolInstance = new toolResource(canvasTool, eventAggregator);

    return toolInstance;
}

class RechartJs {

    constructor(domId, imgElement, options) {
        var events = new EventAggregator(domId);
        
        var imgInstance = new fabric.Image(imgElement, {
          left: 0,
          top: 0
        });

        var canvas = new Canvas(domId, imgInstance);

        var c = canvas.canvas;
        var tools = (options && options.tools) ? options.tools : [];
        var toolbar = new HorizontalBar(domId, events, document.getElementById(domId));
        

        var hasToolsDef = !!options && !!options.tools;
/*
tools[CONST.TOOL.BOX] =    { id: 'action_box',    content:'<i class="fa fa-square-o"></i>',         address: CONST.TOOL.BOX };
tools[CONST.TOOL.ARROW] =  { id: 'action_arrow',  content:'<i class="fa fa-long-arrow-right"></i>', address: CONST.TOOL.ARROW };
tools[CONST.TOOL.HLINE] =  { id: 'action_hline',  content:'<i class="fa fa-minus-square-o"></i>',   address: CONST.TOOL.HLINE };
tools[CONST.TOOL.TEXT] =   { id: 'action_text',   content:'<i class="fa fa-font"></i>',             address: CONST.TOOL.TEXT };
tools[CONST.TOOL.REMOVE] = { id: 'action_remove', content:'<i class="fa fa-trash-o"></i>',          address: CONST.TOOL.REMOVE };
tools[CONST.TOOL.CLEAR] =  { id: 'action_clear',  content:'<i class="fa fa-bar-chart"></i>',        address: CONST.TOOL.CLEAR };
tools[CONST.TOOL.DUMP] =   { id: 'action_dump',   content:'<i class="fa fa-floppy-o"></i>',         address: CONST.TOOL.DUMP };

*/
        if (!hasToolsDef || tools.indexOf('rectangle') >= 0) {
            setupTool('action_box', BoxTool, canvas, events);
            toolbar.addTool(CONST.TOOL.BOX);
        }
        if (!hasToolsDef || tools.indexOf('reset') >= 0) {
            setupTool('action_clear', ResetTool, canvas, events);
            toolbar.addTool(CONST.TOOL.CLEAR);
        }
        if (!hasToolsDef || tools.indexOf('text') >= 0) {
            setupTool('action_text', TextTool, canvas, events);
            toolbar.addTool(CONST.TOOL.TEXT);
        }
        if (!hasToolsDef || tools.indexOf('hline') >= 0) {
            setupTool('action_hline', HorizontalLineTool, canvas, events,document.getElementById('action_hline') );
            toolbar.addTool(CONST.TOOL.HLINE);
        }
        if (!hasToolsDef || tools.indexOf('arrow') >= 0) {
            setupTool('action_arrow', ArrowTool, canvas, events);
            toolbar.addTool(CONST.TOOL.ARROW);
        }
        if (!hasToolsDef || tools.indexOf('remove') >= 0) {
            setupTool('action_remove', RemoveTool, canvas, events);
            toolbar.addTool(CONST.TOOL.REMOVE);
        }
        if (!hasToolsDef || tools.indexOf('dump') >= 0) {
            setupTool('action_dump', DumpTool, canvas, events);
            toolbar.addTool(CONST.TOOL.DUMP);
        }
        toolbar.initTools();
        var onSelect = function() {
            events.notify('canvas-selection', 'canvas', c.getActiveObject() ? 'selected' : 'cleared');
        };
        c.on('object:selected', onSelect).on('selection:cleared', onSelect);
        
        
        imgElement.parentNode.removeChild(imgElement);

    }
}

new Browser().appendToWindow('RechartJs', RechartJs);

export default RechartJs;