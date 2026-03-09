export function setupNav() {
  const navLoginBtn = document.getElementById('navLoginBtn');
  const homeView = document.getElementById('home-view');
  const authView = document.getElementById('auth-view');

  /* show login or hide */

  navLoginBtn.addEventListener('click', () => {
    if (homeView.style.display !== 'none') {
      homeView.style.display = 'none';
      authView.style.display = 'block';
      navLoginBtn.textContent = '🏠 Voltar';
    } else {
      homeView.style.display = 'block';
      authView.style.display = 'none';
      navLoginBtn.textContent = '👤 Login';
    }
  });
}
