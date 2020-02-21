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
  ACOUSTIC_CONTEXT_COMPONENT_RESOLVER,
  ACOUSTIC_CONTEXT_CONTENT_COMPONENT,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER,
  ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER
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
  <ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER.Consumer>
    {(renderingContextResolver) => (
      <ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER.Consumer>
        {(renderingContextProvider) => {
          // input
          const ctx = props[KEY_ID] || props.ctx;
          // inner provider
          const provider = createRenderingContextProvider(
            ctx,
            assertProvider(
              renderingContextResolver,
              ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER
            ),
            assertProvider(
              renderingContextProvider,
              ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER
            )
          );
          return (
            <ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER.Provider value={provider}>
              <ACOUSTIC_CONTEXT_COMPONENT_RESOLVER.Consumer>
                {(componentResolver) => (
                  <ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
                    {(loggerService) => (
                      <InternalContentComponent
                        layoutMode={props[KEY_LAYOUT_MODE]}
                        componentResolver={assertProvider(
                          componentResolver,
                          ACOUSTIC_CONTEXT_COMPONENT_RESOLVER
                        )}
                        loggerService={loggerService}
                        renderingContextProvider={provider}
                      />
                    )}
                  </ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
                )}
              </ACOUSTIC_CONTEXT_COMPONENT_RESOLVER.Consumer>
            </ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER.Provider>
          );
        }}
      </ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER.Consumer>
    )}
  </ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER.Consumer>
);

const WchContentComponentProvider: FC = ({ children }) => (
  <ACOUSTIC_CONTEXT_CONTENT_COMPONENT.Provider value={WchContentComponent}>
    {children}
  </ACOUSTIC_CONTEXT_CONTENT_COMPONENT.Provider>
);

/**
 * Provides the rendering context component
 */
export const ACOUSTIC_PROVIDER_CONTENT_COMPONENT = createReactProvider(
  WchContentComponentProvider,
  ACOUSTIC_CONTEXT_CONTENT_COMPONENT,
  [ACOUSTIC_CONTEXT_RENDERING_CONTEXT_RESOLVER, ACOUSTIC_CONTEXT_COMPONENT_RESOLVER],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
