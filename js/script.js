// Maestranza Union — interacciones del sitio
document.addEventListener('DOMContentLoaded', () => {

  // Revelado de secciones al hacer scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));

  // Nav lateral: progreso + rivete activo
  const rivets = document.querySelectorAll('#viga-nav .rivet');
  const sectionIds = ['inicio', 'nosotros', 'servicios', 'galeria', 'contacto'];
  const sections = sectionIds.map((id) => document.getElementById(id));
  const navFill = document.getElementById('nav-fill');
  const mobileBar = document.getElementById('mobile-bar');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (navFill) navFill.style.height = pct + '%';
    if (mobileBar) mobileBar.style.width = pct + '%';

    let currentIndex = 0;
    sections.forEach((sec, i) => {
      if (sec && sec.getBoundingClientRect().top - window.innerHeight / 2 < 0) {
        currentIndex = i;
      }
    });
    rivets.forEach((r, i) => r.classList.toggle('active', i === currentIndex));
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Formulario de contacto — envío real vía Formspree
  const form = document.getElementById('contact-form');
  if (form) {
    const btn = form.querySelector('.submit-btn');
    const note = document.getElementById('form-note');
    const originalBtnText = btn.textContent;
    const originalNoteText = note ? note.textContent : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          btn.textContent = 'Solicitud enviada ✓';
          if (note) note.textContent = 'Gracias, recibimos tu mensaje. Te responderemos dentro de 48 horas hábiles.';
          form.reset();
        } else {
          throw new Error('Respuesta no válida del servidor');
        }
      } catch (err) {
        btn.disabled = false;
        btn.textContent = originalBtnText;
        if (note) note.textContent = 'No pudimos enviar el mensaje. Escríbenos directo a contacto@maestranzaunion.cl';
      }
    });
  }
});
