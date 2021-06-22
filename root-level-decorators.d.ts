import camelCase from 'src/utils/camelCase';
import dirCheck from 'src/utils/dirCheck';
/**
 * Only declare types for root level decorators here.
 * For some reason fastify's decorators are not type-safe yet.
 * So it is much better to do this on a global scope rather
 * than on a specific route or plugin to maintain stability.
 */
declare module 'fastify' {
  interface FastifyInstance {
    camelCase: typeof camelCase;
    dirCheck: typeof dirCheck;
  }
}
