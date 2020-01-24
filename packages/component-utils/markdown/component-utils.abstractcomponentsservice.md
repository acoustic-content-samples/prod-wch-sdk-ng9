<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/component-utils](./component-utils.md) &gt; [AbstractComponentsService](./component-utils.abstractcomponentsservice.md)

## AbstractComponentsService class

<b>Signature:</b>

```typescript
export declare class AbstractComponentsService<TYPE> implements AbstractComponentsRegistry<TYPE> 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(aDefaultComponent, aPredicate, aLogSvc)](./component-utils.abstractcomponentsservice._constructor_.md) |  | Initializes our constructor. We make sure to keep all private instance variables as part of the closure and override the methods on the instance level. Since this is a singleton service, that approach does not cause a performance problem. |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [getTypeByLayout](./component-utils.abstractcomponentsservice.gettypebylayout.md) |  | <code>(aLayout: Layout, aLayoutMode?: string) =&gt; Observable&lt;TYPE&gt;</code> | Returns the type object based on the layout configuration |
|  [getTypeBySelector](./component-utils.abstractcomponentsservice.gettypebyselector.md) |  | <code>(aSelector: string, aLayoutMode?: string) =&gt; Observable&lt;TYPE&gt;</code> | Returns the type object based on the layout selector |
|  [registerType](./component-utils.abstractcomponentsservice.registertype.md) |  | <code>(aController: string &#124; string[], aType: TYPE, aLayoutModes?: string &#124; string[]) =&gt; void</code> | define the methods |
