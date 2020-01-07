/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { rxPipe } from '@acoustic-content-sdk/utils';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReadTextFile } from '../file/file';
import { rxGetWorkspace } from './config';
import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from './workspace-models';

/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
export function buildDefaultPath(project: WorkspaceProject): string {
  const root = project.sourceRoot
    ? `/${project.sourceRoot}/`
    : `/${project.root}/src/`;

  const projectDirName =
    project.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

export function rxGetProject<
  TProjectType extends ProjectType = ProjectType.Application
>(
  workspaceOrHost: WorkspaceSchema | ReadTextFile,
  projectName: string
): Observable<WorkspaceProject<TProjectType>> {
  const workspace$ = isWorkspaceSchema(workspaceOrHost)
    ? of(workspaceOrHost)
    : rxGetWorkspace(workspaceOrHost);

  return rxPipe(
    workspace$,
    map(
      (workspace) =>
        workspace.projects[projectName] as WorkspaceProject<TProjectType>
    )
  );
}

// TODO(hans): change this any to unknown when google3 supports TypeScript 3.0.
// tslint:disable-next-line:no-any
export function isWorkspaceSchema(
  workspace: any
): workspace is WorkspaceSchema {
  return !!(workspace && (workspace as WorkspaceSchema).projects);
}

// TODO(hans): change this any to unknown when google3 supports TypeScript 3.0.
// tslint:disable-next-line:no-any
export function isWorkspaceProject(project: any): project is WorkspaceProject {
  return !!(project && (project as WorkspaceProject).projectType);
}
