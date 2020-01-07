/* Copyright IBM Corp. 2017 */
import { move, MoveOptions } from 'fs-extra';
import { bindNodeCallback, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

// move
const _rxMove: (
  aSrc: string,
  aDst: string,
  aOpts: MoveOptions
) => Observable<any> = bindNodeCallback(move);
const _rxMoveFile = (aSrcFile: string, aTargetFile: string) =>
  _rxMove(aSrcFile, aTargetFile, { overwrite: true }).pipe(mapTo(aTargetFile));

export { _rxMoveFile as rxMoveFile };
