import { FastifyInstance } from 'fastify';
import fAsync from 'fs/promises';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import FileType from 'src/types/files';
import { fileUploadSchema } from 'src/schema/upload';
import dirCheck from 'src/utils/route/upload';

const rootRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: fileUploadSchema,
    handler: async (request, reply) => {
      const { files } = request.raw as unknown as { files: { file: FileType } };
      const { file } = files;

      const dirPath = path.join(process.cwd(), 'lib/temp');
      const filePath = path.join(dirPath, file.name);

      if (file.mimetype !== 'text/csv') {
        reply.code(400).send(new Error('Invalid file format'));
      } else {
        /**
         * Create temp folder in there's none.
         */
        await dirCheck(dirPath);
        /**
         * Write file temporarily
         */
        await fAsync.writeFile(filePath, file.data);
        /**
         * Create a readable string pointing to the file we just created.
         */
        const rStream = fs.createReadStream(filePath, 'utf8').pipe(csv());
        /**
         * Once read stream has been create notify user.
         * Here we should create a socket instance and send
         * details so user can start listening for updates.
         */
        reply.send('Process has started');
        /**
         * On each data event in the read stream we should run what we
         * want to the data and send notification to user on each failure
         * or success.
         */
        rStream.on('data', (chunk) => fastify.log.info(chunk));
        /**
         * On read stream end we should run a cleanup process where
         * we notify user that the process has ended. Delete the temporary
         * file we created. Then end the instance of the socket.
         */
        rStream.on('end', async () => fAsync.rm(filePath));
      }
    },
  });
};

export default rootRoutes;
