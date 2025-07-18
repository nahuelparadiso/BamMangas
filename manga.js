// Obtener el ID desde la URL
const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get("id"));

// Cargar los mangas y buscar el que coincida con el ID
fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const manga = mangas.find(m => m.id === mangaId);

    if (manga) {
      const container = document.createElement("div");
      container.style.textAlign = "center";
      container.style.padding = "2rem";

      container.innerHTML = `
        <h2>${manga.titulo}</h2>
        <img src="../${manga.imagen}" alt="${manga.titulo}" style="max-width: 300px; border-radius: 8px;" />
        <p><strong>Género:</strong> ${manga.genero}</p>
        <p><strong>Descripción:</strong> ${manga.descripcion}</p>
        <a href="../index.html" style="display: inline-block; margin-top: 1rem; color: #f47521; font-weight: bold;">← Volver al inicio</a>
      `;

      document.body.appendChild(container);
    } else {
      document.body.innerHTML = `<p>Manga no encontrado</p><a href="../index.html">← Volver al inicio</a>`;
    }
  })
  .catch(err => {
    console.error("Error al cargar el manga:", err);
    document.body.innerHTML = `<p>Error al mostrar el manga</p><a href="../index.html">← Volver al inicio</a>`;
  });
