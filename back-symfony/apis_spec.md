## Entités : 
 * USER :    
    * id
    * nom
    * prenom
    * pseudo
    * email
    * role
    * mdp
    * lien -> abonnement
    * lien -> école

 * RECETTE
    * id
    * titre
    * description
    * image_url

 * RECETTE - INGREDIENT (jointure)
    * id
    * lien -> recette
    * lien -> ingredient

 * INGREDIENTS
    * id
    * nom
    * catgory
    * unite
    * is_allergene

 * COMMANDE
    * id
    * validate_date
    * lien -> panier

 * PANIER
    * id
    * creation_date
    * lien -> user
 * PANIER - PLAT - DESSERT - BOISSON
    * id
    * lien -> panier
    * type_item
    * lien -> item (plat, dessert ou boisson)
    * quantity
 * PAIEMENT
    * id
    * total_amount
    * payment_type
    * payment_status
    * lien -> commande

 * FACTURE
    * id
    * reference
    * total_ht
    * total_ttc
    * lien -> paiement

 * ITEM
    * id
    * type (plat, dessert, boisson)
    * nom
    * quantity
    * lien -> recette (nullable)

 * ABONNEMENT
    * id
    * name
    * start_date
    * end_date
    * is_active
    * lien -> tarif

 * TARIF
    * id
    * name
    * amount

 * ECOLE
    * id
    * name
    * lien -> adresse

 * ADRESSE
    * id
    * adresse
    * adresse_plus
    * post_code
    * city

# Requêtes :

## USER
 * GET : Récupérer tous les utilisateurs
```
    GET /api/users
```

 * GET : Récupérer un utilisateur spécifique par ID
```
GET /api/users/{id}
```

 * POST : Créer un nouvel utilisateur
```
POST /api/users
Body:
{
  "nom": "string",
  "prenom": "string",
  "pseudo": "string",
  "email": "string",
  "role": "string",
  "mdp": "string",
  "abonnement_id": "int",
  "ecole_id": "int"
}
```

* PUT : Mettre à jour les informations d'un utilisateur spécifique (remplacement complet)
```
PUT /api/users/{id}
Body:
{
  "nom": "string",
  "prenom": "string",
  "pseudo": "string",
  "email": "string",
  "role": "string",
  "mdp": "string",
  "abonnement_id": "int",
  "ecole_id": "int"
}
```

* PATCH : Mettre à jour partiellement les informations d'un utilisateur

```
PATCH /api/users/{id}
Body: (uniquement les champs à modifier)
{
  "email": "string",
  "role": "string"
}
```

* DELETE : Supprimer un utilisateur
```
    DELETE /api/users/{id}
```
## RECETTE

 * GET : Récupérer toutes les recettes
```
GET /api/recettes
```

 * GET : Récupérer une recette spécifique
```
GET /api/recettes/{id}
```

 * POST : Créer une nouvelle recette

```
POST /api/recettes
Body:
{
  "titre": "string",
  "description": "string",
  "image_url": "string"
}
```

 * PUT : Mettre à jour une recette (remplacement complet)
```
PUT /api/recettes/{id}
Body:
{
  "titre": "string",
  "description": "string",
  "image_url": "string"
}
```

 * PATCH : Mettre à jour partiellement une recette
```
PATCH /api/recettes/{id}
Body: (uniquement les champs à modifier)
{
  "description": "string"
}
```

 * DELETE : Supprimer une recette

```
    DELETE /api/recettes/{id}
```

## INGRÉDIENTS

 * GET : Récupérer tous les ingrédients
```
GET /api/ingredients
```

 * GET : Récupérer un ingrédient spécifique
```
GET /api/ingredients/{id}
```

 * POST : Créer un nouvel ingrédient
```
POST /api/ingredients
Body:
{
  "nom": "string",
  "category": "string",
  "unite": "string",
  "is_allergene": "bool"
}
```

 * PUT : Mettre à jour un ingrédient
