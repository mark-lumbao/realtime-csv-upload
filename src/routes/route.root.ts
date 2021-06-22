import { FastifyInstance } from 'fastify';
import fs from 'fs/promises';
import path from 'path';

const rootRoutes = (fastify: FastifyInstance) => (
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {},
    },
    handler: async (_, reply) => {
      reply.raw.setHeader('Content-Type', 'text/html');
      reply.raw.end(await fs.readFile(path.join(process.cwd(), 'src', 'public', 'index.html')));
    },
  })
);

export default rootRoutes;
