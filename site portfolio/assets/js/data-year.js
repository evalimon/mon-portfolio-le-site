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

  // Réinitialiser la galerie
  gallery.innerHTML = "";

  // Afficher les projets par année
  Object.keys(groupedProjects)
    .sort((a, b) => b - a) // Trier les années du plus récent au plus ancien
    .forEach(year => {
      // Créer une carte pour l'année
      const yearCard = document.createElement("div");
      yearCard.classList.add("project-card", "year-card"); // Utilise les mêmes styles que les projets
      yearCard.setAttribute("data-year", year);

      // Ajouter le contenu de la carte de l'année
      const yearContent = document.createElement("div");
      yearContent.classList.add("project-title");
      yearContent.textContent = `Année ${year}`;
      yearCard.appendChild(yearContent);

      // Ajouter la carte de l'année à la galerie
      gallery.appendChild(yearCard);

      // Ajouter les projets de l'année
      groupedProjects[year].forEach(project => gallery.appendChild(project));
    });
});