import prisma from '../config/prisma.js';

class ProduitRepository {
  async create(data) {
    return await prisma.produit.create({
      data,
    });
  }

  async findAll() {
    return await prisma.produit.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id) {
    return await prisma.produit.findUnique({
      where: { id },
      include: {
        approvisionnements: {
          include: {
            fournisseur: true,
          },
        },
      },
    });
  }

  async update(id, data) {
    return await prisma.produit.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.produit.delete({
      where: { id },
    });
  }

  async incrementStock(id, quantite) {
    return await prisma.produit.update({
      where: { id },
      data: {
        quantiteStock: {
          increment: quantite,
        },
      },
    });
  }

  async decrementStock(id, quantite) {
    const produit = await this.findById(id);
    
    if (!produit) {
      throw new Error('Produit non trouvé');
    }

    if (produit.quantiteStock < quantite) {
      throw new Error(
        `Stock insuffisant. Stock disponible: ${produit.quantiteStock}, Quantité demandée: ${quantite}`
      );
    }

    return await prisma.produit.update({
      where: { id },
      data: {
        quantiteStock: {
          decrement: quantite,
        },
      },
    });
  }

  async exists(id) {
    const count = await prisma.produit.count({
      where: { id },
    });
    return count > 0;
  }
}

export default new ProduitRepository();
