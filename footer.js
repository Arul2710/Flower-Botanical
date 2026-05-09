/**
 * footer.js — Flower & Botanical
 * ─────────────────────────────────────────────────────────────────
 * Self-contained footer component.
 * Ensures consistent design across all pages.
 */

const Footer = (() => {

  const CSS = `
    .nb-footer {
      background: var(--surface-1);
      border-top: 1px solid var(--pink-border);
      padding: 80px 24px 30px;
      color: var(--text-secondary);
      font-family: 'DM Sans', sans-serif;
    }
    
    .nb-footer-inner {
      max-width: 1140px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1fr;
      gap: 50px;
    }
    
    /* Brand */
    .nbf-brand {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .nbf-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    
    .nbf-logo-icon {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--pink), var(--pink-dark));
       color: #fff;
      border: 1px solid var(--pink-border);
      font-size: 18px;
    }
    
    .nbf-logo-text {
      display: flex;
      align-items: baseline;
      gap: 6px;
      line-height: 1;
    }
    
    .nbf-logo-text .nbf-bold {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .nbf-logo-text .nbf-italic {
      font-family: 'Cormorant Garamond', serif;
      font-size: 24px;
      font-weight: 400;
      font-style: italic;
      color: var(--pink);
    }
    
    .nbf-desc {
      font-size: 15px;
      line-height: 1.7;
      color: var(--text-muted);
      max-width: 320px;
    }
    
    /* Socials */
    .nbf-socials {
      display: flex;
      gap: 12px;
      margin-top: 6px;
    }
    
    .nbf-social-btn {
      width: 38px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: transparent;
      color: var(--text-muted);
      border: 1px solid var(--pink-border);
      font-size: 14px;
      text-decoration: none;
      transition:
        background 0.2s,
        color 0.2s,
        transform 0.2s var(--ease-spring),
        border-color 0.2s;
    }
    
    .nbf-social-btn:hover {
      background: var(--pink);
      color: #fff;
      transform: translateY(-3px);
      border-color: var(--pink);
      box-shadow: 0 6px 18px var(--pink-glow);
    }
    
    /* Sections */
    .nbf-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 24px;
    }
    
    .nbf-links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    
    .nbf-link {
      font-size: 15px;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s, transform 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    
    .nbf-link i {
      font-size: 10px;
      color: var(--pink);
      opacity: 0;
      transform: translateX(-5px);
      transition: all 0.2s;
    }
    
    .nbf-link:hover {
      color: var(--pink);
      transform: translateX(4px);
    }
    
    .nbf-link:hover i {
      opacity: 1;
      transform: translateX(0);
    }
    
    /* Contact */
    .nbf-contact-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 18px;
      font-size: 15px;
      color: var(--text-muted);
      line-height: 1.6;
    }
    
    .nbf-contact-item i {
      color: var(--pink);
      font-size: 16px;
      margin-top: 4px;
    }
    
    /* Bottom */
    .nbf-bottom {
      border-top: 1px solid var(--pink-border);
      padding-top: 24px;
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--text-subtle);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      max-width: 1140px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .nbf-bottom-links {
      display: flex;
      gap: 24px;
    }
    
    .nbf-bottom-links a {
      color: var(--text-subtle);
      text-decoration: none;
      transition: color 0.2s;
    }
    
    .nbf-bottom-links a:hover {
      color: var(--pink);
    }
    
    /* Responsive */
    @media (max-width: 992px) {
      .nb-footer-inner {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }
    }
    
    @media (max-width: 576px) {
      .nb-footer {
        padding: 60px 20px 24px;
      }
      .nb-footer-inner {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .nbf-bottom {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
    }
    
    html.dark .nb-footer {
      background: var(--surface-1);
      border-top-color: var(--nav-border);
    }
  `;

  function _buildHTML() {
    return `
      <footer class="nb-footer" role="contentinfo">
        <div class="nb-footer-inner">
          
          <!-- Brand -->
          <div class="nbf-brand">
            <a href="index.html" class="nbf-logo" aria-label="Flower & Botanical — Home">
              <span class="nbf-logo-icon"><i class="fas fa-seedling"></i></span>
              <span class="nbf-logo-text">
                <span class="nbf-bold">Flower</span>
                <span class="nbf-italic">&amp; Botanical</span>
              </span>
            </a>
            <p class="nbf-desc">
              Preserving nature's ephemeral beauty through carefully crafted botanical art, custom designs, and educational workshops.
            </p>
            <div class="nbf-socials">
              <a href="#" class="nbf-social-btn" aria-label="Instagram" title="Instagram"><i class="fab fa-instagram"></i></a>
              <a href="#" class="nbf-social-btn" aria-label="Facebook" title="Facebook"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="nbf-social-btn" aria-label="Pinterest" title="Pinterest"><i class="fab fa-pinterest-p"></i></a>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h3 class="nbf-title">Quick Links</h3>
            <ul class="nbf-links">
              <li><a href="index.html" class="nbf-link"><i class="fas fa-chevron-right"></i> Home</a></li>
              <li><a href="about.html" class="nbf-link"><i class="fas fa-chevron-right"></i> About Studio</a></li>
              <li><a href="artworks.html" class="nbf-link"><i class="fas fa-chevron-right"></i> Gallery & Artworks</a></li>
              <li><a href="price.html" class="nbf-link"><i class="fas fa-chevron-right"></i> Investment Guide</a></li>
              <li><a href="booking.html" class="nbf-link"><i class="fas fa-chevron-right"></i> Workshops</a></li>
            </ul>
          </div>
          
          <!-- Services -->
          <div>
            <h3 class="nbf-title">Our Services</h3>
            <ul class="nbf-links">
              <li><a href="#" class="nbf-link"><i class="fas fa-chevron-right"></i> Bouquet Preservation</a></li>
              <li><a href="#" class="nbf-link"><i class="fas fa-chevron-right"></i> Resin Floral Art</a></li>
              <li><a href="#" class="nbf-link"><i class="fas fa-chevron-right"></i> Custom Framing</a></li>
              <li><a href="#" class="nbf-link"><i class="fas fa-chevron-right"></i> Private Classes</a></li>
              <li><a href="contact.html" class="nbf-link"><i class="fas fa-chevron-right"></i> Commission an Artwork</a></li>
            </ul>
          </div>
          
          <!-- Contact Info -->
          <div>
            <h3 class="nbf-title">Contact Us</h3>
            <div class="nbf-contact-item">
              <i class="fas fa-location-dot"></i>
              <span>123 Botanical Lane, Art District<br>Tamil Nadu, India</span>
            </div>
            <div class="nbf-contact-item">
              <i class="fas fa-phone"></i>
              <span>+91 98765 43210</span>
            </div>
            <div class="nbf-contact-item">
              <i class="fas fa-envelope"></i>
              <span>hello@studiobotanica.com</span>
            </div>
          </div>
          
        </div>
        
        <!-- Bottom Bar -->
        <div class="nbf-bottom">
          <div>
            &copy; 2026 Flower &amp; Botanical Studio. All Rights Reserved.
          </div>
          <div class="nbf-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    `;
  }

  function init() {
    if (!document.getElementById('nbf-styles')) {
      const style = document.createElement('style');
      style.id = 'nbf-styles';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    const root = document.getElementById('footer-root');
    if (!root) {
      console.warn('[Footer] No <div id="footer-root"></div> found in the document.');
      return;
    }
    
    root.innerHTML = _buildHTML();
  }

  return { init };
})();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Footer.init);
} else {
  Footer.init();
}
