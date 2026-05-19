function initProjectFilters() {
  const grid = document.querySelector(".workGrid");
  const yearSelect = document.querySelector("[data-project-year]");
  const searchInput = document.querySelector("[data-project-search]");
  const count = document.querySelector("[data-project-count]");

  if (!grid || !yearSelect || !searchInput) {
    return;
  }

  const tiles = Array.from(grid.querySelectorAll(".tile"));

  const getYear = function (tile) {
    const yearText = tile.querySelector("h4")?.textContent || "";
    const match = yearText.match(/\d{4}/);
    return match ? Number(match[0]) : 0;
  };

  tiles
    .sort(function (a, b) {
      return getYear(b) - getYear(a);
    })
    .forEach(function (tile) {
      grid.appendChild(tile);
    });

  const years = Array.from(new Set(tiles.map(getYear).filter(Boolean))).sort(
    function (a, b) {
      return b - a;
    },
  );

  years.forEach(function (year) {
    const option = document.createElement("option");
    option.value = String(year);
    option.textContent = String(year);
    yearSelect.appendChild(option);
  });

  const applyFilters = function () {
    const selectedYear = yearSelect.value;
    const query = searchInput.value.trim().toLowerCase();
    const visibleTiles = [];

    tiles.forEach(function (tile) {
      const matchesYear =
        selectedYear === "all" || String(getYear(tile)) === selectedYear;
      const matchesQuery =
        !query || tile.textContent.toLowerCase().includes(query);
      const isVisible = matchesYear && matchesQuery;

      tile.classList.toggle("is-hidden", !isVisible);
      if (isVisible) {
        visibleTiles.push(tile);
      }
    });

    if (count) {
      const singular = count.dataset.countSingular || "project";
      const plural = count.dataset.countPlural || "projects";
      count.textContent =
        visibleTiles.length === 1
          ? "1 " + singular
          : visibleTiles.length + " " + plural;
    }

    if (typeof fadeIn === "function") {
      fadeIn();
    }
  };

  grid.addEventListener("click", function (event) {
    const projectTile = event.target.closest("[data-project-page]");

    if (!projectTile || event.target.closest("a, button")) {
      return;
    }

    window.location.href = projectTile.dataset.projectPage;
  });

  yearSelect.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
  applyFilters();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectFilters);
} else {
  initProjectFilters();
}
