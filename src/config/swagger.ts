import swaggerJsdoc from 'swagger-jsdoc';
import paths from '../swagger/auth.swagger';
import paths2 from '../swagger/client.swagger';

interface MyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const options: MyObject = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ABM Backend',
      version: '1.0.0',
      description: 'Api del ABM de usuarios con autentificacion',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}/api`, // Reemplaza con la URL de tu backend
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        UserLogin: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 3,
              maxLength: 15,
            },
          },
          required: ['email', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
            },
            data: {
              type: 'object',
              properties: {
                responseUser: {
                  type: 'object',
                },
              },
              required: ['responseUser'],
            },
          },
          required: ['status', 'data'],
        },
        InternalServerError: {
          description: 'Internal Server Error',
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
        },
        Error: {
          type: 'object',
          properties: { status: { type: 'string', example: 'Internal Server Error' }, message: { type: 'string', example: 'Internal Server Error' } },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
          required: ['error'],
        },
      },
    },
    paths: {},
  },
  apis: ['./routes/*.ts'], // Ruta de tus archivos de rutas
};

Object.entries(paths).forEach(([path, pathItem]) => {
  options.definition.paths[path] = pathItem;
});
Object.entries(paths2).forEach(([path, pathItem]) => {
  options.definition.paths[path] = pathItem;
});

export const specs = swaggerJsdoc(options);
