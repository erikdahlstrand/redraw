import CONST from '../canvas-const.js';

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

        eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar', function(subscriptionId, sender, status) {
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
            var div = document.createElement('div');
            div.id='toolbar';
            domParent.appendChild(div);

            var ul = document.createElement('ul');
            div.appendChild(ul);

            for (var toolName in tools) {
                var t = document.createElement('li');
                t.innerHTML = tools[toolName].options.label; // ???
                t.onclick = notifyActive(tools[toolName].address);
                toolsInUse[tools[toolName].address] = t;
                ul.appendChild(t);
            }
        };
    }
}
