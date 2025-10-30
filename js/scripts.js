// Mobile nav toggle
(function () {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
    }
})();

// Current year in footer
(function () {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();

// Simple i18n: EN and Traditional Chinese
(function () {
    var dict = {
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.portfolio': 'Portfolio',
            'nav.cv': 'CV',
            'nav.contact': 'Contact',
            'home.hero_title': 'Designer / Developer crafting clean, human-centered experiences',
            'home.hero_sub': 'I build reliable products with attention to detail and a focus on measurable outcomes. Explore selected work, learn more about me, or get in touch.',
            'home.view_portfolio': 'View Portfolio',
            'home.download_cv': 'Download CV',
            'home.highlights': 'Highlights',
            'home.card1_t': 'Performance-minded',
            'home.card1_d': 'Optimizing for speed and accessibility to reach everyone, everywhere.',
            'home.card2_t': 'End-to-end delivery',
            'home.card2_d': 'From discovery and prototyping to deployment and iteration.',
            'home.card3_t': 'Collaborative',
            'home.card3_d': 'Clear communication and pragmatic solutions that align with business goals.',
            'footer.rights': 'All rights reserved.',
            'footer.linkedin': 'LinkedIn',
            'footer.github': 'GitHub',
            'footer.email': 'Email',
            'about.title': 'About',
            'about.summary': 'Final-year student pursuing a Bachelor of Engineering (Hons) in Electronic Systems and Internet-of-Things at The Hong Kong Polytechnic University. Experienced in developing IoT solutions and electronic systems, with projects including a LoRa Localization System, Web Development, and Arduino Car.',
            'about.skills': 'Skills',
            'about.approach': 'Approach',
            'about.approach_d': 'I collaborate closely with stakeholders to define goals, validate assumptions, and deliver value iteratively. I prefer data-informed decisions with a bias for simplicity.',
            'portfolio.title': 'Portfolio',
            'contact.title': 'Contact',
            'contact.intro': 'Have a project or a question? I usually respond within 24–48 hours.',
            'contact.email_me': 'Email me',
            'contact.copy_email': 'Copy email',
            'contact.name': 'Name',
            'contact.your_email': 'Your Email',
            'contact.subject': 'Subject',
            'contact.message': 'Message',
            'contact.open_email_app': 'Open email app',
            'contact.reset': 'Reset',
            'contact.note': 'This form opens your mail app with a pre-filled email. For hosted forms, we can integrate a service later.'
        },
        'zh-Hant': {
            'nav.home': '首頁',
            'nav.about': '關於我',
            'nav.portfolio': '作品集',
            'nav.cv': '履歷',
            'nav.contact': '聯絡',
            'home.hero_title': '以人為本的設計與開發',
            'home.hero_sub': '專注細節與可衡量成果，打造可靠產品。歡迎瀏覽作品、了解我，或與我聯繫。',
            'home.view_portfolio': '查看作品集',
            'home.download_cv': '下載履歷',
            'home.highlights': '重點特色',
            'home.card1_t': '重視效能',
            'home.card1_d': '優化速度與無障礙，讓更多人順暢使用。',
            'home.card2_t': '端到端交付',
            'home.card2_d': '從探索、原型到上線與持續優化。',
            'home.card3_t': '團隊協作',
            'home.card3_d': '清晰溝通，務實解決方案，貼合業務目標。',
            'footer.rights': '保留所有權利。',
            'footer.linkedin': 'LinkedIn',
            'footer.github': 'GitHub',
            'footer.email': '電郵',
            'about.title': '關於我',
            'about.summary': '香港理工大學 電子系統與物聯網 工學士（榮譽）應屆生。具備物聯網與電子系統開發經驗，專案包含 LoRa 定位系統、網頁開發與 Arduino 小車。',
            'about.skills': '技能',
            'about.approach': '工作方式',
            'about.approach_d': '與利害關係人緊密合作，設定目標、驗證假設並逐步交付，偏好以數據為本並追求簡潔。',
            'portfolio.title': '作品集',
            'contact.title': '聯絡我',
            'contact.intro': '有專案或問題嗎？通常會在 24–48 小時內回覆。',
            'contact.email_me': '寄電郵給我',
            'contact.copy_email': '複製電郵',
            'contact.name': '姓名',
            'contact.your_email': '你的電郵',
            'contact.subject': '主旨',
            'contact.message': '訊息',
            'contact.open_email_app': '開啟郵件程式',
            'contact.reset': '重設',
            'contact.note': '此表單會開啟你的郵件程式並帶入內容；若需要雲端表單可再整合。'
        }
    };

    function applyI18n(locale) {
        var strings = dict[locale] || dict.en;
        document.documentElement.lang = locale === 'zh-Hant' ? 'zh-Hant' : 'en';
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (key && strings[key]) el.textContent = strings[key];
        });
        var select = document.getElementById('lang-switch');
        if (select) select.value = locale;
        try { localStorage.setItem('locale', locale); } catch (e) {}
    }

    var saved = null;
    try { saved = localStorage.getItem('locale'); } catch (e) {}
    applyI18n(saved || 'en');

    document.addEventListener('change', function (e) {
        var t = e.target;
        if (t && t.id === 'lang-switch') {
            applyI18n(t.value);
        }
    });
})();

