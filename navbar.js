/**
 * navbar.js — Flower & Botanical
 * ─────────────────────────────────────────────────────────────────
 * Self-contained navbar component.
 *
 * Usage:
 *   1. Add <div id="navbar-root"></div> anywhere in your <body>.
 *   2. Add <script src="navbar.js"></script> before </body>.
 *   3. Call NavBar.init({ active: 'about' }) optionally.
 *
 * Public API:
 *   NavBar.init(options)        — mount & boot (called automatically)
 *   NavBar.openSidebar()
 *   NavBar.closeSidebar()
 *   NavBar.toggleTheme()
 *   NavBar.setTheme('light'|'dark')
 *   NavBar.toggleDir()
 *   NavBar.setDir('ltr'|'rtl')
 * ─────────────────────────────────────────────────────────────────
 */

const NavBar = (() => {

  /* ================================================================
     1. NAV LINKS CONFIG
     Edit here to add/remove pages or dropdown children.
  ================================================================ */
  const NAV_LINKS = [
    {
      label: 'Home',
      icon: 'fa-house',
      href: '#',
      children: [
        { label: 'Home 1', icon: 'fa-house-chimney', href: 'index.html' },
        { label: 'Home 2', icon: 'fa-seedling',       href: 'home2.html' },
      ],
    },
    { label: 'About',    icon: 'fa-leaf',          href: 'about.html'    },
    { label: 'Artworks', icon: 'fa-palette',       href: 'artworks.html' },
    { label: 'Booking',  icon: 'fa-calendar-alt',  href: 'booking.html'  },
    { label: 'Price',    icon: 'fa-tag',            href: 'price.html'    },
    { label: 'Contact',  icon: 'fa-envelope',       href: 'contact.html'  },
  ];

  /* ================================================================
     2. EMBEDDED CSS
  ================================================================ */
  const CSS = `
    /* ── Navbar shell ────────────────────────────────────── */
    .nb-wrap {
      position: fixed;
      top: 18px;
      left: 24px;
      right: 24px;
      z-index: 900;
    }

    .nb {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 10px 8px 20px;
      background: var(--nav-bg);
      border: 1px solid var(--nav-border);
      border-radius: var(--radius-pill);
      box-shadow: var(--nav-shadow);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      transition:
        background var(--t) var(--ease),
        border-color var(--t) var(--ease),
        box-shadow var(--t) var(--ease),
        top 0.3s ease;
    }

    .nb-wrap.scrolled .nb {
      box-shadow: var(--nav-shadow-lg);
    }

    .nb-wrap.scrolled {
      top: 10px;
    }

    /* ── Logo ────────────────────────────────────────────── */
    .nb-logo {
      display: flex;
      align-items: center;
      gap: 9px;
      flex-shrink: 0;
      transition: transform 0.22s var(--ease-spring), filter 0.22s;
    }

    .nb-logo:hover {
      transform: scale(1.04);
      filter: drop-shadow(0 4px 10px var(--pink-glow));
    }

    .nb-logo-icon {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--pink), var(--pink-dark));
      color: #fff;
      font-size: 14px;
      flex-shrink: 0;
      box-shadow: 0 4px 12px var(--pink-glow);
    }

    .nb-logo-text {
      display: flex;
      align-items: baseline;
      gap: 5px;
      line-height: 1;
    }

    .nb-logo-text .nb-bold {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }

    .nb-logo-text .nb-italic {
      font-family: 'Cormorant Garamond', serif;
      font-size: 19px;
      font-weight: 400;
      font-style: italic;
      color: var(--pink);
    }

    /* ── Center nav links ────────────────────────────────── */
    .nb-center {
      display: flex;
      align-items: center;
      gap: 1px;
      flex: 1;
      justify-content: center;
    }

    .nb-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 15px;
      border-radius: var(--radius-pill);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      white-space: nowrap;
      cursor: pointer;
      transition:
        background 0.2s var(--ease),
        color 0.2s var(--ease),
        transform 0.2s var(--ease-spring);
    }

    .nb-link i { font-size: 11px; }

    .nb-link:hover,
    .nb-link.nb-active {
      background: var(--pink);
      color: #fff;
      transform: translateY(-1px);
    }

    /* ── Dropdown ────────────────────────────────────────── */
    .nb-has-drop {
      position: relative;
    }

    .nb-drop {
      position: absolute;
      top: calc(100% + 14px);
      left: 50%;
      transform: translateX(-50%) translateY(-6px);
      min-width: 174px;
      background: var(--dropdown-bg);
      border: 1px solid var(--nav-border);
      border-radius: var(--radius-md);
      padding: 6px;
      box-shadow: 0 16px 40px rgba(0,0,0,0.10), 0 0 0 1px var(--pink-border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.22s, transform 0.22s, visibility 0.22s;
    }

    .nb-has-drop.is-open .nb-drop {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateX(-50%) translateY(0);
    }

    .nb-drop-item {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-secondary);
      transition: background 0.18s, color 0.18s, transform 0.18s var(--ease-spring);
    }

    .nb-drop-item i { font-size: 11px; color: var(--pink); width: 14px; text-align: center; }

    .nb-drop-item:hover,
    .nb-drop-item.nb-active {
      background: var(--pink);
      color: #fff;
      transform: translateX(3px);
    }

    .nb-drop-item:hover i,
    .nb-drop-item.nb-active i { color: rgba(255,255,255,0.85); }

    .nb-chevron {
      font-size: 9px !important;
      margin-left: 1px;
      transition: transform 0.25s var(--ease);
    }

    .nb-has-drop.is-open .nb-chevron {
      transform: rotate(180deg);
    }

    /* ── Right actions ───────────────────────────────────── */
    .nb-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    /* ── Icon button ─────────────────────────────────────── */
    .nb-icon-btn {
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--pink-soft);
      color: var(--pink);
      border: 1px solid var(--pink-border);
      font-size: 14px;
      cursor: pointer;
      transition:
        background 0.2s,
        color 0.2s,
        transform 0.2s var(--ease-spring),
        box-shadow 0.2s;
    }

    .nb-icon-btn:hover {
      background: var(--pink);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px var(--pink-glow);
      border-color: var(--pink);
    }

    /* ── User dropdown ───────────────────────────────────── */
    .nb-user-drop {
      position: relative;
    }

    .nb-user-drop .nb-drop {
      left: auto;
      right: 0;
      transform: translateY(-6px);
      min-width: 158px;
    }

    .nb-user-drop.is-open .nb-drop {
      transform: translateY(0);
      left: auto;
    }

    /* ── CTA button ──────────────────────────────────────── */
    .nb-cta {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 9px 20px;
      border-radius: var(--radius-pill);
      background: var(--pink);
      color: #fff;
      border: none;
      font-size: 12px;
      font-weight: 600;
      font-family: 'DM Sans', sans-serif;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s var(--ease-spring), box-shadow 0.2s;
      box-shadow: 0 4px 16px var(--pink-glow);
      white-space: nowrap;
    }

    .nb-cta:hover {
      background: var(--pink-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--pink-glow);
    }

    /* ── Hamburger ───────────────────────────────────────── */
    .nb-hamburger {
      display: none;
      width: 38px;
      height: 38px;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--pink);
      color: #fff;
      border: none;
      flex-direction: column;
      gap: 5px;
      padding: 11px;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s var(--ease-spring);
    }

    .nb-hamburger:hover {
      background: var(--pink-dark);
      transform: scale(1.06);
    }

    .nb-hamburger-bar {
      display: block;
      width: 100%;
      height: 1.5px;
      background: #fff;
      border-radius: 2px;
      transition: transform 0.3s var(--ease), opacity 0.3s;
    }

    .nb-hamburger.is-open .nb-hamburger-bar:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }

    .nb-hamburger.is-open .nb-hamburger-bar:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }

    .nb-hamburger.is-open .nb-hamburger-bar:nth-child(3) {
      transform: translateY(-6.5px) rotate(-45deg);
    }

    /* ================================================================
       SIDEBAR
    ================================================================ */
    .nb-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(10, 4, 8, 0);
      visibility: hidden;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
      transition: background 0.38s var(--ease), visibility 0.38s, backdrop-filter 0.38s;
    }

    .nb-overlay.is-open {
      background: rgba(10, 4, 8, 0.55);
      visibility: visible;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }

    .nb-sidebar {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1001;
      width: 310px;
      max-width: calc(100vw - 52px);
      background: var(--sidebar-bg);
      border-left: 1px solid var(--sidebar-border);
      display: flex;
      flex-direction: column;
      transform: translateX(110%);
      transition: transform 0.40s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
    }

    .nb-sidebar::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--pink-deep), var(--pink), #f4a2bb);
    }

    .nb-sidebar.is-open {
      transform: translateX(0);
    }

    /* Sidebar header */
    .nb-sb-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 20px 18px;
      border-bottom: 1px solid var(--sidebar-border);
    }

    .nb-sb-close {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--pink-soft);
      color: var(--pink);
      border: 1px solid var(--pink-border);
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s, transform 0.3s var(--ease-spring);
    }

    .nb-sb-close:hover {
      background: var(--pink);
      color: #fff;
      transform: rotate(90deg) scale(1.08);
      border-color: var(--pink);
    }

    /* Sidebar scrollable area */
    .nb-sb-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px 28px;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .nb-sb-body::-webkit-scrollbar { width: 3px; }
    .nb-sb-body::-webkit-scrollbar-thumb { background: var(--pink-border); border-radius: 4px; }

    /* Sidebar link */
    .nb-sb-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 16px;
      border-radius: var(--radius-md);
      font-size: 12.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-primary);
      background: transparent;
      border: 1px solid transparent;
      transition: background 0.22s, color 0.22s, border-color 0.22s, transform 0.22s var(--ease-spring);
      width: 100%;
      text-align: left;
      cursor: pointer;
    }

    .nb-sb-link-inner {
      display: flex;
      align-items: center;
      gap: 11px;
    }

    .nb-sb-link-inner i {
      font-size: 13px;
      color: var(--pink);
      width: 16px;
      text-align: center;
      transition: color 0.2s;
    }

    .nb-sb-arrow {
      font-size: 10px;
      color: var(--text-subtle);
      transition: transform 0.28s var(--ease), color 0.2s;
    }

    .nb-sb-link:hover {
      background: var(--pink-soft);
      border-color: var(--pink-border);
      color: var(--pink);
      transform: translateX(3px);
    }

    .nb-sb-link.nb-active {
      background: var(--pink);
      color: #fff;
      border-color: var(--pink);
    }

    .nb-sb-link.nb-active .nb-sb-link-inner i,
    .nb-sb-link.nb-active .nb-sb-arrow { color: rgba(255,255,255,0.8); }

    .nb-sb-link.is-expanded .nb-sb-arrow {
      transform: rotate(180deg);
    }

    /* Sidebar submenu */
    .nb-sb-sub {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.35s var(--ease), opacity 0.3s;
      opacity: 0;
    }

    .nb-sb-sub.is-open {
      max-height: 200px;
      opacity: 1;
    }

    .nb-sb-sub-inner {
      padding: 4px 0 6px 42px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .nb-sb-sub-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 13px;
      border-radius: var(--radius-sm);
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      transition: background 0.18s, color 0.18s, transform 0.18s var(--ease-spring);
    }

    .nb-sb-sub-link i { font-size: 11px; color: var(--pink); transition: color 0.18s; }

    .nb-sb-sub-link:hover,
    .nb-sb-sub-link.nb-active {
      background: var(--pink);
      color: #fff;
      transform: translateX(3px);
    }

    .nb-sb-sub-link:hover i,
    .nb-sb-sub-link.nb-active i { color: rgba(255,255,255,0.8); }

    /* Divider */
    .nb-sb-divider {
      height: 1px;
      background: var(--sidebar-border);
      margin: 10px 4px;
    }

    /* Settings block */
    .nb-sb-settings {
      background: var(--pink-soft);
      border: 1px solid var(--pink-border);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-top: 4px;
    }

    .nb-sb-settings-title {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      color: var(--text-subtle);
      margin-bottom: 14px;
    }

    .nb-sb-settings-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px 0;
    }

    .nb-sb-settings-row + .nb-sb-settings-row {
      border-top: 1px solid var(--sidebar-border);
      margin-top: 2px;
      padding-top: 11px;
    }

    .nb-sb-settings-label {
      display: flex;
      align-items: center;
      gap: 9px;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .nb-sb-settings-label i { font-size: 13px; color: var(--pink); }

    /* Auth buttons */
    .nb-sb-auth {
      display: flex;
      gap: 8px;
      margin-top: 18px;
    }

    .nb-auth-btn {
      flex: 1;
      padding: 12px 12px;
      border-radius: var(--radius-pill);
      font-size: 11.5px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 700;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      text-align: center;
      cursor: pointer;
      transition: background 0.22s, color 0.22s, transform 0.2s var(--ease-spring), box-shadow 0.2s;
      display: block;
      border: none;
    }

    .nb-auth-login {
      background: transparent;
      border: 1.5px solid var(--pink-border);
      color: var(--pink);
    }

    .nb-auth-login:hover {
      background: var(--pink-soft);
      border-color: var(--pink);
      transform: translateY(-2px);
    }

    .nb-auth-signup {
      background: var(--pink);
      color: #fff;
      box-shadow: 0 4px 16px var(--pink-glow);
    }

    .nb-auth-signup:hover {
      background: var(--pink-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px var(--pink-glow);
    }

    /* ================================================================
       RESPONSIVE
    ================================================================ */
    @media (max-width: 1060px) {
      .nb-center { display: none; }
      .nb-right .nb-icon-btn.nb-desktop-only { display: none; }
      .nb-user-drop { display: none; }
      .nb-cta.nb-desktop-only { display: none; }
      .nb-hamburger { display: flex; }
    }

    @media (min-width: 1061px) {
      .nb-hamburger { display: none !important; }
    }

    @media (max-width: 1240px) and (min-width: 1061px) {
      .nb-link { padding: 8px 12px; font-size: 11.5px; }
      .nb-wrap { left: 16px; right: 16px; }
    }

    @media (max-width: 520px) {
      .nb-wrap { top: 10px; left: 12px; right: 12px; }
      .nb-sidebar { width: 100%; max-width: 100%; border-left: none; }
    }
  `;

  /* ================================================================
     3. STATE
  ================================================================ */
  let _isDark         = false;
  let _isRtl          = false;
  let _isSidebarOpen  = false;
  let _activeLink     = '';
  let _mounted        = false;

  /* ================================================================
     4. DOM REFERENCES (set after inject)
  ================================================================ */
  let _wrap, _nb, _overlay, _sidebar, _hamburger, _themeIcon;
  let _sbLightBtn, _sbDarkBtn, _sbLtrBtn, _sbRtlBtn;

  /* ================================================================
     5. HTML TEMPLATE BUILDER
  ================================================================ */
  function _buildNavLinks() {
    return NAV_LINKS.map(link => {
      const isActive = _activeLink === link.label.toLowerCase();
      if (link.children) {
        const childrenHTML = link.children.map(c =>
          `<a href="${c.href}" class="nb-drop-item${_activeLink === c.label.toLowerCase() ? ' nb-active' : ''}" onclick="NavBar.closeSidebar()">
            <i class="fas ${c.icon}"></i>${c.label}
          </a>`
        ).join('');
        return `
          <div class="nb-has-drop" role="none">
            <button class="nb-link${isActive ? ' nb-active' : ''}" role="menuitem" aria-haspopup="true" aria-expanded="false" onclick="NavBar._toggleDropdown(event, this)">
              <i class="fas ${link.icon}"></i>${link.label}
              <i class="fas fa-chevron-down nb-chevron"></i>
            </button>
            <div class="nb-drop" role="menu">${childrenHTML}</div>
          </div>`;
      }
      return `<a href="${link.href}" class="nb-link${isActive ? ' nb-active' : ''}" role="menuitem">
        <i class="fas ${link.icon}"></i>${link.label}
      </a>`;
    }).join('');
  }

  function _buildSidebarLinks() {
    return NAV_LINKS.map(link => {
      const isActive = _activeLink === link.label.toLowerCase();
      if (link.children) {
        const subLinks = link.children.map(c =>
          `<a href="${c.href}" class="nb-sb-sub-link${_activeLink === c.label.toLowerCase() ? ' nb-active' : ''}" onclick="NavBar.closeSidebar()">
            <i class="fas ${c.icon}"></i>${c.label}
          </a>`
        ).join('');
        return `
          <button
            class="nb-sb-link${isActive ? ' nb-active' : ''}"
            onclick="NavBar._toggleSub('nb-sub-${link.label.toLowerCase()}', this)"
            aria-expanded="false">
            <span class="nb-sb-link-inner"><i class="fas ${link.icon}"></i>${link.label}</span>
            <i class="fas fa-chevron-down nb-sb-arrow"></i>
          </button>
          <div class="nb-sb-sub" id="nb-sub-${link.label.toLowerCase()}">
            <div class="nb-sb-sub-inner">${subLinks}</div>
          </div>`;
      }
      return `
        <a href="${link.href}" class="nb-sb-link${isActive ? ' nb-active' : ''}" onclick="NavBar.closeSidebar()">
          <span class="nb-sb-link-inner"><i class="fas ${link.icon}"></i>${link.label}</span>
          <i class="fas fa-arrow-right nb-sb-arrow"></i>
        </a>`;
    }).join('');
  }

  function _buildHTML() {
    return `
      <!-- NAVBAR -->
      <div class="nb-wrap" id="nb-wrap" role="navigation" aria-label="Main navigation">
        <div class="nb" id="nb">

          <!-- Logo -->
          <a href="index.html" class="nb-logo" aria-label="Flower & Botanical — Home">
            <span class="nb-logo-icon"><i class="fas fa-seedling"></i></span>
            <span class="nb-logo-text">
              <span class="nb-bold">Flower</span>
              <span class="nb-italic">&amp; Botanical</span>
            </span>
          </a>

          <!-- Desktop center -->
          <div class="nb-center" id="nb-center" role="menubar">
            ${_buildNavLinks()}
          </div>

          <!-- Right actions -->
          <div class="nb-right">



            <!-- Direction toggle (desktop) -->
            <button
              class="nb-icon-btn nb-desktop-only"
              id="nb-dir-btn"
              onclick="NavBar.toggleDir()"
              aria-label="Toggle RTL/LTR"
              title="Toggle text direction">
              <i class="fas fa-left-right"></i>
            </button>

            <!-- Theme toggle (desktop) -->
            <button
              class="nb-icon-btn nb-desktop-only"
              id="nb-theme-btn"
              onclick="NavBar.toggleTheme()"
              aria-label="Toggle dark mode"
              title="Toggle theme">
              <i class="fas fa-moon" id="nb-theme-icon"></i>
            </button>

            <!-- User menu (desktop) -->
            <div class="nb-user-drop nb-has-drop">
              <button class="nb-icon-btn" aria-label="Account menu" aria-haspopup="true" onclick="NavBar._toggleDropdown(event, this)">
                <i class="fas fa-circle-user"></i>
              </button>
              <div class="nb-drop" style="min-width:156px">
                <a href="login.html"  class="nb-drop-item"><i class="fas fa-right-to-bracket"></i>Login</a>
                <a href="signup.html" class="nb-drop-item"><i class="fas fa-user-plus"></i>Sign Up</a>
              </div>
            </div>

            <!-- Book now CTA (desktop) -->
            <a href="booking.html" class="nb-cta nb-desktop-only">
              <i class="fas fa-calendar-check"></i> Book Now
            </a>

            <!-- Hamburger (mobile/tablet) -->
            <button
              class="nb-hamburger"
              id="nb-hamburger"
              onclick="NavBar.openSidebar()"
              aria-label="Open menu"
              aria-controls="nb-sidebar"
              aria-expanded="false">
              <span class="nb-hamburger-bar"></span>
              <span class="nb-hamburger-bar"></span>
              <span class="nb-hamburger-bar"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- OVERLAY -->
      <div
        class="nb-overlay"
        id="nb-overlay"
        onclick="NavBar.closeSidebar()"
        role="presentation"
        aria-hidden="true">
      </div>

      <!-- SIDEBAR -->
      <aside
        class="nb-sidebar"
        id="nb-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu">

        <!-- Sidebar header -->
        <div class="nb-sb-header">
          <a href="index.html" class="nb-logo" onclick="NavBar.closeSidebar()">
            <span class="nb-logo-icon"><i class="fas fa-seedling"></i></span>
            <span class="nb-logo-text">
              <span class="nb-bold">Flower</span>
              <span class="nb-italic">&amp; Botanical</span>
            </span>
          </a>
          <button
            class="nb-sb-close"
            onclick="NavBar.closeSidebar()"
            aria-label="Close menu">
            <i class="fas fa-xmark"></i>
          </button>
        </div>

        <!-- Sidebar body -->
        <div class="nb-sb-body" id="nb-sb-body">
          ${_buildSidebarLinks()}

          <div class="nb-sb-divider"></div>

          <!-- Settings -->
          <div class="nb-sb-settings">
            <div class="nb-sb-settings-title">Preferences</div>

            <div class="nb-sb-settings-row">
              <span class="nb-sb-settings-label">
                <i class="fas fa-circle-half-stroke"></i> Theme
              </span>
              <div class="toggle-pill">
                <button id="nb-sb-light" class="active" onclick="NavBar.setTheme('light')" title="Light mode">
                  <i class="fas fa-sun"></i>
                </button>
                <button id="nb-sb-dark" onclick="NavBar.setTheme('dark')" title="Dark mode">
                  <i class="fas fa-moon"></i>
                </button>
              </div>
            </div>

            <div class="nb-sb-settings-row">
              <span class="nb-sb-settings-label">
                <i class="fas fa-arrow-right-arrow-left"></i> Direction
              </span>
              <div class="toggle-pill">
                <button id="nb-sb-ltr" class="active" onclick="NavBar.setDir('ltr')" title="Left to right">LTR</button>
                <button id="nb-sb-rtl" onclick="NavBar.setDir('rtl')" title="Right to left">RTL</button>
              </div>
            </div>
          </div>

          <!-- Auth -->
          <div class="nb-sb-auth">
            <a href="login.html"  class="nb-auth-btn nb-auth-login"  onclick="NavBar.closeSidebar()">Login</a>
            <a href="signup.html" class="nb-auth-btn nb-auth-signup" onclick="NavBar.closeSidebar()">Sign Up</a>
          </div>
        </div>
      </aside>
    `;
  }

  /* ================================================================
     6. INJECT CSS
  ================================================================ */
  function _injectCSS() {
    if (document.getElementById('nb-styles')) return;
    const style = document.createElement('style');
    style.id = 'nb-styles';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ================================================================
     7. SIDEBAR OPEN / CLOSE
  ================================================================ */
  function openSidebar() {
    _isSidebarOpen = true;
    _sidebar.classList.add('is-open');
    _overlay.classList.add('is-open');
    document.body.classList.add('nav-open');
    _hamburger.classList.add('is-open');
    _hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    _isSidebarOpen = false;
    _sidebar.classList.remove('is-open');
    _overlay.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    _hamburger.classList.remove('is-open');
    _hamburger.setAttribute('aria-expanded', 'false');
  }

  /* ================================================================
     8. SUBMENU TOGGLE
  ================================================================ */
  function _toggleSub(id, btn) {
    const sub = document.getElementById(id);
    if (!sub) return;

    // Close others
    document.querySelectorAll('.nb-sb-sub.is-open').forEach(el => {
      if (el.id !== id) {
        el.classList.remove('is-open');
        const prev = el.previousElementSibling;
        if (prev) { prev.classList.remove('is-expanded'); prev.setAttribute('aria-expanded', 'false'); }
      }
    });

    const opening = !sub.classList.contains('is-open');
    sub.classList.toggle('is-open', opening);
    btn.classList.toggle('is-expanded', opening);
    btn.setAttribute('aria-expanded', String(opening));
  }

  /* ================================================================
     9. THEME
  ================================================================ */
  function setTheme(mode) {
    _isDark = (mode === 'dark');
    document.documentElement.classList.toggle('dark', _isDark);

    const icon = document.getElementById('nb-theme-icon');
    if (icon) icon.className = _isDark ? 'fas fa-sun' : 'fas fa-moon';

    const sbLight = document.getElementById('nb-sb-light');
    const sbDark  = document.getElementById('nb-sb-dark');
    if (sbLight) sbLight.classList.toggle('active', !_isDark);
    if (sbDark)  sbDark.classList.toggle('active',   _isDark);

    try { localStorage.setItem('nb-theme', mode); } catch(_) {}
  }

  function toggleTheme() { setTheme(_isDark ? 'light' : 'dark'); }

  /* ================================================================
     10. DIRECTION
  ================================================================ */
  function setDir(dir) {
    _isRtl = (dir === 'rtl');
    document.documentElement.dir = dir;

    const sbLtr = document.getElementById('nb-sb-ltr');
    const sbRtl = document.getElementById('nb-sb-rtl');
    if (sbLtr) sbLtr.classList.toggle('active', !_isRtl);
    if (sbRtl) sbRtl.classList.toggle('active',  _isRtl);

    try { localStorage.setItem('nb-dir', dir); } catch(_) {}
  }

  function toggleDir() { setDir(_isRtl ? 'ltr' : 'rtl'); }

  /* ================================================================
     11. SCROLL HANDLER
  ================================================================ */
  function _onScroll() {
    if (!_wrap) return;
    _wrap.classList.toggle('scrolled', window.scrollY > 50);
  }

  /* ================================================================
     12. KEYBOARD
  ================================================================ */
  function _onKeyDown(e) {
    if (e.key === 'Escape' && _isSidebarOpen) closeSidebar();
  }

  /* ================================================================
     13. RESTORE PREFS
  ================================================================ */
  function _restorePrefs() {
    let theme = 'light';
    let dir   = 'ltr';
    try {
      theme = localStorage.getItem('nb-theme') || 'light';
      dir   = localStorage.getItem('nb-dir')   || 'ltr';
    } catch(_) {}
    setTheme(theme);
    setDir(dir);
  }

  /* ================================================================
     14. AUTO ACTIVE LINK
  ================================================================ */
  function _detectActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    NAV_LINKS.forEach(link => {
      const href = link.href.split('/').pop();
      if (href === path) _activeLink = link.label.toLowerCase();
      if (link.children) {
        link.children.forEach(c => {
          if (c.href.split('/').pop() === path) _activeLink = c.label.toLowerCase();
        });
      }
    });
  }

  /* ================================================================
     15. INIT / MOUNT
  ================================================================ */
  function init(options = {}) {
    if (_mounted) return;
    _mounted = true;

    if (options.active) _activeLink = options.active.toLowerCase();
    else _detectActive();

    _injectCSS();

    const root = document.getElementById('navbar-root');
    if (!root) { console.warn('[NavBar] No #navbar-root found.'); return; }

    root.innerHTML = _buildHTML();

    // Cache refs
    _wrap      = document.getElementById('nb-wrap');
    _overlay   = document.getElementById('nb-overlay');
    _sidebar   = document.getElementById('nb-sidebar');
    _hamburger = document.getElementById('nb-hamburger');

    // Restore
    _restorePrefs();

    // Scroll
    window.addEventListener('scroll', _onScroll, { passive: true });
    _onScroll();

    // Keyboard & Clicks
    document.addEventListener('keydown', _onKeyDown);
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nb-has-drop')) {
        document.querySelectorAll('.nb-has-drop.is-open').forEach(el => el.classList.remove('is-open'));
      }
    });
  }

  /* ---- Auto-init on DOMContentLoaded ---- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init());
  } else {
    init();
  }

  function _toggleDropdown(e, btn) {
    e.preventDefault();
    e.stopPropagation();
    
    const parent = btn.parentElement;
    const wasOpen = parent.classList.contains('is-open');
    
    document.querySelectorAll('.nb-has-drop.is-open').forEach(el => {
      el.classList.remove('is-open');
    });
    
    if (!wasOpen) {
      parent.classList.add('is-open');
    }
  }

  /* ================================================================
     PUBLIC API
  ================================================================ */
  return {
    init,
    openSidebar,
    closeSidebar,
    toggleTheme,
    setTheme,
    toggleDir,
    setDir,
    _toggleSub,   // internal but needs to be accessible from inline HTML
    _toggleDropdown,
  };

})();