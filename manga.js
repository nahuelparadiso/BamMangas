const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get("id"));

fetch("../data/mangas.json")
  .then(res => res.json())
  .then(mangas => {
    const manga = mangas.find(m => m.id === mangaId);

    if (manga) {
      // Datos principales
      document.getElementById("manga-imagen").src = `../${manga.imagen}`;
      document.getElementById("manga-imagen").alt = manga.titulo;
      document.getElementById("manga-titulo").textContent = manga.titulo;
      document.getElementById("manga-genero").innerHTML = `
  <span class="genre-badge">🌟 ${manga.genero}</span>
`;
      document.getElementById("manga-descripcion").textContent = manga.descripcion;
      document.getElementById("historia-texto").textContent = manga.historiaResumida;

      // Capítulos dinámicos
      const selector = document.getElementById("selector-capitulo");
      const contenedor = document.getElementById("capitulo-contenido");
      selector.innerHTML = "";
      contenedor.innerHTML = "";

      if (Array.isArray(manga.capitulos)) {
        // Rellenar el selector con títulos
        manga.capitulos.forEach((capitulo, index) => {
          const opcion = document.createElement("option");
          opcion.value = index;
          opcion.textContent = capitulo.titulo;
          selector.appendChild(opcion);
        });

        // Función para guardar lectura en historial
        const registrarLectura = index => {
          const usuario = localStorage.getItem("bamUsuario");
          if (!usuario) return;

          const historial = JSON.parse(localStorage.getItem("bamHistorialLectura")) || {};
          if (!historial[usuario]) {
            historial[usuario] = [];
          }

          const capId = `${mangaId}-${index}`;
          if (!historial[usuario].includes(capId)) {
            historial[usuario].push(capId);
            localStorage.setItem("bamHistorialLectura", JSON.stringify(historial));
          }
        };

        // Mostrar contenido del capítulo seleccionado
        const renderizarCapitulo = index => {
          contenedor.innerHTML = "";
          const capitulo = manga.capitulos[index];
          capitulo.contenido.forEach(parrafo => {
            const p = document.createElement("p");
            p.textContent = parrafo;
            contenedor.appendChild(p);
          });

          // Registrar lectura
          registrarLectura(index);
        };

        // Cambiar de capítulo al seleccionar
        selector.addEventListener("change", e => {
          renderizarCapitulo(e.target.value);
        });

        // Mostrar el primero por defecto
        renderizarCapitulo(0);
      } else {
        contenedor.innerHTML = "<p>Este manga aún no tiene capítulos disponibles.</p>";
      }

      // Botón de lista de lectura
      const btnLectura = document.createElement("button");
      btnLectura.textContent = "📖 Agregar a lista de lectura";
      btnLectura.style = `
        background-color: #f47521;
        color: white;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        margin-top: 1rem;
        display: inline-block;
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
