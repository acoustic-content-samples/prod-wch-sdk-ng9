<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/react-utils](./react-utils.md)

## react-utils package

Collection of utility methods to efficiently create react components and modules.

## Classes

|  Class | Description |
|  --- | --- |
|  [AbstractRxComponent](./react-utils.abstractrxcomponent.md) | Base class for react components that compute their state via reactive streams. The life cycle methods are available via observables that fire at the appropriate time.<!-- -->In the constructor of the subclass call the [connectState](./react-utils.abstractrxcomponent.connectstate.md) with on observable that will compute the component state based on arbitrary information.<!-- -->Methods overridden: [componentDidMount](./react-utils.abstractrxcomponent.componentdidmount.md)<!-- -->, [componentWillUnmount](./react-utils.abstractrxcomponent.componentwillunmount.md)<!-- -->, [componentDidUpdate](./react-utils.abstractrxcomponent.componentdidupdate.md) |
|  [PureLoggingComponent](./react-utils.pureloggingcomponent.md) | Base class for pure components that log their lifecycle and that visualize property updates in development mode |

## Functions

|  Function | Description |
|  --- | --- |
|  [getReactElementName(aElement)](./react-utils.getreactelementname.md) | Returns the react element name from the node or null if the node is invalid |
|  [pureLoggingComponent(aName, aDelegate)](./react-utils.pureloggingcomponent.md) | Creates a higher order component for lifecycle logging purposes |
|  [rxComponent(aStateFct, aDelegate)](./react-utils.rxcomponent.md) |  |
|  [rxCreateReactRenderer(elementType, aDoc, aLogSvc, scheduler)](./react-utils.rxcreatereactrenderer.md) | Renderer that converts a markup string into a react DOM representation. The react representation might differ dependening on the content types |
|  [styleToReact(aStyle)](./react-utils.styletoreact.md) |  |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [PureLoggingComponentProps](./react-utils.pureloggingcomponentprops.md) |  |
|  [ValueObservable](./react-utils.valueobservable.md) | Extension of an Observable that allows to access the current value. This is compatible to BehaviorSubject |

## Variables

|  Variable | Description |
|  --- | --- |
|  [createLazyComponent](./react-utils.createlazycomponent.md) | Creates a synchronous creator function for a React component from an asynchronous function. |
|  [isDevMode](./react-utils.isdevmode.md) |  |
|  [isProdMode](./react-utils.isprodmode.md) |  |
|  [isTestMode](./react-utils.istestmode.md) |  |
|  [useAsync](./react-utils.useasync.md) | React hook to subscribe to an observable and to automatically unsubscribe via an effect. |
|  [VERSION](./react-utils.version.md) | Version and build number of the package |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [DelegateComponent](./react-utils.delegatecomponent.md) |  |
|  [ElementTypeCallback](./react-utils.elementtypecallback.md) | Callback function to retrieve the element type from the content item given its ID and the accessor string |
|  [LazyComponentCreator](./react-utils.lazycomponentcreator.md) |  |
|  [StateFunction](./react-utils.statefunction.md) |  |

