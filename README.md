
# Solution App - Guide de démarrage

Ce guide vous aidera à configurer et démarrer tous les composants de l'application Solution.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- Node.js (v14+)
- MySQL (v5.7+ ou 8.0+)
- NPM (inclus avec Node.js)

## Configuration de la base de données

1. Démarrez votre serveur MySQL
2. Exécutez le script SQL avec cette commande :
```bash
mysql -u root -p < database/solution-app.sql
```
---

## Configuration du backend

### 1. Installer les dépendances
```bash
cd server && npm install
```

### 2. Configurer la base de données
Éditez `server/db.js` :
```javascript
{
  host: 'localhost',
  user: 'root', 
  password: 'votre_mot_de_passe', // ← Modifier ici
  database: 'solution'
}
```

### 3. Démarrer le serveur
```bash
npm start
```
*API disponible sur* : http://localhost:3001

---

## Configuration du frontend

### 1. Installer les dépendances
```bash
cd solution-app && npm install
```

### 2. Démarrer l'application
```bash
npm start
```
*Application disponible sur* : http://localhost:3000

---

## Architecture de l'application

| Composant       | Description                          | Endpoints clés           |
|-----------------|--------------------------------------|--------------------------|
| **Backend**     | API REST + Base de données           | `/api/auth/*`            |
| **Frontend**    | Interface React                      | `/login`, `/register`    |

---

## Dépannage

| Problème                        | Solution                          |
|---------------------------------|-----------------------------------|
| Serveur ne démarre pas          | Vérifier les credentials MySQL   |
| Connexion API échouée           | Vérifier le port 3001/URL front  |
| Erreurs SQL                     | Relancer le script d'initialisation |

---

## Commandes de développement

**Backend** (avec rechargement automatique) :
```bash
cd server && npm run dev
```

**Frontend** (mode watch) :
```bash
cd solution-app && npm start
```

