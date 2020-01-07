import { canonicalizeJSON } from '@acoustic-content-sdk/schematics-utils';
import { jsonStringify } from '@acoustic-content-sdk/utils';
import { createHmac } from 'crypto';

const SECRET = 'revision IDs suck';

function _addRevisionId<T>(aDoc: T): T {
  // create the content to produce the SHA256 on
  const normDoc = canonicalizeJSON(aDoc);
  const data = jsonStringify(normDoc);
  // produce the revision ID
  const revId = createHmac('sha256', SECRET)
    .update(data)
    .digest('hex');
  // update
  normDoc.rev = `0815-${revId}`;
  // ok
  return normDoc;
}

export { _addRevisionId as addRevisionId };
