const favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById("favoritos-list");
    const favoritos = mangas.filter(manga => favs.includes(manga.id));

    if (favoritos.length === 0) {
      container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">Todavía no marcaste ningún manga como favorito 🙁</p>`;
      return;
    }

    favoritos.forEach(manga => {
      const card = document.createElement("div");
      card.classList.add("manga-card");

      card.innerHTML = `
        <div class="genre-badge">${manga.genero}</div>
        <a href="manga.html?id=${manga.id}">
          <img src="../${manga.imagen}" alt="${manga.titulo}" onerror="this.src='assets/img/default.jpg'" />
          <h3>${manga.titulo}</h3>
        </a>
        <div class="hover-description">${manga.descripcion}</div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al cargar favoritos:", err);
  });
