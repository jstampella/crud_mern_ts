/* eslint-disable @typescript-eslint/no-explicit-any */
const paths: Record<string, any> = {
  '/auth/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 99,
                },
                password: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 15,
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User successfully registered',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['success'],
                  },
                  data: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
          headers: {
            'Set-Cookie': {
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
      security: [],
    },
  },
  '/auth/login': {
    post: {
      summary: 'Login endpoint',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                password: {
                  type: 'string',
                  minLength: 3,
                  maxLength: 15,
                },
                email: {
                  type: 'string',
                  format: 'email',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful login',
          schema: {
            $ref: '#/components/schemas/LoginResponse',
          },
          headers: {
            'Set-Cookie': {
              type: 'string',
            },
          },
        },
        '400': {
          description: 'Bad request',
          schema: {
            $ref: '#/components/schemas/ErrorResponse',
          },
        },
        '500': {
          description: 'Internal server error',
          schema: {
            $ref: '#/components/schemas/ErrorResponse',
          },
        },
      },
      security: [],
    },
  },
  '/auth/verify': {
    get: {
      summary: 'Verify Token',
      tags: ['Auth'],
      security: [
        {
          cookieAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Successful response',
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
              },
              data: {
                type: 'object',
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
        },
      },
    },
  },
};

export default paths;
