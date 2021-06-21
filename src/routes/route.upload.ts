import { FastifyInstance } from 'fastify';
// @ts-ignore fastify-file-upload has no support yet for ts :(
import fileUpload from 'fastify-file-upload';
import FileType from '@app/types/files';
import reatimeUpload from './route.upload-csv';

const rootRoutes = async (fastify: FastifyInstance) => {
  fastify.register(fileUpload);
  fastify.register(reatimeUpload, { prefix: '/csv' });

  fastify.route({
    method: 'POST',
    url: '/',
    schema: {
      body: {
        type: 'object',
        properties: {
          file: { type: ['object', 'array'] },
        },
        required: ['file'],
      },
    },
    handler: (request, reply) => {
      const { files } = request.raw as unknown as { files: { file: FileType } };
      const { file: uploads } = files;

      if (!Array.isArray(uploads)) {
        /**
         * Do whatever you want to do with the file
         * for now, I only return the name and mimetype
         * to the client.
         */
        reply.send([{ name: uploads.name, mimetype: uploads.mimetype }]);
      } else {
        /**
         * Do whatever you want to do with the files
         * for now I only return the name and mimetype
         * to the client.
         */
        const fileArr = uploads.map((f: any) => ({
          name: f.name,
          mimetype: f.mimetype,
        }));

        reply.send(fileArr);
      }
    },
  });
};

export default rootRoutes;
