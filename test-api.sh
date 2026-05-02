#!/bin/bash

# Script de test complet de l'API
# Assurez-vous que le serveur tourne sur http://localhost:3000

echo "🚀 Début des tests de l'API..."

BASE_URL="http://localhost:3000"
TOKEN=""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📝 Étape 1 : Inscription d'un utilisateur...${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "nom": "Test User"
  }')

echo "$REGISTER_RESPONSE" | jq '.'

# Extraire le token
TOKEN=$(echo "$REGISTER_RESPONSE" | jq -r '.data.token')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo -e "${RED}❌ Erreur : Impossible d'obtenir le token${NC}"
  exit 1
fi

echo -e "${GREEN}✅ Token obtenu : ${TOKEN:0:50}...${NC}"

echo -e "\n${YELLOW}📝 Étape 2 : Connexion...${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE" | jq '.'

echo -e "\n${YELLOW}📝 Étape 3 : Création d'un fournisseur...${NC}"
FOURNISSEUR_RESPONSE=$(curl -s -X POST "$BASE_URL/api/fournisseurs" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "nom": "Fournisseur Test",
    "telephone": "221771234567",
    "adresse": "Dakar, Sénégal"
  }')

echo "$FOURNISSEUR_RESPONSE" | jq '.'

# Extraire l'ID du fournisseur
FOURNISSEUR_ID=$(echo "$FOURNISSEUR_RESPONSE" | jq -r '.data.id')
echo -e "${GREEN}✅ Fournisseur créé avec l'ID : $FOURNISSEUR_ID${NC}"

echo -e "\n${YELLOW}📝 Étape 4 : Création d'un produit...${NC}"
PRODUIT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/produits" \
  -H "Authorization: Bearer $TOKEN" \
  -F "libelle=Produit Test" \
  -F "prixUnitaire=100000" \
  -F "quantiteStock=10")

echo "$PRODUIT_RESPONSE" | jq '.'

# Extraire l'ID du produit
PRODUIT_ID=$(echo "$PRODUIT_RESPONSE" | jq -r '.data.id')
echo -e "${GREEN}✅ Produit créé avec l'ID : $PRODUIT_ID${NC}"

echo -e "\n${YELLOW}📝 Étape 5 : Liste des fournisseurs...${NC}"
curl -s -X GET "$BASE_URL/api/fournisseurs" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n${YELLOW}📝 Étape 6 : Liste des produits...${NC}"
curl -s -X GET "$BASE_URL/api/produits" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n${YELLOW}📝 Étape 7 : Incrémentation du stock...${NC}"
INCREMENT_RESPONSE=$(curl -s -X PATCH "$BASE_URL/api/produits/$PRODUIT_ID/increment" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 5
  }')

echo "$INCREMENT_RESPONSE" | jq '.'

echo -e "\n${YELLOW}📝 Étape 8 : Décrémentation du stock...${NC}"
DECREMENT_RESPONSE=$(curl -s -X PATCH "$BASE_URL/api/produits/$PRODUIT_ID/decrement" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "quantite": 3
  }')

echo "$DECREMENT_RESPONSE" | jq '.'

echo -e "\n${YELLOW}📝 Étape 9 : Création d'un approvisionnement...${NC}"
APPRO_RESPONSE=$(curl -s -X POST "$BASE_URL/api/approvisionnements" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"quantite\": 50,
    \"fournisseurId\": \"$FOURNISSEUR_ID\",
    \"produitId\": \"$PRODUIT_ID\"
  }")

echo "$APPRO_RESPONSE" | jq '.'

# Extraire l'ID de l'approvisionnement
APPRO_ID=$(echo "$APPRO_RESPONSE" | jq -r '.data.id')
echo -e "${GREEN}✅ Approvisionnement créé avec l'ID : $APPRO_ID${NC}"

echo -e "\n${YELLOW}📝 Étape 10 : Vérification du stock après approvisionnement...${NC}"
PRODUIT_FINAL=$(curl -s -X GET "$BASE_URL/api/produits/$PRODUIT_ID" \
  -H "Authorization: Bearer $TOKEN")

echo "$PRODUIT_FINAL" | jq '.'

STOCK_FINAL=$(echo "$PRODUIT_FINAL" | jq -r '.data.quantiteStock')
echo -e "${GREEN}✅ Stock final du produit : $STOCK_FINAL${NC}"

echo -e "\n${YELLOW}📝 Étape 11 : Liste des approvisionnements...${NC}"
curl -s -X GET "$BASE_URL/api/approvisionnements" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n${GREEN}🎉 Tous les tests sont terminés avec succès !${NC}"

# Résumé
echo -e "\n${YELLOW}📊 RÉSUMÉ DES TESTS :${NC}"
echo -e "Token : ${TOKEN:0:50}..."
echo -e "Fournisseur ID : $FOURNISSEUR_ID"
echo -e "Produit ID : $PRODUIT_ID"
echo -e "Approvisionnement ID : $APPRO_ID"
echo -e "Stock final : $STOCK_FINAL"
