import { AuthoringAsset, Logger } from '@acoustic-content-sdk/api';
import { ensureDraftId } from '@acoustic-content-sdk/redux-utils';
import { WriteText } from '@acoustic-content-sdk/rest-api';
import { getProperty } from '@acoustic-content-sdk/utils';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

/**
 * Creates a resource for the provided {@link File} and returns the id of the created resource.
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aFile - the file to upload
 */
export function createResource(
  aWriteText: WriteText,
  aLogger: Logger,
  aFile: File
) {
  aLogger.info('Create resource for file', aFile);
  // build url
  const createResourceUrl = `authoring/v1/resources?name=${encodeURIComponent(
    aFile.name
  )}`;

  return aWriteText(createResourceUrl, aFile);
}

/**
 * Creates a new asset with a reference to the provided resource id.
 *
 * @param aWriteText - the write callback
 * @param aLogger - the logger
 * @param aResourceId - an existing resource id
 * @param isDraft - flag that controls if the asset is created as draft or ready item
 * @param aAssetId - id of the new asset to create (random id if not provided)
 */
export function createAsset(
  aWriteText: WriteText,
  aLogger: Logger,
  aResourceId: string,
  isDraft: boolean,
  aAssetId?: string,
  aAsset?: AuthoringAsset
): Observable<AuthoringAsset> {
  aLogger.info('Create draft asset with resource reference', aResourceId);
  // make sure to copy the alt text
  const altText = getProperty<any, 'altText'>(aAsset, 'altText');

  // build url
  const createAssetUrl = `authoring/v1/assets`;
  // store
  return aWriteText(createAssetUrl, {
    id: isDraft ? ensureDraftId(aAssetId || v4()) : aAssetId || v4(),
    altText,
    resource: aResourceId,
    status: isDraft ? 'draft' : 'ready'
  });
}

export function getUniqueIdentifierByIdAndAccessor(
  id: string,
  accessor: string
) {
  return `${id}:${accessor}`;
}
