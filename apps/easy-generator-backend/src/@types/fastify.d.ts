import { JwtUser } from '#api/auth/auth.service.js';
import fastify from 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    user: JwtUser;
  }
}
