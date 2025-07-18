const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get("id"));

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const manga = mangas.find(m => m.id === mangaId);
    const container = document.getElementById("manga-details");

    if (manga) {
      container.innerHTML = `
        <h1>${manga.title}</h1>
        <img src="../${manga.cover}" alt="${manga.title}" style="max-width: 300px;" />
        <p><strong>Género:</strong> ${manga.genre}</p>
        <a href="../index.html">Volver al inicio</a>
      `;
    } else {
      container.innerHTML = "<p>Manga no encontrado.</p>";
    }
  })
  .catch(err => {
    console.error("Error al cargar el manga:", err);
    document.getElementById("manga-details").innerHTML = "<p>Error al mostrar los detalles.</p>";
  });
