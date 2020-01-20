<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@acoustic-content-sdk/ng-edit-api](./ng-edit-api.md) &gt; [WchEditableDirectiveOutput](./ng-edit-api.wcheditabledirectiveoutput.md)

## WchEditableDirectiveOutput interface

Input of the editable directive service

<b>Signature:</b>

```typescript
export interface WchEditableDirectiveOutput 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [accessor$](./ng-edit-api.wcheditabledirectiveoutput.accessor_.md) | <code>Observable&lt;string&gt;</code> | The accessor expression |
|  [data$](./ng-edit-api.wcheditabledirectiveoutput.data_.md) | <code>Observable&lt;any&gt;</code> | Generates the accessed data, decoded from the accessor expression |
|  [placeholder$](./ng-edit-api.wcheditabledirectiveoutput.placeholder_.md) | <code>Observable&lt;AuthoringPlaceholder&gt;</code> | Event exposing the current placeholder. If no placeholder exists or placeholders are disabled, this will return <code>undefined</code>. |
|  [placeholderText$](./ng-edit-api.wcheditabledirectiveoutput.placeholdertext_.md) | <code>Observable&lt;LocalizedText&gt;</code> | Event exposing the current placeholder text. If placeholders are disabled, this will return. If no placeholder has been defined this returns the default placeholder as specified by the application |
|  [showPlaceholder$](./ng-edit-api.wcheditabledirectiveoutput.showplaceholder_.md) | <code>Observable&lt;boolean&gt;</code> | Checks if we should show or hide placeholders |
|  [typeId$](./ng-edit-api.wcheditabledirectiveoutput.typeid_.md) | <code>Observable&lt;string&gt;</code> | Generates the type of the current element |
|  [wchEditable$](./ng-edit-api.wcheditabledirectiveoutput.wcheditable_.md) | <code>Observable&lt;WchEditableEvent&gt;</code> | Event that tells about the inline edit process |