```
PUT /api/ingredients/{id}
Body:
{
  "nom": "string",
  "category": "string",
  "unite": "string",
  "is_allergene": "bool"
}
```

 * PATCH : Mise à jour partielle d'un ingrédient
```
PATCH /api/ingredients/{id}
Body:
{
  "category": "string"
}
```

* DELETE : Supprimer un ingrédient
```
    DELETE /api/ingredients/{id}
```

## COMMANDE

 * GET : Récupérer toutes les commandes
```
GET /api/commandes
```

 * GET : Récupérer une commande spécifique
```
GET /api/commandes/{id}
```

 * POST : Créer une nouvelle commande
```
POST /api/commandes
Body:
{
  "validate_date": "date",
  "panier_id": "int"
}
```

* PUT : Mettre à jour une commande
```
PUT /api/commandes/{id}
Body:
{
  "validate_date": "date",
  "panier_id": "int"
}
```

 * PATCH : Mise à jour partielle d'une commande
```
PATCH /api/commandes/{id}
Body:
{
  "validate_date": "date"
}
```

 * DELETE : Supprimer une commande
```
    DELETE /api/commandes/{id}
```

## PANIER

 * GET : Récupérer tous les paniers
```
GET /api/paniers
```

 * GET : Récupérer un panier spécifique
```
GET /api/paniers/{id}
```

 * POST : Créer un nouveau panier
```
POST /api/paniers
Body:
{
  "creation_date": "date",
  "user_id": "int"
}
```

 * PUT : Mettre à jour un panier
```
PUT /api/paniers/{id}
Body:
{
  "creation_date": "date",
  "user_id": "int"
}
```

* PATCH : Mise à jour partielle d'un panier
```
PATCH /api/paniers/{id}
Body:
{
  "user_id": "int"
}
```

 * DELETE : Supprimer un panier
```
    DELETE /api/paniers/{id}
```

## PAIEMENT
 * GET : Récupérer tous les paiements
```
GET /api/paiements
```

 * GET : Récupérer un paiement spécifique
```
GET /api/paiements/{id}
```

 * POST : Créer un paiement
```
POST /api/paiements
Body:
{
  "total_amount": "decimal",
  "payment_type": "string",
  "payment_status": "string",
  "commande_id": "int"
}
```

* PUT : Mettre à jour un paiement
```
PUT /api/paiements/{id}
Body:
{
  "total_amount": "decimal",
  "payment_type": "string",
  "payment_status": "string",
  "commande_id": "int"
}
```

 * PATCH : Mise à jour partielle d'un paiement
```
PATCH /api/paiements/{id}
Body:
{
  "payment_status": "string"
}
```

 * DELETE : Supprimer un paiement
```
    DELETE /api/paiements/{id}
```

## FACTURE

 * GET : Récupérer toutes les factures
```
GET /api/factures
```

 * GET : Récupérer une facture spécifique
```
GET /api/factures/{id}
```

 * POST : Créer une nouvelle facture
```
POST /api/factures
Body:
{
  "reference": "string",
  "total_ht": "decimal",
  "total_ttc": "decimal",
  "paiement_id": "int"
}
```

 * PUT : Mettre à jour une facture
```
PUT /api/factures/{id}
Body:
{
  "reference": "string",
  "total_ht": "decimal",
  "total_ttc": "decimal",
  "paiement_id": "int"
}
```

 * PATCH : Mise à jour partielle d'une facture
```
PATCH /api/factures/{id}
Body:
{
  "total_ttc": "decimal"
}
```

 * DELETE : Supprimer une facture
```
    DELETE /api/factures/{id}
```

## ITEM (Plat/Dessert/Boisson)
 * GET : Récupérer tous les items
```
GET /api/items
```

 * GET : Récupérer un item spécifique
```
GET /api/items/{id}
```

 * POST : Créer un nouvel item
