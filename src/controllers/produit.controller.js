import produitService from '../services/produit.service.js';

class ProduitController {
  async create(req, res, next) {
    try {
      const produit = await produitService.createProduit(req.body, req.file);

      res.status(201).json({
        success: true,
        message: 'Produit créé avec succès',
        data: produit,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const produits = await produitService.getAllProduits();

      res.status(200).json({
        success: true,
        data: produits,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const produit = await produitService.getProduitById(req.params.id);

      res.status(200).json({
        success: true,
        data: produit,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const produit = await produitService.updateProduit(
        req.params.id,
        req.body,
        req.file
      );

      res.status(200).json({
        success: true,
        message: 'Produit mis à jour avec succès',
        data: produit,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await produitService.deleteProduit(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Produit supprimé avec succès',
      });
    } catch (error) {
      next(error);
    }
  }

  async incrementStock(req, res, next) {
    try {
      const produit = await produitService.incrementStock(
        req.params.id,
        parseInt(req.body.quantite)
      );

      res.status(200).json({
        success: true,
        message: 'Stock incrémenté avec succès',
        data: produit,
      });
    } catch (error) {
      next(error);
    }
  }

  async decrementStock(req, res, next) {
    try {
      const produit = await produitService.decrementStock(
        req.params.id,
        parseInt(req.body.quantite)
      );

      res.status(200).json({
        success: true,
        message: 'Stock décrémenté avec succès',
        data: produit,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProduitController();
