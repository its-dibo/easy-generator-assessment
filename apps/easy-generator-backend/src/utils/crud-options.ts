import { Public } from '#api/auth/guards/auth.guard.js';
import { ErrorResponse } from '#types/errors-response.dto.js';
import { ControllerOptions } from '@impactor/nest';

/**
 * global crud options
 */
export function crudOptions(
  model: any,
  opts: ControllerOptions,
  relations?: string[],
): ControllerOptions {
  return {
    ...opts,
    model,
    maxLimit: 50,
    query:
      typeof opts.query === 'string'
        ? opts.query
        : {
            ...opts?.query,
            order: { created_at: 'DESC', ...opts?.query?.order },
            relations: [
              'created_by',
              ...(opts.query?.relations || []),
              ...(relations || []),
            ],
          },
    errorResponseModel: ErrorResponse,
    routes: opts.routes.map((route) => {
      if (route.httpMethod === 'GET') {
        route.decorators.push(Public());
      }
      return route;
    }),
  };
}
