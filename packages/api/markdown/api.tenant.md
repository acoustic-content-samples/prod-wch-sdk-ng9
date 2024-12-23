<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/api](./api.md) &gt; [Tenant](./api.tenant.md)

## Tenant interface

<b>Signature:</b>

```typescript
export interface Tenant 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [\_id](./api.tenant._id.md) | <code>string</code> | DEPRECATED - read-only - UUID of the domain. Use 'id' instead of \_id |
|  [capability](./api.tenant.capability.md) | <code>string</code> | indicates the capabilities supported by a tenant |
|  [corsWhitelist](./api.tenant.corswhitelist.md) | <code>string[]</code> |  |
|  [defaultContentLocale](./api.tenant.defaultcontentlocale.md) | <code>string</code> | The default locale for content |
|  [deliveryAccess](./api.tenant.deliveryaccess.md) | <code>DeliveryAccess</code> |  |
|  [ibmCommerce](./api.tenant.ibmcommerce.md) | <code>IbmCommerce</code> |  |
|  [ibmUniqueId](./api.tenant.ibmuniqueid.md) | <code>string</code> |  |
|  [id](./api.tenant.id.md) | <code>string</code> | read-only - UUID of the domain |
|  [isDAMEnabled](./api.tenant.isdamenabled.md) | <code>boolean</code> |  |
|  [isEdgeSideEnabled](./api.tenant.isedgesideenabled.md) | <code>boolean</code> |  |
|  [locale](./api.tenant.locale.md) | <code>string</code> | The locale the UI is shown in |
|  [locked](./api.tenant.locked.md) | <code>boolean</code> | set to true if the tenant is 'locked' and should not have access to the system |
|  [mandatoryAssetPublishApproval](./api.tenant.mandatoryassetpublishapproval.md) | <code>AssetPublishApproval</code> |  |
|  [mandatoryContentPublishApproval](./api.tenant.mandatorycontentpublishapproval.md) | <code>ContentPublishApproval</code> |  |
|  [maxAuthors](./api.tenant.maxauthors.md) | <code>number</code> |  |
|  [maxBulkUploadSize](./api.tenant.maxbulkuploadsize.md) | <code>number</code> |  |
|  [maxContentItems](./api.tenant.maxcontentitems.md) | <code>number</code> | Max content items the tenant can have based on plan purchased |
|  [maxDataTransfer](./api.tenant.maxdatatransfer.md) | <code>number</code> | Max amount of data transfer the tenant has per month, based on plan purchased |
|  [maxStorageSize](./api.tenant.maxstoragesize.md) | <code>number</code> | Max amount of storage the tenant has, based on plan purchased |
|  [maxUploadSize](./api.tenant.maxuploadsize.md) | <code>number</code> | Max upload size - should apply to files/images/audio/video unless useSingleUploadSize is false in which case the individual max uploads apply |
|  [maxUploadSizeFiles](./api.tenant.maxuploadsizefiles.md) | <code>number</code> | Max upload size for files (if useSingleUploadSize is false) |
|  [maxUploadSizeImage](./api.tenant.maxuploadsizeimage.md) | <code>number</code> | Max upload size for images (if useSingleUploadSize is false) |
|  [maxUploadSizeVideo](./api.tenant.maxuploadsizevideo.md) | <code>number</code> | Max upload size for videos (if useSingleUploadSize is false) |
|  [maxUserSessions](./api.tenant.maxusersessions.md) | <code>number</code> | Max number of User sessions |
|  [name](./api.tenant.name.md) | <code>string</code> |  |
|  [tier](./api.tenant.tier.md) | <code>TENANT_TIER</code> | Which tier of the product the tenant has purchased, set by sbs-provisioning to one of these values; Trial, Base, Standard, Plus |
|  [useSingleUploadSize](./api.tenant.usesingleuploadsize.md) | <code>boolean</code> | Use the maxUploadSize to cover all uploads or use the individual max upload sizes |
|  [watsonConfidenceLevel](./api.tenant.watsonconfidencelevel.md) | <code>number</code> |  |