```
POST /api/items
Body:
{
  "type": "string",  -- plat, dessert, boisson
  "nom": "string",
  "quantity": "int",
  "recette_id": "int" -- nullable
}
```

 * PUT : Mettre à jour un item
```
PUT /api/items/{id}
Body:
{
  "type": "string",
  "nom": "string",
  "quantity": "int",
  "recette_id": "int" -- nullable
}
```

 * PATCH : Mise à jour partielle d'un item
```
PATCH /api/items/{id}
Body:
{
  "quantity": "int"
}
```

 * DELETE : Supprimer un item
```
    DELETE /api/items/{id}
```

## ABONNEMENT
 * GET : Récupérer tous les abonnements
```
GET /api/abonnements
```

 * GET : Récupérer un abonnement spécifique
```
GET /api/abonnements/{id}
```

* POST : Créer un abonnement
```
POST /api/abonnements
Body:
{
  "name": "string",
  "start_date": "date",
  "end_date": "date",
  "is_active": "bool",
  "tarif_id": "int"
}
```

 * PUT : Mettre à jour un abonnement
```
PUT /api/abonnements/{id}
Body:
{
  "name": "string",
  "start_date": "date",
  "end_date": "date",
  "is_active": "bool",
  "tarif_id": "int"
}
```

 * PATCH : Mise à jour partielle d'un abonnement
```
PATCH /api/abonnements/{id}
Body:
{
  "is_active": "bool"
}
```

 * DELETE : Supprimer un abonnement
```
    DELETE /api/abonnements/{id}
```

## TARIF
 * GET : Récupérer tous les tarifs
```
GET /api/tarifs
```

 * GET : Récupérer un tarif spécifique
```
GET /api/tarifs/{id}
```
 * POST : Créer un nouveau tarif
```
POST /api/tarifs
Body:
{
  "name": "string",
  "amount": "decimal"
}
```

 * PUT : Mettre à jour un tarif
```
PUT /api/tarifs/{id}
Body:
{
  "name": "string",
  "amount": "decimal"
}
```

 * PATCH : Mise à jour partielle d'un tarif
```
PATCH /api/tarifs/{id}
Body:
{
  "amount": "decimal"
}
```

* DELETE : Supprimer un tarif
```
    DELETE /api/tarifs/{id}
```

## ÉCOLE
 * GET : Récupérer toutes les écoles
```
GET /api/ecoles
```

 * GET : Récupérer une école spécifique
```
GET /api/ecoles/{id}
```

 * POST : Créer une nouvelle école
```
POST /api/ecoles
Body:
{
  "name": "string",
  "adresse_id": "int"
}
```

* PUT : Mettre à jour une école
```
PUT /api/ecoles/{id}
Body:
{
  "name": "string",
  "adresse_id": "int"
}
```

 * PATCH : Mise à jour partielle d'une école
```
PATCH /api/ecoles/{id}
Body:
{
  "name": "string"
}
```

 * DELETE : Supprimer une école
```
    DELETE /api/ecoles/{id}
```

## ADRESSE
 * GET : Récupérer toutes les adresses
```
GET /api/adresses
```

 * GET : Récupérer une adresse spécifique
```
GET /api/adresses/{id}
```

 * POST : Créer une nouvelle adresse
```
POST /api/adresses
Body:
{
  "adresse": "string",
  "adresse_plus": "string",
  "post_code": "string",
  "city": "string"
}
```

 * PUT : Mettre à jour une adresse
```
PUT /api/adresses/{id}
Body:
{
  "adresse": "string",
  "adresse_plus": "string",
  "post_code": "string",
  "city": "string"
}
```

 * PATCH : Mise à jour partielle d'une adresse
```
PATCH /api/adresses/{id}
Body:
{
  "post_code": "string"
}
```

 * DELETE : Supprimer une adresse
```
    DELETE /api/adresses/{id}
```