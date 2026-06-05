/**
 * app.js - Unique Electronics & Electricals Website Logic
 * Handles: Theme toggling, Live store status (IST), Catalog search/filter,
 * WhatsApp Quote Basket, Drawer controls, and Scroll animation fallback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const mainContent = document.getElementById('main-content');
  const mainFooter = document.getElementById('main-footer');
  
  const storeStatusDot = document.getElementById('store-status-dot');
  const storeStatusText = document.getElementById('store-status-text');
  
  const catalogSearch = document.getElementById('catalog-search');
  const categoryTabs = document.querySelectorAll('.tab-btn');
  const catalogGrid = document.getElementById('catalog-grid');
  const categoryCards = document.querySelectorAll('.category-card');
  const productCheckboxes = document.querySelectorAll('.quote-checkbox');
  const noResultsCard = document.getElementById('no-results-card');
  
  const basketFab = document.getElementById('basket-fab');
  const basketCount = document.getElementById('basket-count');
  const quoteDrawer = document.getElementById('quote-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const closeDrawerBtn = document.getElementById('close-drawer');
  const emptyDrawerState = document.getElementById('empty-drawer-state');
  const selectedItemsList = document.getElementById('selected-items-list');
  const sendWhatsAppBtn = document.getElementById('send-whatsapp-btn');
  const langToggleBtn = document.getElementById('lang-toggle');
  const customQueryWrapper = document.getElementById('custom-query-wrapper');
  const customQueryInput = document.getElementById('custom-query-input');

  // --- State Management ---
  const WHATSAPP_NUMBER = '919415242951';
  let quoteBasket = []; // Array of { name, category, quantity }

  // --- Translation Dictionary ---
  const TRANSLATIONS = {
    en: {
      'nav-home': 'Home',
      'nav-products': 'Products',
      'nav-services': 'Services',
      'nav-contact': 'Contact & Map',
      'hero-title': 'Your Trusted <span>Electronics &amp; Electrical</span> Store in Khalilabad',
      'hero-description': 'We provide premium-quality electrical essentials, home cooling solutions, and smart appliances from leading brands. Build your product list below and get a custom quote on WhatsApp instantly!',
      'cta-browse': 'Browse Products',
      'cta-parcha': 'Upload List (WhatsApp)',
      'cta-contact': 'Visit Store',
      'features-heading': 'Why Choose Us?',
      'features-subheading': 'Delivering quality, reliability, and excellent customer service to Khalilabad homes and businesses.',
      'feat-title-1': 'Trusted Local Store',
      'feat-desc-1': 'A reputable local business committed to maximum customer satisfaction.',
      'feat-title-2': 'Leading Brands',
      'feat-desc-2': 'Authorized retail and inventory of Havells, Atomberg, Polycab, Syska, and USHA.',
      'feat-title-3': 'Expert Guidance',
      'feat-desc-3': 'Custom consultation and assistance for house wiring and load layouts.',
      'feat-title-4': 'Competitive Prices',
      'feat-desc-4': 'Guaranteed value with seasonal discounts and special project offers.',
      'catalog-heading': 'Our Product Catalog',
      'catalog-subheading': 'Select products to build your custom quote basket. Send your selection directly to us via WhatsApp!',
      'search-placeholder': 'Search products, brands, or categories...',
      'tab-all': 'All Products',
      'tab-fans': 'Ceiling Fans & Air',
      'tab-essentials': 'Electrical Essentials',
      'tab-lighting': 'Lighting Solutions',
      'tab-appliances': 'Home Appliances',
      'tab-audio': 'Audio & Music',
      'tab-accessories': 'Mobile & Computer',
      'tab-power': 'Batteries & Backup',
      'tab-utilities': 'Daily Utilities',
      'services-heading': 'Additional Services',
      'services-subheading': 'We do not just sell products; we help you find the perfect configurations for your needs.',
      'srv-title-1': 'Home Electrical Consultation',
      'srv-desc-1': 'Get recommendations on fan sizes, appliance wattage configurations, and lighting solutions tailored for your space.',
      'srv-title-2': 'Wiring Material Assistance',
      'srv-desc-2': 'Planning to wire your new home or office? Bring your layout blueprint, and we will estimate wire gauges and modular switch counts.',
      'srv-title-3': 'Lighting Recommendations',
      'srv-desc-3': 'Receive assistance on choosing LED downlights, ceiling panels, decorative lighting, and exterior fixtures for maximum energy efficiency.',
      'contact-heading': 'Find & Contact Us',
      'contact-subheading': 'Drop by our store in Khalilabad or connect with us directly for any queries.',
      'contact-addr-title': 'Store Address',
      'contact-addr-body': 'Opposite MA Inter College, Mohaddipur, Khalilabad, Uttar Pradesh – 272175',
      'contact-phone-title': 'Phone & Mobile',
      'contact-phone-tap': 'Tap to call',
      'contact-hours-title': 'Store Hours',
      'hours-row1-day': 'Saturday – Thursday',
      'hours-row2-day': 'Friday',
      'hours-row2-status': 'Closed',
      'footer-logo': 'Unique Electronics & Electricals',
      'footer-copyright': '© 2026 Unique Electronics & Electricals. All rights reserved.',
      'footer-address': 'Opposite MA Inter College, Mohaddipur, Khalilabad, UP',
      'drawer-title': 'Quote Basket',
      'drawer-empty': 'Your basket is empty. Browse the catalog and add products you\'d like to query!',
      'drawer-btn': 'Request Quote on WhatsApp',
      'drawer-query-label': 'Add a custom note or query (optional):',
      'drawer-query-placeholder': 'e.g., Do you have Syska smart bulbs in stock? Or any special delivery requests...'
    },
    hi: {
      'nav-home': 'मुख्य पृष्ठ',
      'nav-products': 'हमारे उत्पाद',
      'nav-services': 'अन्य सेवाएं',
      'nav-contact': 'पता और नक्शा',
      'hero-title': 'खलीलाबाद में आपकी भरोसेमंद <span>इलेक्ट्रॉनिक्स और इलेक्ट्रिकल्स</span> की दुकान',
      'hero-description': 'हम प्रमुख ब्रांडों से प्रीमियम-गुणवत्ता वाले इलेक्ट्रिकल सामान, होम कूलिंग सॉल्यूशंस और स्मार्ट उपकरण प्रदान करते हैं। नीचे अपनी उत्पाद सूची बनाएं और व्हाट्सएप पर तुरंत कोट प्राप्त करें!',
      'cta-browse': 'उत्पाद देखें',
      'cta-parcha': 'पर्चा भेजें (WhatsApp)',
      'cta-contact': 'दुकान पर आएं',
      'features-heading': 'हमें क्यों चुनें?',
      'features-subheading': 'खलीलाबाद के घरों और व्यवसायों को गुणवत्ता, विश्वसनीयता और उत्कृष्ट ग्राहक सेवा प्रदान करना।',
      'feat-title-1': 'भरोसेमंद स्थानीय दुकान',
      'feat-desc-1': 'अधिकतम ग्राहक संतुष्टि के लिए प्रतिबद्ध एक प्रतिष्ठित स्थानीय व्यवसाय।',
      'feat-title-2': 'प्रमुख ब्रांड्स',
      'feat-desc-2': 'हैवेल्स, एटमबर्ग, पॉलीकैब, सिस्का और उषा के अधिकृत रिटेलर और इन्वेंट्री।',
      'feat-title-3': 'विशेषज्ञ मार्गदर्शन',
      'feat-desc-3': 'हाउस वायरिंग और लोड लेआउट के लिए कस्टम परामर्श और सहायता।',
      'feat-title-4': 'प्रतिस्पर्धी मूल्य',
      'feat-desc-4': 'मौसमी छूट और विशेष प्रोजेक्ट ऑफ़र के साथ गारंटीकृत मूल्य।',
      'catalog-heading': 'हमारा उत्पाद कैटलॉग',
      'catalog-subheading': 'कस्टम कोट बास्केट बनाने के लिए उत्पादों का चयन करें। अपना चयन सीधे व्हाट्सएप पर हमें भेजें!',
      'search-placeholder': 'उत्पाद, ब्रांड या श्रेणी खोजें...',
      'tab-all': 'सभी उत्पाद',
      'tab-fans': 'सीलिंग फैन और कूलिंग',
      'tab-essentials': 'इलेक्ट्रिकल सामान',
      'tab-lighting': 'लाइटिंग सॉल्यूशंस',
      'tab-appliances': 'घरेलू उपकरण',
      'tab-audio': 'ऑडियो और म्यूजिक',
      'tab-accessories': 'मोबाइल और कंप्यूटर',
      'tab-power': 'बैटरी और बैकअप',
      'tab-utilities': 'दैनिक उपयोगिता सामान',
      'services-heading': 'अतिरिक्त सेवाएं',
      'services-subheading': 'हम केवल उत्पाद नहीं बेचते हैं; हम आपकी आवश्यकताओं के लिए सही कॉन्फ़िगरेशन खोजने में आपकी सहायता करते हैं।',
      'srv-title-1': 'घरेलू बिजली परामर्श',
      'srv-desc-1': 'अपने कमरे के आकार के अनुसार पंखे के साइज, उपकरण वाट क्षमता और एलईडी लाइटिंग की सही सलाह पाएं।',
      'srv-title-2': 'वायरिंग सामग्री सहायता',
      'srv-desc-2': 'अपने नए घर या कार्यालय की वायरिंग की योजना बना रहे हैं? अपना लेआउट नक्शा लाएं, हम तारों की मोटाई और स्विच की सही संख्या का अनुमान लगाएंगे।',
      'srv-title-3': 'एलईडी लाइटिंग सिफारिशें',
      'srv-desc-3': 'अधिकतम बिजली बचत के लिए एलईडी डाउनलाइट्स, सीलिंग पैनल, सजावटी रोशनी और बाहरी फिक्स्चर चुनने में सहायता प्राप्त करें।',
      'contact-heading': 'हमसे संपर्क करें',
      'contact-subheading': 'खलीलाबाद में हमारी दुकान पर आएं या किसी भी पूछताछ के लिए सीधे हमसे संपर्क करें।',
      'contact-addr-title': 'दुकान का पता',
      'contact-addr-body': 'एम.ए. इंटर कॉलेज के सामने, मोहद्दीपुर, खलीलाबाद, उत्तर प्रदेश – 272175',
      'contact-phone-title': 'फोन और मोबाइल',
      'contact-phone-tap': 'कॉल करने के लिए टैप करें',
      'contact-hours-title': 'दुकान खुलने का समय',
      'hours-row1-day': 'शनिवार - गुरुवार',
      'hours-row2-day': 'शुक्रवार',
      'hours-row2-status': 'बंद',
      'footer-logo': 'यूनिक इलेक्ट्रॉनिक्स एंड इलेक्ट्रिकल्स',
      'footer-copyright': '© 2026 यूनिक इलेक्ट्रॉनिक्स एंड इलेक्ट्रिकल्स। सर्वाधिकार सुरक्षित।',
      'footer-address': 'एम.ए. इंटर कॉलेज के सामने, मोहद्दीपुर, खलीलाबाद, यूपी',
      'drawer-title': 'कोट बास्केट',
      'drawer-empty': 'आपकी बास्केट खाली है। कैटलॉग देखें और उन उत्पादों को जोड़ें जिनके लिए आप पूछताछ करना चाहते हैं!',
      'drawer-btn': 'व्हाट्सएप पर कोट मांगें',
      'drawer-query-label': 'कोई अतिरिक्त नोट या प्रश्न जोड़ें (वैकल्पिक):',
      'drawer-query-placeholder': 'जैसे, क्या आपके पास सिस्का स्मार्ट बल्ब स्टॉक में हैं? या कोई विशेष अनुरोध...'
    }
  };

  // --- Translation State Management ---
  let currentLang = localStorage.getItem('lang') || 'en';

  const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    langToggleBtn.textContent = lang === 'en' ? 'HI' : 'EN';
    langToggleBtn.setAttribute('aria-label', lang === 'en' ? 'Switch language to Hindi' : 'अंग्रेजी में बदलें');

    // Update elements with data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (TRANSLATIONS[lang][key]) {
        el.innerHTML = TRANSLATIONS[lang][key];
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
      const key = el.getAttribute('data-translate-placeholder');
      if (TRANSLATIONS[lang][key]) {
        el.setAttribute('placeholder', TRANSLATIONS[lang][key]);
      }
    });

    // Refresh store opening hours display text
    updateStoreStatus();
  };

  langToggleBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  });

  // ==========================================
  // 1. Theme Management (Two-State System)
  // ==========================================
  
  /**
   * Updates CSS variables and HTML properties based on selected theme.
   * @param {'light' | 'dark'} theme 
   */
  const setTheme = (theme) => {
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="color-scheme"]').setAttribute('content', theme === 'dark' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
  };

  // Theme Toggle Button Click Handler
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  // Listen for system appearance changes if user hasn't set a preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ==========================================
  // 2. Mobile Navigation & Accessibility
  // ==========================================
  
  const toggleMobileNav = () => {
    const isOpen = hamburgerMenu.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
    hamburgerMenu.setAttribute('aria-expanded', isOpen);
    
    // Accessibility: prevent focusing main content when mobile menu is open
    if (isOpen) {
      mainContent.setAttribute('inert', '');
      mainFooter.setAttribute('inert', '');
    } else {
      mainContent.removeAttribute('inert');
      mainFooter.removeAttribute('inert');
    }
  };

  hamburgerMenu.addEventListener('click', toggleMobileNav);

  // Close nav when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Set active nav styling
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      if (navLinksContainer.classList.contains('open')) {
        toggleMobileNav();
      }
    });
  });

  // ==========================================
  // 3. Live Store Status (IST Timezone)
  // ==========================================
  
  /**
   * Calculates current time in Indian Standard Time (IST).
   * @returns {{day: number, hours: number, minutes: number}}
   */
  const getISTTime = () => {
    const date = new Date();
    // Convert current UTC time to IST (UTC +5:30)
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
    const istOffset = 5.5 * 3600000;
    const istDate = new Date(utcTime + istOffset);
    
    return {
      day: istDate.getDay(), // 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
      hours: istDate.getHours(),
      minutes: istDate.getMinutes()
    };
  };

  /**
   * Updates store opening status badges in the UI.
   */
  const updateStoreStatus = () => {
    const { day, hours } = getISTTime();
    
    // Friday (5) is Closed.
    // Saturday (6) through Thursday (4) open from 9:00 AM (9) to 9:00 PM (21)
    const isFriday = day === 5;
    const isOpenHours = hours >= 9 && hours < 21;

    if (!isFriday && isOpenHours) {
      storeStatusDot.classList.remove('closed');
      storeStatusText.textContent = currentLang === 'en' 
        ? 'Open Now (9:00 AM - 9:00 PM IST)' 
        : 'अभी खुला है (सुबह 9:00 - रात 9:00 बजे IST)';
      storeStatusText.style.color = 'var(--color-green)';
    } else {
      storeStatusDot.classList.add('closed');
      if (isFriday) {
        storeStatusText.textContent = currentLang === 'en' 
          ? 'Closed Now (Friday Holiday)' 
          : 'अभी बंद है (शुक्रवार अवकाश)';
      } else {
        storeStatusText.textContent = currentLang === 'en' 
          ? 'Closed Now (Opens 9:00 AM IST)' 
          : 'अभी बंद है (सुबह 9:00 बजे खुलेगा IST)';
      }
      storeStatusText.style.color = 'var(--color-red)';
    }
  };

  // Update status immediately and then every minute
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000);

  // ==========================================
  // 4. Catalog Search & Tab Filtering
  // ==========================================

  let activeCategoryFilter = 'all';
  let activeSearchQuery = '';

  /**
   * Performs filtering based on active tab and search query.
   */
  const filterCatalog = () => {
    let visibleCardsCount = 0;

    categoryCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const productItems = card.querySelectorAll('.product-item');
      let visibleProductsInCard = 0;

      // 1. Check if category matches current active tab
      const isCategoryMatch = activeCategoryFilter === 'all' || activeCategoryFilter === cardCategory;

      productItems.forEach(item => {
        const text = item.querySelector('.product-text').textContent.toLowerCase();
        // 2. Check if product text matches search query
        const isSearchMatch = text.includes(activeSearchQuery);

        if (isCategoryMatch && isSearchMatch) {
          item.style.display = 'flex';
          visibleProductsInCard++;
        } else {
          item.style.display = 'none';
        }
      });

      // 3. Toggle entire category card visibility based on matching products
      if (visibleProductsInCard > 0) {
        card.style.display = 'flex';
        visibleCardsCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // 4. Toggle empty catalog state
    if (visibleCardsCount === 0) {
      noResultsCard.style.display = 'block';
    } else {
      noResultsCard.style.display = 'none';
    }
  };

  // Search input change handler
  catalogSearch.addEventListener('input', (e) => {
    activeSearchQuery = e.target.value.toLowerCase().trim();
    filterCatalog();
  });

  // Category Tab Selection handler
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // Update active tab styles
      categoryTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      activeCategoryFilter = tab.getAttribute('data-category');
      filterCatalog();
    });
  });

  // ==========================================
  // 5. Quote Basket & WhatsApp Construction
  // ==========================================

  /**
   * Re-renders the contents of the slide-out basket drawer.
   */
  const renderBasketDrawer = () => {
    // Update count badges
    basketCount.textContent = quoteBasket.length;
    
    // Toggle FAB display
    if (quoteBasket.length > 0) {
      basketFab.classList.add('show');
    } else {
      basketFab.classList.remove('show');
      closeDrawer(); // Auto close drawer if it is open and empty
    }

    // Toggle drawer empty state
    if (quoteBasket.length === 0) {
      emptyDrawerState.style.display = 'block';
      selectedItemsList.style.display = 'none';
      if (customQueryWrapper) customQueryWrapper.style.display = 'none';
      sendWhatsAppBtn.disabled = true;
      return;
    }

    emptyDrawerState.style.display = 'none';
    selectedItemsList.style.display = 'flex';
    if (customQueryWrapper) customQueryWrapper.style.display = 'flex';
    sendWhatsAppBtn.disabled = false;

    // Render list elements
    selectedItemsList.innerHTML = '';
    quoteBasket.forEach(item => {
      const li = document.createElement('li');
      li.className = 'selected-item';
      li.innerHTML = `
        <div>
          <span class="selected-item-text">${item.name}</span>
          <span class="selected-item-category">${item.category}</span>
          <div class="quantity-controls">
            <button type="button" class="qty-btn dec-qty-btn" data-product-name="${item.name}" aria-label="Decrease quantity">-</button>
            <span class="qty-display">${item.quantity}</span>
            <button type="button" class="qty-btn inc-qty-btn" data-product-name="${item.name}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button type="button" class="remove-item-btn" data-product-name="${item.name}" aria-label="Remove ${item.name} from basket">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      `;
      selectedItemsList.appendChild(li);
    });

    // Add click events to quantity buttons inside drawer
    selectedItemsList.querySelectorAll('.inc-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const productName = btn.getAttribute('data-product-name');
        const item = quoteBasket.find(i => i.name === productName);
        if (item) {
          item.quantity++;
          renderBasketDrawer();
        }
      });
    });

    selectedItemsList.querySelectorAll('.dec-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const productName = btn.getAttribute('data-product-name');
        const item = quoteBasket.find(i => i.name === productName);
        if (item && item.quantity > 1) {
          item.quantity--;
          renderBasketDrawer();
        }
      });
    });

    // Add click events to individual remove buttons inside drawer
    selectedItemsList.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productName = btn.getAttribute('data-product-name');
        removeProductFromBasket(productName);
      });
    });
  };

  /**
   * Adds a product to the basket.
   * @param {string} name 
   * @param {string} category 
   */
  const addProductToBasket = (name, category) => {
    if (!quoteBasket.some(item => item.name === name)) {
      quoteBasket.push({ name, category, quantity: 1 });
      renderBasketDrawer();
    }
  };

  /**
   * Removes a product from the basket and updates the checkbox in catalog.
   * @param {string} name 
   */
  const removeProductFromBasket = (name) => {
    quoteBasket = quoteBasket.filter(item => item.name !== name);
    
    // Uncheck corresponding checkbox in catalog
    const checkbox = Array.from(productCheckboxes).find(cb => cb.getAttribute('data-product') === name);
    if (checkbox) {
      checkbox.checked = false;
    }
    
    renderBasketDrawer();
  };

  // Sync catalog checkboxes with the basket state
  productCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const productName = checkbox.getAttribute('data-product');
      const productCategory = checkbox.getAttribute('data-category');

      if (checkbox.checked) {
        addProductToBasket(productName, productCategory);
      } else {
        removeProductFromBasket(productName);
      }
    });
  });

  // ==========================================
  // 6. Drawer Toggle Controls & Backdrop
  // ==========================================

  const openDrawer = () => {
    quoteDrawer.classList.add('open');
    drawerBackdrop.classList.add('show');
    basketFab.setAttribute('aria-expanded', 'true');
    quoteDrawer.removeAttribute('inert');
    quoteDrawer.focus();
    
    // Accessibility: prevent focusing page content when drawer is open
    mainContent.setAttribute('inert', '');
    mainFooter.setAttribute('inert', '');
  };

  const closeDrawer = () => {
    quoteDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('show');
    basketFab.setAttribute('aria-expanded', 'false');
    quoteDrawer.setAttribute('inert', '');
    
    mainContent.removeAttribute('inert');
    mainFooter.removeAttribute('inert');
  };

  basketFab.addEventListener('click', openDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);
  drawerBackdrop.addEventListener('click', closeDrawer);

  // Esc Key to close drawer & mobile nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      if (navLinksContainer.classList.contains('open')) {
        toggleMobileNav();
      }
    }
  });

  // ==========================================
  // 7. WhatsApp Query Generation
  // ==========================================

  sendWhatsAppBtn.addEventListener('click', () => {
    if (quoteBasket.length === 0) return;

    // Construct WhatsApp message text
    let messageText = currentLang === 'en'
      ? 'Hello Unique Electronics & Electricals,\n\nI would like to check prices and availability for these items from your catalog:\n\n'
      : 'नमस्ते यूनिक इलेक्ट्रॉनिक्स एंड इलेक्ट्रिकल्स,\n\nमैं आपके कैटलॉग से इन सामानों की कीमत और उपलब्धता जानना चाहता हूँ:\n\n';
    
    quoteBasket.forEach((item, index) => {
      messageText += `${index + 1}. *${item.name}* (Qty: ${item.quantity}) - ${item.category}\n`;
    });

    // Append custom query/note if present
    const customQueryVal = customQueryInput ? customQueryInput.value.trim() : '';
    if (customQueryVal) {
      messageText += currentLang === 'en'
        ? `\n*Custom Query/Note:*\n"${customQueryVal}"\n`
        : `\n*अतिरिक्त प्रश्न/नोट:*\n"${customQueryVal}"\n`;
    }
    
    messageText += currentLang === 'en'
      ? '\nPlease let me know when I can get a quote or visit. Thank you!'
      : '\nकृपया मुझे बताएं कि मुझे कब कोट मिल सकता है या मैं दुकान पर आ सकता हूँ। धन्यवाद!';

    const encodedText = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // Handle Parcha (Handwritten List) Upload CTA Click
  const ctaParcha = document.getElementById('cta-parcha');
  if (ctaParcha) {
    ctaParcha.addEventListener('click', (e) => {
      e.preventDefault();
      const text = currentLang === 'en'
        ? 'Hello Unique Electronics, I want to share a photo of my electrical items list for a quote.'
        : 'नमस्ते यूनिक इलेक्ट्रॉनिक्स, मैं कोट के लिए अपने इलेक्ट्रिकल सामानों की सूची (पर्चा) का एक फोटो साझा करना चाहता हूँ।';
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================
  // 8. Scroll Animation Fallback (IntersectionObserver)
  // ==========================================
  
  // Feature detect CSS Scroll-driven timelines
  const supportsCSSScrollAnimations = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  
  if (!supportsCSSScrollAnimations) {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          // Optional: stop observing once animation is triggered
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null, // Viewport
      threshold: 0.15 // Trigger when 15% is visible
    });

    animatedElements.forEach(el => {
      el.classList.add('scroll-reveal');
      revealObserver.observe(el);
    });
  }
});
