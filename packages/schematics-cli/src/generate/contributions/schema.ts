import { CreateDriverArtifactsSchema } from '@acoustic-content-sdk/tooling';

/**
 * Options for the `generate contributions` command.
 */
export interface Schema extends CreateDriverArtifactsSchema {
  /**
   * The path to the data directory
   */
  data?: string;
}
