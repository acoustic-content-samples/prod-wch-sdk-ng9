<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/component-utils](./component-utils.md) &gt; [AbstractComponentsService](./component-utils.abstractcomponentsservice.md) &gt; [(constructor)](./component-utils.abstractcomponentsservice._constructor_.md)

## AbstractComponentsService.(constructor)

Initializes our constructor. We make sure to keep all private instance variables as part of the closure and override the methods on the instance level. Since this is a singleton service, that approach does not cause a performance problem.

<b>Signature:</b>

```typescript
protected constructor(aDefaultComponent: TYPE, aPredicate: EqualsPredicate<TYPE>, aLogSvc?: LoggerService);
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aDefaultComponent | <code>TYPE</code> |  |
|  aPredicate | <code>EqualsPredicate&lt;TYPE&gt;</code> |  |
|  aLogSvc | <code>LoggerService</code> |  |

