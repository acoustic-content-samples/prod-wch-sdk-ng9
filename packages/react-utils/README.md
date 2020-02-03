[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/react-api.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/react-api)

## Documentation

[API Documentation](./markdown/react-api.md)

## Code Splitting

Support for `ReactModule`s for React components that implement transparent lazy loading, e.g. using [ES6 code splitting](https://webpack.js.org/guides/code-splitting/).

Use the `createLazyComponent` method to convert an asynchronous component creation function (e.g. via lazy loading) into a synchronous creation function. The component created by the synchronous function will be available immediately but it will only load the one from the asynchronous callback when actually being rendered.

This approach can e.g. be used to provide a lazy loaded component module in a way that the consumer of the module does not see a difference between lazy loading vs eager loading. The decision to use lazy loading/code splitting lies therefore in the scope of the module provider not the module consumer.

### Example

`component.ts`:

Constructor function for a [React](https://reactjs.org/docs/react-component.html) component:

```typescript
export const createMyComponent([store]: [ReduxStore], [logSvc?]: [LoggerService]): ReactComponent<SomeState> => ...
```

`lazy.component.ts`:

A creation function of a component with the identical interface but lazy loaded via code splitting can be created like so:

```typescript
export const createMyLazyComponent = createLazyComponent(
  defer(() => import('./component')).pipe(pluck('createMyComponent'))
);
```

Note that both `createMyComponent` and `createMyLazyComponent` share the identical interface, the can both be used to define a `ReactModule` for same component. This lets the application decide to use lazy loading when applicable, without any code changes for either the provider not the consumer of the component.
