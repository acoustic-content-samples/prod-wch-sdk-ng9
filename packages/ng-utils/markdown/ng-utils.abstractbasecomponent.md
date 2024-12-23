<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/ng-utils](./ng-utils.md) &gt; [AbstractBaseComponent](./ng-utils.abstractbasecomponent.md)

## AbstractBaseComponent class

Implementation of a base component for Angular Components that expose the `renderingContext` and `layoutMode` output observables.

<b>Signature:</b>

```typescript
export declare abstract class AbstractBaseComponent extends AbstractLifeCycleComponent implements RenderingContextProviderV2 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)()](./ng-utils.abstractbasecomponent._constructor_.md) |  | Constructs a new instance of the <code>AbstractBaseComponent</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [layoutMode](./ng-utils.abstractbasecomponent.layoutmode.md) |  | <code>string</code> | Set the layout mode to render this page |
|  [layoutMode$](./ng-utils.abstractbasecomponent.layoutmode_.md) |  | <code>Observable&lt;string&gt;</code> | Fires whenever the layout mode changed, includes the initial default mode. |
|  [renderingContext$](./ng-utils.abstractbasecomponent.renderingcontext_.md) |  | <code>Observable&lt;RenderingContextV2&gt;</code> | The rendering context for the page. This is the context of the element that is referenced by the currently active route. |

