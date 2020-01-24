<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/tooling](./tooling.md) &gt; [rxReadJsonFile](./tooling.rxreadjsonfile.md)

## rxReadJsonFile() function

Reads a JSON file on top of a text callback

<b>Signature:</b>

```typescript
export declare function rxReadJsonFile<T>(aFile: string, aHost: ReadTextFile): Observable<T>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aFile | <code>string</code> | filename |
|  aHost | <code>ReadTextFile</code> | callback host |

<b>Returns:</b>

`Observable<T>`

the JSON file
