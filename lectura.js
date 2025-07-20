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
      card.setAttribute("id", `card-${manga.id}`);

      card.innerHTML = `
        <a href="manga.html?id=${manga.id}">
          <div style="text-align: center; margin-top: 6px;">
            <div class="genre-badge">${manga.genero}</div>
          </div>
          <img src="../${manga.imagen}" alt="${manga.titulo}" onerror="this.src='assets/img/default.jpg'" />
          <h3>${manga.titulo}</h3>
        </a>
        <p class="descripcion">${manga.descripcion}</p>
        <button class="btn-quitar" onclick="quitarLectura(${manga.id})">❌ Quitar de lectura</button>
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

function quitarLectura(id) {
  let lectura = JSON.parse(localStorage.getItem("bamLectura")) || [];
  lectura = lectura.filter(mangaId => mangaId !== id);
  localStorage.setItem("bamLectura", JSON.stringify(lectura));

  const card = document.getElementById(`card-${id}`);
  if (card) card.remove();

  const mensaje = document.createElement("div");
  mensaje.textContent = "✅ Manga eliminado";
  mensaje.className = "toast";
  document.body.appendChild(mensaje);

  setTimeout(() => mensaje.remove(), 2500);
}
