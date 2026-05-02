import app from './app.js';
import { config } from './config/index.js';
import prisma from './config/prisma.js';

const PORT = config.port;

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    // Tester la connexion à la base de données
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`📚 Documentation Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Gestion de l'arrêt gracieux
const gracefulShutdown = async () => {
  console.log('\n🛑 Arrêt du serveur en cours...');
  
  try {
    await prisma.$disconnect();
    console.log('✅ Déconnexion de la base de données réussie');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de l\'arrêt:', error);
    process.exit(1);
  }
};

// Écouter les signaux d'arrêt
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Démarrer le serveur
startServer();
