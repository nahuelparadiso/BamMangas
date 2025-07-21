let todosLosMangas = [];

fetch('http://localhost:3000/mangas')
  .then(res => res.json())
  .then(mangas => {
    todosLosMangas = mangas;
    mostrarMangas(mangas);
    generarMenuGeneros(mangas);
  })
  .catch(err => {
    console.error("Error al cargar los mangas:", err);
  });

function mostrarMangas(lista) {
  const container = document.getElementById("manga-list");
  container.innerHTML = "";
  const favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

  lista.forEach(manga => {
    const isFav = favs.includes(manga.id);
    const card = document.createElement("div");
    card.classList.add("manga-card");

    card.innerHTML = `
      <div class="genre-badge">${manga.genero}</div>
      <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${manga.id}">★</button>
      <a href="pages/manga.html?id=${manga.id}">
        <img src="${manga.imagen}" alt="${manga.titulo}" onerror="this.src='assets/img/default.jpg'" />
        <h3>${manga.titulo.toUpperCase()}</h3>
      </a>
      <p class="descripcion">${manga.descripcion}</p>
    `;

    container.appendChild(card);
  });
}

function generarMenuGeneros(mangas) {
  const select = document.getElementById("filtro-genero");
  const generosUnicos = [...new Set(mangas.map(m => m.genero))].sort();

  generosUnicos.forEach(genero => {
    const option = document.createElement("option");
    option.value = genero;
    option.textContent = genero;
    select.appendChild(option);
  });
}

document.getElementById("filtro-genero").addEventListener("change", function () {
  const seleccion = this.value;
  if (seleccion === "") {
    mostrarMangas(todosLosMangas);
  } else {
    const filtrados = todosLosMangas.filter(m => m.genero === seleccion);
    mostrarMangas(filtrados);
  }
});

document.getElementById("manga-list").addEventListener("click", function (e) {
  if (e.target.classList.contains("fav-btn")) {
    const id = parseInt(e.target.dataset.id);
    const favs = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

    if (favs.includes(id)) {
      const updated = favs.filter(f => f !== id);
      localStorage.setItem("bamFavoritos", JSON.stringify(updated));
      e.target.classList.remove("active");
      mostrarAlertaFavorito("❌ Eliminado de favoritos");
    } else {
      favs.push(id);
      localStorage.setItem("bamFavoritos", JSON.stringify(favs));
      e.target.classList.add("active");
      mostrarAlertaFavorito("✅ Manga añadido a favoritos");
    }
  }
});

document.getElementById("busquedaManga").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const tarjetas = document.querySelectorAll(".manga-card");

  tarjetas.forEach(card => {
    const titulo = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = titulo.includes(query) ? "block" : "none";
  });
});

document.getElementById("busquedaManga").addEventListener("change", function () {
  const query = this.value.trim().toLowerCase();
  const tarjetas = document.querySelectorAll(".manga-card");

  for (const card of tarjetas) {
    const titulo = card.querySelector("h3").textContent.trim().toLowerCase();
    if (titulo === query) {
      const link = card.querySelector("a");
      if (link) {
        window.location.href = link.href;
      }
      break;
    }
  }
});

// ✅ Función visual para avisos al usuario
function mostrarAlertaFavorito(mensajeTexto) {
  const mensaje = document.createElement("div");
  mensaje.textContent = mensajeTexto;
  mensaje.style = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #3f86f7;
    color: white;
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    font-size: 0.9rem;
    z-index: 9999;
    animation: fadein 0.3s ease;
  `;
  document.body.appendChild(mensaje);

  setTimeout(() => {
    mensaje.style.opacity = "0";
  }, 1800);

  setTimeout(() => {
    mensaje.remove();
  }, 2400);
}
