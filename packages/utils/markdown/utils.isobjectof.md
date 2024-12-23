<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/utils](./utils.md) &gt; [isObjectOf](./utils.isobjectof.md)

## isObjectOf() function

Tests if all fields of an object are of a particular type

<b>Signature:</b>

```typescript
declare function _isObjectOf<T>(aValue: any, aPredicate: IsPredicate<T>): aValue is {
    [key: string]: T;
};
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aValue | <code>any</code> | the value to test |
|  aPredicate | <code>IsPredicate&lt;T&gt;</code> | the predicate to test each element with |

<b>Returns:</b>

`aValue is {
    [key: string]: T;
}`

true if the value is an array and all elements are of the specific type

