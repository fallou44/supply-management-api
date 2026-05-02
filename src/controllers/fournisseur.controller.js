import fournisseurService from '../services/fournisseur.service.js';

class FournisseurController {
  async create(req, res, next) {
    try {
      const fournisseur = await fournisseurService.createFournisseur(req.body);

      res.status(201).json({
        success: true,
        message: 'Fournisseur créé avec succès',
        data: fournisseur,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const fournisseurs = await fournisseurService.getAllFournisseurs();

      res.status(200).json({
        success: true,
        data: fournisseurs,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const fournisseur = await fournisseurService.getFournisseurById(req.params.id);

      res.status(200).json({
        success: true,
        data: fournisseur,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const fournisseur = await fournisseurService.updateFournisseur(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        message: 'Fournisseur mis à jour avec succès',
        data: fournisseur,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await fournisseurService.deleteFournisseur(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Fournisseur supprimé avec succès',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new FournisseurController();
