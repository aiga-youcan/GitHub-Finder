// ==========================================
// 1. ÉTAT CENTRALISÉ (STATE)
// ==========================================
// Cet objet stocke les données importantes de notre application.
const state = {
    currentUser: null, // Infos du profil recherché
    currentRepos: [], // Les 5 derniers repos du profil
    bookmarks: [], // La liste des favoris
    isViewingBookmarks: false // Sommes-nous sur la page des favoris ?
};

// ==========================================
// 2. SÉLECTION DES ÉLÉMENTS DU DOM
// ==========================================
// Inputs et boutons
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const navBookmarksBtn = document.getElementById('nav-bookmarks-btn');
const bookmarksCount = document.getElementById('bookmarks-count');

// Sections
const sectionWelcome = document.getElementById('welcome-section');
const sectionLoading = document.getElementById('loading-section');
const sectionError = document.getElementById('error-section');
const sectionResults = document.getElementById('results-section');
const sectionBookmarks = document.getElementById('bookmarks-section');

// Conteneurs pour l'injection HTML
const profileContainer = document.getElementById('profile-container');
const reposContainer = document.getElementById('repos-container');
const bookmarksContainer = document.getElementById('bookmarks-container');

// ==========================================
// 3. FONCTIONS PRINCIPALES
// ==========================================

// Fonction d'initialisation appelée au démarrage
function init() {
    // 1. Charger les favoris depuis le localStorage
    const savedBookmarks = localStorage.getItem('devfinder_bookmarks');
    if (savedBookmarks) {
        state.bookmarks = JSON.parse(savedBookmarks);
        bookmarksCount.innerHTML = state.bookmarks.length;
    }

    // 2. Ajouter les événements (clics et clavier)
    searchBtn.addEventListener('click', () => {
        searchUser(searchInput.value.trim());
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchUser(searchInput.value.trim());
    });

    navBookmarksBtn.addEventListener('click', displayBookmarks);
}

// Fonction pour afficher l'écran de chargement
function showLoading() {
    sectionWelcome.classList.add('hidden');
    sectionError.classList.add('hidden');
    sectionResults.classList.add('hidden');
    sectionBookmarks.classList.add('hidden');
    
    sectionLoading.classList.remove('hidden');
}

// Fonction pour afficher l'écran d'erreur
function showError() {
    sectionWelcome.classList.add('hidden');
    sectionLoading.classList.add('hidden');
    sectionResults.classList.add('hidden');
    sectionBookmarks.classList.add('hidden');
    
    sectionError.classList.remove('hidden');
}

// Fonction asynchrone pour rechercher un utilisateur et ses repos
async function searchUser(username) {
    if (!username) return; // Ne rien faire si le champ est vide

    state.isViewingBookmarks = false;
    showLoading();

    try {
        // 1. Appel API pour le profil
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("Utilisateur non trouvé");
        const userData = await userRes.json();

        // 2. Appel API pour les 5 derniers repos (triés par date de mise à jour)
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const reposData = await reposRes.json();

        // 3. Mise à jour du State
        state.currentUser = userData;
        state.currentRepos = reposData;

        // 4. Affichage
        displayUser();

    } catch (error) {
        console.error(error);
        showError();
    }
}

// Fonction pour afficher le profil et les repos dans le HTML
function displayUser() {
    const user = state.currentUser;

    // Vérifier si l'utilisateur est déjà dans les favoris
    const isBookmarked = state.bookmarks.some(b => b.login === user.login);
    
    // Déterminer le style et l'action du bouton favori
    let btnHTML = '';
    if (isBookmarked) {
        btnHTML = `<button id="action-btn" class="btn-danger">Retirer des favoris</button>`;
    } else {
        btnHTML = `<button id="action-btn" class="btn-success">Ajouter aux favoris</button>`;
    }

    // Générer le HTML du profil
    profileContainer.innerHTML = `
        <div class="profile-header">
            <img src="${user.avatar_url}" alt="Avatar" class="profile-avatar">
            <div>
                <h2>${user.name || user.login}</h2>
                <p>@${user.login}</p>
            </div>
        </div>
        <p>${user.bio || 'Aucune biographie disponible.'}</p>
        <div class="profile-stats">
            <span><strong>${user.followers}</strong> Abonnés</span>
            <span><strong>${user.following}</strong> Abonnements</span>
            <span><strong>${user.public_repos}</strong> Repos</span>
        </div>
        <a href="${user.html_url}" target="_blank" class="profile-link">Voir sur GitHub &rarr;</a>
        ${btnHTML}
    `;

    // Attacher l'événement au bouton généré (Ajouter ou Retirer)
    const actionBtn = document.getElementById('action-btn');
    actionBtn.addEventListener('click', () => {
        if (isBookmarked) {
            removeBookmark(user.login);
        } else {
            addBookmark(user);
        }
    });

    // Générer le HTML des repos
    reposContainer.innerHTML = '';
    state.currentRepos.forEach(repo => {
        reposContainer.innerHTML += `
            <div class="repo-card">
                <div>
                    <strong>${repo.name}</strong>
                    <p style="font-size: 0.9em; color: var(--text-muted);">${repo.description || 'Pas de description'}</p>
                </div>
                <a href="${repo.html_url}" target="_blank" class="btn-outline" style="text-decoration:none;">Code</a>
            </div>
        `;
    });

    // Afficher la section des résultats
    sectionLoading.classList.add('hidden');
    sectionResults.classList.remove('hidden');
}