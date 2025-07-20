const favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById("favoritos-list");
    const favoritos = mangas.filter(manga => favs.includes(manga.id));

    if (favoritos.length === 0) {
      container.innerHTML = `
        <p style="grid-column: 1 / -1; text-align: center; font-size: 1.1rem; color: #666;">
          🙁 Todavía no marcaste ningún manga como favorito
        </p>`;
      return;
    }

    favoritos.forEach(manga => {
      const card = document.createElement("div");
      card.classList.add("manga-card");
      card.setAttribute("id", `card-${manga.id}`); // ID único

      card.innerHTML = `
  <a href="manga.html?id=${manga.id}">
    <div style="text-align: center; margin-top: 6px;">
      <div class="genre-badge">🌟 ${manga.genero}</div>
    </div>
    <img src="../${manga.imagen}" alt="${manga.titulo}" onerror="this.src='assets/img/default.jpg'" />
    <h3>${manga.titulo}</h3>
  </a>
  <div class="hover-description">${manga.descripcion}</div>
  <button class="btn-quitar" onclick="quitarFavorito(${manga.id})">❌ Quitar de favoritos</button>
`;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al cargar favoritos:", err);
    document.getElementById("favoritos-list").innerHTML = `
      <p style="text-align: center; color: crimson;">
        ❌ Error al cargar la lista de favoritos
      </p>
    `;
  });

// 🔧 Función para quitar manga favorito sin recarga
function quitarFavorito(id) {
  let favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];
  favs = favs.filter(mangaId => mangaId !== id);
  localStorage.setItem("bamFavoritos", JSON.stringify(favs));

  // Eliminar del DOM
  const card = document.getElementById(`card-${id}`);
  if (card) card.remove();

  // Mensaje visual
  const mensaje = document.createElement("div");
  mensaje.textContent = "✅ Manga eliminado";
  mensaje.className = "toast";
  document.body.appendChild(mensaje);

  setTimeout(() => mensaje.remove(), 2500);
}
