document.addEventListener('DOMContentLoaded', () => {

    const testUsers = [
        {
            id: 1,
            login: 'octocat',
            avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
            bio: 'Software Engineer',
            public_repos: 8,
            followers: 1000,
            following: 500
        },
        {
            id: 2,
            login: 'defunkt',
            avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
            bio: 'Creator of GitHub',
            public_repos: 15,
            followers: 2000,
            following: 1000
        }
    ];

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const userProfile = document.getElementById('userProfile');
    const reposList = document.getElementById('reposList');


    function displayUserProfile(user) {
        userProfile.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}'s avatar" class="avatar">
            <h2>${user.login}</h2>
            <p>${user.bio || 'No bio available'}</p>
            <p>Repos: ${user.public_repos} | Followers: ${user.followers} | Following: ${user.following}</p>
        `;
    }  

    function searchUser(username) {
        const user = testUsers.find(u => u.login.toLowerCase() === username.toLowerCase());
        if (user) {
            displayUserProfile(user);
        } else {
            userProfile.innerHTML = '<p>User not found.</p>';
        }
    }

    searchBtn.addEventListener('click', () => {
        const username = searchInput.value.trim();
        searchUser(username);
    });

    // Afficher le premier utilisateur de test au chargement
    displayUserProfile(testUsers[0]);
});