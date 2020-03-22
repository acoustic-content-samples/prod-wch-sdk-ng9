import { LoggerService } from '@acoustic-content-sdk/api';
import { FetchText } from '@acoustic-content-sdk/rest-api';
import {
  anyToString,
  arrayPush,
  assertFromFunction,
  boxLoggerService,
  isEmpty,
  isEqual,
  isNotEmpty,
  jsonParse,
  opFilterNotNil,
  reduceForIn,
  reduceToObject,
  rxNext,
  rxPipe
} from '@acoustic-content-sdk/utils';
import {
  combineLatest,
  concat,
  forkJoin,
  from,
  MonoTypeOperatorFunction,
  Observable,
  of,
  UnaryFunction
} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const UNPKG = 'https://unpkg.com/';

const LOGGER = 'AbstractModuleLoaderService';

const createIdentifier = (aName: string, aVersion?: string) =>
  isNotEmpty(aVersion) ? `${aName}@${aVersion}` : aName;

/**
 * Implementation of a service that can load a module and its dependencies
 * from `unpkg`
 *
 * @param aResolver - resolver that tries to resolve the module, first. May return the empty observable
 * @param aFetchText - callback that loads a remote resource as text
 * @param aDocument - the document object
 * @param aWindow - the global window object
 * @param aLogSvc - optional logger service
 *
 * @returns a function that can load a module based on name and version
 */
export function createModuleLoader(
  aResolver: UnaryFunction<string, Observable<any>>,
  aFetchText: FetchText,
  aDocument: Document,
  aWindow: any,
  aLogSvc?: LoggerService
): (aName: string, aVersion?: string) => Observable<any> {
  // box
  const logSvc = boxLoggerService(aLogSvc);
  const logger = logSvc.get(LOGGER);
  // next logger
  const log: <T>(...v: any[]) => MonoTypeOperatorFunction<T> = rxNext(logger);
  /**
   * List of resolved modules
   */
  const modules: Record<string, Promise<any>> = {};

  /**
   * Loads the binary by ID
   *
   * @param aId - the ID of the binary
   *
   * @returns the string
   */
  const loadBinary = (aId: string) => aFetchText(`${UNPKG}${aId}`);

  /**
   * Loads the correct package json from unkpg
   *
   * @param aFetchText - fetch function
   * @param aName - name of the module
   * @param aVersion - optionally the version
   *
   * @returns the package json
   */
  const loadPackageJson = (aId: string) =>
    rxPipe(aFetchText(`${UNPKG}${aId}/package.json`), map(jsonParse));

  /**
   * Resolve an external module
   *
   * @param aId - the module identifier
   * @returns the resolved module
   */
  const resolve = (aId: string) => rxPipe(aResolver(aId), opFilterNotNil);

  /**
   * Constructs the function object based on the module
   * name and its dependencies.
   *
   * @param aId - the module id
   * @param aBinary - the module text
   * @param aDependencies - the dependencies
   *
   * @returns the exports
   */
  function createExport(
    aId: string,
    aBinary: string,
    aDependencies: Record<string, any>
  ): any {
    try {
      // require callback
      const requireModule = (aName: string) => aDependencies[aName];
      // create the context
      const exports: any = {};
      const module: any = { exports };
      // execute the function
      const fct = new Function(
        'exports',
        'module',
        'require',
        'document',
        'window',
        aBinary
      );
      fct(exports, module, requireModule, aDocument, aWindow);
      // use the exports
      return module.exports;
    } catch (error) {
      // log this
      logger.error(
        `Failing to load [${aId}], root cause [${anyToString(error)}].`,
        error
      );
      // fallback to an empty object
      return {};
    }
  }

  /**
   * Constructs a new module given its ID. It loads the module
   * text and its binaries and the instantiates the module
   *
   * @param aId - the module identifier
   * @returns the resolved module
   */
  const createModule = (aId: string): Promise<any> =>
    concat(
      resolve(aId),
      rxPipe(
        // load the pkg
        loadPackageJson(aId),
        // log this
        log(aId),
        // resolve
        switchMap((pkg: any) => {
          // decode the version from the package
          const { name, version } = pkg;
          const id = createIdentifier(name, version);
          // check if we need a redirect
          if (!isEqual(id, aId)) {
            // log this
            logger.info('Redirecting ...', aId, id);
            // dispatch
            return resolveModule(name, version);
          }
          // we can now resolve the dependencies
          const deps$ = loadDependencies(pkg);
          // load the actual text
          const bin$ = loadBinary(id);
          // when resolved load the function
          return rxPipe(
            combineLatest([bin$, deps$]),
            map(([bin, deps]) => createExport(id, bin, deps))
          );
        })
      )
    ).toPromise();

  /**
   * Loads the module if it's not being loaded, yet
   *
   * @param aName - name of the module
   * @param aVersion - version of the module
   *
   * @returns the resulting loaded module
   */
  const loadModule = (aName: string, aVersion?: string): Promise<any> =>
    assertFromFunction(
      createIdentifier(aName, aVersion),
      modules,
      createModule
    );

  /**
   *
   * @param aName
   * @param aVersion
   */
  const resolveModule = (aName: string, aVersion?: string) =>
    from(loadModule(aName, aVersion));

  /**
   * Resolves all dependencies from the given module
   *
   * @param aPkg - the package json of the module
   * @returns the
   */
  function loadDependencies(aPkg: any): Observable<Record<string, any>> {
    // get the dependencies
    const { dependencies = {}, peerDependencies = {} } = aPkg;
    const merged: Record<string, string> = {
      ...peerDependencies,
      ...dependencies
    };
    // resolve all dependencies
    const all: Observable<[string, any]>[] = reduceForIn(
      merged,
      (aDst: Observable<[string, any]>[], aVersion: string, aName: string) =>
        arrayPush(
          rxPipe(
            resolveModule(aName, aVersion),
            map((module) => [aName, module])
          ),
          aDst
        ),
      []
    );
    // quick bailout
    if (isEmpty(all)) {
      return of({});
    }
    // load all modules
    return rxPipe(
      forkJoin(all),
      map((result) =>
        reduceToObject(
          result,
          ([name]) => name,
          ([, value]) => value
        )
      )
    );
  }

  // the resolver
  return resolveModule;
}
