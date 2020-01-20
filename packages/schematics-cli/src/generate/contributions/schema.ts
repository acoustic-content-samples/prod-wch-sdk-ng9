import { CreateDriverArtifactsSchema } from '@acoustic-content-sdk/tooling';

export interface Schema extends CreateDriverArtifactsSchema {
  /**
   * The path to the data directory
   */
  data?: string;
}
