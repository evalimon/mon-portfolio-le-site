// Animation d'apparition au chargement
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("h1, h2, p, a, img");
  elements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(20px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }, 100 * index);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 60) {
      // Scrolling vers le bas, cacher la bande
      body.classList.add("scrolled");
    } else {
      // Scrolling vers le haut, montrer la bande
      body.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
});
