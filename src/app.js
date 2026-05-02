import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/index.js';
import { swaggerSpec } from './config/swagger.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Route de base
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Gestion des Approvisionnements',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes de l'API
app.use('/api', routes);

// Route 404
app.use(notFound);

// Gestionnaire d'erreurs
app.use(errorHandler);

export default app;
