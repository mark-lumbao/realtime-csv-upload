import Fastify from 'fastify';
import setupRoutes from 'src/routes';
import camelCase from 'src/utils/camelCase';
import dirCheck from 'src/utils/dirCheck';

const fastify = Fastify({
  logger: true,
});
/**
 * Global scope decorators
 */
fastify.decorate('camelCase', camelCase);
fastify.decorate('dirCheck', dirCheck);
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
