document.addEventListener('DOMContentLoaded', () => {
    const leaderboardBody = document.getElementById('leaderboard-body');

    // Funkcija za učitavanje i prikazivanje rezultata
    function displayLeaderboard() {
        const scores = JSON.parse(localStorage.getItem('monopolyLeaderboard')) || [];

        leaderboardBody.innerHTML = ''; // Očisti postojeće redove

        if (scores.length === 0) {
            const noScoresRow = document.createElement('tr');
            noScoresRow.innerHTML = `<td colspan="2">Nema sačuvanih rezultata još uvek.</td>`;
            leaderboardBody.appendChild(noScoresRow);
            return;
        }

        scores.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.player}</td>
                <td>${entry.score}</td>
            `;
            leaderboardBody.appendChild(row);
        });
    }

    // Pozovi funkciju kada se stranica učita
    displayLeaderboard();
});