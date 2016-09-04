# Redraw
Redraw is a JavaScript library which provides basic image annotation tools in your browser.

![Imgur](http://i.imgur.com/2mkbrJU.png)

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
  buttonCss: 'my-btn',
  activeButtonCss: 'my-active-btn'
  toolbarCss: 'my-toolbar',

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
##### buttonCss

Type: `string` (optional)

Adds css attribute to the toolbar button elements.
Default button class is *redraw_btn*. Additional classes specified by buttonCss will not replace it.

##### activeButtonCss

Type: `string` (optional)

Default: `active`

Adds css attribute to the active toolbar button elements, i.e. while the tool is active.
Default button class is *active*. Classes specified by activeButtonCss *will* replace it.

##### maxHeight

Type: `number` pixels (optional)

Makes sure that the annotated image does not exceed this number of pixels in height.
Useful for applying scaling to large images.

##### maxWidth

Type: `number` pixels (optional)

Makes sure that the annotated image does not exceed this number of pixels in width.
Useful for applying scaling to large images.

##### toolbarCss

Type: `string` (optional)

Appends css attribute to the toolbar div element.
Useful for applying custom styles.

##### toolbarFirst

Type: `boolean` (optional)

Default: `false`

Appends the toolbar div element, before the canvas element.
Useful to ease the style setup, if the toolbar should be ontop.

##### toolbarFirst

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

##### color
Type: `string` (optional)

Default: `#33e`

Sets the color of the element in canvas, but only before it is defined, no color is applied once complete.

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

##### color
Type: `string` (optional)

Default: `#33e`

Sets the color of the rectangle element in canvas.

##### label

Type: `string` (optional)

Default: `Rectangle`

Sets the value of the button element, i.e. the text of the button.

#### reset

The tools clears all elements of the canvas (except the annotated image itself).

##### label
Type: `string` (optional)

Default: `Reset`

Sets the value of the button element, i.e. the text of the button.

#### text

The tools that adds a text-box to the canvas.

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

## License

Coded with :heart: by Björn Svanmo and published under the [MIT License](http://opensource.org/licenses/MIT).
