# WchSdkRouter

The SDK router allows to navigate to WCH pages or components.

## Methods

* `navigateByPath(path: string): PromiseLike<boolean>`: navigates to a WCH component given its path. The path can be read from the site information in the [RenderingContext](./../../delivery/v1/rendering/context/#RenderingContext). The return value indicates when this navigation has completed.
* `activeRoute(): Observable<SitePage>`: returns the active route in form of a page reference
* `activeRenderingContext(): Observable<RenderingContext>`: returns the active rendering context