<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/component-api](./component-api.md) &gt; [DeliverySearchResolver](./component-api.deliverysearchresolver.md) &gt; [getDeliverySearchResults](./component-api.deliverysearchresolver.getdeliverysearchresults.md)

## DeliverySearchResolver.getDeliverySearchResults() method

Execute the search. The implementation will add the classification to the `fq` part of the query, automatically, so there is no need to contain it in the query.

<b>Signature:</b>

```typescript
getDeliverySearchResults<T>(aQuery: QueryInput, aClassification: string): Observable<SearchResults<T>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aQuery | <code>QueryInput</code> | the query input |
|  aClassification | <code>string</code> | the classification |

<b>Returns:</b>

`Observable<SearchResults<T>>`

the search result

