<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/utils](./utils.md) &gt; [createLoggerService](./utils.createloggerservice.md)

## createLoggerService() function

Constructs a logger service on the basis of a logger factory. The service makes sure not to create the same logger multiple times

<b>Signature:</b>

```typescript
export declare function createLoggerService(aLoggerFactory: LoggerFactory): LoggerService;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aLoggerFactory | <code>LoggerFactory</code> | the factory |

<b>Returns:</b>

`LoggerService`

the service

