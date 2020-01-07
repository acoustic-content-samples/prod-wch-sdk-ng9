
export interface ErrorDetail {
    name: string;
    message: string;
    locale: string;
    parameters: any;
    stack?: string;
}

/**
 * JSON structure of an error response
 */
export interface ErrorResponse {
    requestId: string;
    service: string;
    version: string;
    description: string;
    errors: ErrorDetail[];
    message: string;
    statusCode: number;
}