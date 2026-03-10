<div align="center">
  <img src="public/logo.svg" alt="Anime Finder Logo" width="180"/>

  # 🎌 Anime Finder

  **Descubra e explore o universo dos animes com busca tradicional ou recomendações geradas por Inteligência Artificial.**

  ![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![Supabase](https://img.shields.io/badge/Supabase-Edge_Functions-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
  ![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
  ![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📖 Sobre o Projeto

O **Anime Finder** é uma aplicação web que combina dois modos de descoberta de animes:

- **🔍 Busca Normal** — Pesquise qualquer anime pelo título e veja informações como poster, score e trailer oficial, com dados fornecidos pela [Jikan API](https://jikan.moe/) (wrapper não oficial do MyAnimeList).
- **✨ Recomendação Inteligente** — Descreva em linguagem natural o que você quer assistir (ex: *"um isekai com protagonista overpowered em um mundo de fantasia"*) e a IA retorna 3 recomendações personalizadas. Exclusivo para usuários autenticados.

---

## 🚀 Funcionalidades

- **Busca em tempo real** por título de anime via Jikan API
- **Background dinâmico** que muda conforme o anime pesquisado
- **Abertura de trailer** no YouTube ao clicar no card do anime
- **Sistema de autenticação** completo (cadastro e login) via Supabase Auth
- **Avatar gerado automaticamente** para cada usuário (serviço DiceBear)
- **Recomendação por IA** via Google Gemini, protegida por autenticação real
- **Proteção contra Prompt Injection** com `systemInstruction` separado na API do Gemini
- **Validação de JWT** server-side na Edge Function

---

## 🛠️ Tecnologias Utilizadas

### Front-end
| Tecnologia | Uso |
|---|---|
| **Vanilla JavaScript (ES Modules)** | Toda a lógica do cliente |
| **Vite** | Bundler e servidor de desenvolvimento |
| **Axios** | Requisições HTTP para a Jikan API |
| **Supabase JS Client** | Autenticação e chamada das Edge Functions |

### Back-end / Infraestrutura
| Tecnologia | Uso |
|---|---|
| **Supabase Auth** | Cadastro, login e gerenciamento de sessão |
| **Supabase Edge Functions (Deno)** | Função serverless `recommend-anime` |
| **Google Gemini 2.0 Flash** | Geração das recomendações de anime |
| **Jikan API** | Dados públicos de animes (MyAnimeList) |

---

## 🏗️ Arquitetura do Projeto

```
anime-finder/
├── index.html                  # Estrutura HTML principal
├── public/                     # Assets estáticos (SVGs, ícones)
└── src/
    ├── main.js                 # Entry point — inicializa todos os módulos
    ├── style.css               # Estilos globais
    ├── api/
    │   ├── httpClient.js       # Chamadas à Jikan API (via Axios)
    │   └── supabase.js         # Singleton do cliente Supabase
    ├── components/
    │   └── ui.js               # Renderização dos cards de anime e erros
    └── modules/
        ├── auth.js             # Login, cadastro, logout e onAuthStateChange
        ├── search.js           # Lógica de busca normal
        ├── searchMode.js       # Alternância entre modo Normal e IA
        ├── navigation.js       # Navegação entre telas (Home / Auth)
        ├── aiSearch.js         # Chamada à Edge Function de IA
        ├── frierenEffect.js    # Efeito visual da página de IA
        └── logoEffect.js       # Efeito visual do logo

supabase/
└── functions/
    └── recommend-anime/
        └── index.ts            # Edge Function: valida JWT + chama Gemini
```

### Fluxo da Recomendação por IA

```
Browser                     Supabase Gateway              Edge Function (Deno)         Google Gemini
   |                               |                              |                          |
   |-- POST /recommend-anime ----->|                              |                          |
   |   (Bearer: JWT do usuário)    |                              |                          |
   |                               |-- Libera (--no-verify-jwt) ->|                          |
   |                               |                              |-- getUser(token) -------->|
   |                               |                              |   (valida JWT real)       |
   |                               |                              |                          |
   |                               |                              |-- generateContent() ----->|
   |                               |                              |                          |
   |<----- ["Anime1","Anime2","Anime3"] ---------------------------|--------------------------
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Conta no [Supabase](https://supabase.com/) e no [Google AI Studio](https://aistudio.google.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/patrickhauck0/anime-finder.git
cd anime-finder
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

> Ambos os valores estão disponíveis em **Supabase Dashboard → Settings → API**.

### 4. Configure o secret da Edge Function

```bash
npx supabase secrets set GEMINI_API_KEY=sua_chave_do_google_ai_studio
```

### 5. Faça o deploy da Edge Function

```bash
npx supabase functions deploy recommend-anime --no-verify-jwt
```

> A flag `--no-verify-jwt` é necessária para o CORS funcionar via browser. A validação do JWT é feita manualmente dentro da função.

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

---

## 🌐 Deploy no Vercel

1. Faça push do projeto para o GitHub
2. Importe o repositório no [Vercel](https://vercel.com/)
3. No painel do projeto, acesse **Settings → Environment Variables** e adicione:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Clique em **Deploy**

> O Vercel detecta automaticamente o Vite como framework e configura o build (`npm run build`) corretamente.

---

## 🔐 Segurança

- **Credenciais sensíveis** (`GEMINI_API_KEY`) vivem apenas como Supabase Secrets — nunca expostas ao browser
- **`VITE_SUPABASE_ANON_KEY`** é pública por design do Supabase (Row Level Security protege os dados)
- **JWT validado server-side** via `supabase.auth.getUser(token)` na Edge Function
- **Prompt Injection mitigado** com `systemInstruction` separado na API do Gemini e limite de 300 caracteres no input
- **`.env` ignorado** pelo `.gitignore`

---

## 📡 APIs Utilizadas

| API | Autenticação | Documentação |
|---|---|---|
| Jikan API v4 | Pública (sem chave) | [jikan.moe](https://jikan.moe/) |
| Google Gemini | API Key (server-side) | [ai.google.dev](https://ai.google.dev/) |
| Supabase Auth | Anon Key + JWT | [supabase.com/docs](https://supabase.com/docs) |
| DiceBear Avatars | Pública (sem chave) | [dicebear.com](https://www.dicebear.com/) |

---

## 👨‍💻 Autor

Desenvolvido por **Patrick Hauck**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Patrick_Hauck-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/patrick-hauck-4672a2200/)
[![GitHub](https://img.shields.io/badge/GitHub-patrickhauck0-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/patrickhauck0)

---

<div align="center">
  <sub>Dados fornecidos pela <a href="https://jikan.moe/">Jikan API</a> · Não afiliado ao MyAnimeList</sub>
</div>