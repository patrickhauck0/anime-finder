import { supabase } from '../api/supabase.js';

export function setupAuth() {
  // Auth const
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const authMessage = document.getElementById('authMessage');

  const userProfile = document.getElementById('userProfile');
  const userAvatar = document.getElementById('userAvatar');
  const drawerAvatar = document.getElementById('drawerAvatar');
  const logoutBtn = document.getElementById('logoutBtn');

  const navLoginBtn = document.getElementById('navLoginBtn');
  const authView = document.getElementById('auth-view');
  const homeView = document.getElementById('home-view');

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerLogoutBtn = document.getElementById('drawerLogoutBtn');

  registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      authMessage.style.color = '#E50914';
      authMessage.textContent = 'Por favor, preencha e-mail e senha!';
      return;
    }

    authMessage.style.color = '#FFF';
    authMessage.textContent = 'Criando conta...';

    // Supabase function for register account
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    
    if (error) {
      authMessage.style.color = '#E50914';
      authMessage.textContent = `Erro: ${error.message}`;
    } else {
      authMessage.style.color = '#4CAF50';
      authMessage.textContent = 'Conta criada com sucesso! Agora você pode Entrar.';
      passwordInput.value = '';
    }
  });

  // login account
  loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      authMessage.style.color = '#E50914';
      authMessage.textContent = 'Por favor, preencha e-mail e senha!';
      return;
    }

    authMessage.style.color = '#FFF';
    authMessage.textContent = 'Autenticando...';

    // Supabase function for login account
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      authMessage.style.color = '#E50914';
      authMessage.textContent = 'E-mail ou senha incorretos!';
    } else {
      authMessage.style.color = '#4CAF50';
      authMessage.textContent = 'Login efetuado com sucesso!';
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      const emailDoUsuario = session.user.email;

      navLoginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      
      // Generate random avatar 
      userAvatar.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${emailDoUsuario}`;
      if (drawerAvatar) drawerAvatar.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${emailDoUsuario}`;
      
      // Back to home screen
      authView.style.display = 'none';
      homeView.style.display = 'block';

      if (mobileMenuBtn) mobileMenuBtn.classList.add('logged-in');
    } else {
      navLoginBtn.style.display = 'block';
      userProfile.style.display = 'none';
      
      navLoginBtn.innerHTML = '<i class="fa-solid fa-user"></i> Login';

      if (mobileMenuBtn) mobileMenuBtn.classList.remove('logged-in');
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload(); 
  });

  if (drawerLogoutBtn) {
    drawerLogoutBtn.addEventListener('click', async () => {
      await supabase.auth.signOut();
      location.reload(); 
    });
  }
}