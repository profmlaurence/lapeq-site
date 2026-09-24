const header = document.getElementById('site-header');
const toggle = document.getElementById('menu-toggle');
const backToTop = document.getElementById('back-to-top');

// Menu mobile
function setMenu(open) {
    header.toggleAttribute('data-open', open);
    toggle.setAttribute('aria-expanded', open);
}
toggle.addEventListener('click', () => setMenu(!header.hasAttribute('data-open')));
document.querySelectorAll('#main-nav a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

// Sombra no header e botão "voltar ao topo" ao rolar
function onScroll() {
    header.toggleAttribute('data-scrolled', scrollY > 10);
    backToTop.toggleAttribute('data-visible', scrollY > 400);
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Destaca no menu a seção visível
const navLinks = document.querySelectorAll('[data-nav]');
const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            link.toggleAttribute('data-active', link.dataset.nav === entry.target.id);
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('[data-section]').forEach((section) => spy.observe(section));

// Filtro da galeria de infraestrutura
const filters = document.querySelectorAll('[data-filter]');
filters.forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.dataset.filter;
        filters.forEach((b) => b.toggleAttribute('data-active', b === button));
        document.querySelectorAll('[data-category]').forEach((item) => {
            item.toggleAttribute('data-hidden', value !== '*' && item.dataset.category !== value);
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    document.querySelectorAll('[data-lightbox]').forEach((button) => {
        button.addEventListener('click', () => {
            img.src = button.dataset.lightbox;
            img.alt = button.dataset.caption;
            caption.textContent = button.dataset.caption;
            lightbox.showModal();
        });
    });
    // Fecha ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.close();
    });
}

// Formulário de contato: abre o aplicativo de e-mail com a mensagem pronta
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const assunto = new URLSearchParams(location.search).get('assunto');
    if (assunto) contactForm.elements.assunto.value = assunto;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const f = contactForm.elements;
        const subject = f.assunto.value || 'Contato pelo site';
        const body = `${f.mensagem.value}\n\n--\n${f.nome.value}\n${f.email.value}`;
        location.href = `mailto:${contactForm.dataset.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}
