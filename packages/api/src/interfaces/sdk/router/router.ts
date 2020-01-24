/** Copyright IBM Corp. 2018 */
import { SitePage } from './../../delivery/v1/site/site.page';
import { RenderingContext } from './../../delivery/v1/rendering/context/rendering.context';
import { Observable } from 'rxjs';

export interface WchSdkRouter {

    // public APIs
    navigateByPath: (aPath: string) => PromiseLike<boolean>;

    /**
     * Returns an observable that represents the active route
     *
     * @returns an observable of the currently active route
     */
    activeRoute: () => Observable<SitePage>;

    /**
     * Returns an observable that represents the active rendering context
     *
     * @returns an observable of the currently active rendering context
     */
    activeRenderingContext: () => Observable<RenderingContext>;
}
