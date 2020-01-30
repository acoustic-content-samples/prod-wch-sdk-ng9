import { CreateNgDriverArtifactsSchema } from '@acoustic-content-sdk/tooling-contributions';

/**
 * Options for the `generate contributions` command.
 */
export interface Schema extends CreateNgDriverArtifactsSchema {
  /**
   * The path to the data directory
   */
  data?: string;
}
