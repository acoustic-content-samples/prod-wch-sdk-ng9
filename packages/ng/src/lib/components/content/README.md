# ContentrefComponent

The contentref component acts as a proxy component and renders that component that is referenced by the [RenderingContext](../../interfaces#user-content-renderingcontext).

## Usage

The component requires the `rendering context` to be injected.

Usage in HTML:
```html
<wch-contentref [renderingContext]="..."></wch-contentref>
```

## Attributes
* `renderingContext`: the rendering context for the component
* `layoutMode`: the layout mode used to render the component. If not specified the system uses a default.

## Events
* `onComponent`: the actual angular component instance that gets created
* `onComponentOutput`: a proxied output event sent by the dynamically created component. This event will be wrapped into a [ComponentOutput](#componentoutput) interface.

## Note
The contentref component is similar to the [PageComponent](../page). The difference is that it receives its configuration information explicitly via a [RenderingContext](../../interfaces#user-content-renderingcontext) whereas the [PageComponent](../page) gets the context via the indirection of the active route.

## WCH Dependency
The component relies on the `layouts` element in the [RenderingContext](../../interfaces#user-content-renderingcontext). Depending on the `type` the contentref component will select the correct component to instantiate:
* `Angular4`: uses the `controller` field together with the [ComponentService](../../services/components) to locate a native Angular 4 component.
* `handlebars`:

# ComponentOutput
Interface that wraps an event emitted by a dynamically created component.

## Properties
* `renderingContext`: rendering context of the component emitting the event
* `layoutMode`: layout mode of the component emitting the event
* `component`: the actual component instance that emitted the event
* `output`: the output declaration representing the event
* `event`: the emitted event
