document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(
    ".project-overview-card, .approach-card, .next-step-card"
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => observer.observe(item));


  const gallery = document.querySelector('.showcase-gallery');
  let isDown = false;
  let startX;
  let scrollLeft;

  gallery.addEventListener('mousedown', (e) => {
      isDown = true;
      gallery.classList.add('active');
      // 使用 pageX 獲取絕對位置
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
  });

  gallery.addEventListener('mouseleave', () => {
      isDown = false;
      gallery.classList.remove('active');
  });

  gallery.addEventListener('mouseup', () => {
      isDown = false;
      gallery.classList.remove('active');
  });

  gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault(); 
      const x = e.pageX - gallery.offsetLeft;
      const walk = (x - startX) * 2; 
      gallery.scrollLeft = scrollLeft - walk;
  });
  
});


