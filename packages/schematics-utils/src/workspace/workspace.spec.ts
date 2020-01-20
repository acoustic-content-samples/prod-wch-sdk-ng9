import { WorkspaceNodeModulesArchitectHost } from '@angular-devkit/architect/node';
import { Target } from '@angular-devkit/architect';
import { ASSET_ROOT } from '../assets/assets';
import { join } from 'path';
import { readWorkspace } from './workspace';
import { anyToString } from '@acoustic-content-sdk/utils';

describe('workspace', () => {
  const PROTO_ROOT = join(ASSET_ROOT, 'proto-sites-next-app');

  it('should read a workspace', async () => {
    // construct the workspace
    const ws = await readWorkspace(PROTO_ROOT);

    const project: string = anyToString(ws.workspace.extensions.defaultProject);
    expect(project).toBeDefined();

    const arch = new WorkspaceNodeModulesArchitectHost(
      ws.workspace,
      PROTO_ROOT
    );

    const target: Target = {
      project,
      configuration: 'production, edit',
      target: 'build'
    };

    const opts = await arch.getOptionsForTarget(target);

    expect(opts.main).toBe('src/main.edit.ts');
  });
});
