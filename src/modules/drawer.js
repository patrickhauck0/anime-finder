export function setupDrawer() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  const drawerNormalMode = document.getElementById('drawerNormalMode');
  const drawerAiMode = document.getElementById('drawerAiMode');

  const btnNormalMode = document.getElementById('btnNormalMode');
  const btnAiMode = document.getElementById('btnAiMode');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.style.display = 'block';
    });
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.style.display = 'none';
    });
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        mobileDrawer.style.display = 'none';
      }
    });
  }

  if (drawerNormalMode) {
    drawerNormalMode.addEventListener('click', () => {
      if (btnNormalMode) btnNormalMode.click(); 
      mobileDrawer.style.display = 'none'; 
      
      drawerNormalMode.classList.add('active');
      drawerAiMode.classList.remove('active');
    });
  }

  if (drawerAiMode) {
    drawerAiMode.addEventListener('click', () => {
      if (btnAiMode) btnAiMode.click();
      mobileDrawer.style.display = 'none';
      
      // Estilo de ativo
      drawerAiMode.classList.add('active');
      drawerNormalMode.classList.remove('active');
    });
  }
}