import express from 'express';
import fournisseurController from '../controllers/fournisseur.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  validateCreateFournisseur,
  validateUpdateFournisseur,
} from '../middlewares/validators.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Fournisseur:
 *       type: object
 *       required:
 *         - nom
 *         - telephone
 *         - adresse
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         nom:
 *           type: string
 *         telephone:
 *           type: string
 *         adresse:
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
 * /api/fournisseurs:
 *   post:
 *     summary: Créer un nouveau fournisseur
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - telephone
 *               - adresse
 *             properties:
 *               nom:
 *                 type: string
 *               telephone:
 *                 type: string
 *               adresse:
 *                 type: string
 *     responses:
 *       201:
 *         description: Fournisseur créé avec succès
 *       400:
 *         description: Erreur de validation
 *       401:
 *         description: Non authentifié
 */
router.post('/', authenticate, validateCreateFournisseur, fournisseurController.create);

/**
 * @swagger
 * /api/fournisseurs:
 *   get:
 *     summary: Récupérer tous les fournisseurs
 *     tags: [Fournisseurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des fournisseurs
 *       401:
 *         description: Non authentifié
 */
router.get('/', authenticate, fournisseurController.getAll);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   get:
 *     summary: Récupérer un fournisseur par son ID
 *     tags: [Fournisseurs]
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
 *         description: Fournisseur trouvé
 *       404:
 *         description: Fournisseur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.get('/:id', authenticate, fournisseurController.getById);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   put:
 *     summary: Modifier un fournisseur
 *     tags: [Fournisseurs]
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
 *               nom:
 *                 type: string
 *               telephone:
 *                 type: string
 *               adresse:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fournisseur modifié avec succès
 *       404:
 *         description: Fournisseur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.put('/:id', authenticate, validateUpdateFournisseur, fournisseurController.update);

/**
 * @swagger
 * /api/fournisseurs/{id}:
 *   delete:
 *     summary: Supprimer un fournisseur
 *     tags: [Fournisseurs]
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
 *         description: Fournisseur supprimé avec succès
 *       404:
 *         description: Fournisseur non trouvé
 *       401:
 *         description: Non authentifié
 */
router.delete('/:id', authenticate, fournisseurController.delete);

export default router;
