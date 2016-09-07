# Redraw
Redraw is a JavaScript library which provides basic image annotation tools in your browser.

![Imgur](http://i.imgur.com/PLd9jZP.jpg)

## Resources

- Examples: [chartpen.github.io/redraw](http://chartpen.github.io/redraw)
- Source: [github.com/chartpen/redraw](https://github.com/chartpen/redraw)
- Bugs: [github.com/chartpen/redraw/issues](https://github.com/chartpen/redraw/issues)

## Quick start

Load Fabric.js (1.6+) and include Redraw:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.4/fabric.min.js" />
<script src="./redraw.min.js" />
```

Create a new Redraw object with a reference to the image element:

```html
<img src="demo-image.jpg" id="target" />

<script>
  var editor = new redraw.Annotation(document.getElementById('target'));
</script>
```

You can also pass options:

```javascript
var editor = new redraw.Annotation(document.getElementById('target'), {
  // Canvas size
  maxHeight: 500,
  maxWidth: 700

  // Classes to add
  buttonClass: 'my-btn',
  buttonActiveClass: 'my-active-btn'
  toolbarClass: 'my-toolbar',

  // Change DOM insertion order
  toolbarFirst: true,

  // Tools to show
  tools: ['arrow', 'text', 'rectangle', 'pixelate', 'delete'],

  // Tool settings
  toolSettings: {
    rectangle: {
      label: 'Box',
    },
    pixelate: {
      label: '<i class="icons">blur</i>',
      blocksize: 4
    }
  }
});
```

## API

### redraw.Annotation
#### options

##### buttonClass

Type: `string` (optional)

Adds class attribute to the toolbar button elements.
Default button class is *redraw-btn*. Additional classes specified by buttonCss will not replace it.

##### buttonActiveClass

Type: `string` (optional)

Default: `active`

Adds class attribute to the active toolbar button elements, i.e. while the tool is active.
Default button class is *active*. Classes specified by buttonActiveClass *will* replace it.

##### buttonDisabledClass

Type: `string` (optional)

Default: `disabled`

Adds class attribute to a disabled toolbar button element, e.g. delete-button when there is nothing to delete.
Default button class is *disabled*. Classes specified by buttonDisabledClass *will* replace it.

##### maxHeight

Type: `number` pixels (optional)

Makes sure that the annotated image does not exceed this number of pixels in height.
Useful for applying scaling to large images.

##### maxWidth

Type: `number` pixels (optional)

Makes sure that the annotated image does not exceed this number of pixels in width.
Useful for applying scaling to large images.

##### toolbarClass

Type: `string` (optional)

Appends class attribute to the toolbar div element.
Useful for applying custom styles.

##### toolbarFirst

Type: `boolean` (optional)

Default: `false`

Appends the toolbar div element, before the canvas element.
Useful to ease the style setup, if the toolbar should be ontop.

##### tools

Type: `Array` (optional)

Specifies enabled tools. If omitted all registered tools will be enabled.
Valid string values
* 'arrow'
* 'delete',
* 'horizontalLine',
* 'pixelate',
* 'rectangle',
* 'reset',
* 'text'

##### toolSettings

Type: `Object` (optional)

See toolSettings description

Example:
```javascript
var editor = new redraw.Annotation(document.getElementById('target'), {

  // Tools to show
  tools: ['rectangle'],

  // Tool settings
  toolSettings: {
    rectangle: {
      label: 'Box',
      color: '#f00'
    }
  }
});
```

### toolSettings

#### arrow

The tools that draws an arrow.
##### activeColor

Type: `string` (optional)

Default: `#55f`

Sets the color of the element in canvas, before it is complete, i.e. while it is being dragged.

##### color
Type: `string` (optional)

Default: `#33e`

Sets the color of the element in canvas.

##### label

Type: `string` (optional)

Default: `Arrow`

Sets the value of the button element, i.e. the text of the button.

##### size

Type: `number` pixels (optional)

Default: `15`

Sets the length/width of the pointed end of the arrow.

##### lineWidth

Type: `number` pixels (optional)

Default: `4`

Sets the width of the line.

#### delete

The tools that allows for removal of canvas elements.

##### label
Type: `string` (optional)

Default: `Delete`

Sets the value of the button element, i.e. the text of the button.

#### horizontalLine

The tools that places horizontal lines.

##### activeColor
Type: `string` (optional)

Default: `#55f`

Sets the color of the element in canvas, before it is complete, i.e. while it is being dragged.

##### color
Type: `string` (optional)

Default: `#33e`

Sets the color of the element in canvas.

##### label
Type: `string` (optional)

Default: `Horizontal Line`

Sets the value of the button element, i.e. the text of the button.

#### pixelate

The tools that blurs image content, by applying a pixelate-filter.

##### activeColor
Type: `string` (optional)

Default: `#33e`

Sets the color of the element in canvas, but only before it is complete and the pixelate effect is applied.

##### activeOpacity
Type: `number` (optional)

Default: `0.3`

Sets the color of the marker element in canvas, before it is complete, i.e. while it is being dragged.

##### label
Type: `string` (optional)

Default: `Pixelate`

Sets the value of the button element, i.e. the text of the button.

##### blocksize
Type: `number` pixels (optional)

Default: `8`

Sets the size of the mozaic pattern.

#### rectangle

The tools that draw a rectangle.


##### activeColor
Type: `string` (optional)

Default: `#55f`

Sets the color of the element in canvas, before it is complete, i.e. while it is being dragged.

##### activeOpacity
Type: `number` (optional)

Default: `0.3`

Sets the opacity of the element in canvas, before it is complete, i.e. while it is being dragged.

##### color

Type: `string` (optional)

Default: `#33e`

Sets the color of the rectangle element in canvas.

##### label

Type: `string` (optional)

Default: `Rectangle`

Sets the value of the button element, i.e. the text of the button.

##### opacity

Type: `number` (optional)

Default: `0.5`

Sets the opacity (transparancy) of the element in canvas.

#### reset

The tools clears all elements of the canvas (except the annotated image itself).

##### label
Type: `string` (optional)

Default: `Reset`

Sets the value of the button element, i.e. the text of the button.

#### text

The tools that adds a text-box to the canvas.

##### activeColor
Type: `string` (optional)

Default: `#55f`

Sets the color of the element in canvas, while it's being dragged.

##### label
Type: `string` (optional)

Default: `Reset`

Sets the value of the button element, i.e. the text of the button.

##### color
Type: `string` (optional)

Default: `#33e`

Sets the color of the element in canvas.

##### fontFamily
Type: `string` (optional)

Default: `arial`

Sets the font of the text-box element in canvas.

##### fontSize
Type: `number` pixels (optional)

Default: `18`

Sets the font size of the text-box element in canvas.

## Style

There is no styling included in redraw by default, but css-classes are applied.

### CSS

#### redraw-btn

This class attribute is applied to buttons of the toolbar, if not overridden by option `buttonClass`.

#### redraw-parent

This class attribute is applied to the top level div element, that wraps both canvas and toolbar.

#### redraw-toolbar

This class attribute is applied to the div element, wrapping the toolbar buttons.

#### redraw-canvas

This class attribute is applied to the div element, wrapping the canvas.

## License

Coded with :heart: by Björn Svanmo and published under the [MIT License](http://opensource.org/licenses/MIT).
