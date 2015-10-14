import CONST from '../canvas-const.js';

const BUTTON_CLASS = 'redraw_btn';
function addClasses(btnObj, classes) {
    if (!classes) return;
    var allClasses = classes.split(' ');

    allClasses.forEach((clazz) => {btnObj.classList.add(clazz);})
}

export default class ControlsDispatcher {
    constructor(eventAggregator, options) {
        this.toolsInUse = {};
        var activeTool, delBtn;

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


        eventAggregator.subscribeTo('canvas-selection', 'toolbar',
            function(subscriptionId, sender, status) {
                delBtn.className = status === 'selected' ? '' : 'inactive';
            });

        var manageKeys = function(e) {
            if (e.keyCode === 46 || e.keyCode === 27) {

                eventAggregator.notify('keydown', 'toolbar', e.keyCode);
            }
        };

        window.addEventListener('keydown', manageKeys, false);

        this.setupTools = function(tools, domParent, mainOptions) {
            var container = document.createElement('div');

            addClasses(container, CONST.CSS.TOOLBAR);
            addClasses(container, options.toolbarCss);

            if (mainOptions.toolbarFirst === true) {
                domParent.insertBefore(container, domParent.firstChild)
            } else {
                domParent.appendChild(container);
            }

            for (var toolName in tools) {
                var btn = document.createElement('button');
                btn.textContent = tools[toolName].options.label;

                btn.classList.add(CONST.CSS.BUTTON);

                addClasses(btn, mainOptions.buttonCss);
                addClasses(btn, tools[toolName].options.buttonCss);

                btn.onclick = notifyActive(tools[toolName].address);
                this.toolsInUse[tools[toolName].address] = btn;
                container.appendChild(btn);
            }

            var btnActiveCss = mainOptions.buttonActiveCss || CONST.CSS.ACTIVE_BUTTON;

            eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar',
                function(subscriptionId, sender, status) {
                    var currTool = this.toolsInUse[sender];

                    if (status !== 'active') {
                        if (sender === activeTool) {
                            activeTool = undefined;
                        }
                        currTool.classList.remove(btnActiveCss);
                    } else {
                        currTool.classList.add(btnActiveCss);
                    }
                }, this);

        };
    }
}
