const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get("id"));

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const manga = mangas.find(m => m.id === mangaId);

    if (manga) {
      // Insertamos todos los datos y la historia narrativa
      document.getElementById("manga-imagen").src = `../${manga.imagen}`;
      document.getElementById("manga-imagen").alt = manga.titulo;
      document.getElementById("manga-titulo").textContent = manga.titulo;
      document.getElementById("manga-genero").textContent = `Género: ${manga.genero}`;
      document.getElementById("manga-descripcion").textContent = manga.descripcion;
      document.getElementById("historia-texto").textContent = manga.historiaResumida;

      // Evento para agregar a lista de lectura
      const btnLectura = document.createElement("button");
      btnLectura.textContent = "📖 Agregar a lista de lectura";
      btnLectura.style = `
        background-color: #f47521;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 1rem;
      `;
      btnLectura.addEventListener("click", () => {
        let lectura = JSON.parse(localStorage.getItem("bamLectura")) || [];
        if (!lectura.includes(mangaId)) {
          lectura.push(mangaId);
          localStorage.setItem("bamLectura", JSON.stringify(lectura));
          alert("Agregado a tu lista de lectura 📖");
        } else {
          alert("Este manga ya está en tu lista de lectura");
        }
      });

      document.querySelector(".manga-info-container").appendChild(btnLectura);

    } else {
      document.getElementById("manga-details").innerHTML = `
        <p>Manga no encontrado</p>
        <a href="../index.html">← Volver al inicio</a>
      `;
    }
  })
  .catch(err => {
    console.error("Error al cargar el manga:", err);
    document.getElementById("manga-details").innerHTML = `
      <p>Error al mostrar el manga</p>
      <a href="../index.html">← Volver al inicio</a>
    `;
  });
