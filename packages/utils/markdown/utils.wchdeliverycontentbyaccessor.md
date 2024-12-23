<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/utils](./utils.md) &gt; [wchDeliveryContentByAccessor](./utils.wchdeliverycontentbyaccessor.md)

## wchDeliveryContentByAccessor() function

Returns the element identified by the accessor string from a content item in delivery format

<b>Signature:</b>

```typescript
export declare function wchDeliveryContentByAccessor(aItem: DeliveryContentItem, aAccessor: string): DeliveryContentItem | DeliveryElement;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  aItem | <code>DeliveryContentItem</code> | the root level item (its accessor should be ) |
|  aAccessor | <code>string</code> | accessor expression to the item (this references the authoring path!) |

<b>Returns:</b>

`DeliveryContentItem | DeliveryElement`

the referenced value

