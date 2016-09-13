import CONST from '../canvas-const.js';

/**
 * Adds a class to the array of classes.
 * @private
 */
function addClasses(btnObj, classes) {
  if (!classes) return;
  var allClasses = classes.split(' ');

  allClasses.forEach((clazz) => {
    btnObj.classList.add(clazz);
  });
}

/**
 * Main manager for the toolbar.
 */
export default class ControlsDispatcher {
  /**
   * Controls contructor. Is provided with canvas-wrapper and options to initialize to toolbar.
   * @constructor
   * @param {EventAggregator} eventAggregator - Event mediator.
   * @param {Object} options - from user.
   */
  constructor(eventAggregator, options) {
    this.toolsInUse = {};
    let activeTool;

    function notifyActive(topic) {
      return function () {
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

    this.cancelActiveTool = function () {

      if (activeTool) {
        eventAggregator.notify(activeTool, 'toolbar', 'toolbar-deactivate');
        activeTool = undefined;
      }
    };

    var manageKeys = function (e) {
      if (e.keyCode === 8 ||
          e.keyCode === 13 ||
          e.keyCode === 27 ||
          e.keyCode === 46) {
        eventAggregator.notify('keydown', 'toolbar', e.keyCode);
      }
    };

    window.addEventListener('keydown', manageKeys, false);

    this.setupTools = function (tools, domParent, mainOptions) {
      var container = document.createElement('div');

      addClasses(container, CONST.CSS.TOOLBAR);
      addClasses(container, options.toolbarClass);

      if (mainOptions.toolbarFirst === true) {
        domParent.insertBefore(container, domParent.firstChild);
      } else {
        domParent.appendChild(container);
      }

      for (var toolName in tools) {
        var btn = document.createElement('button');
        btn.innerHTML = tools[toolName].options.label;

        btn.classList.add(CONST.CSS.BUTTON);

        addClasses(btn, mainOptions.buttonClass);
        addClasses(btn, tools[toolName].options.buttonClass);

        btn.onclick = notifyActive(tools[toolName].address);
        this.toolsInUse[tools[toolName].address] = btn;
        container.appendChild(btn);
      }

      var btnActiveCss = mainOptions.buttonActiveClass || CONST.CSS.ACTIVE_BUTTON;
      var btnDisabledCss = mainOptions.buttonDisabledClass || CONST.CSS.DISABLED_BUTTON;

      eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar',
        function (subscriptionId, sender, status) {
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

      eventAggregator.subscribeTo('tool-enabled', 'toolbar',
        function (subscriptionId, sender, isEnabled) {
          if (isEnabled) {
            this.toolsInUse[sender].classList.remove(btnDisabledCss);
          } else {
            this.toolsInUse[sender].classList.add(btnDisabledCss);
          }
        }, this);
    };
  }
}

