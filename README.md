# Redraw
Redraw is a JavaScript library which provides basic image annotation tools in your browser.

![Imgur](http://i.imgur.com/2mkbrJU.png)

## Resources

- Documentation:
- Source: [github.com/chartpen/redraw](https://github.com/chartpen/redraw)
- Bugs: [github.com/chartpen/redraw/issues](https://github.com/chartpen/redraw/issues)
- Help & Discussion:

[Imgur](http://i.imgur.com/2mkbrJU.png)

## Quick start

Simply download and include:

```html
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
* 'horizontal_line',
* 'pixelate',
* 'rectangle',
* 'reset',
* 'text'

##### toolSettings

Type: `Object` (optional)

See tools description


## License

Coded with :heart: by Björn Swanmo and published under the [MIT License](http://opensource.org/licenses/MIT).
