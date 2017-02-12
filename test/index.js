var context = require.context('../src/js/', true, /-test\.js$/);
context.keys().forEach(context);
