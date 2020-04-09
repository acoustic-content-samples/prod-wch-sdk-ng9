import { promises } from 'fs';
import { join, parse } from 'path';
import { cwd } from 'process';

const { stat, copyFile, readdir, mkdir, readFile } = promises;

/**
 * Flattens a nested array
 *
 * @param aDst - target array
 * @returns the flattening function
 */
const flatten = <T>(aDst: T[] = []) => (aValues: T[][]): T[] =>
  aDst.concat(...aValues);

/**
 * Reads a dependency
 *
 * @param aDep - name of the dependency
 */
const readDep = (aDep: string): Promise<string> =>
  findPkg(parse(require.resolve(aDep)).dir);

/**
 * Reads the package file
 *
 * @param aPath - path of the package file
 * @returns the resolved package
 */
const readPkg = (aPath: string): Promise<any> =>
  readFile(join(aPath, 'package.json'), 'utf8').then((data) =>
    JSON.parse(data)
  );

/**
 * Locates the directory for a package
 *
 * @param aDir - the directory to start searching in
 * @returns the resolved directory
 */
const findPkg = (aDir: string): Promise<string> =>
  readPkg(aDir).then(
    () => aDir,
    () => findPkg(parse(aDir).dir)
  );

/**
 * Locates the data directories
 *
 * @param aDir - start directory
 *
 * @returns the set of data directories
 */
const findData = (aDir: string): Promise<string[]> =>
  readPkg(aDir)
    .then(({ dependencies = {}, config = {} }) =>
      Promise.all(
        Object.keys(dependencies).map((dep) =>
          readDep(dep).then(findData, () => [])
        )
      ).then(flatten([config.data && join(aDir, config.data)]))
    )
    .then((all) => all.filter(Boolean));

/**
 * Locates the root directory
 *
 * @param aDirOrPkg - directory or package name
 * @returns the root directory
 */
const findRoot = (aDirOrPkg: string): Promise<string> =>
  stat(aDirOrPkg).then(
    (s) => (s.isDirectory() ? aDirOrPkg : readDep(aDirOrPkg)),
    () => readDep(aDirOrPkg)
  );

/**
 * Copies a single file from src to dst
 *
 * @param aRel - the relative path
 * @param aSrc - source path
 * @param aDst - target path
 *
 * @return a promise with the target path
 */
const copySingle = (
  aRel: string,
  aSrc: string,
  aDst: string
): Promise<string[]> =>
  copyFile(join(aSrc, aRel), join(aDst, aRel)).then(() => [aRel]);

/**
 * Helper constant
 */
const EMPTY_RESULT: string[] = [];

/**
 * Overlays all transitively referenced packages and copies then into a target folder
 *
 * @param aSrcDirOrPkg - source directory or package name
 * @param aDstDir - target directory
 *
 * @returns the array of copied files
 */
export function generateDataOverlay(
  aSrcDirOrPkg: string = cwd(),
  aDstDir: string
): Promise<string[]> {
  /**
   * helper to manage concurrent creation of directories
   */
  const DIRS: Record<string, Promise<any>> = {};

  /**
   * Recursively create a directory
   *
   * @param aName - name of the directory
   * @returns a promise resolving to the generated directory
   */
  const mkdirp = (aName: string): Promise<any> =>
    DIRS[aName] || (DIRS[aName] = mkdir(aName, { recursive: true }));

  /**
   * Recursively copy files
   *
   * @param aRel - relative path
   * @param aSrc - source root path
   * @param aDst - target path
   *
   * @returns a promise of the copied files
   */
  const copyRec = (
    aRel: string,
    aSrc: string,
    aDst: string
  ): Promise<string[]> =>
    Promise.all([
      readdir(join(aSrc, aRel), { withFileTypes: true }),
      mkdirp(join(aDst, aRel))
    ])
      .then(
        ([list]) =>
          Promise.all(
            list.map((entry) =>
              entry.isFile()
                ? copySingle(join(aRel, entry.name), aSrc, aDst)
                : entry.isDirectory()
                  ? copyRec(join(aRel, entry.name), aSrc, aDst)
                  : EMPTY_RESULT
            )
          ),
        () => []
      )
      .then(flatten());

  /**
   * Copies a source data directory into a target directory
   *
   * @param aSrc - source directory
   * @param aDst - target directory
   *
   * @returns the set of copied files
   */
  const copy = (aSrc: string, aDst: string): Promise<string[]> =>
    copyRec('', aSrc, aDst);

  const deps$ = findRoot(aSrcDirOrPkg)
    .then((root) => findData(root))
    .then((all) => Array.from(new Set(all)));

  return deps$
    .then((deps) => Promise.all(deps.map((dir) => copy(dir, aDstDir))))
    .then(flatten());
}
