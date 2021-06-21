import Fastify from 'fastify';
import setupRoutes from '@app/routes';

const fastify = Fastify({
  logger: true,
});
/**
 * Initialize routes here
 */
setupRoutes(fastify);

const start = () => {
  try {
    fastify.listen(process.env.PORT || 1111, process.env.HOST);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

export default start;
