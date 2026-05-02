import swaggerJSDoc from 'swagger-jsdoc';
import { config } from './index.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API RESTful de Gestion des Approvisionnements',
    version: '1.0.0',
    description:
      'API complète pour la gestion des fournisseurs, produits et approvisionnements d\'une boutique avec Node.js, Express, Prisma et Neon PostgreSQL',
    contact: {
      name: 'Support API',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
      description: 'Serveur de développement',
    },
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'Endpoints pour l\'authentification',
    },
    {
      name: 'Fournisseurs',
      description: 'Gestion des fournisseurs',
    },
    {
      name: 'Produits',
      description: 'Gestion des produits et du stock',
    },
    {
      name: 'Approvisionnements',
      description: 'Gestion des approvisionnements',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Entrez votre token JWT (obtenu après login)',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'], // Chemins vers les fichiers contenant les annotations
};

export const swaggerSpec = swaggerJSDoc(options);
