[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/ng-web-component.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/ng-web-component)

Implementation of an Angular Component that can dynamically inject [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) for layouts.

This allows you to add application components without having to recompile the application. Components can be registered with Acoustic Content using regular layout definitions and [wchtools](https://www.npmjs.com/package/wchtools-cli).

## Table of Contents

- [API Documentation](./markdown/ng-web-component.md)

## Adding a WebComponents based Layout Component

In order to include an application component using web components you need to provide the following artifacts:

- a content type
- a layout
- a layout mapping
- a web component

### Content Type, Layout and Layout Mapping

Follow the instructions for [adding handlebars based layouts](https://github.com/acoustic-content-samples/sample-handlebars-server-render) to Acoustic content. The result is a content type, a layout and a layout mapping.

### Web Component

Create a JS file with your web component in [CommonJS](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/) module format. The simplest form would be:

```javascript
class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<div>Works!</div>`;
  }
}

module.exports = { MyComponent };
```

Make this file available on a web server, e.g. by pushing it to your tenant. Say the file is then available via `https://my-server/my-component.js`

**Note**: for a real-world application I recommend to use [webpack](https://webpack.js.org/) to bundle your component.

### Reference you Component from the Layout

In the first step you have created a layout descriptor file. Add the `tags` member and reference your component from a tag using the syntax `bundle:{$URL}#{$COMPONENT}`:

```json
{
  "tags": ["bundle:https://my-server/my-component.js#MyComponent"]
}
```

This syntax allows you to package multiple layout components in one file.

[Push](https://www.npmjs.com/package/wchtools-cli) your changed layout to your tenant.

**Note:** The URL may be absolute or relative. If absolute it can point to any server location. If relative it is resolved relative to the resource base URL for the tenant. This allows you to simply upload your scripts as unmanaged assets to your tenant.

