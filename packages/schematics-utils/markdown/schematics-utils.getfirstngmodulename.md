<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/schematics-utils](./schematics-utils.md) &gt; [getFirstNgModuleName](./schematics-utils.getfirstngmodulename.md)

## getFirstNgModuleName() function

Given a source file with  class(es), find the name of the first  class.

<b>Signature:</b>

```typescript
export declare function getFirstNgModuleName(source: ts.SourceFile): string | undefined;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  source | <code>ts.SourceFile</code> | source file containing one or more  |

<b>Returns:</b>

`string | undefined`

the name of the first @<!-- -->NgModule, or `undefined` if none is found
