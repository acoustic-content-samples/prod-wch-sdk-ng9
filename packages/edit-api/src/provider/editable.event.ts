/* Copyright IBM Corp. 2017 */


/**
 * Event issued by the edit provider.
 */
export interface WchEditableEvent {

    type: string;

    target: HTMLElement;

    data: any;
}

