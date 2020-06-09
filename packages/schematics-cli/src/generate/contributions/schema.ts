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
   * Generate an npm descriptor for the resources, using the supplied package name.
   */
  package?: string;

  /**
   * The path to the data directory
   */
  data?: string;
}
