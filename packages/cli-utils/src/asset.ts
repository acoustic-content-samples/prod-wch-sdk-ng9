import {
  rxReadBinaryFile,
  rxWriteBinaryFile,
  rxWriteJsonFile
} from '@acoustic-content-sdk/rx-utils';
import { opShareLast, rxPipe } from '@acoustic-content-sdk/utils';
import { createHash, createHmac } from 'crypto';
import { getType } from 'mime';
import { join, normalize, parse } from 'path';
import { combineLatest, merge, Observable, UnaryFunction } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { bufferToIdentifier } from './guid';

const ASSET_SECRET = '@acoustic-content-sdk/cli-utils#asset';
const RESOURCE_SECRET = '@acoustic-content-sdk/cli-utils#resource';

function createSha256Digest(aData: Buffer | string, aSecret: string) {
  // produce the revision ID
  return createHmac('sha256', aSecret)
    .update(aData)
    .digest();
}

function createMd5Digest(aData: Buffer) {
  // produce the revision ID
  return createHash('md5')
    .update(aData)
    .digest()
    .toString('base64');
}

function createFileDescriptor(
  aAssetName: string,
  aSrcFile: string,
  aData: Buffer
): any {
  // parse
  const { ext } = parse(aSrcFile);
  // asset
  const assetDigest = createSha256Digest(aAssetName, ASSET_SECRET);
  const id = bufferToIdentifier(assetDigest);
  // resource
  const resourceDigest = createSha256Digest(aData, RESOURCE_SECRET);
  const resource = bufferToIdentifier(resourceDigest);
  // guess the mime type
  const mediaType = getType(aSrcFile);
  const fileSize = aData.length;
  // path of the resource
  const path = `/dxdam/${id.substr(0, 2)}/${id}/${id}${ext}`;
  // md5
  const digest = createMd5Digest(aData);
  // name
  const name = aAssetName;
  // returns the descriptor
  const result = {
    path,
    digest,
    id,
    rev: `0815-${id}`,
    resource,
    mediaType,
    classification: 'asset',
    assetType: 'file',
    isManaged: true,
    fileSize,
    name
  };
  // ok
  return result;
}

/**
 * Copies the asset and makes sure to create the required directory structure
 *
 * @param aAsset  - asset to copy
 * @param aDataDir  - data directory
 * @param aDescriptor - the asset descriptor
 * @param aMkdirs - the directory callback
 *
 * @returns the name of the copied file
 */
function copyAsset(
  aAsset: Buffer,
  aDataDir: string,
  aDescriptor: any,
  aMkdirs: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // create the target path
  const { path } = aDescriptor;
  const fullPath = normalize(join(aDataDir, 'assets', path));
  const { dir } = parse(fullPath);
  // copy
  return rxPipe(
    aMkdirs(dir),
    mergeMap(() => rxWriteBinaryFile(fullPath, aAsset))
  );
}

function copyDescriptor(
  aDataDir: string,
  aDescriptor: any,
  aMkdirs: UnaryFunction<string, Observable<string>>
): Observable<string> {
  // create the target path
  const { path, id } = aDescriptor;
  const fullPath = normalize(join(aDataDir, 'assets', path));
  const { dir, ext } = parse(fullPath);
  // filename
  const fileName = join(dir, `${id}${ext}_amd.json`);
  // copy
  return rxPipe(
    aMkdirs(dir),
    mergeMap(() => rxWriteJsonFile(fileName, aDescriptor))
  );
}

/**
 * Constructs a new asset descriptor
 *
 * @param aDataDir - target directory
 * @param aSrcFile - source file that represents the asset
 * @param aMkdirs - function to control directory creation
 *
 * @returns observable with the created files
 */
export function rxCreateAsset(
  aDataDir: string,
  aAssetName: string,
  aSrcFile: string,
  aMkdirs: UnaryFunction<string, Observable<string>>
) {
  // load the source file
  const src$: Observable<Buffer> = rxPipe(
    rxReadBinaryFile(aSrcFile),
    opShareLast
  );
  // compule the descriptor
  const desc$ = rxPipe(
    src$,
    map((data: Buffer) => createFileDescriptor(aAssetName, aSrcFile, data)),
    opShareLast
  );
  // binary asset
  const writtenAsset$ = rxPipe(
    combineLatest([src$, desc$]),
    mergeMap(([src, desc]) => copyAsset(src, aDataDir, desc, aMkdirs))
  );
  // descriptor
  const writtenDesc$ = rxPipe(
    desc$,
    mergeMap((desc) => copyDescriptor(aDataDir, desc, aMkdirs))
  );
  // combine
  return merge(writtenAsset$, writtenDesc$);
}
