document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------
     SOBRE MI
     --------------------------- */
  const sobreBtn = document.getElementById('toggle-btn');
  const sobreExtra = document.getElementById('extra-text');

  if (sobreBtn && sobreExtra) {
    // texto inicial según estado
    sobreBtn.textContent = sobreExtra.classList.contains('expanded') ? 'Leer menos' : 'Leer más';

    sobreBtn.addEventListener('click', () => {
      sobreExtra.classList.toggle('expanded');
      sobreBtn.textContent = sobreExtra.classList.contains('expanded') ? 'Leer menos' : 'Leer más';
    });
  }

  /* ---------------------------
     CARDS con Bootstrap collapse
     solo reaccionamos a eventos de Bootstrap
     --------------------------- */
  document.querySelectorAll('.toggle-btn[data-bs-toggle="collapse"]').forEach(btn => {
    const targetSelector = btn.getAttribute('data-bs-target') || btn.dataset.bsTarget;
    if (!targetSelector) return;

    const collapseEl = document.querySelector(targetSelector);
    if (!collapseEl) return;

    // estado inicial
    btn.textContent = collapseEl.classList.contains('show') ? 'Leer menos' : 'Leer más';

    collapseEl.addEventListener('shown.bs.collapse', () => {
      document.querySelectorAll(`[data-bs-target="${targetSelector}"]`).forEach(b => {
        b.textContent = 'Leer menos';
        b.setAttribute('aria-expanded', 'true');
      });
    });

    collapseEl.addEventListener('hidden.bs.collapse', () => {
      document.querySelectorAll(`[data-bs-target="${targetSelector}"]`).forEach(b => {
        b.textContent = 'Leer más';
        b.setAttribute('aria-expanded', 'false');
      });
    });
  });

  /* ---------------------------
     Animación aparición al scroll
     --------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll("section:not(#banner) .fade-in").forEach(el => {
    observer.observe(el);
  });

  /* ---------------------------
     Animación de aparición al cargar (solo banner)
     --------------------------- */
  window.addEventListener("load", () => {
    document.querySelectorAll("#banner .fade-in").forEach(el => {
      el.classList.add("show");
    });
  });

  function ajustarAlturaCarousel() {
  const items = document.querySelectorAll("#testimonios .carousel-item");
  let maxHeight = 0;

  items.forEach(item => {
    // Guardamos estilos originales
    const originalDisplay = item.style.display;
    const originalVisibility = item.style.visibility;

    // Hacer visible temporalmente para medir
    item.style.display = 'block';
    item.style.visibility = 'hidden';
    item.style.height = 'auto'; // reset altura

    const h = item.offsetHeight;
    if (h > maxHeight) maxHeight = h;

    // Restaurar estilos
    item.style.display = originalDisplay;
    item.style.visibility = originalVisibility;
  });

  // Aplicar altura máxima solo si es desktop
  if (window.innerWidth > 768) {
    items.forEach(item => {
      item.style.height = maxHeight + 'px';
    });
  } else {
    // En móvil: altura automática
    items.forEach(item => {
      item.style.height = 'auto';
    });
  }
}

window.addEventListener('load', ajustarAlturaCarousel);
window.addEventListener('resize', ajustarAlturaCarousel);


  /* ---------------------------
     Cards (igualar alturas en #intro)
     --------------------------- */
  function setEqualHeight() {
    const cards = document.querySelectorAll('#intro .card, #intro .card2');
    // reset heights
    cards.forEach(c => c.style.height = 'auto');

    if (window.innerWidth > 768) {
      let maxH = 0;
      cards.forEach(c => {
        if (c.offsetHeight > maxH) maxH = c.offsetHeight;
      });
      cards.forEach(c => c.style.height = maxH + 'px');
    }
  }

  window.addEventListener('load', setEqualHeight);
  window.addEventListener('resize', setEqualHeight);

});

/* ---------------------------
   FORM CONFIRMACIÓN LOCAL
   --------------------------- */
const contactForm = document.querySelector('form[name="contact"]');
const successMsg = document.getElementById('form-success');

if (contactForm && successMsg) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      contactForm.reset();
      successMsg.classList.remove('d-none');
      successMsg.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      alert("Hubo un error al enviar el formulario. Por favor intentá de nuevo.");
    }
  });
}