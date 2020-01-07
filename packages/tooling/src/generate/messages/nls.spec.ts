import { NLS_LOCALE, NLS, NLS_KEY } from './nls';

describe('nls', () => {
  it('should format a message', () => {
    // get the messages
    const msg = NLS(NLS_LOCALE.DE);

    console.log(
      msg[NLS_KEY.PHOTOS]({
        numPhotos: 10,
        name: 'Carsten',
        takenDate: Date.now()
      })
    );
  });
});
