import { FastifyInstance } from 'fastify';
import FileType from '@app/types/files';

const rootRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          file: { type: 'object' },
        },
        required: ['file'],
      },
    },
    handler: (request, reply) => {
      const { files } = request.raw as unknown as { files: { file: FileType } };
      const { file: uploads } = files;

      if (uploads.mimetype !== 'text/csv') {
        reply.code(400).send(new Error('Invalid file format'));
      } else {
        /**
         * As planned, here, we will start processing each csv row items
         * and notify the client on each success via socket.io api
         */
        reply.send([{ name: uploads.name, mimetype: uploads.mimetype }]);
      }
    },
  });
};

export default rootRoutes;
