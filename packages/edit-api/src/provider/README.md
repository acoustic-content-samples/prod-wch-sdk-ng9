# Provider

The edit provider is a piece of javascript code that implements inline edit functionality. It is dynamically loaded by the SPA (typically via the SDK). The provider needs to conform to the following pattern:

## Initialization

The edit module implements the `WchInlineEditProvider` interface, i.e. it exposes a `register` function. This function will be invoked for each editable HTML element and allows the edit provider to attach the desired edit hooks to the elements. The method is provided with:

- a reference to the actual HTML element
- an accessor expression that identifies the element on a content item to be edited. This expression is relative to the current rendering context
- a reactive stream of rendering contexts. Note that the rendering contexts can change during the lifetime of this registration. Also there is no guarantee that the element pointed to by the accessor actually exists on the context. If a provide subscribes to the sequence of rendering contexts, it needs to make sure to NOT throw an exception in the subscribe block under any circumstances

## Result

The result of a registration is an event provider. The purpose of this provider is to communicate inline edit operations on the HTML element to the host, i.e. the host registers for events on that event provider and the edit provider is responsible to firing these events (if the event is supported).

The event provider can optionally implement the `Disposable` interface. If implemented the host will call its `dispose` method after registration, before the HTML element gets removed from the DOM (so it's the inverse operation to the registration call).

## Notifications

The implementor of the `WchInlineEditProvider` can optionally also implement the `EventTargetLike` interface, i.e. be an event emitter. This allows the provider to communicate information to the SDK, e.g. about enabled or disabled inline edit mode.

Currently supported notifications are:

- `wchInlineEditStart` to notify about entering inline edit mode
- `wchInlineEditEnd` to notify about leaving inline edit mode
