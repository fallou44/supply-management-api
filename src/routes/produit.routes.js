import express from 'express';
import produitController from '../controllers/produit.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { upload } from '../config/multer.js';
import {
  validateCreateProduit,
  validateUpdateProduit,
  validateStockOperation,
} from '../middlewares/validators.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       required:
 *         - libelle
 *         - prixUnitaire
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         libelle:
 *           type: string
 *         prixUnitaire:
 *           type: number
 *           format: float
 *         quantiteStock:
 *           type: integer
 *         image:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/produits:
 *   post:
 *     summary: Créer un nouveau produit avec image
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *               - prixUnitaire
 *             properties:
 *               libelle:
 *                 type: string
 *               prixUnitaire:
 *                 type: number
 *                 format: float
 *               quantiteStock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non authentifié
 */
router.post(
  '/',
  authenticate,
  upload.single('image'),
  validateCreateProduit,
  produitController.create
);

/**
 * @swagger
 * /api/produits:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des produits
 *       401:
 *         description: Non authentifié
 */
router.get('/', authenticate, produitController.getAll);

/**
 * @swagger
 * /api/produits/{id}:
 *   get:
 *     summary: Récupérer un produit par son ID
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Produit trouvé
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get('/:id', authenticate, produitController.getById);

/**
 * @swagger
 * /api/produits/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *               prixUnitaire:
 *                 type: number
 *                 format: float
 *               quantiteStock:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produit modifié avec succès
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non authentifié
 */
router.put(
  '/:id',
  authenticate,
  upload.single('image'),
  validateUpdateProduit,
  produitController.update
);

/**
 * @swagger
 * /api/produits/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non authentifié
 */
router.delete('/:id', authenticate, produitController.delete);

/**
 * @swagger
 * /api/produits/{id}/increment:
 *   patch:
 *     summary: Incrémenter le stock d'un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantite
 *             properties:
 *               quantite:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Stock incrémenté avec succès
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non authentifié
 */
router.patch(
  '/:id/increment',
  authenticate,
  validateStockOperation,
  produitController.incrementStock
);

/**
 * @swagger
 * /api/produits/{id}/decrement:
 *   patch:
 *     summary: Décrémenter le stock d'un produit
 *     tags: [Produits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantite
 *             properties:
 *               quantite:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Stock décrémenté avec succès
 *       400:
 *         description: Stock insuffisant
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non authentifié
 */
router.patch(
  '/:id/decrement',
  authenticate,
  validateStockOperation,
  produitController.decrementStock
);

export default router;
