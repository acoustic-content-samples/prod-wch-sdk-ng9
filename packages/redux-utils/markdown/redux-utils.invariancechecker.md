<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/redux-utils](./redux-utils.md) &gt; [invarianceChecker](./redux-utils.invariancechecker.md)

## invarianceChecker() function

Creates a function that validates that an object has not changed. Note that this should only be used for debugging purposes, since it makes a deep copy of the value to test for the invariance

<b>Signature:</b>

```typescript
export declare function invarianceChecker(aValue: any): Generator<boolean>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aValue | <code>any</code> | the value to test |

<b>Returns:</b>

`Generator<boolean>`

the validator
