<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/redux-ajax](./redux-ajax.md) &gt; [fetchTextAjax](./redux-ajax.fetchtextajax.md)

## fetchTextAjax() function

Creates a callback function that loads content via HTTP GET from the API routes.

<b>Signature:</b>

```typescript
export declare function fetchTextAjax(apiBase: StaticHubInfoUrlProvider | PromiseLike<StaticHubInfoUrlProvider>, aLoggerService?: LoggerService): FetchText;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  apiBase | <code>StaticHubInfoUrlProvider &#124; PromiseLike&lt;StaticHubInfoUrlProvider&gt;</code> | the [API URL](https://developer.ibm.com/customer-engagement/tutorials/accessing-your-sites-through-watson-content-hub-apis/#tocstep1)<!-- -->. |
|  aLoggerService | <code>LoggerService</code> |  |

<b>Returns:</b>

`FetchText`

the callback function

