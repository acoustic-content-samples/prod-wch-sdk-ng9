/**
 * Artifact modes, the values need to match the option
 * selections for the `Page Contribution` type `354743b2-f89a-482b-b447-2b5a2367c8bd`
 */
export enum ArtifactMode {
  ALWAYS = 'always',
  LIVE = 'live',
  PREVIEW = 'preview'
}

export interface CreateDriverArtifactsSchema {
  /**
   * The name of the project.
   */
  project?: string;
  /**
   * The name of the configuration to use
   */
  configuration?: string;
  /**
   * mode
   */
  mode?: string;
  /**
   * a comma separated list of tags
   */
  tag?: string;
}
