<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/redux-utils](./redux-utils.md) &gt; [updateGenericProperties](./redux-utils.updategenericproperties.md)

## updateGenericProperties() function

Updates properties of the item that depend on the environment

<b>Signature:</b>

```typescript
export declare function updateGenericProperties<T extends BaseAuthoringItem>(aItem: Updater<T>, aUser?: User): Updater<T>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aItem | <code>Updater&lt;T&gt;</code> | updater for the item |
|  aUser | <code>User</code> | optionally the current user |

<b>Returns:</b>

`Updater<T>`

the updater after the item has been modified

