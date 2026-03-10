export function searchMode() {
    const btnNormalMode = document.getElementById('btnNormalMode');
    const btnAiMode = document.getElementById('btnAiMode');
    const normalSearchBox = document.getElementById('normalSearchBox');
    const aiSearchBox = document.getElementById('aiSearchBox');
    const aiWelcome = document.getElementById('aiWelcome');
    const showAnimes = document.getElementById('results');

    btnNormalMode.addEventListener('click', () => {
        normalSearchBox.style.display = 'flex';
        aiSearchBox.style.display = 'none';

        aiWelcome.style.display = 'none';
        showAnimes.style.display = 'grid';

        btnNormalMode.classList.add('active');
        btnAiMode.classList.remove('active');
    });
    
    btnAiMode.addEventListener('click', () => {
        aiSearchBox.style.display = 'flex';
        normalSearchBox.style.display = 'none';

        showAnimes.style.display = 'none';
        aiWelcome.style.display = 'block';

        btnAiMode.classList.add('active');
        btnNormalMode.classList.remove('active');        
    });
}