import {
  LoggerService,
  RenderingContextProviderV2
} from '@acoustic-content-sdk/api';
import {
  assertProvider,
  ContentComponentProps,
  createReactProvider,
  ACOUSTIC_CONTEXT_LOGGER_SERVICE,
  ACOUSTIC_CONTEXT_PAGE_COMPONENT,
  ACOUSTIC_CONTEXT_PAGE_SERVICE,
  ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER
} from '@acoustic-content-sdk/react-api';
import { rxComponent, StateFunction } from '@acoustic-content-sdk/react-utils';
import {
  DEFAULT_LAYOUT_MODE,
  KEY_LAYOUT_MODE,
  opCacheLast,
  opDistinctUntilChanged,
  rxPipe,
  rxSelectProperty
} from '@acoustic-content-sdk/utils';
import * as React from 'react';
import { FC } from 'react';
import { RouteComponentProps } from 'react-router';
import { combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ReactPageService } from '../../services/page/wch.page.service';
import { WchContentComponent } from '../content/content.component';

function createRenderingContextProvider(
  aProps: RouteComponentProps,
  aPageService: ReactPageService
): RenderingContextProviderV2 {
  // resolve the context
  const renderingContext$ = rxPipe(
    aPageService.getRenderingContextByActivatedRoute(aProps),
    opCacheLast
  );
  // returns the provider
  return { renderingContext$ };
}

interface InternalPageComponentProps {
  [KEY_LAYOUT_MODE]?: string;
  renderingContextProvider: RenderingContextProviderV2;
  loggerService: LoggerService;
}

const viewFunction: FC<ContentComponentProps> = (props) => (
  <WchContentComponent {...props} />
);

const stateFunction: StateFunction<
  InternalPageComponentProps,
  ContentComponentProps
> = (props$) => {
  // extract the context
  const renderingContext$ = rxPipe(
    props$,
    rxSelectProperty('renderingContextProvider'),
    switchMap((provider) => provider.renderingContext$),
    opDistinctUntilChanged
  );
  // layout mode
  const layoutMode$ = rxPipe(props$, rxSelectProperty(KEY_LAYOUT_MODE));
  // dispatch
  return rxPipe(
    combineLatest([renderingContext$, layoutMode$]),
    map(([ctx, layoutMode]) => ({ ctx, layoutMode }))
  );
};

const InternalPageComponent = rxComponent<
  InternalPageComponentProps,
  ContentComponentProps
>(stateFunction, viewFunction);

/**
 * Implementation of the top level component that resolves the page
 *
 * @param props - inputs
 * @returns the component
 */
export const WchPageComponent: FC<RouteComponentProps> = (props) => (
  <ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
    {(logSvc) => (
      <ACOUSTIC_CONTEXT_PAGE_SERVICE.Consumer>
        {(pageService) => {
          // construct the context
          const renderingContextProvider = createRenderingContextProvider(
            props,
            assertProvider(pageService, ACOUSTIC_CONTEXT_PAGE_SERVICE)
          );
          return (
            <ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER.Provider
              value={renderingContextProvider}
            >
              <InternalPageComponent
                renderingContextProvider={renderingContextProvider}
                layoutMode={DEFAULT_LAYOUT_MODE}
                loggerService={logSvc}
              />
            </ACOUSTIC_CONTEXT_RENDERING_CONTEXT_PROVIDER.Provider>
          );
        }}
      </ACOUSTIC_CONTEXT_PAGE_SERVICE.Consumer>
    )}
  </ACOUSTIC_CONTEXT_LOGGER_SERVICE.Consumer>
);

const WchPageComponentProvider: FC = ({ children }) => (
  <ACOUSTIC_CONTEXT_PAGE_COMPONENT.Provider value={WchPageComponent}>
    {children}
  </ACOUSTIC_CONTEXT_PAGE_COMPONENT.Provider>
);

/**
 * Provides the rendering context component
 */
export const ACOUSTIC_PROVIDER_PAGE_COMPONENT = createReactProvider(
  WchPageComponentProvider,
  ACOUSTIC_CONTEXT_PAGE_COMPONENT,
  [ACOUSTIC_CONTEXT_PAGE_SERVICE],
  [ACOUSTIC_CONTEXT_LOGGER_SERVICE]
);
