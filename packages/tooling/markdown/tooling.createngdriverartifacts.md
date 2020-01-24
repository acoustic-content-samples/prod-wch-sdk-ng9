<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/tooling](./tooling.md) &gt; [createNgDriverArtifacts](./tooling.createngdriverartifacts.md)

## createNgDriverArtifacts() function

Generates the content items that describe a driver based on an Angular build output

<b>Signature:</b>

```typescript
export declare function createNgDriverArtifacts(aHost: ReadTextFile, aSchema?: CreateDriverArtifactsSchema): Observable<Artifact>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aHost | <code>ReadTextFile</code> | callback to read a text file |
|  aSchema | <code>CreateDriverArtifactsSchema</code> | configuration |

<b>Returns:</b>

`Observable<Artifact>`

the sequence of artifacts
