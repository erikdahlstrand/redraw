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
     * @param {Object} options - parameters used to setup looks and all tools preferences.
     */
    constructor(imgElement, options) {

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


        this.image = new fabric.Image(imgElement);

        if (options.maxWidth && options.maxWidth < this.image.width) {
            this.scale = options.maxWidth / this.image.width;
        }
        if (options.maxHeight && options.maxHeight < this.image.height) {
            let scaleY = options.maxHeight / this.image.height;
            if (this.scale > scaleY) {
                this.scale = scaleY;
            }
        }

        this.width = this.scale * imgElement.width;
        this.height = this.scale * imgElement.height;

        this.canvas = new fabric.Canvas(canvasElem);

        this.canvas.setDimensions({
            width: this.width,
            height: this.height
        });


        this.image.setScaleX(this.scale);
        this.image.setScaleY(this.scale);

        this.canvas.setBackgroundImage(this.image, this.canvas.renderAll.bind(this.canvas), {});


        if (options.maxWidth && options.maxWidth < this.image.width) {
            this.scale = options.maxWidth / this.image.width;
        }
        if (options.maxHeight && options.maxHeight < this.image.height) {
            let scaleY = options.maxHeight / this.image.height;
            if (this.scale > scaleY) {
                this.scale = scaleY;
            }
        }
    }

    /**
     * Gets the top position of the canvas dom element.
     * @access pulic
     * @returns {number} position in pixels?
     */
    getCanvasTop() {
        return this.canvasContainer.offsetTop;
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
