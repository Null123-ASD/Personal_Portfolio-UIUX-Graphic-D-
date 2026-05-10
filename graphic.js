document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     FEATURED TOGGLE
  ========================== */
  const featuredToggle = document.querySelector(".featured-toggle");
  const featuredGrid = document.querySelector(".featured-grid");

  if (featuredToggle && featuredGrid) {
    featuredToggle.addEventListener("click", () => {
      featuredGrid.classList.toggle("expanded");
      featuredGrid.classList.toggle("collapsed");
      featuredToggle.classList.toggle("active");
    });
  }

  /* =========================
     MORE TOGGLE
  ========================== */
  const moreToggle = document.querySelector(".more-toggle");
  const masonryGrid = document.querySelector(".masonry-grid");

  if (moreToggle && masonryGrid) {
    moreToggle.addEventListener("click", () => {
      masonryGrid.classList.toggle("expanded");
      masonryGrid.classList.toggle("collapsed");
      moreToggle.classList.toggle("active");
    });
  }

  /* =========================
     HERO PARALLAX
  ========================== */
  const heroBanner = document.querySelector(".graphic-hero-banner");

  if (heroBanner) {
    const heroImg = heroBanner.querySelector("img");

    heroBanner.addEventListener("mousemove", (e) => {
      const rect = heroBanner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const moveX = (x / rect.width - 0.5) * 16;
      const moveY = (y / rect.height - 0.5) * 16;

      heroImg.style.transform = `scale(1.03) translate(${moveX}px, ${moveY}px)`;
    });

    heroBanner.addEventListener("mouseleave", () => {
      heroImg.style.transform = `scale(1) translate(0, 0)`;
    });
  }
});