const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get("id"));

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
        <button id="btn-leer-mas" style="
          background-color: #f47521;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 1rem;
        ">📖 Agregar a lista de lectura</button>
        <br><br>
        <a href="../index.html" style="color: #f47521; font-weight: bold;">← Volver al inicio</a>
      `;

      document.body.appendChild(container);

      // Evento para agregar a la lista de lectura
      document.getElementById("btn-leer-mas").addEventListener("click", () => {
        let lectura = JSON.parse(localStorage.getItem("bamLectura")) || [];
        if (!lectura.includes(mangaId)) {
          lectura.push(mangaId);
          localStorage.setItem("bamLectura", JSON.stringify(lectura));
          alert("Agregado a tu lista de lectura 📖");
        } else {
          alert("Este manga ya está en tu lista de lectura");
        }
      });

    } else {
      document.body.innerHTML = `<p>Manga no encontrado</p><a href="../index.html">← Volver al inicio</a>`;
    }
  })
  .catch(err => {
    console.error("Error al cargar el manga:", err);
    document.body.innerHTML = `<p>Error al mostrar el manga</p><a href="../index.html">← Volver al inicio</a>`;
  });
