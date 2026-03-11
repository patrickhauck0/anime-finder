import { setupSearch } from './modules/search.js';
import { setupAuth } from './modules/auth.js';
import { setupNav } from './modules/navigation.js';
import { setupLogo } from './modules/logoEffect.js';
import { searchMode } from './modules/searchMode.js';
import { frierenEffect } from './modules/frierenEffect.js';
import { aiSearch } from './modules/aiSearch.js';  
import { setupDrawer } from './modules/drawer.js';

setupSearch();
setupAuth();
setupNav();
setupLogo();
searchMode();
frierenEffect();
aiSearch();
setupDrawer();