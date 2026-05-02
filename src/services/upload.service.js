import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

class UploadService {
  async uploadImage(file) {
    try {
      // Créer un stream depuis le buffer
      const stream = Readable.from(file.buffer);

      // Upload sur Cloudinary
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'supply-management/produits',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );

        stream.pipe(uploadStream);
      });
    } catch (error) {
      console.error('Erreur upload Cloudinary:', error);
      throw new Error('Erreur lors de l\'upload de l\'image');
    }
  }

  async deleteImage(imageUrl) {
    try {
      // Extraire le public_id depuis l'URL
      const parts = imageUrl.split('/');
      const filename = parts[parts.length - 1];
      const publicId = `supply-management/produits/${filename.split('.')[0]}`;

      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Erreur suppression image Cloudinary:', error);
      // Ne pas bloquer l'opération si la suppression échoue
    }
  }
}

export default new UploadService();