// Contact helpers: copy email and compose mailto from form
(function () {
    var copyBtn = document.getElementById('copy-email');
    var toast = document.getElementById('toast');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var email = copyBtn.getAttribute('data-email') || '';
            navigator.clipboard && navigator.clipboard.writeText(email).then(function () {
                if (toast) {
                    toast.textContent = 'Email copied: ' + email;
                    toast.hidden = false;
                    setTimeout(function () { if (toast) toast.hidden = true; }, 1800);
                }
            });
        });
    }

    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = (document.getElementById('name') || {}).value || '';
            var fromEmail = (document.getElementById('fromEmail') || {}).value || '';
            var subject = (document.getElementById('subject') || {}).value || '';
            var message = (document.getElementById('message') || {}).value || '';

            var to = 'lamchakfung01@gmail.com';
            var fullSubject = encodeURIComponent(subject);
            var body = encodeURIComponent('From: ' + name + ' <' + fromEmail + '>' + '\n\n' + message);
            var url = 'mailto:' + to + '?subject=' + fullSubject + '&body=' + body;
            window.location.href = url;
        });
    }
})();

// CV password gate
(function () {
    var lock = document.getElementById('cv-lock');
    var content = document.getElementById('cv-content');
    var btn = document.getElementById('cv-unlock');
    if (!lock || !content || !btn) return;
    var passEncoded = btoa(lock.getAttribute('data-pass') || '');
    btn.addEventListener('click', function () {
        var input = document.getElementById('cv-pass');
        var ok = input && btoa(input.value) === passEncoded;
        if (ok) {
            content.hidden = false;
            lock.style.display = 'none';
        } else {
            if (input) input.value = '';
            alert('Incorrect password');
        }
    });
})();

// Scroll reveal animations (respects reduced motion)
(function () {
    var prefersReduced = false;
    try { prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var selectors = [
        '.hero-copy',
        '.hero-media',
        '.cards .card',
        '.grid.projects .project-card',
        '.quote-card',
        '.section-title',
        '.split > *',
        '.contact-form',
    ];
    var elements = Array.prototype.slice.call(document.querySelectorAll(selectors.join(',')));
    elements.forEach(function (el) { el.classList.add('reveal'); });

    if (prefersReduced) {
        elements.forEach(function (el) { el.classList.add('active'); });
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('active');
                io.unobserve(e.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

    elements.forEach(function (el) { io.observe(el); });
})();

// Golden Quotes rotator
(function () {
    var elText = document.getElementById('quote-text');
    var elAuthor = document.getElementById('quote-author');
    var elImg = document.getElementById('quote-img');
    if (!elText || !elAuthor) return;
    var prefersReduced = false;
    try { prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

    var quotes = [
        { t: 'When something is important enough, you do it even if the odds are not in your favor.', a: 'Elon Musk', img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Elon_Musk_-_The_Summit_2013.jpg' }
    ];
    var i = 0;
    var defaultImg = 'images/Elon-Musk-2022.webp';
    function render() {
        var q = quotes[i % quotes.length];
        elText.textContent = '"' + q.t + '"';
        elAuthor.textContent = '— ' + q.a;
        if (elImg) {
            var url = q.img || defaultImg;
            elImg.style.backgroundImage = 'url(' + url + ')';
        }
    }
    render();
    if (prefersReduced) return;
    // Only one quote: no auto-rotation needed.
})();





