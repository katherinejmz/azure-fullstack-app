# TaskCollab - Azure Fullstack Deployment

TaskCollab est une application collaborative de gestion de tâches, permettant à plusieurs utilisateurs de créer, gérer et suivre des tâches ensemble. Ce dépôt contient à la fois l’application (frontend + backend) et sa configuration pour un déploiement complet sur **Microsoft Azure**.

## 🚀 Objectif du Projet

- Déployer une application fullstack sur Azure (frontend, backend et base de données).
- Mettre en œuvre une architecture cloud fiable, évolutive et sécurisée.
- Assurer une communication fluide entre les composants.
- Bonus : Intégrer CI/CD, sécurisation avec Azure Key Vault, etc.

---

## ✨ Fonctionnalités principales

- Authentification simple via pseudonymes
- Création, modification et suppression de tâches
- Visualisation et filtrage des tâches (par utilisateur ou statut)
- Design responsive

---

## 🛠️ Stack Technique

| Composant   | Technologie utilisée                      |
|-------------|--------------------------------------------|
| Frontend    | React, Vite, TypeScript, TailwindCSS       |
| Backend     | Node.js, Express                           |
| Base de données | SQLite (via better-sqlite3)            |
| État global | Zustand                                    |
| Formulaires | React Hook Form                            |
| Notifications | Sonner                                  |
| Routing     | React Router                               |
| CI/CD       | GitHub Actions                             |

---

## 🧩 Architecture de Déploiement sur Azure

| Élément          | Ressource Azure                          |
|------------------|------------------------------------------|
| Frontend         | Azure App Service (Web App)              |
| Backend API      | Azure App Service (API App)              |
| Base de données  | Azure SQL Database ou Cosmos DB          |
| Pipeline CI/CD   | GitHub Actions                           |
| Secrets & sécurité | Azure Key Vault                       |

---

## 🌐 Accès à l'application

- **Frontend déployé** : [https://mon-app.azurewebsites.net](https://mon-app.azurewebsites.net)
- **API backend** : [https://mon-api.azurewebsites.net](https://mon-api.azurewebsites.net)

---

## 🔄 CI/CD GitHub Actions

Le pipeline est déclenché à chaque push sur `main`. Il :

1. Installe les dépendances
2. Build le frontend
3. Déploie sur Azure App Services

```yaml
# Exemple simplifié
name: Deploy to Azure

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install
        working-directory: ./server

      - name: Build Frontend
        run: npm run build
        working-directory: ./client

      - name: Deploy Frontend
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'taskcollab-frontend'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ./client/dist
