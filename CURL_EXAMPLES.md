# Exemples de Requêtes cURL

Ce fichier contient des exemples de requêtes cURL pour tester l'API.

## Variables d'environnement

```bash
export BASE_URL="http://localhost:3000"
export TOKEN="votre_token_jwt_ici"
```

## Authentication

### Register (Inscription)

```bash
curl -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123",
    "nom": "Admin User"
  }'
```

### Login (Connexion)

```bash
curl -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

### Get Profile

```bash
curl -X GET "$BASE_URL/api/auth/profile" \
  -H "Authorization: Bearer $TOKEN"
```

## Fournisseurs

### Create Fournisseur

```bash
curl -X POST "$BASE_URL/api/fournisseurs" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Samsung Electronics",
    "telephone": "221771234567",
    "adresse": "123 Avenue Lamine Gueye, Dakar"
  }'
```

### Get All Fournisseurs

```bash
curl -X GET "$BASE_URL/api/fournisseurs" \
  -H "Authorization: Bearer $TOKEN"
```

### Get Fournisseur By ID

```bash
curl -X GET "$BASE_URL/api/fournisseurs/{id}" \
  -H "Authorization: Bearer $TOKEN"
```

### Update Fournisseur

```bash
curl -X PUT "$BASE_URL/api/fournisseurs/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Samsung Electronics Updated",
    "telephone": "221779876543",
    "adresse": "456 Rue de la République, Dakar"
  }'
```

### Delete Fournisseur

```bash
curl -X DELETE "$BASE_URL/api/fournisseurs/{id}" \
  -H "Authorization: Bearer $TOKEN"
```

## Produits

### Create Produit (avec image)

```bash
curl -X POST "$BASE_URL/api/produits" \
  -H "Authorization: Bearer $TOKEN" \
  -F "libelle=Samsung Galaxy S24" \
  -F "prixUnitaire=850000" \
  -F "quantiteStock=15" \
  -F "image=@/path/to/image.jpg"
```

### Create Produit (sans image)

```bash
curl -X POST "$BASE_URL/api/produits" \
  -H "Authorization: Bearer $TOKEN" \
  -F "libelle=iPhone 15 Pro" \
  -F "prixUnitaire=1200000" \
  -F "quantiteStock=8"
```

### Get All Produits

```bash
curl -X GET "$BASE_URL/api/produits" \
  -H "Authorization: Bearer $TOKEN"
```

### Get Produit By ID

```bash
curl -X GET "$BASE_URL/api/produits/{id}" \
  -H "Authorization: Bearer $TOKEN"
```

### Update Produit

```bash
curl -X PUT "$BASE_URL/api/produits/{id}" \
  -H "Authorization: Bearer $TOKEN" \
  -F "libelle=Samsung Galaxy S24 Ultra" \
  -F "prixUnitaire=950000"
```

### Update Produit (avec nouvelle image)

```bash
curl -X PUT "$BASE_URL/api/produits/{id}" \
  -H "Authorization: Bearer $TOKEN" \
  -F "libelle=Samsung Galaxy S24 Ultra" \
  -F "prixUnitaire=950000" \
  -F "image=@/path/to/new-image.jpg"
```

### Increment Stock

```bash
curl -X PATCH "$BASE_URL/api/produits/{id}/increment" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 10
  }'
```

### Decrement Stock

```bash
curl -X PATCH "$BASE_URL/api/produits/{id}/decrement" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 5
  }'
```

### Decrement Stock (test erreur - stock insuffisant)

```bash
curl -X PATCH "$BASE_URL/api/produits/{id}/decrement" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 10000
  }'
```

### Delete Produit

```bash
curl -X DELETE "$BASE_URL/api/produits/{id}" \
  -H "Authorization: Bearer $TOKEN"
```

## Approvisionnements

### Create Approvisionnement

```bash
curl -X POST "$BASE_URL/api/approvisionnements" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 50,
    "fournisseurId": "uuid-du-fournisseur",
    "produitId": "uuid-du-produit"
  }'
```

### Create Approvisionnement (avec date)

```bash
curl -X POST "$BASE_URL/api/approvisionnements" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 100,
    "fournisseurId": "uuid-du-fournisseur",
    "produitId": "uuid-du-produit",
    "date": "2024-01-15T10:30:00Z"
  }'
```

### Get All Approvisionnements

```bash
curl -X GET "$BASE_URL/api/approvisionnements" \
  -H "Authorization: Bearer $TOKEN"
```

### Get Approvisionnement By ID

```bash
curl -X GET "$BASE_URL/api/approvisionnements/{id}" \
  -H "Authorization: Bearer $TOKEN"
```

### Update Approvisionnement

```bash
curl -X PUT "$BASE_URL/api/approvisionnements/{id}" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 75
  }'
```

### Delete Approvisionnement

```bash
curl -X DELETE "$BASE_URL/api/approvisionnements/{id}" \
  -H "Authorization: Bearer $TOKEN"
```

## Tests de Validation

### Test - Email invalide

```bash
curl -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "password": "password123",
    "nom": "Test User"
  }'
```

### Test - Mot de passe trop court

```bash
curl -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123",
    "nom": "Test User"
  }'
```

### Test - Champs manquants

```bash
curl -X POST "$BASE_URL/api/fournisseurs" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Fournisseur Test"
  }'
```

### Test - Token manquant

```bash
curl -X GET "$BASE_URL/api/fournisseurs"
```

### Test - Token invalide

```bash
curl -X GET "$BASE_URL/api/fournisseurs" \
  -H "Authorization: Bearer token_invalide"
```

## Workflow Complet

### 1. Inscription et connexion

```bash
# Inscription
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "password123",
    "nom": "Test User"
  }')

# Extraire le token
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.token')
echo "Token: $TOKEN"
```

### 2. Créer un fournisseur

```bash
FOURNISSEUR_RESPONSE=$(curl -s -X POST "$BASE_URL/api/fournisseurs" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Fournisseur XYZ",
    "telephone": "221771234567",
    "adresse": "Dakar"
  }')

FOURNISSEUR_ID=$(echo $FOURNISSEUR_RESPONSE | jq -r '.data.id')
echo "Fournisseur ID: $FOURNISSEUR_ID"
```

### 3. Créer un produit

```bash
PRODUIT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/produits" \
  -H "Authorization: Bearer $TOKEN" \
  -F "libelle=Produit ABC" \
  -F "prixUnitaire=50000" \
  -F "quantiteStock=10")

PRODUIT_ID=$(echo $PRODUIT_RESPONSE | jq -r '.data.id')
echo "Produit ID: $PRODUIT_ID"
```

### 4. Créer un approvisionnement

```bash
curl -X POST "$BASE_URL/api/approvisionnements" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"quantite\": 50,
    \"fournisseurId\": \"$FOURNISSEUR_ID\",
    \"produitId\": \"$PRODUIT_ID\"
  }"
```

### 5. Vérifier le stock

```bash
curl -X GET "$BASE_URL/api/produits/$PRODUIT_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.data.quantiteStock'
```

## Notes

- Remplacer `{id}` par l'ID réel de la ressource
- Remplacer `$TOKEN` par votre token JWT
- Pour les uploads d'images, remplacer `/path/to/image.jpg` par le chemin réel
- Utiliser `jq` pour formater les réponses JSON (installer avec `brew install jq` ou `apt install jq`)
