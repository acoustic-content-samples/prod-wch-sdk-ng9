# PageComponent

The page component resolves the current route to the component (or page) that is associated to this route in WCH. It can therefore be considered a proxy component that decouples the application at build time from the runtime artifacts.

## Usage

The component does not require any specific configuration, it attaches itself to the routing logic via dependency injection.

Usage in HTML:

```html
<wch-page></wch-page>
```

Usage in the router config:

```typescript
const appRoutes: Routes = [
  {
    path: '**',
    component: PageComponent
  }
];
```

## Attributes

* `layoutMode`: optionally pass the layout mode to be used when rendering the page. If not specified, the system uses the default mode.

## Events

* `onRenderingContext`: the [rendering context](../../interfaces) for the page as soon as it has been loaded
* `onLayoutMode`: the layout mode used to render this page.

## Error handling

If the page cannot be decoded, the system will look for a component mapped to the [PAGE_NOT_FOUND_LAYOUT](../../services/components) layout and instantiates this with an empty rendering context.

## WCH Dependency

The page component uses the `URL Slug` managed in WCH with each page to decode the targeted page. The URL slugs form a hierarchical namespace that matches the URL namespace of the SPA. The component uses the `url` property of the [ActivatedRoute](https://angular.io/api/router/ActivatedRoute). This property represents the sequence of path segments that will be matched against the defined URL slugs. The component will NOT interpret the parent router, so the SPA can decide to mount the WCH namespace at any location within its own namespace.