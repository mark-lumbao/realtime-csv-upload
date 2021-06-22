# @mal/reatltime-csv-upload

> Date started: 6/21/2021

## Goal

1. **Create a realtime csv upload using the listed stack**

    - Node Streams
    - Fastify
    - Websockets

### Process Procedure

- Client submit a POST request to `{host:port}/upload/csv`.
- Request will have to contain a form data with csv file
- Server will first sanitize then validate the request body for security
- Instantiate a socket instance and return its details to client
- Convert csv to an array of data then push it to a readable stream instance
- On data event of readable stream send a message to client via socket
- Continue this process until all items in csv is handled
