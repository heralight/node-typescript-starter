import { APIErrorCode, ErrorPayload } from '../../types/app.types';
import { isString } from 'lodash';

export class HttpException extends Error {
    code: number;
    status: number;
    isPublic: boolean;

    /**
     * Creates an HTTP Exception
     * usually used inside controllers
     * @param {string | ErrorPayload} payload
     * @param {boolean} isPublic - defines if the error should be reported to the client
     */
    constructor(payload: string | ErrorPayload, isPublic = true) {
        super(isString(payload) ? payload : payload.message);

        this.status = isString(payload) ? 500 : (payload.code || 500);
        this.code = isString(payload) ? APIErrorCode.GENERAL_ERROR : (payload.code || APIErrorCode.GENERAL_ERROR);
        this.isPublic = isPublic;
    }
}