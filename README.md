# API RESTful de Gestion des Approvisionnements

API complète pour la gestion des approvisionnements d'une boutique avec Node.js, Express, Prisma et Neon PostgreSQL.

## 🚀 Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM moderne
- **Neon** - PostgreSQL serverless
- **Cloudinary** - Stockage d'images
- **Swagger** - Documentation API
- **JWT** - Authentification
- **Bcrypt** - Hashage de mots de passe
- **Multer** - Upload de fichiers

## 📋 Fonctionnalités

### 1. Authentification
- ✅ Inscription (register)
- ✅ Connexion (login)
- ✅ Récupération du profil utilisateur
- ✅ Protection des routes avec JWT

### 2. Gestion des Fournisseurs
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ Liste de tous les fournisseurs
- ✅ Détails d'un fournisseur avec ses approvisionnements

### 3. Gestion des Produits
- ✅ CRUD complet
- ✅ Upload d'image sur Cloudinary
- ✅ Gestion du stock (increment/decrement)
- ✅ Validation du stock (pas de stock négatif)
- ✅ Liste de tous les produits
- ✅ Détails d'un produit avec ses approvisionnements

### 4. Gestion des Approvisionnements
- ✅ CRUD complet
- ✅ Mise à jour automatique du stock lors de la création
- ✅ Transactions pour garantir la cohérence des données
- ✅ Liste de tous les approvisionnements avec fournisseur et produit

## 🏗️ Architecture

```
src/
├── config/              # Configuration (DB, Cloudinary, Swagger, etc.)
├── controllers/         # Contrôleurs (logique des routes)
├── middlewares/         # Middlewares (auth, validation, erreurs)
├── repositories/        # Accès aux données (Repository Pattern)
├── services/            # Logique métier (Service Layer)
├── routes/              # Définition des routes
├── app.js               # Configuration de l'application
└── server.js            # Point d'entrée du serveur
```

## 📦 Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd supply-management-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configuration de l'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech/dbname?sslmode=require"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 4. Configuration de Neon

1. Créer un compte sur [Neon](https://neon.tech)
2. Créer un nouveau projet
3. Copier la chaîne de connexion dans `DATABASE_URL`

### 5. Configuration de Cloudinary

1. Créer un compte sur [Cloudinary](https://cloudinary.com)
2. Récupérer les credentials depuis le Dashboard
3. Les ajouter dans le fichier `.env`

### 6. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les migrations
npx prisma migrate dev --name init

# (Optionnel) Ouvrir Prisma Studio pour visualiser les données
npx prisma studio
```

## 🚀 Démarrage

### Mode développement

```bash
npm run dev
```

### Mode production

```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`

## 📚 Documentation API

La documentation Swagger est disponible à : `http://localhost:3000/api-docs`

## 🔐 Authentification

Toutes les routes (sauf `/api/auth/register` et `/api/auth/login`) nécessitent un token JWT.

### 1. S'inscrire

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "nom": "John Doe"
}
```

### 2. Se connecter

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Réponse :
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "nom": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Utiliser le token

Ajouter le token dans le header `Authorization` :

```
Authorization: Bearer <votre_token>
```

## 📝 Exemples d'utilisation

### Créer un fournisseur

```bash
POST /api/fournisseurs
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "Fournisseur ABC",
  "telephone": "221771234567",
  "adresse": "Dakar, Sénégal"
}
```

### Créer un produit avec image

```bash
POST /api/produits
Authorization: Bearer <token>
Content-Type: multipart/form-data

libelle: "Ordinateur Portable"
prixUnitaire: 750000
quantiteStock: 10
image: [fichier image]
```

### Incrémenter le stock

```bash
PATCH /api/produits/:id/increment
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantite": 5
}
```

### Décrémenter le stock

```bash
PATCH /api/produits/:id/decrement
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantite": 3
}
```

### Créer un approvisionnement

```bash
POST /api/approvisionnements
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantite": 50,
  "fournisseurId": "uuid-du-fournisseur",
  "produitId": "uuid-du-produit",
  "date": "2024-01-15T10:30:00Z"
}
```

**Note** : Lors de la création d'un approvisionnement, le stock du produit est automatiquement mis à jour.

## 🧪 Tests avec Postman/Thunder Client

### Collection de tests

Une collection complète pour tester l'API :

1. **Auth**
   - Register
   - Login
   - Get Profile

2. **Fournisseurs**
   - Create Fournisseur
   - Get All Fournisseurs
   - Get Fournisseur By ID
   - Update Fournisseur
   - Delete Fournisseur

3. **Produits**
   - Create Produit (avec image)
   - Get All Produits
   - Get Produit By ID
   - Update Produit
   - Delete Produit
   - Increment Stock
   - Decrement Stock

4. **Approvisionnements**
   - Create Approvisionnement
   - Get All Approvisionnements
   - Get Approvisionnement By ID
   - Update Approvisionnement
   - Delete Approvisionnement

## 🔒 Règles métier

### Stock
- ❌ Le stock ne peut jamais être négatif
- ✅ La décrémentation est refusée si la quantité demandée est supérieure au stock
- ✅ Code HTTP 400 retourné en cas d'erreur de stock

### Approvisionnement
- ✅ Mise à jour automatique du stock lors de la création
- ✅ Transaction garantissant la cohérence des données
- ✅ Validation de l'existence du fournisseur et du produit

### Images
- ✅ Upload via Multer en multipart/form-data
- ✅ Stockage sur Cloudinary
- ✅ Suppression automatique lors de la suppression du produit
- ✅ Formats acceptés : JPEG, JPG, PNG, GIF, WEBP
- ✅ Taille maximale : 5MB

## 🛠️ Scripts disponibles

```bash
# Démarrer en mode développement
npm run dev

# Démarrer en mode production
npm start

# Générer le client Prisma
npm run prisma:generate

# Créer une migration
npm run prisma:migrate

# Ouvrir Prisma Studio
npm run prisma:studio
```

## 📊 Modèle de données

### User
- id (UUID)
- email (String, unique)
- password (String, hashé)
- nom (String)
- role (String, default: "user")

### Fournisseur
- id (UUID)
- nom (String)
- telephone (String)
- adresse (String)

### Produit
- id (UUID)
- libelle (String)
- prixUnitaire (Float)
- quantiteStock (Int, default: 0)
- image (String, nullable)

### Approvisionnement
- id (UUID)
- date (DateTime)
- quantite (Int)
- fournisseurId (UUID)
- produitId (UUID)

## 🐛 Gestion des erreurs

L'API retourne des réponses structurées :

### Succès (200, 201)
```json
{
  "success": true,
  "message": "Message de succès",
  "data": {}
}
```

### Erreur (400, 401, 404, 500)
```json
{
  "success": false,
  "message": "Message d'erreur",
  "errors": []
}
```

## 📄 Licence

MIT

## 👨‍💻 Auteur

Développé pour l'examen de fin de module - École Supérieure Professionnelle 221

## 🙏 Remerciements

- Mamadou Diouf - Professeur de Génie Logiciel
- Neon - Base de données PostgreSQL serverless
- Cloudinary - Stockage d'images
- Prisma - ORM moderne et puissant
