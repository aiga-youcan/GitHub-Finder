Markdown
# 🔎 GitHub Finder App

## 📌 Description
GitHub Finder est une application frontend développée en JavaScript vanilla permettant de rechercher des profils GitHub, afficher leurs informations publiques et sauvegarder des profils en favoris.

Cette application est destinée aux recruteurs pour faciliter la découverte rapide de développeurs.

---

## 🚀 Fonctionnalités

- 🔍 Recherche d’un utilisateur GitHub
- 👤 Affichage du profil complet :
  - Avatar
  - Nom
  - Bio
  - Followers / Following
  - Nombre de repositories publics
  - Lien vers GitHub
- ❌ Gestion des erreurs (utilisateur inexistant)
- ⭐ Système de favoris :
  - Ajouter un profil
  - Supprimer un profil
  - Voir la liste des favoris
- 💾 Persistance avec localStorage
- 🔄 Rechargement rapide d’un profil depuis les favoris
- ⏳ Indicateur de chargement
- 🌙 Dark mode
- 📱 Design responsive

---

## 🛠️ Technologies utilisées

- HTML5
- CSS3 (Flexbox / Grid)
- JavaScript (Vanilla JS)
- API GitHub publique

---

## 📦 Installation

1. Cloner le repository :
```bash
git clone https://github.com/aiga-youcan/GitHub-Finder.git

Ouvrir le projet :
Bash
cd github-finder

Lancer le fichier :
Bash
index.html

⚙️ Architecture
State Management
JavaScript
const state = {
  currentUser: null,
  bookmarks: [],
  isViewingBookmarks: false
};

🔌 API utilisée
Endpoint :

https://api.github.com/users/{username}

💾 Stockage
Utilisation de localStorage pour sauvegarder les favoris :
JavaScript
localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));

📁 Structure du projet

/project
│── index.html
│── style.css
│── app.js
│── README.md

✅ Contraintes respectées
✔️ JavaScript Vanilla uniquement
✔️ Utilisation de async/await
✔️ Gestion d’erreurs avec try/catch
✔️ Pas de backend
✔️ Stockage local avec localStorage
✔️ Interface responsive
✔️ État centralisé
👨‍💻 Auteur
Nom : RIDA SABRAR
Formation : Développement Web
