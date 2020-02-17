import {
  CreateNgDriverArtifactsSchema,
  CreatePackageFromArtifactsSchema
} from '@acoustic-content-sdk/tooling-contributions';

/**
 * Options for the `generate contributions` command.
 */
export interface Schema
  extends CreateNgDriverArtifactsSchema,
    CreatePackageFromArtifactsSchema {
  /**
   * if set to true, generate an npm descriptor for the resources, defaults to false
   */
  package?: boolean;

  /**
   * The path to the data directory
   */
  data?: string;
}
