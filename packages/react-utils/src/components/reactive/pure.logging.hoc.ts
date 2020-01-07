import { ComponentClass, createElement } from 'react';

import { PureLoggingComponent } from './pure.logging.component';
import { DelegateComponent } from './rx.hoc';

/**
 * Creates a higher order component for lifecycle logging purposes
 *
 * @param aName  - name used for logging
 * @param aDelegate - delegate component
 *
 * @returns the component class
 */
export function pureLoggingComponent<P, S>(
  aName: string,
  aDelegate: DelegateComponent<P, S>
): ComponentClass<P, S> {
  return class extends PureLoggingComponent<P, S> {
    /**
     * Initialize our new component
     *
     * @param aInitial - the initial props
     */
    constructor(aInitial: Readonly<P>) {
      super(aName, aInitial);
    }

    render() {
      return createElement(aDelegate, this.props);
    }
  };
}
