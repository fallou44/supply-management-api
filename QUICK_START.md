# 🚀 Guide de Démarrage Rapide

Ce guide vous permettra de démarrer rapidement avec l'API de Gestion des Approvisionnements.

## ⚡ Installation en 5 minutes

### 1. Installation des dépendances

```bash
npm install
```

### 2. Configuration de Neon (Base de données)

#### Option A : Utiliser Neon (recommandé)

1. Aller sur [neon.tech](https://neon.tech)
2. Créer un compte gratuit
3. Créer un nouveau projet
4. Copier la chaîne de connexion (elle ressemble à ceci) :
   ```
   postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

#### Option B : Utiliser PostgreSQL local

1. Installer PostgreSQL localement
2. Créer une base de données :
   ```bash
   createdb supply_management
   ```
3. Chaîne de connexion :
   ```
   postgresql://postgres:password@localhost:5432/supply_management
   ```

### 3. Configuration de Cloudinary

1. Aller sur [cloudinary.com](https://cloudinary.com)
2. Créer un compte gratuit
3. Depuis le Dashboard, récupérer :
   - Cloud Name
   - API Key
   - API Secret

### 4. Créer le fichier .env

Créer un fichier `.env` à la racine du projet et copier-coller :

```env
# Database (Remplacer avec votre URL Neon)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=mon_super_secret_pour_jwt_12345
JWT_EXPIRES_IN=7d

# Cloudinary (Remplacer avec vos credentials)
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 5. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables dans la base de données
npx prisma migrate dev --name init
```

### 6. Démarrer le serveur

```bash
npm run dev
```

Vous devriez voir :
```
✅ Connexion à la base de données réussie
🚀 Serveur démarré sur le port 3000
📚 Documentation Swagger: http://localhost:3000/api-docs
```

## 🎯 Tester l'API

### Méthode 1 : Via Swagger (Recommandé)

1. Ouvrir le navigateur : http://localhost:3000/api-docs
2. Vous verrez l'interface Swagger avec toutes les routes
3. Tester directement depuis l'interface

### Méthode 2 : Via Postman/Thunder Client

1. Importer le fichier `postman-collection.json`
2. Suivre le workflow ci-dessous

## 📝 Workflow de test complet

### Étape 1 : Créer un compte

```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "password123",
  "nom": "Admin User"
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "data": {
    "user": {
      "id": "uuid-genere",
      "email": "admin@test.com",
      "nom": "Admin User"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**⚠️ IMPORTANT : Copier le token retourné !**

### Étape 2 : Se connecter

```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "password123"
}
```

### Étape 3 : Créer un fournisseur

```bash
POST http://localhost:3000/api/fournisseurs
Authorization: Bearer VOTRE_TOKEN_ICI
Content-Type: application/json

{
  "nom": "Samsung Electronics",
  "telephone": "221771234567",
  "adresse": "123 Avenue Lamine Gueye, Dakar"
}
```

**Copier l'ID du fournisseur retourné !**

### Étape 4 : Créer un produit avec image

```bash
POST http://localhost:3000/api/produits
Authorization: Bearer VOTRE_TOKEN_ICI
Content-Type: multipart/form-data

Form Data:
- libelle: "Samsung Galaxy S24"
- prixUnitaire: 850000
- quantiteStock: 15
- image: [Sélectionner une image]
```

**Copier l'ID du produit retourné !**

### Étape 5 : Créer un approvisionnement

```bash
POST http://localhost:3000/api/approvisionnements
Authorization: Bearer VOTRE_TOKEN_ICI
Content-Type: application/json

{
  "quantite": 50,
  "fournisseurId": "ID_DU_FOURNISSEUR",
  "produitId": "ID_DU_PRODUIT"
}
```

**✅ Le stock du produit sera automatiquement augmenté de 50 !**

### Étape 6 : Vérifier le stock

```bash
GET http://localhost:3000/api/produits/ID_DU_PRODUIT
Authorization: Bearer VOTRE_TOKEN_ICI
```

Vous verrez que `quantiteStock` est maintenant 65 (15 + 50).

### Étape 7 : Décrémenter le stock

```bash
PATCH http://localhost:3000/api/produits/ID_DU_PRODUIT/decrement
Authorization: Bearer VOTRE_TOKEN_ICI
Content-Type: application/json

{
  "quantite": 10
}
```

Le stock passe maintenant à 55 (65 - 10).

## 🎨 Tester depuis Swagger

1. Ouvrir http://localhost:3000/api-docs
2. Cliquer sur **"Authorize"** en haut à droite
3. Entrer le token : `Bearer VOTRE_TOKEN`
4. Cliquer sur **"Authorize"** puis **"Close"**
5. Toutes les routes sont maintenant accessibles !

## 🔧 Commandes utiles

```bash
# Visualiser la base de données
npx prisma studio

# Réinitialiser la base de données
npx prisma migrate reset

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Voir les logs du serveur
npm run dev
```

## ❓ Problèmes courants

### Erreur de connexion à la base de données

**Symptôme :** `Error: Can't reach database server`

**Solution :**
- Vérifier que `DATABASE_URL` est correct dans `.env`
- Vérifier que Neon est accessible (pas de firewall)
- Vérifier que l'URL contient `?sslmode=require`

### Erreur Cloudinary

**Symptôme :** Erreur lors de l'upload d'image

**Solution :**
- Vérifier les credentials Cloudinary dans `.env`
- Vérifier que l'image fait moins de 5MB
- Vérifier le format (JPEG, PNG, GIF, WEBP)

### Token invalide

**Symptôme :** `401 Unauthorized`

**Solution :**
- Vérifier que le token est dans le header `Authorization`
- Format : `Bearer VOTRE_TOKEN`
- Le token expire après 7 jours (configurable dans `.env`)

## 📚 Documentation complète

Pour plus d'informations, consulter le fichier `README.md` complet.

## ✅ Checklist de déploiement

Avant de déployer en production :

- [ ] Changer `JWT_SECRET` dans `.env`
- [ ] Mettre `NODE_ENV=production`
- [ ] Configurer CORS pour votre domaine
- [ ] Sécuriser les routes sensibles
- [ ] Mettre en place un système de logs
- [ ] Configurer un reverse proxy (Nginx)
- [ ] Mettre en place SSL/TLS

## 🎓 Points clés de l'examen

Cette API répond à tous les critères de l'examen :

✅ **Architecture en couches**
- Repository Pattern
- Service Layer
- Controllers

✅ **Base de données**
- Prisma ORM
- Neon PostgreSQL
- Migrations

✅ **Fonctionnalités**
- CRUD complet sur toutes les entités
- Upload d'images sur Cloudinary
- Gestion du stock avec validation
- Mise à jour automatique lors des approvisionnements
- Transactions pour la cohérence des données

✅ **Sécurité**
- Authentification JWT
- Protection des routes
- Validation des données
- Hashage des mots de passe

✅ **Documentation**
- Swagger/OpenAPI 3.0
- Testable via l'interface
- Exemples complets

Bon courage pour votre examen ! 🚀
