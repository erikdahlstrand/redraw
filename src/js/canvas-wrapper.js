
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
    constructor(imgElement, options) {
		var parent = imgElement.parentNode;
		var canvasWrapper = document.createElement("div");
		this.scale = 1;
		parent.insertBefore(canvasWrapper, imgElement);
		parent.removeChild(imgElement);

		
		var canvasElem = document.createElement("canvas");
		canvasWrapper.appendChild(canvasElem);

		

		this.canvasElem = canvasElem;
		

		this.canvasContainer = canvasWrapper;
		this.canvasLeft = canvasElem.offsetLeft;

		this.canvasLeft = canvasElem.offsetLeft;


		this.image = new fabric.Image(imgElement);
		console.log('scaler', options.maxWidth, this.image.width);
    	if (options.maxWidth && options.maxWidth < this.image.width) {
	      this.scale =  options.maxWidth / this.image.width;
	    }
	    if (options.maxHeight && options.maxHeight < this.image.height) {
	    	let scaleY = options.maxHeight / this.image.height;
	    	if (this.scale > scaleY) {
	    		this.scale = scaleY;
	    	}
	    }
	    console.log('calculating scale', this.scale, options);
	    this.width = this.scale * imgElement.width;
		this.height = this.scale * imgElement.height;
	    // this.canvas = this.initFabricjsCanvas(canvasElem, imgElement);

		this.canvas = new fabric.Canvas(canvasElem);
		//canvas.setHeight(500);
		this.canvas.setWidth(200);

		this.canvas.setDimensions({width:this.width, height:this.height});

		console.log('using scale', this.scale);
		this.image.setScaleX(this.scale);
    	this.image.setScaleY(this.scale);

		this.canvas.setBackgroundImage(this.image,this.canvas.renderAll.bind(this.canvas), {		    
		});
    }

    	if (options.maxWidth && options.maxWidth < this.image.width) {
	      this.scale =  options.maxWidth / this.image.width;
	    }
	    if (options.maxHeight && options.maxHeight < this.image.height) {
	    	let scaleY = options.maxHeight / this.image.height;
	    	if (this.scale > scaleY) {
	    		this.scale = scaleY;
	    	}
	    }
	    this.width = this.scale * imgElement.width;
		this.height = this.scale * imgElement.height;

	initFabricjsCanvas(canvasElem, imgElement) {		
		var fabricCanvas = new fabric.Canvas(canvasElem);
		//canvas.setHeight(500);
		fabricCanvas.setWidth(200);

		this.image.setScaleX(this.scale);
    	this.image.setScaleY(this.scale);

		this.image = new fabric.Image(imgElement);

		console.log('using scale', this.scale);
		this.image.setScaleX(this.scale);
    	this.image.setScaleY(this.scale);

		fabricCanvas.setBackgroundImage(this.image,fabricCanvas.renderAll.bind(fabricCanvas), {
		    
		});
    }

	getCanvasTop() {
		return this.canvasContainer.offsetTop;
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

