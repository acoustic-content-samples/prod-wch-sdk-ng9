<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/utils](./utils.md) &gt; [sendRequest](./utils.sendrequest.md)

## sendRequest() function

Sends a request to the given options object and allows to trigger a refresh via the given trigger.

<b>Signature:</b>

```typescript
declare function _sendRequest<T>(aUrl: string, aOptions: HttpOptions, aTrigger: Observable<any>, aRequest: Request<T>, aLogger: Logger): Observable<T>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aUrl | <code>string</code> |  |
|  aOptions | <code>HttpOptions</code> | the options |
|  aTrigger | <code>Observable&lt;any&gt;</code> | the trigger |
|  aRequest | <code>Request&lt;T&gt;</code> |  |
|  aLogger | <code>Logger</code> |  |

<b>Returns:</b>

`Observable<T>`

the response stream

