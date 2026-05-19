function initProjectCardText() {
  const isEnglish = window.location.pathname.includes("_eng");
  const labels = isEnglish
    ? { expand: "Read more", collapse: "Show less" }
    : { expand: "Les mer", collapse: "Vis mindre" };

  document.querySelectorAll(".tile p").forEach(function (paragraph) {
    const textLength = paragraph.textContent.trim().length;

    if (textLength < 360 || paragraph.classList.contains("collapsibleText")) {
      return;
    }

    paragraph.classList.add("collapsibleText", "is-collapsed");

    const button = document.createElement("button");
    button.className = "textToggle";
    button.type = "button";
    button.textContent = labels.expand;
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", function (event) {
      event.stopPropagation();

      const isCollapsed = paragraph.classList.toggle("is-collapsed");
      button.textContent = isCollapsed ? labels.expand : labels.collapse;
      button.setAttribute("aria-expanded", String(!isCollapsed));

      if (typeof fadeIn === "function") {
        fadeIn();
      }
    });

    paragraph.insertAdjacentElement("afterend", button);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectCardText);
} else {
  initProjectCardText();
}
