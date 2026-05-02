import express from 'express';
import approvisionnementController from '../controllers/approvisionnement.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  validateCreateApprovisionnement,
  validateUpdateApprovisionnement,
} from '../middlewares/validators.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Approvisionnement:
 *       type: object
 *       required:
 *         - quantite
 *         - fournisseurId
 *         - produitId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date-time
 *         quantite:
 *           type: integer
 *         fournisseurId:
 *           type: string
 *           format: uuid
 *         produitId:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/approvisionnements:
 *   post:
 *     summary: Créer un nouvel approvisionnement et mettre à jour le stock
 *     tags: [Approvisionnements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantite
 *               - fournisseurId
 *               - produitId
 *             properties:
 *               quantite:
 *                 type: integer
 *                 minimum: 1
 *               fournisseurId:
 *                 type: string
 *                 format: uuid
 *               produitId:
 *                 type: string
 *                 format: uuid
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Approvisionnement créé et stock mis à jour
 *       400:
 *         description: Erreur de validation
 *       404:
 *         description: Fournisseur ou produit non trouvé
 *       401:
 *         description: Non authentifié
 */
router.post(
  '/',
  authenticate,
  validateCreateApprovisionnement,
  approvisionnementController.create
);

/**
 * @swagger
 * /api/approvisionnements:
 *   get:
 *     summary: Récupérer tous les approvisionnements
 *     tags: [Approvisionnements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des approvisionnements
 *       401:
 *         description: Non authentifié
 */
router.get('/', authenticate, approvisionnementController.getAll);

/**
 * @swagger
 * /api/approvisionnements/{id}:
 *   get:
 *     summary: Récupérer un approvisionnement par son ID
 *     tags: [Approvisionnements]
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
 *         description: Approvisionnement trouvé
 *       404:
 *         description: Approvisionnement non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get('/:id', authenticate, approvisionnementController.getById);

/**
 * @swagger
 * /api/approvisionnements/{id}:
 *   put:
 *     summary: Modifier un approvisionnement
 *     tags: [Approvisionnements]
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
 *             properties:
 *               quantite:
 *                 type: integer
 *                 minimum: 1
 *               fournisseurId:
 *                 type: string
 *                 format: uuid
 *               produitId:
 *                 type: string
 *                 format: uuid
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Approvisionnement modifié avec succès
 *       404:
 *         description: Approvisionnement non trouvé
 *       401:
 *         description: Non authentifié
 */
router.put(
  '/:id',
  authenticate,
  validateUpdateApprovisionnement,
  approvisionnementController.update
);

/**
 * @swagger
 * /api/approvisionnements/{id}:
 *   delete:
 *     summary: Supprimer un approvisionnement
 *     tags: [Approvisionnements]
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
 *         description: Approvisionnement supprimé avec succès
 *       404:
 *         description: Approvisionnement non trouvé
 *       401:
 *         description: Non authentifié
 */
router.delete('/:id', authenticate, approvisionnementController.delete);

export default router;
