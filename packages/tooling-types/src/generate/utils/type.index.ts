import { TypeClass, TypeRegistry } from './type.reg';
import { Observable, of } from 'rxjs';
import { TemplateType } from '@acoustic-content-sdk/hbs-tooling';
import {
  FileDescriptor,
  createFileDescriptor
} from '@acoustic-content-sdk/tooling';
import { rxPipe } from '@acoustic-content-sdk/utils';
import { mergeMap, map } from 'rxjs/operators';

function createTypeIndexContext(
  aTypeDef: TypeClass,
  aTypeReg: TypeRegistry
): Observable<any> {
  return of(aTypeDef);
}

export function createTypeIndex(
  aTypeDef: TypeClass,
  aTypeReg: TypeRegistry,
  aTemplate$: Observable<TemplateType>
): Observable<FileDescriptor<string>> {
  // prepare the context
  const rxCtx = createTypeIndexContext(aTypeDef, aTypeReg);
  // target name
  const dstFile = `${aTypeDef.folder}/index.ts`;
  // execute the template
  const newContent = rxPipe(
    rxCtx,
    mergeMap((ctx) =>
      rxPipe(
        aTemplate$,
        map((tmp) => tmp(ctx))
      )
    )
  );
  // write the content
  return rxPipe(
    newContent,
    map((data) => createFileDescriptor(dstFile, data))
  );
}
