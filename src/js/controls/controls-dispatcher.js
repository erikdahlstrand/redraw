import CONST from '../canvas-const.js';

const BUTTON_CLASS = 'redraw_btn';
export default class ControlsDispatcher {
    constructor(eventAggregator) {

        var activeTool, delBtn;
        var toolsInUse = {};
        function notifyActive(topic) {
            return function() {
                if (activeTool) {
                    eventAggregator.notify(activeTool, 'toolbar', 'toolbar-deactivate');    
                }
                if (activeTool !== topic) {
                    activeTool = topic;
                    eventAggregator.notify(topic, 'toolbar', 'toolbar-click');
                } else {
                    activeTool = undefined;
                }
            };
        }

        eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar',
            function(subscriptionId, sender, status) {
            //    console.log('x', subscriptionId, sender, status)
            // var currTool = toolsInUse[sender];

            // if (status !== 'active') {
            //     if(sender === activeTool) {
            //         activeTool = undefined;
            //     }
            //     currTool.className = '';
            // } else {
            //     currTool.className = 'active';
            // }
        });

        eventAggregator.subscribeTo('canvas-selection', 'toolbar', function(subscriptionId, sender, status) {

            delBtn.className = status === 'selected' ? '' : 'inactive';
        });

        var manageKeys = function(e) {
            if (e.keyCode === 46 || e.keyCode === 27) {
                
                eventAggregator.notify('keydown', 'toolbar', e.keyCode);
            }
        };

        window.addEventListener('keydown', manageKeys, false);

        this.setupTools = function(tools, domParent) {
            var container = document.createElement('div');
            container.className='redraw_toolbar';
            domParent.appendChild(container);

            for (var toolName in tools) {
                var btn = document.createElement('button');
                btn.textContent = tools[toolName].options.label;
                btn.classList.add(BUTTON_CLASS);
                if (tools[toolName].options.className) {
                    btn.classList.add(tools[toolName].options.className);
                }
                btn.onclick = notifyActive(tools[toolName].address);
                toolsInUse[tools[toolName].address] = btn;
                container.appendChild(btn);
            }
        };
    }
}
