[![npm](https://img.shields.io/npm/v/@acoustic-content-sdk/react-components.svg?style=flat-square)](https://www.npmjs.com/package/@acoustic-content-sdk/react-components)

Implementation of services and UI components for the [React](https://reactjs.org/) version of the SDK, that are agnostic about how the actual data is loaded.

## Define layout components

- Implement a React component that accepts the [ReactComponentProps](https://www.npmjs.com/package/@acoustic-content-sdk/react-api) as input
- Register this component using the [ComponentRegistry](https://www.npmjs.com/package/@acoustic-content-sdk/react-api) service

### How to access the `ComponentRegistry` service?

- Create a React component and use the provider of the[ACOUSTIC_CONTEXT_COMPONENT_REGISTRY](https://www.npmjs.com/package/@acoustic-content-sdk/react-api) context.

Example:

```tsx
export const LayoutsModule: FC = ({ children }) => (
  <ACOUSTIC_CONTEXT_COMPONENT_REGISTRY.Consumer>
    {(aReg) => {
      // do something sensible with the service

      // include the children
      return <>{children}</>;
    }}
  </ACOUSTIC_CONTEXT_COMPONENT_REGISTRY.Consumer>
);
```

[API Documentation](./markdown/react-components.md)
