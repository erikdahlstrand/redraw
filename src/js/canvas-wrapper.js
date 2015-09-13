
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
    constructor(domId, imgElement) {
		var canvasElem = document.createElement("canvas");
		var innerDiv = document.createElement("div");

		var canvasWrapper = document.getElementById(domId);

		canvasWrapper.appendChild(innerDiv);
		innerDiv.appendChild(canvasElem);
		this.setCanvasProps(canvasElem, canvasWrapper, innerDiv, imgElement);
    }

	setCanvasProps(_canvasElem, overallWrapper, canvasContainer, imgElement) {
		this.canvasElem = _canvasElem;

		this.width = imgElement.width;
		this.height = imgElement.height;

		this.overallWrapper = overallWrapper;
		this.canvasTop = this.canvasElem.offsetTop;
		this.canvasContainer = canvasContainer;

		this.canvasLeft = _canvasElem.offsetLeft;

		this.imageElement = imgElement;

		this.canvas = this.initFabricjsCanvas(this.canvasElem);		
	}

	getCanvasTop() {
		return this.canvasContainer.offsetTop;
	}

	initFabricjsCanvas(canvasElem) {
		var fabricCanvas = new fabric.Canvas(canvasElem);

		fabricCanvas.setDimensions({width:this.width, height:this.height});

		fabricCanvas.setBackgroundImage(this.imageElement,fabricCanvas.renderAll.bind(fabricCanvas), {
		    backgroundImageOpacity: 0.5,
		    backgroundImageStretch: false
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
		return this.width;
	}
	getOffsetLeft() {
		return this.canvasLeft  - scrollPosition(this.canvasElem)[0];
	}
	getOffsetTop() {
		return this.getCanvasTop() - scrollPosition(this.canvasElem)[1];
	}
}

export default Canvas;