let todosLosMangas = [];

fetch('./data/mangas.json')
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
    card.classList.add("manga-card"); // 🎯 Importante para que el buscador funcione

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
    } else {
      favs.push(id);
      localStorage.setItem("bamFavoritos", JSON.stringify(favs));
      e.target.classList.add("active");
    }
  }
});

// 🔍 Filtro visual mientras escribís (opcional, queda pro)
document.getElementById("busquedaManga").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const tarjetas = document.querySelectorAll(".manga-card");

  tarjetas.forEach(card => {
    const titulo = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = titulo.includes(query) ? "block" : "none";
  });
});

// 🚀 Redirección automática si el título coincide exactamente
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
