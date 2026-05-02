import approvisionnementService from '../services/approvisionnement.service.js';

class ApprovisionnementController {
  async create(req, res, next) {
    try {
      const approvisionnement = await approvisionnementService.createApprovisionnement(
        req.body
      );

      res.status(201).json({
        success: true,
        message: 'Approvisionnement créé avec succès et stock mis à jour',
        data: approvisionnement,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const approvisionnements =
        await approvisionnementService.getAllApprovisionnements();

      res.status(200).json({
        success: true,
        data: approvisionnements,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const approvisionnement =
        await approvisionnementService.getApprovisionnementById(req.params.id);

      res.status(200).json({
        success: true,
        data: approvisionnement,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const approvisionnement =
        await approvisionnementService.updateApprovisionnement(req.params.id, req.body);

      res.status(200).json({
        success: true,
        message: 'Approvisionnement mis à jour avec succès',
        data: approvisionnement,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await approvisionnementService.deleteApprovisionnement(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Approvisionnement supprimé avec succès',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ApprovisionnementController();
