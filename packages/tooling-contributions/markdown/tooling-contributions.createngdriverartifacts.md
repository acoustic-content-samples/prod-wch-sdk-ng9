<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/tooling-contributions](./tooling-contributions.md) &gt; [createNgDriverArtifacts](./tooling-contributions.createngdriverartifacts.md)

## createNgDriverArtifacts() function

Generates the content items that describe a driver based on an Angular build output

<b>Signature:</b>

```typescript
export declare function createNgDriverArtifacts(aHost: ReadTextFile, aReadDir: ReadDirectory, aSchema?: CreateNgDriverArtifactsSchema): Observable<FileDescriptor<Artifact | Buffer>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aHost | <code>ReadTextFile</code> | callback to read a text file |
|  aReadDir | <code>ReadDirectory</code> |  |
|  aSchema | <code>CreateNgDriverArtifactsSchema</code> | configuration |

<b>Returns:</b>

`Observable<FileDescriptor<Artifact | Buffer>>`

the sequence of artifacts

