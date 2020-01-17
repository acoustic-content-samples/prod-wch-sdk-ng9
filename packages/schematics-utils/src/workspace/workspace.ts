import { normalize, workspaces } from '@angular-devkit/core';
import { NodeJsAsyncHost } from '@angular-devkit/core/node';

/**
 * Reads a workspace definition based on a root path
 *
 * @param aRoot - the root path
 *
 * @returns the workspace definition
 */
export function readWorkspace(aRoot: string) {
  return workspaces.readWorkspace(
    normalize(aRoot),
    workspaces.createWorkspaceHost(new NodeJsAsyncHost())
  );
}
