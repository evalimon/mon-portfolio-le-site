document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxContent = document.getElementById("lightbox-content");
  const images = document.querySelectorAll(".lightbox-image");
  const closeButton = document.querySelector(".close-btn");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  let currentIndex = 0;

  // Ouvrir la Lightbox
  const openLightbox = (index) => {
    currentIndex = index;
    const imageSrc = images[index].src;
    lightboxContent.src = imageSrc;
    lightbox.classList.remove("hidden");
  };

  // Fermer la Lightbox
  const closeLightbox = () => {
    lightbox.classList.add("hidden");
  };

  // Montrer l'image précédente
  const showPreviousImage = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxContent.src = images[currentIndex].src;
  };

  // Montrer l'image suivante
  const showNextImage = () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxContent.src = images[currentIndex].src;
  };

  // Attacher les événements aux images
  images.forEach((image, index) => {
    image.addEventListener("click", () => openLightbox(index));
  });

  // Attacher les événements aux boutons de navigation
  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", showPreviousImage);
  nextButton.addEventListener("click", showNextImage);

  // Fermer la Lightbox en cliquant à l'extérieur
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation au clavier
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "ArrowLeft") showPreviousImage();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "Escape") closeLightbox();
    }
  });
});

// organiser par année les projets dans la galerie
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".project-gallery");
  const projects = Array.from(gallery.querySelectorAll(".project-card"));

  // Trier les projets par année (du plus récent au plus ancien)
  projects.sort((a, b) => {
    const yearA = parseInt(a.getAttribute("data-year"), 10);
    const yearB = parseInt(b.getAttribute("data-year"), 10);
    return yearB - yearA; // Tri décroissant
  });

  // Grouper les projets par année
  const groupedProjects = projects.reduce((acc, project) => {
    const year = project.getAttribute("data-year");
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(project);
    return acc;
  }, {});

  // Afficher les projets par année
  Object.keys(groupedProjects)
    .sort((a, b) => b - a) // Trier les années du plus récent au plus ancien
    .forEach(year => {
      // Créer un conteneur pour chaque année
      const yearContainer = document.createElement("div");
      yearContainer.classList.add("year-container");

      // Ajouter un titre pour l'année
      const yearTitle = document.createElement("h2");
      yearTitle.textContent = year;
      yearTitle.classList.add("year-title");
      yearContainer.appendChild(yearTitle);

      // Ajouter les projets de l'année
      groupedProjects[year].forEach(project => yearContainer.appendChild(project));

      // Ajouter le conteneur de l'année à la galerie
      gallery.appendChild(yearContainer);
    });
});
