import {
  ProjectType,
  WorkspaceProject,
  WorkspaceSchema
} from '@acoustic-content-sdk/tooling';
import { getPath } from '@acoustic-content-sdk/utils';

/**
 * Extracts the project from a workspace
 *
 * @param aName - the project name
 * @param aWorkspace - the workspace schema
 *
 * @returns the project
 */
export const getProject = (aName: string, aWorkspace: WorkspaceSchema) =>
  getPath<WorkspaceProject<ProjectType.Application>>(aWorkspace, [
    'projects',
    aName
  ]);
