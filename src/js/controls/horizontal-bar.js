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

function findTool(_address) {
    for (var i in tools) {
        if (tools[i].address === _address) {
            return tools[i];
        }
    }
}

export default class HorizontalBar {
    constructor(eventAggregator, rootNode) {
        var activeTool;
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
        for (var i in tools) {
            var t = document.createElement('li');
            t.id = tools[i].id;
            t.innerHTML = tools[i].content;
            t.onclick = notifyActive(tools[i].address);

            ul.appendChild(t);
        }

        eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar', function(subscriptionId, sender, status) {
            var currTool = findTool(sender);

            if (status !== 'active') {
                if(sender === activeTool) {
                    activeTool = undefined;
                }
                document.getElementById(currTool.id).className = '';
            } else {
                document.getElementById(currTool.id).className = 'active';
            }
        });

        document.onkeydown = function(e) {
            if (e.keyCode === 46 || e.keyCode === 27) {
                eventAggregator.notify('keydown', 'toolbar', e.keyCode);
            }
        };
    }
}
