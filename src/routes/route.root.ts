import { FastifyInstance } from 'fastify';

const rootRoutes = (fastify: FastifyInstance) => (
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      querystring: {},
    },
    handler: (request, reply) => {
      reply.send({ message: `${request.url}::${request.method}>>HI THERE!` });
    },
  })
);

export default rootRoutes;
