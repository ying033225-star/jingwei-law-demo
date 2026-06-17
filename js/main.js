(function() {
  'use strict';

  /* =============================================
     1. PRACTICE AREAS DATA
     ============================================= */
  const practicesData = [
    {
      icon: '<i class="fas fa-gavel"></i>',
      cn: { title: '民商事诉讼', desc: '合同纠纷、债权债务、房产纠纷、股权争议等各类民商事案件的诉讼与仲裁代理。' },
      en: { title: 'Civil & Commercial Litigation', desc: 'Contract disputes, debt recovery, real estate, equity disputes, and other civil & commercial litigation and arbitration.' }
    },
    {
      icon: '<i class="fas fa-shield-alt"></i>',
      cn: { title: '刑事辩护', desc: '侦查阶段介入、审查起诉、庭审辩护，全流程维护犯罪嫌疑人、被告人的合法权益。' },
      en: { title: 'Criminal Defense', desc: 'Full-process criminal defense from investigation through trial, protecting the rights of suspects and defendants.' }
    },
    {
      icon: '<i class="fas fa-building"></i>',
      cn: { title: '公司法务', desc: '公司设立、股权架构、合规审查、合同管理、投资并购、常年法律顾问服务。' },
      en: { title: 'Corporate Law', desc: 'Company formation, equity structure, regulatory compliance, contract management, M&A, and general corporate counsel.' }
    },
    {
      icon: '<i class="fas fa-heart"></i>',
      cn: { title: '婚姻家事', desc: '离婚诉讼、财产分割、子女抚养、遗产继承、家庭财富规划与传承。' },
      en: { title: 'Family Law', desc: 'Divorce proceedings, property division, child custody, inheritance, and family wealth planning.' }
    },
    {
      icon: '<i class="fas fa-copyright"></i>',
      cn: { title: '知识产权', desc: '商标注册与维权、专利申请、著作权保护、商业秘密及不正当竞争纠纷。' },
      en: { title: 'Intellectual Property', desc: 'Trademark registration and enforcement, patent applications, copyright protection, and trade secret disputes.' }
    },
    {
      icon: '<i class="fas fa-handshake"></i>',
      cn: { title: '劳动与雇佣', desc: '劳动合同纠纷、工伤赔偿、遣散费、竞业限制、集体劳动争议处理。' },
      en: { title: 'Employment Law', desc: 'Employment contract disputes, workers\' compensation, severance, non-compete agreements, and workplace disputes.' }
    }
  ];

  /* =============================================
     2. TEAM DATA
     ============================================= */
  const teamData = [
    {
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      cn: { name: '张明远', title: '主任律师 / 创始合伙人', practices: '民商事诉讼, 公司法务', bio: '多伦多大学法学院法学博士（JD），安大略省律师协会会员，执业25年。曾任安省律师公会民事诉讼法委员会成员，办理重大疑难案件逾300件。' },
      en: { name: 'Zhang Mingyuan', title: 'Managing Partner / Founder', practices: 'Civil Litigation, Corporate Law', bio: 'JD from the University of Toronto Faculty of Law. Member of the Law Society of Ontario. 25 years of experience handling over 300 complex cases.' }
    },
    {
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      cn: { name: '李芳华', title: '合伙人律师', practices: '刑事辩护, 婚姻家事', bio: '约克大学奥斯古德法学院法学博士（JD），执业18年。专注刑事辩护与婚姻家事领域，安大略省法律援助计划认可律师。' },
      en: { name: 'Li Fanghua', title: 'Partner', practices: 'Criminal Defense, Family Law', bio: 'JD from Osgoode Hall Law School, York University. 18 years of practice in criminal defense and family law. Certified Legal Aid Ontario panel member.' }
    },
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      cn: { name: '王梓睿', title: '执业律师', practices: '公司法务, 知识产权', bio: '英属哥伦比亚大学法学院法学博士（JD），执业8年。曾为多家科技及上市公司提供法律顾问服务，擅长知识产权布局与跨境商业纠纷。' },
      en: { name: 'Wang Zirui', title: 'Associate', practices: 'Corporate Law, Intellectual Property', bio: 'JD from the University of British Columbia, Peter A. Allard School of Law. 8 years of experience advising tech companies and listed corporations.' }
    }
  ];

  let currentLang = 'zh';

  /* =============================================
     3. LANGUAGE SWAP
     ============================================= */
  function swapLanguage(lang) {
    try {
      // Step 1: Swap text content FIRST (before changing data-lang)
      var elList = document.querySelectorAll('[data-cn]');
      for (var i = 0; i < elList.length; i++) {
        try {
          var el = elList[i];
          if (el.nodeType === 1 && el.hasAttribute('data-en')) {
            el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-cn');
          }
        } catch(innerErr) {}
      }
      
      // Step 2: Update CSS language attribute (for Chinese typography)
      document.documentElement.setAttribute('data-lang', lang);
      
      // Step 3: Update button text
      var btn = document.getElementById('langToggle');
      if (btn) btn.textContent = lang === 'en' ? '中' : 'EN';
      
      // Step 4: Save current language
      currentLang = lang;
      
      // Step 5: Force re-render dynamic sections
      renderPractices();
      renderTeam();
    } catch(e) {
      currentLang = lang;
    }
  }

  /* =============================================
     4. RENDER DYNAMIC SECTIONS
     ============================================= */
  function renderPractices() {
    const grid = document.querySelector('.practices__grid');
    if (!grid) return;
    grid.innerHTML = practicesData.map(p => {
      const t = currentLang === 'en' ? p.en : p.cn;
      return `<div class="practice__card">
        <div class="practice__icon">${p.icon}</div>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
      </div>`;
    }).join('');
    // Re-observe new cards
    observeCards();
  }

  function renderTeam() {
    const grid = document.querySelector('.team__grid');
    if (!grid) return;
    grid.innerHTML = teamData.map(m => {
      const t = currentLang === 'en' ? m.en : m.cn;
      return `<div class="team__card">
        <img class="team__card-img" src="${m.img}" alt="${t.name}" loading="lazy">
        <div class="team__card-body">
          <div class="team__card-name">${currentLang === 'en' ? m.en.name : m.cn.name}</div>
          <div class="team__card-enname">${currentLang === 'en' ? '' : m.en.name}</div>
          <div class="team__card-title">${t.title}</div>
          <div class="team__card-practices">${t.practices.split(',').map(s => `<span>${s.trim()}</span>`).join('')}</div>
          <p class="team__card-bio">${t.bio}</p>
        </div>
      </div>`;
    }).join('');
    observeCards();
  }

  function setLanguage(lang) {
    swapLanguage(lang);
    renderPractices();
    renderTeam();
  }

  /* =============================================
     5. SCROLL PROGRESS BAR
     ============================================= */
  const progressBar = document.getElementById('progressBar');
  function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  /* =============================================
     6. BACK TO TOP
     ============================================= */
  const backToTop = document.getElementById('backToTop');
  function handleBackToTop() {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =============================================
     7. PARALLAX (hero background)
     ============================================= */
  const heroBg = document.querySelector('.hero__bg');
  let ticking = false;

  function updateParallax() {
    if (!heroBg) return;
    const scrolled = window.scrollY;
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    const heroHeight = heroSection.offsetHeight;
    // Only apply parallax while hero is in view
    if (scrolled <= heroHeight) {
      heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0) scale(1.05)`;
    }
  }

  /* =============================================
     8. COUNTER ANIMATION
     ============================================= */
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const counters = document.querySelectorAll('.stat__num');
    counters.forEach(counter => {
      const text = counter.textContent;
      const match = text.match(/(\d+)(\+?)/);
      if (!match) return;

      const target = parseInt(match[1]);
      const suffix = match[2] || '';
      const duration = 1200;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        counter.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target + suffix;
        }
      }
      requestAnimationFrame(step);
    });
  }

  // Watch for stats section
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about__stats');
  if (statsSection) counterObserver.observe(statsSection);

  /* =============================================
     9. SCROLL LISTENER (debounced with rAF)
     ============================================= */
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgressBar();
        handleBackToTop();
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  // Initial calls
  updateProgressBar();
  handleBackToTop();

  /* =============================================
     10. NAVIGATION
     ============================================= */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  let isNavOpen = false;

  function handleNavScroll() {
    navbar.classList.toggle('nav--scrolled', window.scrollY > 80);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  navToggle.addEventListener('click', function() {
    isNavOpen = !isNavOpen;
    navMenu.classList.toggle('open', isNavOpen);
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function() {
      isNavOpen = false;
      navMenu.classList.remove('open');
    });
  });

  // Active link — page-aware (sub-pages) or scroll-based (index)
  const navLinks = document.querySelectorAll('.nav__link');
  const isSubPage = !window.location.href.includes('index.html') && !window.location.pathname.endsWith('/');

  function updateActiveLink() {
    if (isSubPage) {
      // On sub-pages: highlight based on current URL
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
      });
    } else {
      // On index: scroll-based section highlighting
      let current = '';
      const scrollPos = window.scrollY + 150;
      document.querySelectorAll('.section, .hero').forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) current = section.getAttribute('id') || '';
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* =============================================
     11. CARD SCROLL REVEAL (staggered)
     ============================================= */
  let cardObserver = null;

  function observeCards() {
    // Disconnect previous observer if re-observing
    if (cardObserver) cardObserver.disconnect();

    cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Apply delay based on nth-child position
          const cards = entry.target.parentElement.children;
          let idx = 0;
          for (let i = 0; i < cards.length; i++) {
            if (cards[i] === entry.target) { idx = i; break; }
          }
          entry.target.style.setProperty('--stagger-delay', `${idx * 0.1}s`);
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.practice__card, .whyus__card, .team__card, .testimonial__card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
      el.style.transitionDelay = 'var(--stagger-delay, 0s)';
      cardObserver.observe(el);
    });
  }

  /* =============================================
     12. CONTACT FORM
     ============================================= */
  function setupForm(formId, nameId, phoneId, msgId) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById(nameId).value.trim();
      const phone = document.getElementById(phoneId).value.trim();
      const msg = document.getElementById(msgId).value.trim();

      if (!name) { alert('请填写您的姓名 / Please enter your name'); document.getElementById(nameId).focus(); return; }
      if (!phone) { alert('请填写联系电话 / Please enter your phone number'); document.getElementById(phoneId).focus(); return; }
      if (!msg) { alert('请简要描述您的情况 / Please describe your case'); document.getElementById(msgId).focus(); return; }

      const btn = form.querySelector('.form__submit');
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中 / Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> 已发送 / Sent!';
        form.reset();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2500);
      }, 1200);
    });
  }

  // Setup forms on all pages
  setupForm('contactForm', 'formName', 'formPhone', 'formMessage');
  setupForm('contactFormPage', 'formNamePage', 'formPhonePage', 'formMessagePage');

  /* =============================================
     13. INIT
     ============================================= */
  setLanguage('en');
  observeCards();

  document.getElementById('langToggle').addEventListener('click', function() {
    setLanguage(currentLang === 'en' ? 'zh' : 'en');
  });
})();
