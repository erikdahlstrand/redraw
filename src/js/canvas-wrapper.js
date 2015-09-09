var CANVAS_WIDTH = 582; 
var CANVAS_HEIGHT = 345;
var functionRepository = {}, serviceRepository = {};

function scrollPosition(elem) {
    var left = 0,
        top = 0;

    do {
        left += elem.scrollLeft;
        top += elem.scrollTop;
    } while ( elem = elem.offsetParent );

    return [ left, top ];
}

class Canvas {
    constructor(domId, imagePath) {
		var canvasElem = document.createElement("canvas");
		var innerDiv = document.createElement("div");

		var canvasWrapper = document.getElementById(domId);

		canvasWrapper.appendChild(innerDiv);
		innerDiv.appendChild(canvasElem);
		this.setCanvasProps(canvasElem, canvasWrapper, innerDiv, imagePath);
    }

	setCanvasProps(_canvasElem, overallWrapper, canvasContainer, _imagePath) {
		
		this.canvasElem = _canvasElem;
		
		this.overallWrapper = overallWrapper;
		this.canvasTop = this.canvasElem.offsetTop;
		this.canvasContainer = canvasContainer;

		this.canvasLeft = _canvasElem.offsetLeft;

		this.imagePath = _imagePath;

		this.canvas = this.initFabricjsCanvas(this.canvasElem);		
	}

	getCanvasTop() {
		return this.canvasContainer.offsetTop;
	}

	initFabricjsCanvas(canvasElem) {
		var fabricCanvas = new fabric.Canvas(canvasElem);

		fabricCanvas.setDimensions({width:CANVAS_WIDTH, height:CANVAS_HEIGHT});

		fabricCanvas.setBackgroundImage(this.imagePath, fabricCanvas.renderAll.bind(fabricCanvas), {
		  width: fabricCanvas.width,
		  height: fabricCanvas.height,
		  // Needed to position backgroundImage at 0/0
		  originX: 'left',
		  originY: 'top'
		});
		return fabricCanvas;
	}
	enableSelection(isEnabled) {
		this.canvas.selection = isEnabled; // Restore fabricjs selection-box
        this.canvas.forEachObject(function(o) {
          o.selectable = isEnabled;
        });
	}
	getWidth() {
		return CANVAS_WIDTH;
	}
	getOffsetLeft() {
		return this.canvasLeft  - scrollPosition(this.canvasElem)[0];
	}
	getOffsetTop() {
		return this.getCanvasTop() - scrollPosition(this.canvasElem)[1];
	}
}

export default Canvas;