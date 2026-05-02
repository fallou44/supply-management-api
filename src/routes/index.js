import express from 'express';
import authRoutes from './auth.routes.js';
import fournisseurRoutes from './fournisseur.routes.js';
import produitRoutes from './produit.routes.js';
import approvisionnementRoutes from './approvisionnement.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/fournisseurs', fournisseurRoutes);
router.use('/produits', produitRoutes);
router.use('/approvisionnements', approvisionnementRoutes);

export default router;
