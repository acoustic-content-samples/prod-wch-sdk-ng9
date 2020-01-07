import {
  KEY_ID,
  LoggerService,
  RenderingContextProviderV2,
  RenderingContextV2
} from '@acoustic-content-sdk/api';
import {
  RenderingContextInput,
  RenderingContextResolver
} from '@acoustic-content-sdk/component-api';
import {
  assertProvider,
  ComponentResolver,
  ComponentTypeRef,
  ContentComponentProps,
  createReactProvider,
  WCH_CONTEXT_COMPONENT_RESOLVER,
  WCH_CONTEXT_CONTENT_COMPONENT,
  WCH_CONTEXT_LOGGER_SERVICE,
  WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER,
  WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER
} from '@acoustic-content-sdk/react-api';
import {
  DelegateComponent,
  rxComponent,
  StateFunction
} from '@acoustic-content-sdk/react-utils';
import {
  cacheLast,
  isEqual,
  KEY_LAYOUT_MODE,
  KEY_RENDERING_CONTEXT,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import { FC } from 'react';
import * as React from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface InternalContentComponentProps {
  [KEY_LAYOUT_MODE]?: string;
  componentResolver: ComponentResolver;
  renderingContextProvider: RenderingContextProviderV2;
  loggerService: LoggerService;
}

function createRenderingContextProvider(
  ctx: RenderingContextInput,
  renderingContextResolver: RenderingContextResolver,
  renderingContextProvider: RenderingContextProviderV2
): RenderingContextProviderV2 {
  // the context
  const renderingContext$ = renderingContextResolver.resolveRenderingContext(
    ctx,
    renderingContextProvider
  );
  // the new provider
  return { renderingContext$ };
}

interface InternalContentComponentState {
  ChildComponent: ComponentTypeRef;
  [KEY_RENDERING_CONTEXT]: RenderingContextV2;
  [KEY_LAYOUT_MODE]: string;
}

const viewFunction: DelegateComponent<InternalContentComponentState> = ({
  ChildComponent,
  renderingContext,
  layoutMode
}) => (
  <ChildComponent renderingContext={renderingContext} layoutMode={layoutMode} />
);

const stateFunction: StateFunction<
  InternalContentComponentProps,
  InternalContentComponentState
> = (props$, init$, done$) => {
  // input props
  const componentResolver$ = rxPipe(
    props$,
    rxSelectProperty('componentResolver')
  );
  const layoutMode$ = rxPipe(props$, rxSelectProperty(KEY_LAYOUT_MODE));
  /**
   * Listen for rendering context changes
   */
  const renderingContext$: Observable<RenderingContextV2> = rxPipe(
    props$,
    switchMap((props) => props.renderingContextProvider.renderingContext$)
  );
  /**
   *  the type
   */
  const type$: Observable<ComponentTypeRef> = rxPipe(
    combineLatest([layoutMode$, renderingContext$, componentResolver$]),
    // debounceTime(0),
    switchMap(([layoutMode, renderingContext, componentResolver]) =>
      componentResolver.resolveComponent(renderingContext, layoutMode)
    ),
    cacheLast(isEqual)
  );
  // converts this into the state
  return rxPipe(
    combineLatest([type$, renderingContext$, layoutMode$]),
    map(([ChildComponent, renderingContext, layoutMode]) => ({
      ChildComponent,
      renderingContext,
      layoutMode
    }))
  );
};

const InternalContentComponent = rxComponent<
  InternalContentComponentProps,
  InternalContentComponentState
>(stateFunction, viewFunction);

/**
 * Implementation of the component that performs the actual rendering of content
 *
 * @param props - inputs
 * @returns the component
 */
export const WchContentComponent: FC<ContentComponentProps> = (props) => (
  <WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER.Consumer>
    {(renderingContextResolver) => (
      <WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER.Consumer>
        {(renderingContextProvider) => {
          // input
          const ctx = props[KEY_ID] || props.ctx;
          // inner provider
          const provider = createRenderingContextProvider(
            ctx,
            assertProvider(
              renderingContextResolver,
              WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER
            ),
            assertProvider(
              renderingContextProvider,
              WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER
            )
          );
          return (
            <WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER.Provider value={provider}>
              <WCH_CONTEXT_COMPONENT_RESOLVER.Consumer>
                {(componentResolver) => (
                  <WCH_CONTEXT_LOGGER_SERVICE.Consumer>
                    {(loggerService) => (
                      <InternalContentComponent
                        layoutMode={props[KEY_LAYOUT_MODE]}
                        componentResolver={assertProvider(
                          componentResolver,
                          WCH_CONTEXT_COMPONENT_RESOLVER
                        )}
                        loggerService={loggerService}
                        renderingContextProvider={provider}
                      />
                    )}
                  </WCH_CONTEXT_LOGGER_SERVICE.Consumer>
                )}
              </WCH_CONTEXT_COMPONENT_RESOLVER.Consumer>
            </WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER.Provider>
          );
        }}
      </WCH_CONTEXT_RENDERING_CONTEXT_PROVIDER.Consumer>
    )}
  </WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER.Consumer>
);

const WchContentComponentProvider: FC = ({ children }) => (
  <WCH_CONTEXT_CONTENT_COMPONENT.Provider value={WchContentComponent}>
    {children}
  </WCH_CONTEXT_CONTENT_COMPONENT.Provider>
);

/**
 * Provides the rendering context component
 */
export const WCH_PROVIDER_CONTENT_COMPONENT = createReactProvider(
  WchContentComponentProvider,
  WCH_CONTEXT_CONTENT_COMPONENT,
  [WCH_CONTEXT_RENDERING_CONTEXT_RESOLVER, WCH_CONTEXT_COMPONENT_RESOLVER],
  [WCH_CONTEXT_LOGGER_SERVICE]
);
