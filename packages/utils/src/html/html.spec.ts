import { escapeHtml } from './html';

describe('html', () => {
  it('should escape simple html', () => {
    const res = escapeHtml('This is < than that. "quoted".');

    expect(res).toBe('This is &lt; than that. &quot;quoted&quot;.');
  });
});
