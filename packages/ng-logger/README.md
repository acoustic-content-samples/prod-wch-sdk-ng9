## Usage

Install via npm

```bash
npm install --save @ibm-wch-sdk/ng-logger
```

Add to your application module:

```typescript
import { WchNgLoggingModule } from '@ibm-wch-sdk/ng-logger

@NgModule({
  imports: [
    WchNgLoggingModule.forRoot(),
  ]
})
```

## Configuration

You can enable logging for certain logging levels or modules by either providing a config object to the module, setting variables on [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage) or by setting a [cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies). Both approaches use the same keys and expect string array serialized in [JSON format](https://www.json.org/) as a value.

### Modules

Use `Ng2LoggerFactory.onlyModules` as the key. The value array lists names of the modules or a regular expression string matching the modules. See the documentation for [ng2-logger](https://www.npmjs.com/package/ng2-logger) for more details.

### Levels

Use `Ng2LoggerFactory.onlyLevel` as the key. The value array lists the logging levels, e.g `DATA`, `INFO`, `WARN` or `ERROR`. See the documentation for [ng2-logger](https://www.npmjs.com/package/ng2-logger) for more details.

### Example

Enable logging just for the `AbstractNavigationComponent` via the local storage. In the console of your browser type:

```javascript
localStorage.setItem(
  'Ng2LoggerFactory.onlyModules',
  JSON.stringify(['AbstractNavigationComponent'])
);
```