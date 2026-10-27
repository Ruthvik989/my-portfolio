/**
 * RAVILLA RUTHVIK — PERSONAL PORTFOLIO INTERACTIVITY
 * Pure vanilla JavaScript: Fast, responsive, accessible, dependency-free.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebarNavigation();
  initMobileSidebar();
  initThemeToggle();
  initContactForm();
  initCopyEmail();
  initModals();
  initDynamicYear();
  initScrollSpy();
  initScrollReveal();
});

/* ==========================================================================
   1. Sidebar Navigation & Scrollspy
   ========================================================================== */
function initSidebarNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sidebar = document.getElementById('sidebar');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const targetHref = item.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetSection = document.querySelector(targetHref);
        if (targetSection) {
          targetSection.classList.add('is-revealed');
        }
      }

      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });
}

function initScrollSpy() {
  const sections = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
  const navItems = document.querySelectorAll('.nav-item');

  function onScroll() {
    const scrollPos = window.scrollY + 200;

    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      const el = document.getElementById(sectionId);
      if (el && el.offsetTop <= scrollPos) {
        el.classList.add('is-revealed');
        navItems.forEach(item => {
          if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        break;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   2. Mobile Sidebar Open/Close
   ========================================================================== */
function initMobileSidebar() {
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');
  const sidebar = document.getElementById('sidebar');

  if (mobileToggleBtn && sidebar) {
    mobileToggleBtn.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
    });
  }

  if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
    }
  });

  // Close when tapping/clicking outside sidebar on mobile
  document.addEventListener('click', (e) => {
    if (sidebar && sidebar.classList.contains('mobile-open')) {
      if (!sidebar.contains(e.target) && mobileToggleBtn && !mobileToggleBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
      }
    }
  });
}

