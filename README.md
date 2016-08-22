# Redraw
Redraw is a JavaScript library which provides basic image annotation tools in your browser.

## Resources

- Documentation:
- Source: [github.com/chartpen/redraw](https://github.com/chartpen/redraw)
- Bugs: [github.com/chartpen/redraw/issues](https://github.com/chartpen/redraw/issues)
- Help & Discussion:

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
## License

Coded with :heart: by Björn Swanmo and published under the [MIT License](http://opensource.org/licenses/MIT).
