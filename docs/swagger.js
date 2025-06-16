const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto de API REST',
      version: '1.0.0',
      description: 'Documentação da API',
    },
    servers: [
      {
        url: 'http://localhost:8080/api',
      },
    ],
  },
  apis: ['./routes/*.js'], 
};
const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;

