fetch('./data/mangas.json')
  .then(res => res.json())
  .then(mangas => {
    const container = document.getElementById("manga-list");

    mangas.forEach(manga => {
      const card = document.createElement("div");
      card.classList.add("manga-card");
      card.innerHTML = `
        <a href="pages/manga.html?id=${manga.id}">
          <img src="${manga.cover}" alt="${manga.title}" />
          <h3>${manga.title}</h3>
        </a>
        <p>${manga.genre}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error al cargar los mangas:", err);
  });
