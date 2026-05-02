import prisma from '../config/prisma.js';

class UserRepository {
  async create(data) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        nom: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        nom: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async exists(email) {
    const count = await prisma.user.count({
      where: { email },
    });
    return count > 0;
  }
}

export default new UserRepository();
