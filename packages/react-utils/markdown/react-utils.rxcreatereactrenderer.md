<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/react-utils](./react-utils.md) &gt; [rxCreateReactRenderer](./react-utils.rxcreatereactrenderer.md)

## rxCreateReactRenderer() function

Renderer that converts a markup string into a react DOM representation. The react representation might differ dependening on the content types

<b>Signature:</b>

```typescript
export declare function rxCreateReactRenderer(elementType: ElementTypeCallback, aDoc?: Document, aLogSvc?: LoggerService, scheduler?: SchedulerLike): UnaryFunction<string, Observable<ReactNode>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  elementType | <code>ElementTypeCallback</code> |  |
|  aDoc | <code>Document</code> |  |
|  aLogSvc | <code>LoggerService</code> |  |
|  scheduler | <code>SchedulerLike</code> |  |

<b>Returns:</b>

`UnaryFunction<string, Observable<ReactNode>>`

the conversion function

