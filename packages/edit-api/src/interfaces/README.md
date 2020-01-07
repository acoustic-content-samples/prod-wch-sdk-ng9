# Interfaces

This section describes the interfaces exposed by the module.

## WchInlineEditService

The `WchInlineEditService` interface allows a client to interact with the inline edit implementation. The implementation of this interface makes sure to load the inline edit provider and to fulfill the interface contract with the provider.

A consumer of this interface calls the `registerComponent` message for each HTML element that is supposed to be edited. The result of this call is an [Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html). The inline edit registration begins as soon as someone subscribes to this observable and ends as soon as this subscription ends. It is in the responsibility of the consumer to make sure that the HTML element exists for the duration of the subscription.

