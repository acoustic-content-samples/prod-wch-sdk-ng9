<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/schematics-utils](./schematics-utils.md) &gt; [addEntryComponentToModule](./schematics-utils.addentrycomponenttomodule.md)

## addEntryComponentToModule() function

> Warning: This API is now obsolete.
> 
> - Since version 9.0.0 with Ivy, entryComponents is no longer necessary.
> 

Custom function to insert an entryComponent into NgModule. It also imports it.

<b>Signature:</b>

```typescript
export declare function addEntryComponentToModule(source: SourceFile, modulePath: string, classifiedName: string, importPath: string): Change[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  source | <code>SourceFile</code> |  |
|  modulePath | <code>string</code> |  |
|  classifiedName | <code>string</code> |  |
|  importPath | <code>string</code> |  |

<b>Returns:</b>

`Change[]`

