<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/tooling](./tooling.md) &gt; [rxReadDir](./tooling.rxreaddir.md)

## rxReadDir() function

Reads all files in the directory and all of its (accepted) subdirectories

<b>Signature:</b>

```typescript
export declare function rxReadDir(aBaseDir: string, aAccept?: Predicate<ReadDirectoryEntry>): Observable<FileDescriptor<Buffer>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aBaseDir | <code>string</code> | root directory |
|  aAccept | <code>Predicate&lt;ReadDirectoryEntry&gt;</code> | function to test if the file is accepted |

<b>Returns:</b>

`Observable<FileDescriptor<Buffer>>`

a sequence of files in no particular order

