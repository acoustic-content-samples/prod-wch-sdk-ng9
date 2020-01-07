# Placeholder Component

The placeholder component can be used to easily show or hide placeholders for via [content projection](https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b). The component will show the child element with the CSS class `wch-placeholder` if a placeholder is supposed to be shown and the other elements else.

## Example

The following example demonstrates the use of the component to show a placeholder image if the original image is not available and if placeholders are enabled.

```html
<wch-placeholder wchEditable="image">
   <!-- original markup -->
   <img wchEditable="image" [src]="utilService.getImageUrl(rContext, IMAGE_KEY, 'short')" [alt]="image.altText ? (onImage | async).altText : ''"
     [title]="image.altText ? (onImage | async).altText : ''" />

   <!-- placeholder markup -->
   <img wchEditable="image" class="wch-placeholder" src="https://via.placeholder.com/350x150">
 </wch-placeholder>
```

## Members

The component allows fine grained control over the placeholder display by exposing the following events:

- `onShowPlaceholder`: boolean that tells if the placeholder is supposed to be displayed or not
- `onPlaceholder`: the placeholder item. This will only fire in preview mode, never in live mode
- `onData`: the data referenced by the `wchEditable` accessor
- `onAccessor`: the resolved accessor string. This can e.g. be used to remove the reduncancy of specifying the accessor for the inner items.
