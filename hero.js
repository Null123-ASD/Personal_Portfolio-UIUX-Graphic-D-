document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Hero replay logic
  ========================= */
  const hero = document.querySelector(".hero");

  if (hero) {
    let hasPlayedInitialCopy = false;
    let canReplayBars = true;
    let heroInView = false;

    function resetBarsState() {
      hero.classList.remove("hero-bars-animate");

      const bars = hero.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.animation = "none";
        void bar.offsetHeight; // force reflow
        bar.style.animation = "";
      });
    }

    function playBarsAnimation() {
      if (!canReplayBars) return;

      canReplayBars = false;
      resetBarsState();
      hero.classList.add("hero-bars-animate");

      setTimeout(() => {
        canReplayBars = true;
      }, 1400);
    }

    function playInitialHero() {
      resetBarsState();
      hero.classList.add("hero-bars-animate");
      hero.classList.add("hero-copy-animate");

      setTimeout(() => {
        hero.classList.add("hero-copy-visible");
        hero.classList.remove("hero-copy-animate");
        hasPlayedInitialCopy = true;
      }, 1300);
    }

    requestAnimationFrame(() => {
      playInitialHero();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target !== hero) return;

          const isNowVisible =
            entry.isIntersecting && entry.intersectionRatio >= 0.6;

          if (isNowVisible && !heroInView) {
            heroInView = true;

            if (hasPlayedInitialCopy) {
              playBarsAnimation();
            }
          } else if (!isNowVisible) {
            heroInView = false;
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.6, 0.8, 1],
      }
    );

    observer.observe(hero);

    // 點 logo 回第一屏時也重播矩形
    const logo = document.querySelector(".logo");
    if (logo) {
      logo.addEventListener("click", () => {
        setTimeout(() => {
          playBarsAnimation();
        }, 250);
      });
    }

    // 如果有指向第一屏的連結（例如 href="#hero"）
    const heroLinks = document.querySelectorAll('a[href="#hero"], a[href="#top"]');
    heroLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          playBarsAnimation();
        }, 250);
      });
    });
  }

  /* =========================
     Projects slider logic
  ========================= */
  const slider = document.querySelector("[data-project-slider]");

  if (slider) {
    const slides = Array.from(slider.querySelectorAll("[data-slide]"));
    const prevBtn = slider.querySelector("[data-dir='prev']");
    const nextBtn = slider.querySelector("[data-dir='next']");

    let activeIndex = slides.findIndex((slide) =>
      slide.classList.contains("is-active")
    );
    if (activeIndex === -1) activeIndex = 1;

    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeIndex);
      });
    }

    prevBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + slides.length) % slides.length;
      updateSlides();
    });

    nextBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % slides.length;
      updateSlides();
    });

    slides.forEach((slide, index) => {
      const link = slide.querySelector(".project-slide-link");

      // 點非 active 卡片：只切換到中間，不跳走
      slide.addEventListener("click", (event) => {
        const clickedCta = event.target.closest(".project-slide-cta");
        const clickedLink = event.target.closest(".project-slide-link");

        if (!slide.classList.contains("is-active")) {
          event.preventDefault();
          activeIndex = index;
          updateSlides();
          return;
        }

        // active 卡片正常可點，不攔
        if (clickedCta || clickedLink) {
          return;
        }
      });

      // 如果你想保證 active 才能打開連結，可加這層保護
      link?.addEventListener("click", (event) => {
        if (!slide.classList.contains("is-active")) {
          event.preventDefault();
          activeIndex = index;
          updateSlides();
        }
      });
    });

    updateSlides();
  }


/* =========================
   ABOUT ME
========================= */
const aboutSection = document.querySelector(".about-section");

if (aboutSection) {
  let aboutInView = false;
  let aboutCooldown = false;

  function replayAboutVisual() {
    if (aboutCooldown) return;

    aboutCooldown = true;

    aboutSection.classList.remove("about-visual-animate");
    void aboutSection.offsetWidth; // force reflow
    aboutSection.classList.add("about-visual-animate");

    setTimeout(() => {
      aboutCooldown = false;
    }, 1100);
  }

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target !== aboutSection) return;

        const isNowVisible =
          entry.isIntersecting && entry.intersectionRatio >= 0.35;

        if (isNowVisible && !aboutInView) {
          aboutInView = true;
          replayAboutVisual();
        } else if (!isNowVisible) {
          aboutInView = false;
        }
      });
    },
    {
      threshold: [0, 0.2, 0.35, 0.5, 0.8],
    }
  );

  aboutObserver.observe(aboutSection);

  const aboutLinks = document.querySelectorAll('a[href="#about"]');
  aboutLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        replayAboutVisual();
      }, 350);
    });
  });
}

});

