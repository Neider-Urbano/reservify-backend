'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.swaggerDocs = void 0;
exports.swaggerDocs = {
  definition: {
    openapi: '3.0.0', // Verifica que esta línea esté correctamente escrita
    info: {
      title: 'Reservify API',
      version: '1.0.0',
      description: 'API para gestionar reservas y servicios',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Asegúrate de que esta URL coincida con tu servidor
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Asegúrate de que las rutas son correctas
};
