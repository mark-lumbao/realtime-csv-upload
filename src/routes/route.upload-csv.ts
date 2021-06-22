import { FastifyInstance } from 'fastify';
import fAsync from 'fs/promises';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import WebSocket from 'ws';
import crypto from 'crypto';
import FileType from 'src/types/files';
import { fileUploadSchema } from 'src/schema/upload';

const csvUploadRoute = async (fastify: FastifyInstance) => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: fileUploadSchema,
    handler: async (request, reply) => {
      const { files } = request.raw as unknown as { files: { file: FileType } };
      const { file } = files;

      const dirPath = path.join(process.cwd(), 'lib/temp');
      const filePath = path.join(
        dirPath,
        // below generates a unique a secure name for the temporary file
        crypto.randomBytes(Math.ceil(15 / 2)).toString('hex').slice(0, 15),
      );

      if (file.mimetype !== 'text/csv') reply.code(400).send(new Error('Invalid file format'));
      else {
        await fastify.dirCheck(dirPath); // Create temp folder in there's none.
        await fAsync.writeFile(filePath, file.data); // Write file temporarily

        const wss = new WebSocket.Server({ port: Number(process.env.WSPORT) || 4000 });
        reply.send(`ws://${process.env.HOST}:${process.env.WSPORT}`);

        wss.on('connection', (socketStream) => {
          /**
           * Create a readable stream pointing to the temporary file that was created.
           */
          const rStream = fs.createReadStream(filePath, 'utf8')
            .pipe(csv({
              mapHeaders: ({ header }) => fastify.camelCase(header),
            }));
          /**
           * Once read stream has been created log the process.
           */
          socketStream.on('open', () => fastify.log.info('A new socket was created for an upload process.'));
          /**
           * On each data event in the read stream we can do whatever we
           * want to the data and send notification to user on each failure
           * or success. In this example I am only sending the chunk the user.
           */
          rStream.on('data', async (chunk) => {
            socketStream.send(JSON.stringify(chunk));
          });
          /**
           * On read stream end we should run a cleanup process where we:
           * Delete the temporary the temporary file and close the webscoket instance.
           */
          rStream.on('end', async () => {
            fAsync.rm(filePath);
            wss.close();
          });

          wss.on('close', () => fastify.log.info('Process has ended'));
        });
      }
    },
  });
};

export default csvUploadRoute;
