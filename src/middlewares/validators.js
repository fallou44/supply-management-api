import { body, param, validationResult } from 'express-validator';

// Middleware pour vérifier les erreurs de validation
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array(),
    });
  }
  next();
};

// Validateurs pour Fournisseur
export const validateCreateFournisseur = [
  body('nom').notEmpty().withMessage('Le nom est requis').trim(),
  body('telephone').notEmpty().withMessage('Le téléphone est requis').trim(),
  body('adresse').notEmpty().withMessage('L\'adresse est requise').trim(),
  validate,
];

export const validateUpdateFournisseur = [
  param('id').isUUID().withMessage('ID invalide'),
  body('nom').optional().trim(),
  body('telephone').optional().trim(),
  body('adresse').optional().trim(),
  validate,
];

// Validateurs pour Produit
export const validateCreateProduit = [
  body('libelle').notEmpty().withMessage('Le libellé est requis').trim(),
  body('prixUnitaire')
    .notEmpty()
    .withMessage('Le prix unitaire est requis')
    .isFloat({ min: 0 })
    .withMessage('Le prix unitaire doit être un nombre positif'),
  body('quantiteStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La quantité en stock doit être un entier positif'),
  validate,
];

export const validateUpdateProduit = [
  param('id').isUUID().withMessage('ID invalide'),
  body('libelle').optional().trim(),
  body('prixUnitaire')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Le prix unitaire doit être un nombre positif'),
  body('quantiteStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('La quantité en stock doit être un entier positif'),
  validate,
];

export const validateStockOperation = [
  param('id').isUUID().withMessage('ID invalide'),
  body('quantite')
    .notEmpty()
    .withMessage('La quantité est requise')
    .isInt({ min: 1 })
    .withMessage('La quantité doit être un entier positif'),
  validate,
];

// Validateurs pour Approvisionnement
export const validateCreateApprovisionnement = [
  body('quantite')
    .notEmpty()
    .withMessage('La quantité est requise')
    .isInt({ min: 1 })
    .withMessage('La quantité doit être un entier positif'),
  body('fournisseurId')
    .notEmpty()
    .withMessage('Le fournisseur est requis')
    .isUUID()
    .withMessage('ID fournisseur invalide'),
  body('produitId')
    .notEmpty()
    .withMessage('Le produit est requis')
    .isUUID()
    .withMessage('ID produit invalide'),
  body('date').optional().isISO8601().withMessage('Date invalide'),
  validate,
];

export const validateUpdateApprovisionnement = [
  param('id').isUUID().withMessage('ID invalide'),
  body('quantite')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La quantité doit être un entier positif'),
  body('fournisseurId')
    .optional()
    .isUUID()
    .withMessage('ID fournisseur invalide'),
  body('produitId').optional().isUUID().withMessage('ID produit invalide'),
  body('date').optional().isISO8601().withMessage('Date invalide'),
  validate,
];

// Validateurs pour Auth
export const validateRegister = [
  body('email')
    .notEmpty()
    .withMessage('L\'email est requis')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères'),
  body('nom').notEmpty().withMessage('Le nom est requis').trim(),
  validate,
];

export const validateLogin = [
  body('email')
    .notEmpty()
    .withMessage('L\'email est requis')
    .isEmail()
    .withMessage('Email invalide')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
  validate,
];
