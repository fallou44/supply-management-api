import fournisseurRepository from '../repositories/fournisseur.repository.js';

class FournisseurService {
  async createFournisseur(data) {
    return await fournisseurRepository.create(data);
  }

  async getAllFournisseurs() {
    return await fournisseurRepository.findAll();
  }

  async getFournisseurById(id) {
    const fournisseur = await fournisseurRepository.findById(id);
    
    if (!fournisseur) {
      const error = new Error('Fournisseur non trouvé');
      error.statusCode = 404;
      throw error;
    }
    
    return fournisseur;
  }

  async updateFournisseur(id, data) {
    // Vérifier si le fournisseur existe
    const exists = await fournisseurRepository.exists(id);
    
    if (!exists) {
      const error = new Error('Fournisseur non trouvé');
      error.statusCode = 404;
      throw error;
    }
    
    return await fournisseurRepository.update(id, data);
  }

  async deleteFournisseur(id) {
    // Vérifier si le fournisseur existe
    const exists = await fournisseurRepository.exists(id);
    
    if (!exists) {
      const error = new Error('Fournisseur non trouvé');
      error.statusCode = 404;
      throw error;
    }
    
    return await fournisseurRepository.delete(id);
  }
}

export default new FournisseurService();
