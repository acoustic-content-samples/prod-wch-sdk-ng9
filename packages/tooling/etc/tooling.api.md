## API Report File for "@acoustic-content-sdk/tooling"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { AuthoringAsset } from '@acoustic-content-sdk/api';
import { AuthoringContentItem } from '@acoustic-content-sdk/api';
import { AuthoringLayoutItem } from '@acoustic-content-sdk/api';
import { AuthoringLayoutMapping } from '@acoustic-content-sdk/api';
import { AuthoringType } from '@acoustic-content-sdk/api';
import { BaseAuthoringItem } from '@acoustic-content-sdk/api';
import { BiFunction } from '@acoustic-content-sdk/utils';
import { BinaryLike } from 'crypto';
import { Credentials } from '@acoustic-content-sdk/cli-credentials';
import { experimental } from '@angular-devkit/core';
import { JSONObject } from '@acoustic-content-sdk/utils';
import { LoggerService } from '@acoustic-content-sdk/api';
import { MonoTypeOperatorFunction } from 'rxjs';
import { Observable } from 'rxjs';
import { OperatorFunction } from 'rxjs';
import { Predicate } from '@acoustic-content-sdk/utils';
import { UnaryFunction } from 'rxjs';

// @public
export function acceptJsonFile(aFile: ReadDirectoryEntry): boolean;

// @public (undocumented)
export function addToWchToolsDependencies(aDeps: string[], aPkg: any): void;

// @public
export const anyToBuffer: (aValue: any) => Buffer;

// @public (undocumented)
export type AuthoringItem = AuthoringContentItem | AuthoringType | AuthoringLayoutItem | AuthoringLayoutMapping | AuthoringAsset;

// @public (undocumented)
export function blackWhiteList(aInclude?: string[], aExclude?: string[]): Predicate<string>;

// @public
export function bufferToIdentifier(aBuffer: Uint8Array): string;

// @public (undocumented)
export const camelCase: (aValue: string) => string;

// @public (undocumented)
export function canHaveLayout(aType: AuthoringType): boolean;

// Warning: (ae-forgotten-export) The symbol "Schema" needs to be exported by the entry point public_api.d.ts
//
// @public (undocumented)
export function canonicalizeAssets(options: Schema): (aReadDir: ReadDirectory, logSvc?: LoggerService) => Observable<FileDescriptor<BaseAuthoringItem>>;

// @public
export function canonicalizeJson(aData: any): any;

// @public (undocumented)
export const classCase: (aValue: string) => string;

// @public (undocumented)
export const constantCase: (aValue: string) => string;

// @public
export const createChalkLoggerService: () => import("@acoustic-content-sdk/api").LoggerService;

// @public (undocumented)
export function createFileDescriptor<T>(aName: string, aValue: T): FileDescriptor<T>;

// @public
export function createGuid(aId: BinaryLike, aSecret?: string): string;

// @public
export function createGuidFromBuffer(aBuffer: Buffer): string;

// @public
export const createReadBuffer: (aRoot: string) => ReadBuffer;

// @public (undocumented)
export function createReadDirectory(aRoot: string): ReadDirectory;

// @public
export const createReadTextFile: (aRoot: string) => ReadTextFile;

// @public (undocumented)
export function createRevision(aObj: any, aSecret?: string): string;

// @public (undocumented)
export function createTypePredicate(aOptions: {
    include?: string[];
    exclude?: string[];
}): Predicate<AuthoringType>;

// @public (undocumented)
export interface DataOverlaySchema {
    src?: string;
}

// @public (undocumented)
export const dotCase: (aValue: string) => string;

// @public (undocumented)
export function ensureDirPath(aDir: string): string;

// @public (undocumented)
export function ensureLeadingSlash(aUrl: string): string;

// @public (undocumented)
export function ensureTrailingSlash(aUrl: string): string;

// @public
export type FileDescriptor<T> = [string, T];

// @public
export function findSdkVersion(aReadFile: ReadTextFile): Observable<string>;

// @public
export function findSdkVersionFromPkg(aPackage: any): string;

// @public
export const fixPath: (aPath: string) => string;

// @public
export function generateDataOverlay(aOptions: DataOverlaySchema): (aReadText: ReadTextFile, aReadDir: ReadDirectory, aLogSvc?: LoggerService) => Observable<FileDescriptor<Buffer>>;

// Warning: (ae-forgotten-export) The symbol "Schema" needs to be exported by the entry point public_api.d.ts
//
// @public (undocumented)
export function generateKeys(options: Schema_2): (aReadDir: ReadDirectory, aLogSvc?: LoggerService) => import("rxjs").Observable<import("../../public_api").FileDescriptor<AuthoringContentItem>>;

