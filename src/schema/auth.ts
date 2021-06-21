const authSchema = ({
  username: {
    title: 'Username',
    type: 'string',
  },
  email: {
    title: 'Email Address',
    type: 'string',
    pattern: '.+@.+\\..+',
  },
  password: {
    title: 'Password',
    type: 'string',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#?!@$%^&*-])[a-zA-Z\\d#?!@$%^&*-]{8,}$',
  },
});

export const signUpPayloadScheme = ({
  body: {
    type: 'object',
    properties: authSchema,
    required: [...Object.keys(authSchema)],
  },
});

export const loginPayloadScheme = ({
  body: {
    type: 'object',
    properties: authSchema,
    required: [...Object.keys(authSchema)],
  },
});
