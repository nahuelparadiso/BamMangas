const lectura = JSON.parse(localStorage.getItem("bamLectura")) || [];

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById("lectura-list");
    const seleccionados = mangas.filter(m => lectura.includes(m.id));

    if (seleccionados.length === 0) {
      container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">Todavía no agregaste ningún manga a tu lista 📭</p>`;
      return;
    }

    seleccionados.forEach(manga => {
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
    console.error("Error al mostrar lectura:", err);
  });
