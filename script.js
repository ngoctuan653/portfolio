/**
 * PORTFOLIO JAVASCRIPT - CHU TUAN NGOC
 * Terminal & ASCII Aesthetic Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initI18n();
  initTypewriter();
  initNavigation();
  initQuickPills();
  initCopyButtons();
  initInteractiveCLI();
  initModal();
  initScrollEffects();
  if (typeof initAvatar3D === 'function') {
    initAvatar3D();
  }
});

/* ==========================================================================
   1. MATRIX RAIN EFFECT (CANVAS)
   ========================================================================== */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isRunning = true;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Characters: binary, hex, code symbols
  const characters = '0123456789ABCDEF<>/{}[];:+=*~$#_!%&^@|';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  function draw() {
    // Semi-transparent fade
    ctx.fillStyle = 'rgba(7, 9, 14, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // Randomize color between sky blue and cyan
      if (Math.random() > 0.85) {
        ctx.fillStyle = '#ffffff'; // Occasional spark white
      } else if (Math.random() > 0.5) {
        ctx.fillStyle = '#38bdf8'; // Sky blue
      } else {
        ctx.fillStyle = '#0284c7'; // Deep blue
      }

      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    if (isRunning) {
      animationFrameId = requestAnimationFrame(draw);
    }
  }

  draw();

  // Toggle button
  const toggleBtn = document.getElementById('fx-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      if (isRunning) {
        toggleBtn.classList.remove('active');
        toggleBtn.querySelector('span').textContent = 'FX: RAIN';
        draw();
      } else {
        toggleBtn.classList.add('active');
        toggleBtn.querySelector('span').textContent = 'FX: PAUSED';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrameId);
      }
    });
  }
}

/* ==========================================================================
   2. i18n INITIALIZATION & TYPEWRITER EFFECT
   ========================================================================== */
function initI18n() {
  if (!window.i18n) return;

  const currentLang = window.i18n.getLanguage();
  window.i18n.setLanguage(currentLang);

  const langBtn = document.getElementById('lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const active = window.i18n.getLanguage();
      const next = active === 'en' ? 'vi' : 'en';

      document.body.classList.add('lang-transitioning');
      setTimeout(() => {
        window.i18n.setLanguage(next);
        setTimeout(() => {
          document.body.classList.remove('lang-transitioning');
        }, 60);
      }, 100);
    });
  }
}

