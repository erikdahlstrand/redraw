import CONST from './canvas-const.js';

 /**
 * Gets the scroll position of a dom element.
 * @access private
 * @param {Object} elem - target element.
 */
function scrollPosition(elem) {
    var left = 0,
        top = 0;

    do {
        left += elem.scrollLeft;
        top += elem.scrollTop;
    } while (elem = elem.offsetParent);

    return [left, top];
}

/**
 * Canvas object that facilitates 
 */
export default class Canvas {
     /**
     * Tools contructor. Is provided with canvas-wrapper and eventAggregator by contract.
     * @constructor
     * @param {Object} imgElement - dom element that will be replaced and
     * used as background for canvas.
     * @param {EventAggregator} eventAggregator - Event mediator.
     * @param {Object} options - parameters used to setup looks and all tools preferences.
     */
    constructor(imgElement, eventAggregator, options) {
        this.options = options;
        this.eventAggregator = eventAggregator;
        var parent = imgElement.parentNode;
        var canvasWrapper = document.createElement("div");
        canvasWrapper.className = CONST.CSS.PARENT;
        this.scale = 1;
        parent.insertBefore(canvasWrapper, imgElement);
        parent.removeChild(imgElement);

        var canvasElem = document.createElement("canvas");
        canvasWrapper.appendChild(canvasElem);

        this.canvasElem = canvasElem;

        this.canvasContainer = canvasWrapper;
        this.canvasLeft = canvasElem.offsetLeft;
        this.canvas = new fabric.Canvas(canvasElem);
        this.imgElement = imgElement;

        /* wait until the image is surely loaded to make the setup */
        let theCanvas = this;
        let delayedSetup = function () {
            console.log('construction');
            theCanvas.setupImage();
        };
        var tmp = new Image();
        tmp.addEventListener('load', delayedSetup, false);
        tmp.src = this.imgElement.src;
    }

    setupImage() {
        console.log('setupImage alpha, this.imgElement', this.imgElement);
        this.image = new fabric.Image(this.imgElement);
        console.log('setupImage bravo, this.image', this.image);
        if (this.options.maxWidth && this.options.maxWidth < this.image.width) {
            this.scale = this.options.maxWidth / this.image.width;
        }
        if (this.options.maxHeight && this.options.maxHeight < this.image.height) {
            let scaleY = this.options.maxHeight / this.image.height;
            if (this.scale > scaleY) {
                this.scale = scaleY;
            }
        }

        this.width = this.scale * this.imgElement.width;
        this.height = this.scale * this.imgElement.height;
        console.log('setupImage charlie', this);

        this.canvas.setDimensions({
            width: this.width,
            height: this.height
        });

        this.image.setScaleX(this.scale);
        this.image.setScaleY(this.scale);
        var event = this.eventAggregator;
        console.log('setupImage delta');
        function getBinder(_canvas) {
            return function(){
                console.log('setupImage echo');
                _canvas.renderAll();
                event.notify('canvas-loaded', 'CANVAS');
                console.log('setupImage foxtrot');
            };
        }
        this.canvas.setBackgroundImage(this.image, getBinder(this.canvas), {});

        if (this.options.maxWidth && this.options.maxWidth < this.image.width) {
            this.scale = this.options.maxWidth / this.image.width;
        }
        if (this.options.maxHeight && this.options.maxHeight < this.image.height) {
            let scaleY = this.options.maxHeight / this.image.height;
            if (this.scale > scaleY) {
                this.scale = scaleY;
            }
        }
        console.log('setupImage golf');
        this.eventAggregator.subscribeTo('TOOL_USAGE', 'toolbar',
            function(subscriptionId, sender, status) {
                if (status === 'active') {
                    this.canvas.defaultCursor='crosshair';
                } else {
                    this.canvas.defaultCursor='default';
                }
            }, this);
    }

    /**
     * Gets the top position of the canvas dom element.
     * @access public
     * @returns {number} position in pixels?
     */
    getCanvasTop() {
        return this.canvasContainer.offsetTop;
    }

    /**
     * Gets the array of all objects of the canvas.
     * @access public
     * @returns {Array} with canvas object, or undefined if empty.
     */
    getAllObjects() {
        return this.canvas.getObjects();
    }

    /**
     * Set/unset whether or not it is possible to select objects of the canvas.
     * @access pulic
     * @param {boolean} isEnabled - true if selection is enabled, false otherwise.
     */
    enableSelection(isEnabled) {
        this.canvas.selection = isEnabled; // Restore fabricjs selection-box
        this.canvas.forEachObject(function(o) {
            o.selectable = isEnabled;
        });
    }
}
