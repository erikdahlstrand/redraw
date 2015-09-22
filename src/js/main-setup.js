import CONST from './canvas-const.js';
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

class Main {

    constructor(domId, imgElement, options) {
        var events = new EventAggregator(domId);
        
        var imgInstance = new fabric.Image(imgElement, {
          left: 0,
          top: 0
        });

        this.canvas = new Canvas(domId, imgInstance);

        var c = this.canvas.canvas;
        var tools = (options && options.tools) ? options.tools : [];
        var toolbar = new HorizontalBar(domId, events, document.getElementById(domId));

        var hasToolsDef = !!options && !!options.tools;

        if (!hasToolsDef || tools.indexOf('rectangle') >= 0) {
            setupTool('action_box', BoxTool, this.canvas, events);
            toolbar.addTool(CONST.TOOL.BOX);
        }
        if (!hasToolsDef || tools.indexOf('reset') >= 0) {
            setupTool('action_clear', ResetTool, this.canvas, events);
            toolbar.addTool(CONST.TOOL.CLEAR);
        }
        if (!hasToolsDef || tools.indexOf('text') >= 0) {
            setupTool('action_text', TextTool, this.canvas, events);
            toolbar.addTool(CONST.TOOL.TEXT);
        }
        if (!hasToolsDef || tools.indexOf('hline') >= 0) {
            setupTool('action_hline', HorizontalLineTool, this.canvas, events,document.getElementById('action_hline') );
            toolbar.addTool(CONST.TOOL.HLINE);
        }
        if (!hasToolsDef || tools.indexOf('arrow') >= 0) {
            setupTool('action_arrow', ArrowTool, this.canvas, events);
            toolbar.addTool(CONST.TOOL.ARROW);
        }
        if (!hasToolsDef || tools.indexOf('remove') >= 0) {
            setupTool('action_remove', RemoveTool, this.canvas, events);
            toolbar.addTool(CONST.TOOL.REMOVE);
        }

        toolbar.initTools();
        var onSelect = function() {
            events.notify('canvas-selection', 'canvas', c.getActiveObject() ? 'selected' : 'cleared');
        };
        c.on('object:selected', onSelect).on('selection:cleared', onSelect);

        imgElement.parentNode.removeChild(imgElement);
    }

    getImage () {
        return this.canvas.canvas.toDataURL('png');
    }

    getDeflated () {
        return JSON.stringify(this.canvas.canvas);
    }

    getEditedJson () {
        return this.getDeflated();
    }
}



export default Main;