import { FileDescriptor } from '@acoustic-content-sdk/tooling';
import { Observable } from 'rxjs';

export interface CreatePackageFromArtifactsSchema {
  /**
   * optinally the license, defaults to MIT
   */
  license?: string;
  /**
   * a comma separated list of tags
   */
  tag?: string;
  /**
   * optionally the explicit list of files to include
   */
  files$?: Observable<FileDescriptor<any>>;
  /**
   * Location of the data directory, defaults to 'data'. The
   * package artifacts will be created in the parent folder of the data folder
   */
  data?: string;
}
