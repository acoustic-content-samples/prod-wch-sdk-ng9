# AcNgRenditionModule

Module that allows to attach inline edit functionality to a [WCH](https://www.npmjs.com/package/acoustic-content-sdk-ng) based [Angular](https://angular.io/) application.

## Usage

Install the module

```bash
npm install --save acoustic-content-sdk-ng-edit
```

Import the module into your application. Use the environment variable to configure the module, this is the same configuration as for the main `AcNgModule` module.

```typescript
import {AcNgEditModule} from 'acoustic-content-sdk-ng-edit';

...

@NgModule({
  ...
  imports: [
    AcNgEditModule.forRoot(environment)
    ...
  ]

```

Annotate your editable components. Pass the selector to the text field as parameter to the directive.

```html
<div wchEditable='elements.myText'>{{renderingContext.elements.myText.value}}</div>
```

## Dependencies

The modules assumes an implementation of the `WchInlineEditService`. This service must be injected into the main module.