import { FastifyInstance } from 'fastify';
import rootRoutes from './route.root';
import uploadRoutes from './route.upload';

const setup = async (fastify: FastifyInstance) => {
  await fastify.register(rootRoutes);
  await fastify.register(uploadRoutes, { prefix: '/upload' });
};

export default setup;
