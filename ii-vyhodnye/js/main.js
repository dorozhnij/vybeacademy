(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const reveals = document.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 }
    );
    reveals.forEach((el, i) => {
      // Hero content should appear immediately
      if (el.closest(".hero")) {
        el.style.transitionDelay = `${(i % 6) * 70}ms`;
        el.classList.add("is-visible");
        return;
      }
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Only one FAQ open at a time on mobile for focus
  const faq = document.querySelector(".faq");
  if (faq) {
    faq.addEventListener("toggle", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) return;
      faq.querySelectorAll("details[open]").forEach((d) => {
        if (d !== target) d.open = false;
      });
    }, true);
  }
})();
