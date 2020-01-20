import { readFile } from 'fs';
import { join, normalize, parse } from 'path';
import { bindNodeCallback, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, mapTo, switchMap } from 'rxjs/operators';
import { compress, options } from 'targz';
import { XMLHttpRequest } from 'xhr2';
import { env } from 'process';

const { artifactory_username, artifactory_password } = env;

if (artifactory_username && artifactory_password) {
  const createXHR = () => new XMLHttpRequest();

  const DIST = normalize(join(__dirname, '..', 'dist'));
  const { name, version } = require('../package.json');

  const filename = `${name}-${version}.tgz`;
  const TGZ_NAME = join(DIST, filename);
  const SRC_NAME = join(DIST, 'data');

  const tgzOptions: options = {
    src: SRC_NAME,
    dest: TGZ_NAME,
    tar: {
      ignore: (aName: string) => {
        const { base } = parse(aName);
        return base.startsWith('.');
      }
    }
  };

  const createTgz = bindNodeCallback(compress);
  const readBuffer = bindNodeCallback(readFile);
  const tgz$ = createTgz(tgzOptions);

  const url = `https://na.artifactory.swg-devops.com/artifactory/wce-wch-generic-local/${name}/${filename}`;

  const readTgz = (aName: string) => readBuffer(aName);
  const sendFile = (body: Buffer) =>
    ajax({
      url,
      method: 'PUT',
      headers: {
        [artifactory_username]: artifactory_password,
        'content-type': 'application/x-gzip'
      },
      createXHR,
      body
    }).pipe(
      mapTo(url),
      catchError(({ message }) => throwError(message))
    );

  // construct the stream

  const all$ = tgz$.pipe(
    switchMap(() => readTgz(TGZ_NAME)),
    switchMap(sendFile)
  );

  all$.subscribe(console.log, console.error);
}
