export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Erreur de validation Prisma
  if (err.code === 'P2002') {
    return res.status(400).json({
      success: false,
      message: 'Cette ressource existe déjà.',
      details: err.meta,
    });
  }

  // Erreur de relation Prisma
  if (err.code === 'P2003') {
    return res.status(400).json({
      success: false,
      message: 'Référence invalide. La ressource liée n\'existe pas.',
      details: err.meta,
    });
  }

  // Erreur de ressource non trouvée Prisma
  if (err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Ressource non trouvée.',
    });
  }

  // Erreur Multer
  if (err.message && err.message.includes('images')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Erreur par défaut
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Une erreur interne est survenue.';

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} non trouvée.`,
  });
};
