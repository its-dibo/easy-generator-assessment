export class ErrorResponse {
  /**
   * the error message
   * @example 'duplicate key value violates unique constraint'
   */
  message: string;
  /**
   * the endpoint that caused the error
   * @example 'GET /example'
   */
  request?: string;

  /**
   * the error code
   * @example 'DB_ERR'
   */
  code?: string;
}