/* ==========================================================================
   3. Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('rr_portfolio_theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
  }

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    if (isLight) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('rr_portfolio_theme', 'dark');
      showToast('Switched to Dark Mode');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('rr_portfolio_theme', 'light');
      showToast('Switched to Light Mode');
    }
  });
}

/* ==========================================================================
   4. Contact Form Validation & Mailto
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const statusBanner = document.getElementById('form-status-banner');

  const fields = [
    { input: nameInput, errorId: 'name-error', validate: v => !v ? 'Please enter your name.' : v.length < 2 ? 'Name must be at least 2 characters.' : '' },
    { input: emailInput, errorId: 'email-error', validate: v => !v ? 'Please enter your email.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email address.' : '' },
    { input: subjectInput, errorId: 'subject-error', validate: v => !v ? 'Please enter a subject.' : v.length < 3 ? 'Subject must be at least 3 characters.' : '' },
    { input: messageInput, errorId: 'message-error', validate: v => !v ? 'Please enter your message.' : v.length < 10 ? 'Message must be at least 10 characters.' : '' }
  ];

  fields.forEach(({ input, errorId }) => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errEl = document.getElementById(errorId);
      if (errEl) errEl.textContent = '';
      if (statusBanner) statusBanner.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasErrors = false;

    fields.forEach(({ input, errorId, validate }) => {
      if (!input) return;
      const errorMsg = validate(input.value.trim());
      const errEl = document.getElementById(errorId);
      if (errorMsg) {
        hasErrors = true;
        input.classList.add('error');
        if (errEl) errEl.textContent = errorMsg;
      } else {
        input.classList.remove('error');
        if (errEl) errEl.textContent = '';
      }
    });

    if (hasErrors) {
      if (statusBanner) {
        statusBanner.style.color = '#FF8E88';
        statusBanner.textContent = 'Please correct the highlighted errors before submitting.';
      }
      return;
    }

    const recipient = 'ravillaruthvik0@gmail.com';
    const subj = `[Portfolio Contact] ${subjectInput.value.trim()}`;
    const bodyText = `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\nMessage:\n${messageInput.value.trim()}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(bodyText)}`;

    if (statusBanner) {
      statusBanner.style.color = '#00E599';
      statusBanner.textContent = 'Launching email client... You can also email ravillaruthvik0@gmail.com directly.';
    }

    window.location.href = mailtoUrl;
  });
}

/* ==========================================================================
   5. Copy Email
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const email = 'ravillaruthvik0@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const temp = document.createElement('input');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      showToast(`Copied ${email} to clipboard!`);
    } catch {
      showToast(`Email: ${email}`);
    }
  });
}

function showToast(msg) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   6. Modal Dialogs (Certifications & Project Architecture)
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('portfolio-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalTitle || !modalBody || !closeBtn) return;

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  function openModal(title, htmlContent) {
    modalTitle.textContent = title;
    modalBody.innerHTML = htmlContent;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Certificate Details & PDF paths
  const certDetails = {
    'ibm-cybersecurity-fundamentals': {
      title: 'Cybersecurity Fundamentals',
      issuer: 'IBM SkillsBuild',
      date: 'January 3, 2026',
      skills: 'Security principles, CIA triad, threat modeling, incident handling, defense-in-depth, cryptographic basics.',
      doc: 'Credential ID: 69fa1ed2-ca93-4c92-9b7a-6fa1b94d317a',
      pdfPath: '/assets/certificates/IBM-Cybersecurity-Fundamentals.pdf',
      verifyUrl: 'https://www.credly.com/badges/69fa1ed2-ca93-4c92-9b7a-6fa1b94d317a',
      verifyLabel: 'Verify Badge on Credly'
    },
    'identity-access-management': {
      title: 'Introduction to Identity & Access Management (IAM)',
      issuer: 'LinkedIn Learning',
      date: 'October 17, 2026',
      skills: 'Authentication, authorization, RBAC, least privilege, SSO, directory services, access governance.',
      doc: 'Certificate ID: 21ee12c8907c2cb92b58062ad0d2a4a823fae385d91e011623313b14fe38856e',
      pdfPath: '/assets/certificates/Introduction-to-Identity-and-Access-Management.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/21ee12c8907c2cb92b58062ad0d2a4a823fae385d91e011623313b14fe38856e',
      verifyLabel: 'Verify on LinkedIn'
    },
    'vulnerability-management': {
      title: 'Vulnerability Management in Cybersecurity',
      issuer: 'LinkedIn Learning',
      date: 'October 20, 2026',
      skills: 'Vulnerability assessment lifecycle, CVE/CVSS scoring, patch prioritization, risk mitigation, scanner reports.',
      doc: 'Certificate ID: 97cbb17b25f76f55e148adc692d37dd88033943c7859bcfdeb240a68f76f5bea',
      pdfPath: '/assets/certificates/Vulnerability-Management-in-Cybersecurity-The-Basics.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/97cbb17b25f76f55e148adc692d37dd88033943c7859bcfdeb240a68f76f5bea',
      verifyLabel: 'Verify on LinkedIn'
    },
    'cisco-network-security': {
      title: 'Cisco Network Security: Core Security Concepts',
      issuer: 'LinkedIn Learning & Cisco',
      date: 'October 19, 2026',
      skills: 'Firewalls, DMZ architecture, IDS/IPS, network segmentation, secure transport protocols, ACL configuration.',
      doc: 'Certificate ID: 875a509782fb4e2f18b0814e47b52062c9e90c10d858ea9190e539e38a269369',
      pdfPath: '/assets/certificates/Cisco-Network-Security-Core-Security-Concepts.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/875a509782fb4e2f18b0814e47b52062c9e90c10d858ea9190e539e38a269369',
      verifyLabel: 'Verify on LinkedIn'
    },
    'cybersecurity-policies-resources': {
      title: 'Cybersecurity: Key Policies and Resources',
      issuer: 'LinkedIn Learning',
      date: 'October 14, 2026',
      skills: 'Security compliance, governance, acceptable use policies, incident response frameworks, data privacy regulations.',
      doc: 'Certificate ID: da9d9c1add47873f06c81be6b7a9c2d70b327483bcab86de406ac62a90a9fe49',
      pdfPath: '/assets/certificates/Cybersecurity-Key-Policies-and-Resources.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/da9d9c1add47873f06c81be6b7a9c2d70b327483bcab86de406ac62a90a9fe49',
      verifyLabel: 'Verify on LinkedIn'
    },
    'intermediate-endpoint-security': {
      title: 'Intermediate Endpoint Security',
      issuer: 'LinkedIn Learning',
      date: 'October 23, 2026',
      skills: 'Endpoint protection, behavioral detection, host firewalls, malicious artifact analysis, threat mitigation.',
      doc: 'Certificate ID: Verified LinkedIn Learning Credential',
      pdfPath: '/assets/certificates/Intermediate-Endpoint-Security.pdf',
      verifyUrl: 'https://www.linkedin.com/in/ruthvik-ravilla-b3561243a/',
      verifyLabel: 'Verify on LinkedIn'
    },
    'siem-splunk-security': {
      title: 'SIEM Event Management with Splunk Security',
      issuer: 'LinkedIn Learning',
      date: 'October 25, 2026',
      skills: 'SIEM architectures, Splunk log ingestion, query analysis (SPL), alert correlation, real-time threat monitoring.',
      doc: 'Certificate ID: Verified LinkedIn Learning Credential',
      pdfPath: '/assets/certificates/SIEM-Event-Management-with-Splunk-Security.pdf',
      verifyUrl: 'https://www.linkedin.com/in/ruthvik-ravilla-b3561243a/',
      verifyLabel: 'Verify on LinkedIn'
    },
    'python-for-non-programmers': {
      title: 'Python for Non-Programmers',
      issuer: 'LinkedIn Learning',
      date: 'October 13, 2026',
      skills: 'Syntax fundamentals, control flow, functions, dictionaries, loops, cybersecurity automation scripts.',
      doc: 'Certificate ID: Verified LinkedIn Learning Credential',
      pdfPath: '/assets/certificates/Python-for-Non-Programmers.pdf',
      verifyUrl: 'https://www.linkedin.com/in/ruthvik-ravilla-b3561243a/',
      verifyLabel: 'Verify on LinkedIn'
    }
  };

  function renderCertModal(id) {
    const data = certDetails[id];
    if (!data) return;

    openModal(`Certificate: ${data.title}`, `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:rgba(0,210,255,0.06); border:1px solid rgba(0,210,255,0.2); padding:16px; border-radius:10px;">
          <div style="color:#00D2FF; font-weight:700; font-size:15px; margin-bottom:4px;">${data.title}</div>
          <div style="color:#F8FAFC; font-size:13px;">Issued by: <strong>${data.issuer}</strong></div>
          <div style="color:#94A3B8; font-size:12px; margin-top:2px;">Issued on: ${data.date}</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:#00E599; margin-top:8px; word-break:break-all;">${data.doc}</div>
        </div>
        <div>
          <h5 style="color:#F8FAFC; margin-bottom:6px; font-size:13px;">Core Competencies Covered:</h5>
          <p style="color:#94A3B8; font-size:12.5px; line-height:1.5;">${data.skills}</p>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:8px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08);">
          <a href="${data.pdfPath}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg, #00D2FF, #0099FF); color:#060911; font-weight:700; font-size:12px; padding:9px 18px; border-radius:6px; text-decoration:none;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Open Verified PDF</span>
          </a>
          ${data.verifyUrl ? `
          <a href="${data.verifyUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.14); color:#F8FAFC; font-weight:600; font-size:12px; padding:9px 16px; border-radius:6px; text-decoration:none;">
            <span>${data.verifyLabel}</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          ` : ''}
        </div>
      </div>
    `);
  }

  // Handle cert detail buttons
  const detailButtons = document.querySelectorAll('.cert-details-btn');
  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-cert-id');
      renderCertModal(id);
    });
  });

  // Handle "View All (8)" certifications modal
  const viewAllBtn = document.getElementById('view-all-certs-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      const keys = Object.keys(certDetails);
      const itemsHtml = keys.map(key => {
        const item = certDetails[key];
        const isIbm = item.issuer.includes('IBM');
        return `
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:10px; min-width:220px; flex:1;">
              <span style="background:${isIbm ? '#0062FE' : '#0A66C2'}; color:#FFF; font-weight:800; font-size:${isIbm ? '9px' : '11px'}; width:24px; height:24px; border-radius:5px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">${isIbm ? 'IBM' : 'in'}</span>
              <div>
                <div style="color:#F8FAFC; font-weight:600; font-size:12.5px;">${item.title}</div>
                <div style="color:#94A3B8; font-size:11px;">${item.issuer} &bull; ${item.date}</div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <a href="${item.pdfPath}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:5px; background:rgba(0,210,255,0.12); border:1px solid rgba(0,210,255,0.3); color:#00D2FF; font-size:11px; font-weight:600; padding:6px 12px; border-radius:5px; text-decoration:none;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>View PDF</span>
              </a>
              ${item.verifyUrl ? `
              <a href="${item.verifyUrl}" target="_blank" rel="noopener noreferrer" style="color:#94A3B8; font-size:11px; display:inline-flex; align-items:center; gap:3px; text-decoration:none; padding:6px 8px;">
                <span>Verify</span>
                <span style="font-size:10px;">&rarr;</span>
              </a>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');

      openModal('All Verified Certifications (8)', `
        <div style="display:flex; flex-direction:column; gap:10px; max-height:65vh; overflow-y:auto; padding-right:4px;">
          <p style="color:#94A3B8; font-size:12px; margin-bottom:4px;">
            Here are all 8 industry credentials completed by Ravilla Ruthvik with direct links to verified PDFs:
          </p>
          ${itemsHtml}
        </div>
      `);
    });
  }

  // Project Detail Modals
  const archBtn = document.getElementById('open-architecture-btn');
  const riskModalBtn = document.getElementById('open-risk-modal-btn');
  const dairyModalBtn = document.getElementById('open-dairy-modal-btn');
  const portfolioModalBtn = document.getElementById('open-portfolio-modal-btn');

  function openRiskDetails() {
    openModal('AI-Assisted Cyber Risk Assessment System', `
      <div style="display:flex; flex-direction:column; gap:14px;">
        <p style="color:#E2E8F0; font-size:13px; line-height:1.6;">
          An engineering solution designed to evaluate small business cybersecurity posture using a deterministic risk engine paired with structured AI guidance.
        </p>
        <div style="background:#060B14; border:1px solid rgba(0,210,255,0.25); border-radius:8px; padding:14px; font-family:var(--font-mono); font-size:11.5px; color:#A7F3D0;">
          <div style="color:#00D2FF; font-weight:700; margin-bottom:6px;">// Deterministic Architecture</div>
          <div>1. Asset Criticality Index [0 - 10]</div>
          <div>2. Vulnerability CVSS Scoring [0 - 10]</div>
          <div>3. Exposure & Exposure Factor [0.0 - 1.0]</div>
          <div style="color:#FBBF24; margin-top:4px;">Formula: Risk = (Criticality * 0.4) + (CVSS * 0.4) + (Exposure * 0.2)</div>
        </div>
        <div style="color:#94A3B8; font-size:12px;">
          <strong>Tech Stack:</strong> Python, Flask, SQLite, HTML5, CSS3, JavaScript.
        </div>
      </div>
    `);
  }

  if (archBtn) archBtn.addEventListener('click', openRiskDetails);
  if (riskModalBtn) riskModalBtn.addEventListener('click', openRiskDetails);

  if (dairyModalBtn) {
    dairyModalBtn.addEventListener('click', () => {
      openModal('Vijaya Dairy Website (Nellore)', `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <p style="color:#E2E8F0; font-size:13px; line-height:1.6;">
            A responsive, multi-page web platform designed for Vijaya Dairy in Nellore. Highlights local dairy products, farmer outreach, and direct ordering with clean semantic markup.
          </p>
          <div style="color:#94A3B8; font-size:12px;">
            <strong>Tech Stack:</strong> Semantic HTML5, CSS Grid & Flexbox, Vanilla JavaScript.
          </div>
        </div>
      `);
    });
  }

  if (portfolioModalBtn) {
    portfolioModalBtn.addEventListener('click', () => {
      openModal('Personal Portfolio Website', `
        <div style="display:flex; flex-direction:column; gap:12px;">
          <p style="color:#E2E8F0; font-size:13px; line-height:1.6;">
            The website you are currently viewing! Built with high-performance vanilla web standards, featuring responsive layout, accessibility skip link, dark theme, and interactive modules.
          </p>
          <div style="color:#94A3B8; font-size:12px;">
            <strong>Source:</strong> <a href="https://github.com/Ruthvik989" target="_blank" rel="noopener noreferrer" style="color:#00D2FF; text-decoration:underline;">github.com/Ruthvik989</a>
          </div>
        </div>
      `);
    });
  }
}

/* ==========================================================================
   7. Dynamic Year
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

/* ==========================================================================
   8. Smooth Scroll Reveal Animation for Sections
   ========================================================================== */
function initScrollReveal() {
  const sections = document.querySelectorAll('section, .scroll-reveal');
  if (!sections.length) return;

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    sections.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(el => {
    // If element is already in the viewport on initial load, reveal immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
      el.classList.add('is-revealed');
    } else {
      revealObserver.observe(el);
    }
  });

  // Handle direct anchor navigation
  if (window.location.hash) {
    const hashEl = document.querySelector(window.location.hash);
    if (hashEl) hashEl.classList.add('is-revealed');
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash) {
      const hashEl = document.querySelector(window.location.hash);
      if (hashEl) hashEl.classList.add('is-revealed');
    }
  });
}
