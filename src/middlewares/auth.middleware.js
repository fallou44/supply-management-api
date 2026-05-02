import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export const authenticate = async (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentification requise. Token manquant.',
      });
    }

    const token = authHeader.substring(7); // Enlever "Bearer "

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, config.jwt.secret);

    // Ajouter les informations de l'utilisateur à la requête
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide.',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du token.',
    });
  }
};
