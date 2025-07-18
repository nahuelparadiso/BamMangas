fetch('./data/mangas.json')
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById("manga-list");
    const favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

    mangas.forEach(manga => {
      const isFav = favs.includes(manga.id);
      const card = document.createElement("div");
      card.classList.add("manga-card");

      card.innerHTML = `
        <div class="genre-badge">${manga.genero}</div>
        <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${manga.id}">★</button>
        <a href="pages/manga.html?id=${manga.id}">
          <img src="${manga.imagen}" alt="${manga.titulo}" onerror="this.src='assets/img/default.jpg'" />
          <h3>${manga.titulo}</h3>
        </a>
        <div class="hover-description">${manga.descripcion}</div>
      `;

      container.appendChild(card);
    });

    // Evento para marcar/desmarcar favoritos
    container.addEventListener("click", function (e) {
      if (e.target.classList.contains("fav-btn")) {
        const id = parseInt(e.target.dataset.id);
        const favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

        if (favs.includes(id)) {
          // quitar favorito
          const updated = favs.filter(f => f !== id);
          localStorage.setItem("bamFavoritos", JSON.stringify(updated));
          e.target.classList.remove("active");
        } else {
          // agregar favorito
          favs.push(id);
          localStorage.setItem("bamFavoritos", JSON.stringify(favs));
          e.target.classList.add("active");
        }
      }
    });
  })
  .catch(err => {
    console.error("Error al cargar los mangas:", err);
  });
