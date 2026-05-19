document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const nav = document.querySelector("header nav");
  const menuToggle = document.querySelector(".menu_toggle");

  if (header) {
    const updateSticky = function () {
      header.classList.toggle("sticky", window.scrollY > 0);
    };

    updateSticky();
    window.addEventListener("scroll", updateSticky);
  }

  if (!nav || !menuToggle) {
    return;
  }

  const setMenuOpen = function (isOpen) {
    nav.classList.toggle("active", isOpen);
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  menuToggle.addEventListener("click", function () {
    setMenuOpen(!nav.classList.contains("active"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });
});
