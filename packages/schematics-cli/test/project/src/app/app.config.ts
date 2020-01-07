// import the options file
        import * as OPTIONS from '../../data/.wchtoolsoptions.json';

        /**
         * Returns the API URL from the wchtools options file, so we have a single
         * source. This has to be a function, otherwise it would not work with AOT.
         */
        export function apiUrl(): string {
          return OPTIONS['x-ibm-dx-tenant-base-url'];
        }
        