// Warning: (ae-forgotten-export) The symbol "Schema" needs to be exported by the entry point public_api.d.ts
//
// @public (undocumented)
export function generateLayout(options: Schema_3): (aReadDir: ReadDirectory, logSvc?: LoggerService) => import("rxjs").Observable<import("../../public_api").FileDescriptor<string | Buffer | import("@acoustic-content-sdk/api").AuthoringLayoutMapping | import("@acoustic-content-sdk/api").AuthoringLayoutItem>>;

// Warning: (ae-forgotten-export) The symbol "Schema" needs to be exported by the entry point public_api.d.ts
//
// @public (undocumented)
export function generateLayouts(options: Schema_4): (aReadDir: ReadDirectory, logSvc?: LoggerService) => import("rxjs").Observable<import("../../public_api").FileDescriptor<string | Buffer | import("@acoustic-content-sdk/api").AuthoringLayoutMapping | import("@acoustic-content-sdk/api").AuthoringLayoutItem>>;

// @public
export function getOrganization(aPackageName: string): string;

// @public (undocumented)
export function hasTrailingSlash(aUrl: string): boolean;

// @public
export function isFileDescriptor<T>(aValue: any): aValue is FileDescriptor<T>;

// @public (undocumented)
export interface JsonEntry<T> {
    // (undocumented)
    entry: T;
    // (undocumented)
    id: string;
    // (undocumented)
    path: string;
}

// @public (undocumented)
export type JsonEntryMap<T> = Record<string, JsonEntry<T>>;

// @public (undocumented)
export const kebabCase: (aValue: string) => string;

// @public (undocumented)
export function logFileDescriptor<T>(): MonoTypeOperatorFunction<FileDescriptor<T>>;

// Warning: (ae-forgotten-export) The symbol "JsonSchemaForNpmPackageJsonFiles" needs to be exported by the entry point public_api.d.ts
//
// @public (undocumented)
export type PackageJson = JsonSchemaForNpmPackageJsonFiles;

// @public (undocumented)
export enum ProjectType {
    // (undocumented)
    Application = "application",
    // (undocumented)
    Library = "library"
}

// @public (undocumented)
export type ReadBuffer = UnaryFunction<string, Observable<Buffer>>;

// @public
export type ReadDirectory = (aBaseDir: string, aAccept?: Predicate<ReadDirectoryEntry>) => Observable<FileDescriptor<Buffer>>;

// @public
export interface ReadDirectoryEntry {
    // (undocumented)
    isDirectory: boolean;
    // (undocumented)
    path: string;
}

// @public (undocumented)
export type ReadTextFile = UnaryFunction<string, Observable<string>>;

// @public
export const readTextFile: (aReadBuffer: ReadBuffer, aEncoding?: string) => ReadTextFile;

// @public (undocumented)
export function relativePath(aSrc: string, aDst: string): string;

// @public
export const rxDataDirectory: (aReadText: ReadTextFile) => OperatorFunction<FileDescriptor<any>, string>;

// @public
export const rxExists: (aFile: string, aRead: UnaryFunction<string, Observable<any>>) => Observable<boolean>;

// @public
export function rxFindAuthoringAssets(aRoot: string, aTree: ReadDirectory): Observable<JsonEntry<AuthoringAsset>>;

// @public
export function rxFindAuthoringContent(aRoot: string, aTree: ReadDirectory): Observable<JsonEntry<AuthoringContentItem>>;

// @public
export function rxFindAuthoringLayoutMappings(aRoot: string, aTree: ReadDirectory): Observable<JsonEntry<AuthoringLayoutMapping>>;

// @public
export function rxFindAuthoringLayouts(aRoot: string, aTree: ReadDirectory): Observable<JsonEntry<AuthoringLayoutItem>>;

// @public
export function rxFindAuthoringTypes(aRoot: string, aTree: ReadDirectory): Observable<JsonEntry<AuthoringType>>;

// @public (undocumented)
export function rxFindDataDir(host: ReadTextFile, options?: {
    data?: string;
}): Observable<string>;

// @public
export function rxFindPackageJson(aDir: string, aReadFile: ReadTextFile): Observable<any>;

// @public
export function rxFindProject<TProjectType extends ProjectType = ProjectType.Application>(workspaceOrHost: WorkspaceSchema | ReadTextFile, options: {
    project?: string;
}): Observable<WorkspaceProject<TProjectType>>;

// @public
export function rxFindProjectName(workspaceOrHost: WorkspaceSchema | ReadTextFile, options: {
    project?: string;
}): Observable<string>;

// @public (undocumented)
export function rxFindWchToolsOptions(host: ReadTextFile, options?: {
    data?: string;
}): Observable<string>;

