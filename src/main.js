import { searchAnime } from './api/httpClient.js';
import { renderAnimes, renderApiError } from './components/ui.js';
import { supabase } from './api/supabase.js';

async function setupFilter() {
  const loader = document.getElementById('loader');
  const dynamicBg = document.getElementById('dynamicBg');
  const searchBoxBtn = document.getElementById('searchBtn');
  const searchBoxInput = document.getElementById('searchInput');
  const logoPrincipal =  document.getElementById('logo-principal');
  const resultsContainer = document.querySelector('#results');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const homeView = document.getElementById('home-view');
  const authView = document.getElementById('auth-view');

  // Auth const
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const authMessage = document.getElementById('authMessage');

  const userProfile = document.getElementById('userProfile');
  const userAvatar = document.getElementById('userAvatar');
  const logoutBtn = document.getElementById('logoutBtn');

  searchBoxBtn.addEventListener('click', async () => {
    const textInput = searchBoxInput.value;

    if (textInput === '') {
      return;
    }

    resultsContainer.innerHTML = '';
    loader.style.display = 'block';

    try {
      const results = await searchAnime(textInput);

      console.log(results);
      renderAnimes(results);

      if (results && results.length > 0) {
        const urlImage = results[0].images.jpg.large_image_url;
        dynamicBg.style.backgroundImage = `url('${urlImage}')`;
        dynamicBg.classList.add('animate-bg');
      }
    } catch {
      renderApiError();
    } finally {
      loader.style.display = 'none';
    }
  });

  searchBoxInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchBoxBtn.click();
    }
  });

  logoPrincipal.addEventListener('click', () => {
    location.reload();
  });

  let animationFrameId;

  logoPrincipal.addEventListener('mousemove', (event) => {
    const rect = logoPrincipal.getBoundingClientRect();

    const centerX = rect.left + (rect.width / 2);
    const centerY = rect.top + (rect.height / 2);

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const moveX = (mouseX - centerX) / (rect.width / 2);
    const moveY = (mouseY - centerY) / (rect.height / 2);

    const intensidade = 15; 
    cancelAnimationFrame(animationFrameId); 

    animationFrameId = requestAnimationFrame(() => {
      logoPrincipal.style.setProperty('--move-x', `${moveX * intensidade}px`);
      logoPrincipal.style.setProperty('--move-y', `${moveY * intensidade}px`);
    });
  });

  logoPrincipal.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animationFrameId);
    logoPrincipal.style.setProperty('--move-x', '0px');
    logoPrincipal.style.setProperty('--move-y', '0px');
  });

  resultsContainer.innerHTML = '';
  loader.style.display = 'block';

  try {
    const animeOnPageLoadInitial = "Naruto";
    const resultsInitial = await searchAnime(animeOnPageLoadInitial);
    renderAnimes(resultsInitial);

    if (resultsInitial && resultsInitial.length > 0) {
      const urlImage = resultsInitial[0].images.jpg.large_image_url;
      dynamicBg.style.backgroundImage = `url('${urlImage}')`;
      dynamicBg.classList.add('animate-bg');
    }
  } catch {
    renderApiError();
  } finally {
    loader.style.display = 'none';
  }

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

  registerBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      authMessage.style.color = '#E50914';
      authMessage.textContent = 'Por favor, preencha e-mail e senha!';
      return;
    }

    authMessage.style.color = '#FFF';
    authMessage.textContent = 'Criando conta... ⏳';

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
    authMessage.textContent = 'Autenticando... ⏳';

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
      authMessage.textContent = 'Login efetuado com sucesso! 🎉';

      console.log("Sessão do Usuário:", data.session);
    }
  });

  supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      const emailDoUsuario = session.user.email;

      navLoginBtn.style.display = 'none';
      userProfile.style.display = 'flex';
      
      // Generate random avatar 
      userAvatar.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${emailDoUsuario}`;

      // Back to home screen
      authView.style.display = 'none';
      homeView.style.display = 'block';
    } else {
      navLoginBtn.style.display = 'block';
      userProfile.style.display = 'none';
      navLoginBtn.textContent = '👤 Login';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut();
    location.reload(); 
  });  
}

setupFilter();
