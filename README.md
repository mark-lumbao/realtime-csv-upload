# @mal/reatltime-csv-upload

> Date started: 6/21/2021

## Goal

1. **Create a realtime csv upload using the listed stack**

    - Node Streams
    - Fastify
    - Websockets

### Process Procedure

- Client submit a POST request to `{host:port}/upload/csv`.
- Request will have to contain a form data with a single csv file
- First, sanitize and then validate the request body for security and accuracy
- Instantiate a socket instance and return its url or path to client
- Parse csv to an array of object in the stream via csv-parser
- On each data event of the readable stream send a message to client via socket
- Continue this process until all items in csv are handled
