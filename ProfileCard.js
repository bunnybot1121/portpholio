class ProfileCardElement extends HTMLElement {
  connectedCallback() {
    const name = this.getAttribute('name') || 'Sachin Yadav';
    const title = this.getAttribute('job-title') || 'Software Engineer';
    const handle = this.getAttribute('handle') || 'sachin';
    const status = this.getAttribute('status') || 'Online';
    const contactText = this.getAttribute('contact-text') || 'Contact Me';
    const avatarUrl = this.getAttribute('avatar-url') || '';
    const linkedinUrl = this.getAttribute('linkedin-url') || '#';
    const glowColor = this.getAttribute('behind-glow-color') || 'rgba(125, 190, 255, 0.67)';
    const showUserInfo = this.getAttribute('show-user-info') !== 'false';
    const showIconPattern = this.getAttribute('show-icon-pattern') === 'true';
    const behindGlowEnabled = this.getAttribute('behind-glow') !== 'false';
    const enableMobileTilt = this.getAttribute('enable-mobile-tilt') !== 'false';

    this.innerHTML = `
      <div class="profile-card-wrapper">
        ${behindGlowEnabled ? `<div class="pc-behind-glow" style="background: radial-gradient(circle, ${glowColor} 0%, transparent 70%);"></div>` : ''}
        <div class="profile-card">
          <img class="pc-bg-image" src="${avatarUrl}" alt="${name}" loading="lazy">
          <div class="pc-overlay"></div>
          ${showIconPattern ? '<div class="pc-icon-pattern"></div>' : ''}
          <div class="pc-glare"></div>
          
          <div class="pc-content">
            <div style="flex-grow: 1;"></div>
            
            <div class="pc-bottom-group" style="display: flex; flex-direction: column; gap: 16px;">
              <div class="pc-header" style="text-align: left;">
                <h2 class="pc-name">${name}</h2>
                <p class="pc-title">${title}</p>
              </div>
              
              ${showUserInfo ? `
              <div class="pc-bottom-bar">
                <div class="pc-user-info">
                  <div class="pc-avatar-small-container">
                    <img class="pc-avatar-small" src="${avatarUrl}" alt="${name} Avatar" loading="lazy">
                  </div>
                  <div class="pc-user-details">
                    <span class="pc-handle">@${handle}</span>
                    <span class="pc-status">${status}</span>
                  </div>
                </div>
                <!-- Contact Popup Wrapper -->
                <div style="position: relative;">
                  <button class="pc-contact-btn" id="contactToggleBtn">${contactText}</button>
                  <div class="pc-contact-popup" id="contactPopup">
                    <a href="${linkedinUrl}" target="_blank" class="pc-popup-link">
                      <i data-lucide="linkedin"></i> LinkedIn
                    </a>
                    <a href="${this.getAttribute('github-url') || '#'}" target="_blank" class="pc-popup-link">
                      <i data-lucide="github"></i> GitHub
                    </a>
                    <a href="${this.getAttribute('gmail-url') || '#'}" class="pc-popup-link">
                      <i data-lucide="mail"></i> Email
                    </a>
                  </div>
                </div>
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    this.wrapper = this.querySelector('.profile-card-wrapper');
    this.card = this.querySelector('.profile-card');
    
    // Smooth 3D tilt effect on mouse movement
    this.wrapper.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.wrapper.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    
    // Popup logic
    const contactBtn = this.querySelector('#contactToggleBtn');
    const contactPopup = this.querySelector('#contactPopup');
    
    if (contactBtn && contactPopup) {
      contactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        contactPopup.classList.toggle('active');
        if (window.lucide) window.lucide.createIcons();
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target)) {
          contactPopup.classList.remove('active');
        }
      });
    }

    // Initialize initial icons if possible
    if (window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 50);
    }
    
    // Add mobile gyroscope support for touch devices
    if (enableMobileTilt && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
    }
  }

  handleMouseMove(e) {
    const rect = this.wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    this.card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Update glare position
    this.card.style.setProperty('--mx', `${x}px`);
    this.card.style.setProperty('--my', `${y}px`);
  }

  handleMouseLeave() {
    this.card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    this.card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    setTimeout(() => {
      this.card.style.transition = 'transform 0.1s ease-out';
    }, 500);
  }

  handleDeviceOrientation(e) {
    if (!e.beta || !e.gamma) return;
    
    // Limit rotation based on device tilt
    const beta = Math.max(-15, Math.min(15, e.beta - 30)); // 30 is assume holding angle
    const gamma = Math.max(-15, Math.min(15, e.gamma));

    this.card.style.transform = `rotateX(${-beta}deg) rotateY(${gamma}deg)`;
  }
}

customElements.define('profile-card', ProfileCardElement);
