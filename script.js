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