function initTypewriter() {
  const outputEl = document.getElementById('typewriter-output');
  if (!outputEl) return;

  let phrases = (window.i18n && window.i18n.translations[window.i18n.getLanguage()] && window.i18n.translations[window.i18n.getLanguage()].typewriter_phrases) || [
    'Building scalable backend architectures & high-performance mobile applications.',
    'Specialized in Java Spring Boot, Flutter, PostgreSQL & Cloud Microservices.',
    'Certified FPT Software OJT Intern & FPT University Senior.',
    'Passionate about clean code, distributed systems & smooth UI/UX.',
    'Status: Available and eager for Full-Time Software Engineering roles.'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 40;
  let timeoutId = null;

  window.addEventListener('languageChanged', (e) => {
    const lang = e.detail && e.detail.lang;
    if (window.i18n && window.i18n.translations[lang]) {
      phrases = window.i18n.translations[lang].typewriter_phrases;
      phraseIndex = 0;
      charIndex = 0;
      isDeleting = false;
      if (timeoutId) clearTimeout(timeoutId);
      typeLoop();
    }
  });

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex] || phrases[0];

    if (isDeleting) {
      outputEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 20;
    } else {
      outputEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 40;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause at end of sentence
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before typing next
    }

    timeoutId = setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

/* ==========================================================================
   3. NAVIGATION & SCROLL HIGHLIGHTING
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Active section indicator
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. QUICK JUMP PILLS
   ========================================================================== */
function initQuickPills() {
  const pills = document.querySelectorAll('.pill-cmd');
  const cmdDisplay = document.getElementById('quick-cmd-text');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetSelector = pill.getAttribute('data-target');
      const targetElement = document.querySelector(targetSelector);
      
      if (cmdDisplay) {
        cmdDisplay.textContent = pill.textContent;
      }

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   5. COPY TO CLIPBOARD
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-btn');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const lang = window.i18n ? window.i18n.getLanguage() : 'en';
        const copiedText = lang === 'vi' ? 'ĐÃ CHÉP!' : 'COPIED!';
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<i class="fa-solid fa-check"></i> <span>${copiedText}</span>`;
        btn.style.borderColor = '#22c55e';
        btn.style.color = '#22c55e';

        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE CLI EASTER EGG CONSOLE
   ========================================================================== */
function initInteractiveCLI() {
  const cliScreen = document.getElementById('cli-screen');
  const cliForm = document.getElementById('cli-form');
  const cliInput = document.getElementById('cli-input');

  if (!cliForm || !cliInput || !cliScreen) return;

  const commandHistory = [];
  let historyIndex = -1;

  function appendLine(text, type = 'system') {
    const line = document.createElement('div');
    line.className = `cli-output-line ${type}`;
    line.innerHTML = text;
    cliScreen.appendChild(line);
    cliScreen.scrollTop = cliScreen.scrollHeight;
  }

  cliForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawInput = cliInput.value.trim();
    if (!rawInput) return;

    commandHistory.push(rawInput);
    historyIndex = commandHistory.length;

    // Echo input
    appendLine(`<span style="color: var(--accent-blue);">&gt;</span> ${escapeHtml(rawInput)}`, 'cmd');
    cliInput.value = '';

    const cmd = rawInput.toLowerCase();

    // Execute command
    handleCommand(cmd);
  });

  // History navigation with arrow keys
  cliInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      if (historyIndex > 0) {
        historyIndex--;
        cliInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        cliInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        cliInput.value = '';
      }
    }
  });

  function handleCommand(cmd) {
    const lang = window.i18n ? window.i18n.getLanguage() : 'en';
    const isVi = lang === 'vi';

    switch (cmd) {
      case 'help':
        if (isVi) {
          appendLine(`
Danh sách lệnh khả dụng:<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- In cây kỹ năng công nghệ cốt lõi<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">projects</span>&nbsp;&nbsp;&nbsp;- Liệt kê danh sách dự án tiêu biểu<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">experience</span>&nbsp;- Hiển thị kinh nghiệm OJT &amp; học vấn<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;- Thông tin liên hệ, email và mạng xã hội<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Mở trình xem hồ sơ CV online<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Giới thiệu thông tin lập trình viên<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">sudo hire</span>&nbsp;&nbsp;- Kích hoạt quy trình tuyển dụng 😉<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Xóa sạch màn hình dòng lệnh
          `, 'info');
        } else {
          appendLine(`
Available commands:<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">skills</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Print core engineering tech stack<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">projects</span>&nbsp;&nbsp;&nbsp;- List featured projects<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">experience</span>&nbsp;- Print work &amp; education milestones<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">contact</span>&nbsp;&nbsp;&nbsp;&nbsp;- Show email and social channels<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">resume</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Open online resume preview<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">whoami</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display developer profile bio<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">sudo hire</span>&nbsp;&nbsp;- Execute hiring procedure 😉<br>
&nbsp;&nbsp;<span style="color: #38bdf8;">clear</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Clear screen buffer
          `, 'info');
        }
        break;

      case 'skills':
        appendLine(`
<strong>[MOBILE &amp; FRONTEND]</strong>: Flutter, Dart, React 19, TypeScript, JavaScript, Riverpod, Zustand, TailwindCSS<br>
<strong>[BACKEND &amp; ARCHITECTURE]</strong>: Java, Spring Boot, Spring Security, RESTful APIs, WebSocket, Microservices<br>
<strong>[DATABASES]</strong>: PostgreSQL, MySQL, Redis, Firebase Firestore, Supabase<br>
<strong>[DEVOPS &amp; TOOLS]</strong>: Docker, Git, Postman, Linux, FCM, Stripe API
        `, 'info');
        break;

      case 'projects':
        if (isVi) {
          appendLine(`
1. <strong>ComiVerse Web</strong> - Hệ sinh thái đọc truyện tranh (React 19 + Spring Boot + Postgres + Redis + Stripe)<br>
2. <strong>ComiVerse Mobile</strong> - Ứng dụng đọc truyện Flutter đa nền tảng có cache offline &amp; FCM<br>
3. <strong>EnglishParty</strong> - Nền tảng học tiếng Anh chuẩn CEFR Gamified (React 19 + Zustand + Firebase)<br>
4. <strong>UniEvents</strong> - Ứng dụng di động khám phá sự kiện &amp; vé QR thông minh (Flutter + Dart)
          `, 'info');
        } else {
          appendLine(`
1. <strong>ComiVerse Web</strong> - Comic reading ecosystem (React 19 + Spring Boot + Postgres + Redis + Stripe)<br>
2. <strong>ComiVerse Mobile</strong> - Flutter cross-platform comic reader with offline cache &amp; FCM<br>
3. <strong>EnglishParty</strong> - Solo gamified CEFR English learning platform (React 19 + Zustand + Firebase)<br>
4. <strong>UniEvents</strong> - Smart campus event discovery &amp; QR ticket app (Flutter + Dart)
          `, 'info');
        }
        break;

      case 'experience':
        if (isVi) {
          appendLine(`
• <strong>FPT Software Academy</strong> (05/2025 – 08/2025): Thực tập sinh Kỹ sư Phần mềm (Chứng chỉ Tốt nghiệp OJT)<br>
• <strong>Đại học FPT Hà Nội</strong> (2021 – 2025): Cử nhân Kỹ thuật Phần mềm (Software Engineering)
          `, 'info');
        } else {
          appendLine(`
• <strong>FPT Software Academy</strong> (05/2025 – 08/2025): Software Engineer Intern (OJT Certified)<br>
• <strong>FPT University</strong> (2021 – 2025): Bachelor of Science in Software Engineering
          `, 'info');
        }
        break;

      case 'contact':
        appendLine(`
Email: <a href="mailto:ngoctuan653@gmail.com" style="color: #38bdf8;">ngoctuan653@gmail.com</a><br>
GitHub: <a href="https://github.com/ngoctuan653" target="_blank" style="color: #38bdf8;">github.com/ngoctuan653</a><br>
LinkedIn: <a href="https://linkedin.com/in/ngoctuan653" target="_blank" style="color: #38bdf8;">linkedin.com/in/ngoctuan653</a><br>
Location: Hanoi, Vietnam
        `, 'info');
        break;

      case 'whoami':
        if (isVi) {
          appendLine(`Chu Tuấn Ngọc (Chu Tuan Ngoc) - Lập trình viên Mobile &amp; Backend đam mê kiến trúc chịu tải cao và trải nghiệm ứng dụng di động mượt mà.`, 'info');
        } else {
          appendLine(`Chu Tuấn Ngọc (Chu Tuan Ngoc) - Mobile &amp; Backend Developer passionate about high-concurrency systems and fluid mobile experiences.`, 'info');
        }
        break;

      case 'resume':
      case 'cv':
        appendLine(isVi ? `Đang mở trình xem CV...` : `Opening Resume viewer...`, 'success');
        openModal();
        break;

      case 'sudo hire':
      case 'hire':
        if (isVi) {
          appendLine(`
<span style="color: #22c55e;">[TRUY CẬP ĐƯỢC CHẤP THUẬN]</span> 🚀 Quy trình tuyển dụng bắt đầu!<br>
Cảm ơn bạn! Hãy gửi email tới <a href="mailto:ngoctuan653@gmail.com" style="color: #38bdf8; text-decoration: underline;">ngoctuan653@gmail.com</a> hoặc kết nối qua LinkedIn để cùng trao đổi các bước tiếp theo.
          `, 'success');
        } else {
          appendLine(`
<span style="color: #22c55e;">[ACCESS GRANTED]</span> 🚀 Offer initiated!<br>
Thank you! Please send a ping to <a href="mailto:ngoctuan653@gmail.com" style="color: #38bdf8; text-decoration: underline;">ngoctuan653@gmail.com</a> or connect on LinkedIn to discuss next steps.
          `, 'success');
        }
        break;

      case 'clear':
      case 'cls':
        cliScreen.innerHTML = '';
        break;

      case 'date':
        appendLine(new Date().toString(), 'info');
        break;

      default:
        if (isVi) {
          appendLine(`lệnh không tồn tại: <em>${escapeHtml(cmd)}</em>. Gõ '<span style="color: #38bdf8;">help</span>' để xem danh sách lệnh.`, 'system');
        } else {
          appendLine(`command not found: <em>${escapeHtml(cmd)}</em>. Type '<span style="color: #38bdf8;">help</span>' for available commands.`, 'system');
        }
        break;
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

/* ==========================================================================
   7. RESUME MODAL
   ========================================================================== */
function initModal() {
  const modal = document.getElementById('cv-modal');
  const openBtns = [
    document.getElementById('open-cv-btn'),
    document.getElementById('nav-cv-btn')
  ].filter(Boolean);
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');

  window.openModal = function() {
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Esc key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ==========================================================================
   8. SCROLL EFFECTS & BACK TO TOP
   ========================================================================== */
function initScrollEffects() {
  const backTopBtn = document.getElementById('btn-back-top');
  if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fade-in observer for project cards and skill categories
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedCards = document.querySelectorAll('.project-card, .skill-category-card, .timeline-content');
  animatedCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease';
    fadeObserver.observe(card);
  });
}
