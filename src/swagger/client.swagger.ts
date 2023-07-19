/* eslint-disable @typescript-eslint/no-explicit-any */
const paths: Record<string, any> = {
  '/client/': {
    post: {
      summary: 'Create a client',
      tags: ['Client'],
      security: [
        {
          cookieAuth: [],
        },
      ],
      parameters: [],
      responses: {
        '201': {
          description: 'Success',
          schema: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
              },
              data: {
                $ref: '#/definitions/Client',
              },
            },
            required: ['status', 'data'],
          },
        },
      },
    },
    get: {
      summary: 'Get clients',
      description: 'Get a list of clients',
      tags: ['Client'],
      security: [
        {
          cookieAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { type: 'string' }, data: { type: 'array', items: { type: 'object' } } },
                example: {
                  status: 'success',
                  data: [{ clientId: 'string', clientName: 'string', clientEmail: 'string', clientAddress: 'string' }],
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { type: 'string' }, message: { type: 'string' } },
                example: { status: 'error', message: 'No token, authorization denied' },
              },
            },
          },
        },
        '404': {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { type: 'string' }, message: { type: 'string' } },
                example: { status: 'error', message: 'No existe el id de usuario!' },
              },
            },
          },
        },
      },
    },
  },
  '/client/all': {
    get: {
      summary: 'Get all clients',
      tags: ['Client'],
      security: [
        {
          cookieAuth: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'page',
          description: 'Page number',
          schema: {
            type: 'integer',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'limit',
          description: 'Number of results per page',
          schema: {
            type: 'integer',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'dni',
          description: 'DNI of the client',
          schema: {
            type: 'integer',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'nombre',
          description: 'Name of the client',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'apellido',
          description: 'Last name of the client',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'sexo',
          description: 'Gender of the client',
          schema: {
            type: 'string',
          },
          required: false,
        },
        {
          in: 'query',
          name: 'telefono',
          description: 'Phone number of the client',
          schema: {
            type: 'integer',
          },
          required: false,
        },
      ],
      responses: {
        '200': {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                  },
                  data: {
                    type: 'array',
                    items: {},
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
          content: {},
        },
        '500': {
          description: 'Internal server error',
          content: {},
        },
      },
    },
  },
  '/client/{id}': {
    get: {
      tags: ['Client'],
      summary: 'Get client by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/Client',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '404': {
          description: 'Not Found',
        },
      },
      security: [
        {
          cookieAuth: [],
        },
      ],
    },
    put: {
      tags: ['Client'],
      summary: 'Update client by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                nombre: { type: 'string', minLength: 3, maxLength: 20 },
                apellido: { type: 'string', minLength: 3, maxLength: 20 },
                sexo: { type: 'string', minLength: 1, maxLength: 3 },
                telefono: { type: 'string', pattern: '^[0-9]{8,15}$' },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/Client',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '404': {
          description: 'Not Found',
        },
        '500': {
          description: 'Internal error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                  },
                  data: {
                    $ref: '#/components/schemas/InternalServerError',
                  },
                },
              },
            },
          },
        },
      },
      security: [
        {
          cookieAuth: [],
        },
      ],
    },
    delete: {
      tags: ['Client'],
      summary: 'Delete client by ID',
      description: '',
      parameters: [{ name: 'id', in: 'path', description: 'ID del cliente', required: true, schema: { type: 'string', format: 'mongoId' } }],
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { status: { type: 'string', example: 'success' }, data: { $ref: '#/components/schemas/IClient' } },
              },
            },
          },
        },
        '401': {
          description: 'No token, authorization denied',
          content: {
            'application/json': {
              schema: { type: 'object', properties: { status: { type: 'string', example: 'No token, authorization denied' } } },
            },
          },
        },
        '404': {
          description: 'Cliente no existe',
          content: { 'application/json': { schema: { type: 'object', properties: { status: { type: 'string', example: 'Cliente no existe' } } } } },
        },
        '500': { description: 'Internal Server Error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
      },
      security: [
        {
          cookieAuth: [],
        },
      ],
    },
  },
};

export default paths;
