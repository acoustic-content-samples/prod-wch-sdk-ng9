<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/utils](./utils.md) &gt; [thisThenThats](./utils.thisthenthats.md)

## thisThenThats variable

Combines two observables such that the events on the first one are used until the second one starts to produce an event. From then on only the events on the second one will be used and the first one canceled.

<b>Signature:</b>

```typescript
thisThenThats: <T>(...aObservables: Observable<T>[]) => Observable<T>
```
