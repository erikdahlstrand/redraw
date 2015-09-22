
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
    constructor(imgElement) {
		var parent = imgElement.parentNode;
		var canvasWrapper = document.createElement("div");

		parent.insertBefore(canvasWrapper, imgElement);
		parent.removeChild(imgElement);

		
		var canvasElem = document.createElement("canvas");
		canvasWrapper.appendChild(canvasElem);

		this.setCanvasProps(canvasElem, canvasWrapper, imgElement);

		this.canvas = this.initFabricjsCanvas(canvasElem, imgElement);
    }

	setCanvasProps(_canvasElem, canvasWrapper, imgElement) {
		this.canvasElem = _canvasElem;

		this.width = imgElement.width;
		this.height = imgElement.height;

		this.canvasTop = this.canvasElem.offsetTop;
		this.canvasContainer = canvasWrapper;

		this.canvasLeft = _canvasElem.offsetLeft;
	}

	getCanvasTop() {
		return this.canvasContainer.offsetTop;
	}

	initFabricjsCanvas(canvasElem, imgElement) {		
		var fabricCanvas = new fabric.Canvas(canvasElem);

		fabricCanvas.setDimensions({width:this.width, height:this.height});

		var image = new fabric.Image(imgElement);
		fabricCanvas.setBackgroundImage(image,fabricCanvas.renderAll.bind(fabricCanvas), {
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