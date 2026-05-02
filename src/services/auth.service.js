import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/user.repository.js';
import { config } from '../config/index.js';

class AuthService {
  async register(data) {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      const error = new Error('Un utilisateur avec cet email existe déjà');
      error.statusCode = 400;
      throw error;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Créer l'utilisateur
    const user = await userRepository.create({
      email: data.email,
      password: hashedPassword,
      nom: data.nom,
      role: data.role || 'user',
    });

    // Générer le token
    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async login(email, password) {
    // Trouver l'utilisateur
    const user = await userRepository.findByEmail(email);

    if (!user) {
      const error = new Error('Email ou mot de passe incorrect');
      error.statusCode = 401;
      throw error;
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Email ou mot de passe incorrect');
      error.statusCode = 401;
      throw error;
    }

    // Générer le token
    const token = this.generateToken(user);

    // Retirer le mot de passe des données retournées
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        nom: user.nom,
        role: user.role,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn,
      }
    );
  }
}

export default new AuthService();
