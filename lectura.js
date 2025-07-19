const lectura = JSON.parse(localStorage.getItem("bamLectura")) || [];

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById("lectura-list");
    const seleccionados = mangas.filter(m => lectura.includes(m.id));

    if (seleccionados.length === 0) {
      container.innerHTML = `
        <p style="grid-column: 1 / -1; text-align: center; font-size: 1.1rem; color: #666;">
          📭 Todavía no agregaste ningún manga a tu lista de lectura
        </p>
      `;
      return;
    }

    seleccionados.forEach(manga => {
      const card = document.createElement("div");
      card.classList.add("manga-card");

      card.innerHTML = `
        <a href="manga.html?id=${manga.id}">
          <img src="../${manga.imagen}" alt="${manga.titulo}" onerror="this.src='assets/img/default.jpg'" />
          <h3>${manga.titulo}</h3>
        </a>
        <p class="descripcion">${manga.descripcion}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al mostrar lectura:", err);
    document.getElementById("lectura-list").innerHTML = `
      <p style="text-align: center; color: crimson;">
        ❌ Error al cargar la lista de lectura
      </p>
    `;
  });
