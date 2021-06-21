export const fileUploadSchema = ({
  body: {
    type: 'object',
    properties: {
      file: { type: 'object' },
    },
    required: ['file'],
  },
});

export const multiFileUploadSchema = ({
  body: {
    type: 'object',
    properties: {
      file: { type: ['object', 'array'] },
    },
    required: ['file'],
  },
});
