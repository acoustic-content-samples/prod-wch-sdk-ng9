<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/redux-utils](./redux-utils.md) &gt; [Updater](./redux-utils.updater.md) &gt; [add](./redux-utils.updater.add.md)

## Updater.add property

Inserts a new value into an array pointed to by the accessor. All values across the parent path will be cloned (shallow) if they do not have a clone, yet.

Pass `undefined` as the new value to delete the value.

Returns the modified version of the top level object.

<b>Signature:</b>

```typescript
add: BiFunction<string, any, T>;
```
