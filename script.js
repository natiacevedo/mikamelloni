/* Leer mas */

const toggleBtn = document.getElementById("toggle-btn");
const extraText = document.getElementById("extra-text");

toggleBtn.addEventListener("click", () => {
  extraText.classList.toggle("expanded");
  
  if (extraText.classList.contains("expanded")) {
    toggleBtn.textContent = "Leer menos";
  } else {
    toggleBtn.textContent = "Leer más";
  }
});

/* Animación de aparición al scroll */
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

/* Animación de aparición al cargar (solo banner) */
window.addEventListener("load", () => {
  document.querySelectorAll("#banner .fade-in").forEach(el => {
    el.classList.add("show");
  });
});

/* Carrusel Testimonios */
const carouselItems = document.querySelectorAll('#testimonios .carousel-item');
let maxHeight = 0;

carouselItems.forEach(item => {
  const h = item.scrollHeight;
  if (h > maxHeight) maxHeight = h;
});

carouselItems.forEach(item => {
  item.style.height = maxHeight + 'px';
});


/* Cards */

function setEqualHeight() {
    const cards = document.querySelectorAll('#intro .card, #intro .card2');
    // Reset heights
    cards.forEach(c => c.style.height = 'auto');

    if (window.innerWidth > 768) {
        let maxHeight = 0;
        cards.forEach(c => {
            if (c.offsetHeight > maxHeight) maxHeight = c.offsetHeight;
        });
        cards.forEach(c => c.style.height = maxHeight + 'px');
    }
}

// Ejecutar al cargar y al cambiar tamaño de ventana
window.addEventListener('load', setEqualHeight);
window.addEventListener('resize', setEqualHeight);
