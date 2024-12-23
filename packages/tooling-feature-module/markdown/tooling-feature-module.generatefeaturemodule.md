<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/tooling-feature-module](./tooling-feature-module.md) &gt; [generateFeatureModule](./tooling-feature-module.generatefeaturemodule.md)

## generateFeatureModule() function

Command to add `ng-add` support to a feature module.

<b>Signature:</b>

```typescript
export declare function generateFeatureModule(options: GenerateFeatureModuleSchema): (aReadText: ReadTextFile, aLogSvc?: LoggerService) => Observable<FileDescriptor<string>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  options | <code>GenerateFeatureModuleSchema</code> | the schematics object used to describe the feature module |

<b>Returns:</b>

`(aReadText: ReadTextFile, aLogSvc?: LoggerService) => Observable<FileDescriptor<string>>`

the command

