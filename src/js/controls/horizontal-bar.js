import CONST from '../canvas-const.js';
const tools = [
    {id: 'action_box', content:'<i class="fa fa-square-o"></i>', address: CONST.TOOL.BOX},
    {id: 'action_arrow', content:'<i class="fa fa-long-arrow-right"></i>', address: CONST.TOOL.ARROW},
    {id: 'action_hline', content:'<i class="fa fa-minus-square-o"></i>', address: CONST.TOOL.HLINE},
    {id: 'action_text', content:'<i class="fa fa-font"></i>', address: CONST.TOOL.TEXT},
    {id: 'action_remove', content:'<i class="fa fa-trash-o"></i>', address: CONST.TOOL.REMOVE},
    {id: 'action_clear', content:'<i class="fa fa-bar-chart"></i>', address: CONST.TOOL.CLEAR},
    {id: 'action_dump', content:'<i class="fa fa-floppy-o"></i>', address: CONST.TOOL.DUMP}
];


export default class HorizontalBar {
    constructor(idPrefix, eventAggregator, rootNode) {
        var activeTool;
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
        var div = document.createElement('div');
        div.id='toolbar';

        rootNode.insertBefore(div, rootNode.childNodes[0]);

        var ul = document.createElement('ul');
        div.appendChild(ul);
        var delBtn;
        for (var i in tools) {
            var t = document.createElement('li');
            t.id = idPrefix + tools[i].id;
            t.innerHTML = tools[i].content;
            t.onclick = notifyActive(tools[i].address);
            toolsInUse[tools[i].address] = t;
            ul.appendChild(t);
            if (CONST.TOOL.REMOVE === tools[i].address) {
                delBtn = t;
            }
        }

        eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar', function(subscriptionId, sender, status) {
            console.log(eventAggregator.id, 'BAR TOOL_USAGE', subscriptionId, sender, status);
            var currTool = toolsInUse[sender];
            console.log(sender, '->', toolsInUse);

            if (status !== 'active') {
                if(sender === activeTool) {
                    activeTool = undefined;
                }
                currTool.className = '';
            } else {
                currTool.className = 'active';
            }
        });

        eventAggregator.subscribeTo('canvas-selection', 'toolbar', function(subscriptionId, sender, status) {
            console.log(eventAggregator.id, 'BAR canvas-selection', subscriptionId, sender, status);
            delBtn.className = status === 'selected' ? '' : 'inactive';
        });


        var manageKeys = function(e) {
            if (e.keyCode === 46 || e.keyCode === 27) {
                
                eventAggregator.notify('keydown', 'toolbar', e.keyCode);
            }
        };
        window.addEventListener('keydown', manageKeys, false);

    }
}
