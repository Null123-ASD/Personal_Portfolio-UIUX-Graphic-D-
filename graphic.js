// graphic.js

const graphicItems = document.querySelectorAll(".graphic-item");

const graphicObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }

    });
  },
  {
    threshold: 0.15,
  }
);

graphicItems.forEach((item) => {
  graphicObserver.observe(item);
});