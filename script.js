const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.getElementById("year");

/* Dynamic copyright year */

if (year) {
  year.textContent = new Date().getFullYear();
}

/* Sticky header effect */

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
};

setHeaderState();

window.addEventListener("scroll", setHeaderState, {
  passive: true
});

/* Mobile navigation */

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );
    });
  });
}

/* Highlight the current navigation section */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

const updateActiveNav = () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top <= 150) {
      current = section.id;
    }
  });

  navItems.forEach((item) => {
    const isCurrent =
      item.getAttribute("href") === `#${current}`;

    item.setAttribute(
      "aria-current",
      isCurrent ? "page" : "false"
    );
  });
};

updateActiveNav();

window.addEventListener("scroll", updateActiveNav, {
  passive: true
});

/* Scroll reveal animations */

const revealTargets = document.querySelectorAll(
  ".section-heading, .experience-item, .activity-card, .education-card, .skill-block, .contact-inner"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealTargets.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}