// @public
export function rxGetDependencies(aReadText: ReadTextFile, aRoot?: string): Observable<FileDescriptor<any>>;

// @public (undocumented)
export function rxGetWorkspace(aReadText: ReadTextFile): Observable<WorkspaceSchema>;

// @public (undocumented)
export function rxGetWorkspacePath(aReadText: ReadTextFile): Observable<string>;

// @public
export function rxLocateRootDir(aBaseDir?: string): Observable<string>;

// @public
export function rxReadAuthoringContent(aRoot: string, aTree: ReadDirectory): Observable<JsonEntryMap<AuthoringContentItem>>;

// @public
export function rxReadAuthoringLayoutMappings(aRoot: string, aTree: ReadDirectory): Observable<JsonEntryMap<AuthoringLayoutMapping>>;

// @public
export function rxReadAuthoringLayouts(aRoot: string, aTree: ReadDirectory): Observable<JsonEntryMap<AuthoringLayoutItem>>;

// @public
export function rxReadAuthoringTypes(aRoot: string, aTree: ReadDirectory): Observable<JsonEntryMap<AuthoringType>>;

// @public
export function rxReadBuffer<T>(aFile: string, aHost: ReadTextFile): Observable<T>;

// @public
export function rxReadDir(aBaseDir: string, aAccept?: Predicate<ReadDirectoryEntry>): Observable<FileDescriptor<Buffer>>;

// @public
export function rxReadJsonFile<T>(aFile: string, aHost: ReadTextFile): Observable<T>;

// @public
export function rxWchToolsManifest(aName: string): OperatorFunction<FileDescriptor<any>, FileDescriptor<any>>;

// @public
export const rxWriteFileDescriptor: <T>(aWriteBuffer: BiFunction<string, Buffer, Observable<string>>) => MonoTypeOperatorFunction<FileDescriptor<T>>;

// @public
export function rxWriteJsonFile(aName: string, aValue: any, aHost: WriteTextFile): Observable<string>;

// @public
export function selectOptionsForTarget(aTarget?: string, aConfiguration?: string): UnaryFunction<WorkspaceProject, JSONObject>;

// @public (undocumented)
export function serializeJson(aData: any): string | undefined;

// @public (undocumented)
export const TYPE_SUFFIX = "Type";

// @public @deprecated (undocumented)
export const TYPES_FOLDER = "types";

// @public (undocumented)
export const WCHTOOLS_DEPENDENCIES = "wchtools-dependencies";

// @public (undocumented)
export const WCHTOOLS_FOLDER_ASSET = "assets";

// @public (undocumented)
export const WCHTOOLS_FOLDER_CONTENT = "content";

// @public (undocumented)
export const WCHTOOLS_FOLDER_CONTENT_TYPE = "types";

// @public (undocumented)
export const WCHTOOLS_FOLDER_LAYOUT = "layouts";

// @public (undocumented)
export const WCHTOOLS_FOLDER_LAYOUT_MAPPING = "layout-mappings";

// @public (undocumented)
export function wchToolsCleanup<T>(aItem: FileDescriptor<T>): FileDescriptor<T>;

// @public
export function wchToolsFileDescriptor<T extends AuthoringItem>(aItem: T | FileDescriptor<T>): FileDescriptor<T>;

// @public (undocumented)
export const wchToolsGetCredentials: (aApiUrl: string) => Observable<Credentials>;

// @public (undocumented)
export interface WorkspaceProject<TProjectType extends ProjectType = ProjectType.Application> extends experimental.workspace.WorkspaceProject {
    // Warning: (ae-forgotten-export) The symbol "WorkspaceTargets" needs to be exported by the entry point public_api.d.ts
    architect?: WorkspaceTargets<TProjectType>;
    projectType: ProjectType;
    targets?: WorkspaceTargets<TProjectType>;
}

// @public (undocumented)
export interface WorkspaceSchema extends experimental.workspace.WorkspaceSchema {
    // (undocumented)
    projects: {
        [key: string]: WorkspaceProject<ProjectType.Application | ProjectType.Library>;
    };
}

// @public (undocumented)
export type WriteBuffer = BiFunction<string, Buffer, Observable<string>>;

// @public
export function writeFiles<T>(aRoot: string, aOverride?: boolean): MonoTypeOperatorFunction<FileDescriptor<T>>;

// @public (undocumented)
export type WriteTextFile = BiFunction<string, string, Observable<string>>;

// @public
export const writeTextFile: (aWriteBuffer: BiFunction<string, Buffer, Observable<string>>, aEncoding?: BufferEncoding) => BiFunction<string, string, Observable<string>>;


```
