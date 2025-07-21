const params = new URLSearchParams(window.location.search);
const mangaId = parseInt(params.get("id"));

fetch(`http://localhost:3000/mangas/${mangaId}`)
  .then(res => {
    if (!res.ok) throw new Error("Manga no encontrado");
    return res.json();
  })
  .then(manga => {
    // Datos principales
    document.getElementById("manga-imagen").src = `../${manga.imagen}`;
    document.getElementById("manga-imagen").alt = manga.titulo;
    document.getElementById("manga-titulo").textContent = manga.titulo;
    document.getElementById("manga-genero").innerHTML = `
      <span class="genre-badge">🌟 ${manga.genero}</span>
    `;
    document.getElementById("manga-descripcion").textContent = manga.descripcion;
    document.getElementById("historia-texto").textContent =
      manga.historiaResumida || "🌱 Historia no disponible.";

    // Capítulos dinámicos
    const selector = document.getElementById("selector-capitulo");
    const contenedor = document.getElementById("capitulo-contenido");
    selector.innerHTML = "";
    contenedor.innerHTML = "";

    if (Array.isArray(manga.capitulos) && manga.capitulos.length > 0) {
      manga.capitulos.forEach((capitulo, index) => {
        const opcion = document.createElement("option");
        opcion.value = index;
        opcion.textContent = capitulo.titulo || `Capítulo ${index + 1}`;
        selector.appendChild(opcion);
      });

      const registrarLectura = index => {
        const usuario = localStorage.getItem("bamUsuario");
        if (!usuario) return;

        const historial = JSON.parse(localStorage.getItem("bamHistorialLectura")) || {};
        if (!historial[usuario]) historial[usuario] = [];

        const capId = `${mangaId}-${index}`;
        if (!historial[usuario].includes(capId)) {
          historial[usuario].push(capId);
          localStorage.setItem("bamHistorialLectura", JSON.stringify(historial));
        }
      };

      const renderizarCapitulo = index => {
        try {
          contenedor.innerHTML = "";

          const capitulo = manga.capitulos[index];
          if (!capitulo || !capitulo.contenido) {
            contenedor.innerHTML = "<p>Este capítulo no tiene contenido disponible.</p>";
            return;
          }

          const parrafos =
            typeof capitulo.contenido === "string"
              ? [capitulo.contenido]
              : Array.isArray(capitulo.contenido)
              ? capitulo.contenido
              : ["Contenido no disponible."];

          parrafos.forEach(parrafo => {
            const p = document.createElement("p");
            p.textContent = parrafo;
            contenedor.appendChild(p);
          });

          registrarLectura(index);
        } catch (e) {
          console.error("Error al renderizar el capítulo:", e);
          contenedor.innerHTML = `
            <p style="color: crimson;">❌ No se pudo mostrar el capítulo</p>
          `;
        }
      };

      selector.addEventListener("change", e => {
        renderizarCapitulo(e.target.value);
      });

      renderizarCapitulo(0);
    } else {
      contenedor.innerHTML = "<p>Este manga aún no tiene capítulos disponibles.</p>";
    }

    // Botón de agregar a lectura
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
  })
  .catch(err => {
    console.error("Error al cargar el manga:", err);
    document.getElementById("manga-details").innerHTML = `
      <p>❌ Error al mostrar el manga</p>
      <a href="../index.html">← Volver al inicio</a>
    `;
  });
