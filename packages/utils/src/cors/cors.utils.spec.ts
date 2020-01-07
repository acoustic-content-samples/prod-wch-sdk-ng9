import { NOOP_LOGGER } from './../logger/noop.logger';
import { corsTestOrigin } from './cors.utils';

describe('cors.utils', () => {

    const logger = NOOP_LOGGER;

    it('should test the origin', () => {

        const list = ['http://www.example.com', 'http://www.example2.com:8080'];

        expect(corsTestOrigin('http://www.example.com', list)).toBeTruthy();
        expect(corsTestOrigin('http://www.example2.com:8080', list)).toBeTruthy();
        expect(corsTestOrigin('http://www.example2.com:9090', list)).toBeFalsy();
    });

    it('should test wildcard origins', () => {

        const list = ['*', 'http://www.example.com', 'http://www.example2.com:8080'];

        expect(corsTestOrigin('http://www.example.com', list)).toBeTruthy();
        expect(corsTestOrigin('http://www.example2.com:8080', list)).toBeTruthy();
        expect(corsTestOrigin('http://www.example2.com:9090', list)).toBeTruthy();
    });


});

