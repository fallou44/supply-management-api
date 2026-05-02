import prisma from '../config/prisma.js';

class ApprovisionnementRepository {
  async create(data) {
    return await prisma.approvisionnement.create({
      data,
      include: {
        fournisseur: true,
        produit: true,
      },
    });
  }

  async findAll() {
    return await prisma.approvisionnement.findMany({
      include: {
        fournisseur: true,
        produit: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findById(id) {
    return await prisma.approvisionnement.findUnique({
      where: { id },
      include: {
        fournisseur: true,
        produit: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.approvisionnement.update({
      where: { id },
      data,
      include: {
        fournisseur: true,
        produit: true,
      },
    });
  }

  async delete(id) {
    return await prisma.approvisionnement.delete({
      where: { id },
    });
  }

  async exists(id) {
    const count = await prisma.approvisionnement.count({
      where: { id },
    });
    return count > 0;
  }
}

export default new ApprovisionnementRepository();
