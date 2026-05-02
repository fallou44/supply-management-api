import approvisionnementRepository from '../repositories/approvisionnement.repository.js';
import produitRepository from '../repositories/produit.repository.js';
import fournisseurRepository from '../repositories/fournisseur.repository.js';
import prisma from '../config/prisma.js';

class ApprovisionnementService {
  async createApprovisionnement(data) {
    // Vérifier que le fournisseur existe
    const fournisseurExists = await fournisseurRepository.exists(data.fournisseurId);
    if (!fournisseurExists) {
      const error = new Error('Fournisseur non trouvé');
      error.statusCode = 404;
      throw error;
    }

    // Vérifier que le produit existe
    const produitExists = await produitRepository.exists(data.produitId);
    if (!produitExists) {
      const error = new Error('Produit non trouvé');
      error.statusCode = 404;
      throw error;
    }

    // Utiliser une transaction pour créer l'approvisionnement et mettre à jour le stock
    const result = await prisma.$transaction(async (tx) => {
      // Créer l'approvisionnement
      const approvisionnement = await tx.approvisionnement.create({
        data: {
          quantite: data.quantite,
          fournisseurId: data.fournisseurId,
          produitId: data.produitId,
          ...(data.date && { date: new Date(data.date) }),
        },
        include: {
          fournisseur: true,
          produit: true,
        },
      });

      // Mettre à jour le stock du produit
      await tx.produit.update({
        where: { id: data.produitId },
        data: {
          quantiteStock: {
            increment: data.quantite,
          },
        },
      });

      return approvisionnement;
    });

    return result;
  }

  async getAllApprovisionnements() {
    return await approvisionnementRepository.findAll();
  }

  async getApprovisionnementById(id) {
    const approvisionnement = await approvisionnementRepository.findById(id);

    if (!approvisionnement) {
      const error = new Error('Approvisionnement non trouvé');
      error.statusCode = 404;
      throw error;
    }

    return approvisionnement;
  }

  async updateApprovisionnement(id, data) {
    // Vérifier si l'approvisionnement existe
    const exists = await approvisionnementRepository.exists(id);

    if (!exists) {
      const error = new Error('Approvisionnement non trouvé');
      error.statusCode = 404;
      throw error;
    }

    // Vérifier que le fournisseur existe si fourni
    if (data.fournisseurId) {
      const fournisseurExists = await fournisseurRepository.exists(data.fournisseurId);
      if (!fournisseurExists) {
        const error = new Error('Fournisseur non trouvé');
        error.statusCode = 404;
        throw error;
      }
    }

    // Vérifier que le produit existe si fourni
    if (data.produitId) {
      const produitExists = await produitRepository.exists(data.produitId);
      if (!produitExists) {
        const error = new Error('Produit non trouvé');
        error.statusCode = 404;
        throw error;
      }
    }

    const updateData = {
      ...data,
      ...(data.date && { date: new Date(data.date) }),
    };

    return await approvisionnementRepository.update(id, updateData);
  }

  async deleteApprovisionnement(id) {
    // Vérifier si l'approvisionnement existe
    const exists = await approvisionnementRepository.exists(id);

    if (!exists) {
      const error = new Error('Approvisionnement non trouvé');
      error.statusCode = 404;
      throw error;
    }

    return await approvisionnementRepository.delete(id);
  }
}

export default new ApprovisionnementService();
