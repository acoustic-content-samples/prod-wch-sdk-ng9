import { RenderingContext } from '@acoustic-content-sdk/api';
import { getItemStatus, ItemStatus } from './status';

describe('status', () => {
  it('should read the published status', () => {
    const data: RenderingContext = require('./958db30d-a0f3-4c26-808b-54d69be15db8.json');

    const status = getItemStatus(data);

    expect(status).toEqual(ItemStatus.PUBLISHED);
  });
});
