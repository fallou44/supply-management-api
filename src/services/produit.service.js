import produitRepository from '../repositories/produit.repository.js';
import uploadService from './upload.service.js';

class ProduitService {
  async createProduit(data, file) {
    let imageUrl = null;

    // Upload de l'image si fournie
    if (file) {
      imageUrl = await uploadService.uploadImage(file);
    }

    const produitData = {
      ...data,
      prixUnitaire: parseFloat(data.prixUnitaire),
      quantiteStock: data.quantiteStock ? parseInt(data.quantiteStock) : 0,
      image: imageUrl,
    };

    return await produitRepository.create(produitData);
  }

  async getAllProduits() {
    return await produitRepository.findAll();
  }

  async getProduitById(id) {
    const produit = await produitRepository.findById(id);

    if (!produit) {
      const error = new Error('Produit non trouvé');
      error.statusCode = 404;
      throw error;
    }

    return produit;
  }

  async updateProduit(id, data, file) {
    // Vérifier si le produit existe
    const produit = await produitRepository.findById(id);

    if (!produit) {
      const error = new Error('Produit non trouvé');
      error.statusCode = 404;
      throw error;
    }

    let imageUrl = produit.image;

    // Upload de la nouvelle image si fournie
    if (file) {
      // Supprimer l'ancienne image
      if (produit.image) {
        await uploadService.deleteImage(produit.image);
      }

      imageUrl = await uploadService.uploadImage(file);
    }

    const produitData = {
      ...data,
      ...(data.prixUnitaire && { prixUnitaire: parseFloat(data.prixUnitaire) }),
      ...(data.quantiteStock && { quantiteStock: parseInt(data.quantiteStock) }),
      image: imageUrl,
    };

    return await produitRepository.update(id, produitData);
  }

  async deleteProduit(id) {
    // Vérifier si le produit existe
    const produit = await produitRepository.findById(id);

    if (!produit) {
      const error = new Error('Produit non trouvé');
      error.statusCode = 404;
      throw error;
    }

    // Supprimer l'image de Cloudinary
    if (produit.image) {
      await uploadService.deleteImage(produit.image);
    }

    return await produitRepository.delete(id);
  }

  async incrementStock(id, quantite) {
    const exists = await produitRepository.exists(id);

    if (!exists) {
      const error = new Error('Produit non trouvé');
      error.statusCode = 404;
      throw error;
    }

    return await produitRepository.incrementStock(id, quantite);
  }

  async decrementStock(id, quantite) {
    try {
      return await produitRepository.decrementStock(id, quantite);
    } catch (error) {
      if (error.message.includes('Stock insuffisant')) {
        error.statusCode = 400;
      } else if (error.message.includes('non trouvé')) {
        error.statusCode = 404;
      }
      throw error;
    }
  }
}

export default new ProduitService();
