import prisma from '../config/prisma.js';

class FournisseurRepository {
  async create(data) {
    return await prisma.fournisseur.create({
      data,
    });
  }

  async findAll() {
    return await prisma.fournisseur.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id) {
    return await prisma.fournisseur.findUnique({
      where: { id },
      include: {
        approvisionnements: {
          include: {
            produit: true,
          },
        },
      },
    });
  }

  async update(id, data) {
    return await prisma.fournisseur.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.fournisseur.delete({
      where: { id },
    });
  }

  async exists(id) {
    const count = await prisma.fournisseur.count({
      where: { id },
    });
    return count > 0;
  }
}

export default new FournisseurRepository();
