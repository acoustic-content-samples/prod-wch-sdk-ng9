# WchSdk

The SDK defines the plain JS WCH SDK APIs .

## Properties

* [router](./router)
* [version](./version) the current version of the SDK, including a version number and the build date

## Methods

* `refresh()`: causes the currently displayed data to be refreshed

The SDK is available on the global window object

```javascript
window.WchSdk
```

## Cross Origin Eventing

The SDK supports [WebMessaging](https://www.w3.org/TR/webmessaging/) to allow communication across frames via the [postMessage](https://www.w3.org/TR/webmessaging/#dom-window-postmessage) functionality. Each message sent to the SDK needs to contain a `type` and an `id` field. The type is used to identify the meaning of the message, the id to allow the caller to correlate potential responses.

Responses to messages sent to the iframe (e.g. messages back from the SDK to the parent frame) can optionally use [channelMessaging](https://www.w3.org/TR/webmessaging/#channel-messaging). If the first element of the transfer object contains a [messagePort](https://www.w3.org/TR/webmessaging/#messageport), this will be used for reply messages or notifications. Else these replies will be sent against the parent window, directly.

### Supported Message Types

* `WchSdk.refresh`: refreshes the data currently displayed by the application. The message has no response.
* `WchSdk.router.navigateByPath`: navigates to the specified path. Responds with a `WchSdk.router.navigateByPathResponse` response. Takes:
    * `path`: path to navigate to
* `WchSdk.router.activeRoute.subscribe`: subscribes a listener for changes in the active route (i.e. navigations). The event will be responsed by a response containing a handle that can be used to unsubscribe. Whenever a navigation occurs, the SDK will send a `WchSdk.router.activeRoute` message to the caller.
* `WchSdk.router.route.subscribe`: subscribes a listener for changes for a given route. The event will be responsed by a response containing a handle that can be used to unsubscribe. Whenever the route changes, comes into existence or is deleted, the SDK will send a `WchSdk.router.route` message to the caller. Takes:
    * `route`: a string or string array that describes the route to listen to. If the value is a string, then it must be the escaped path, starting with a slash but not ending with a slash. If it is a string array, each value represents the unescaped path segment, the segments to not contain slashes.
* `WchSdk.unsubscribe`: unsubscribes from a subscription given the subscription handle
    * `handle`: the subscription handle

### Supported Response Types

* `WchSdk.router.navigateByPathResponse`: sent as a response to a `WchSdk.router.navigateByPath` message from the SDK to the caller. Replicates the caller message fields and in addition:
    * `success`: true if the navigation completed, else false
    * `error`: an optional error object
* `WchSdk.router.activeRoute.subscribeResponse`: sent as a response to `WchSdk.router.activeRoute.subscribe`.
    * `handle`: handle to the subscription, can be used to unsubscribe
* `WchSdk.router.route.subscribeResponse`: sent as a response to `WchSdk.router.route.subscribe`.
    * `handle`: handle to the subscription, can be used to unsubscribe
* `WchSdk.router.activeRoute`: sent from the SDK to the subscriber for modifications in the navigation.
    * `page`: The selected page. Will be `null` if this is the last event (e.g. because of an application shutdown)

## Examples

### Listen for Navigation Events

This example shows how a parent frame can listen for navigation events of an SPA. The example uses [channelMessaging](https://www.w3.org/TR/webmessaging/#channel-messaging) to establish a direct communication channel from the SDK to the parent frame. Navigation events will be sent via this channel.

Note that the use of a channel is not required. If no channel is passed in, the navigation events will be sent directly to the parent window via [postMessage](https://www.w3.org/TR/webmessaging/#dom-window-postmessage).

The example doe NOT show how to unsubscribe.

```javascript
/**
 * Message sent to the SDK to subscribe for navigation notifications
*/
var msg = {
	type: 'WchSdk.router.activeRoute.subscribe',
	id: 'someid'
};

// use a message channel to receive the responses
var channel = new MessageChannel();

/** Perform  the subscription, transfer one end of the channel to the SDK.
 * Note that the second parameter is the origin of the iframe.
*/
myframe.contentWindow.postMessage(msg, "http://localhost:4200", [channel.port2]);

/**
 * Listen for changes in the navigation
 * We expect two types of callbacks here, one for each navigation event
 * and a response sending the subscription handle, so we can unsubscribe later.
 */
channel.port1.addEventListener('message', msg => {
  // check for the message type
  const data = msg.data;
  if (data.type === 'WchSdk.router.activeRoute') {
    // log the active route
	console.log('navigation in iframe', data.page.route);
  } else
  if (data.type === 'WchSdk.router.activeRoute.subscribeResponse') {
	console.log('subscription handle', data.handle);
  }

});
// start the bi-directional communication
channel.port1.start();
```
