import { WorkspaceNodeModulesArchitectHost } from '@angular-devkit/architect/node';
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

/**
 * Reads the architect host from a root directory. The host allows
 *
 * @param aRoot - root directory of the project
 * @returns the architekt host that can be used to decode information about the project
 */
export function readArchitectHost(aRoot: string) {
  return readWorkspace(aRoot).then(
    (ws) => new WorkspaceNodeModulesArchitectHost(ws.workspace, aRoot)
  );
}
