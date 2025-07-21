const user = JSON.parse(localStorage.getItem("bamActivo"));
const bio = localStorage.getItem(`bamBio_${user?.email}`) || "";
const avatarURL = user?.avatar || "../assets/img/avatar1.jpg";

const boxPersonal = document.getElementById("perfil-personal");
const boxBiblioteca = document.getElementById("perfil-biblioteca");

if (user) {
  boxPersonal.innerHTML = `
    <img id="avatar-img" src="${avatarURL}" alt="avatar" class="avatar-big" />
    <h2 id="nombre-usuario">${user.name}</h2>
    <p id="rango-usuario">📚 Explorador de historias</p>
    <div class="stats">
      <span>📧 ${user.email}</span>
      <span>📝 ${bio || "Sin biografía"}</span>
    </div>
    <button class="btn-editar" id="btn-editar">✏️ Editar perfil</button>
    <button type="button" id="cerrar-sesion" style="background-color: crimson; color: white; border: none; padding: 0.5rem 1rem; margin-top: 1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">🔓 Cerrar sesión</button>
  `;

  document.getElementById("btn-editar").addEventListener("click", () => {
    boxPersonal.innerHTML = `
      <img id="avatar-img" src="${avatarURL}" alt="avatar" class="avatar-big" />
      <label>🙋 Nombre:</label>
      <input type="text" id="edit-name" value="${user.name}" required />
      <label>📧 Email:</label>
      <input type="email" id="edit-email" value="${user.email}" required />
      <label>📝 Biografía:</label>
      <textarea id="bio-text" rows="3">${bio}</textarea>
      <label>🎨 Avatar:</label>
      <div class="avatar-options">
        ${[1, 2, 3, 4, 5].map(num => `
          <label>
            <input type="radio" name="avatar" value="../assets/img/avatar${num}.jpg"
              ${user.avatar === `../assets/img/avatar${num}.jpg` ? 'checked' : ''}>
            <img src="../assets/img/avatar${num}.jpg" class="avatar-thumb" />
          </label>
        `).join('')}
      </div>
      <button id="guardar-cambios" class="btn-editar">💾 Guardar</button>
    `;

    document.querySelectorAll('input[name="avatar"]').forEach(radio => {
      radio.addEventListener("change", () => {
        document.getElementById("avatar-img").src = radio.value;
      });
    });

    document.getElementById("guardar-cambios").addEventListener("click", () => {
      const newName = document.getElementById("edit-name").value.trim();
      const newEmail = document.getElementById("edit-email").value.trim();
      const nuevaBio = document.getElementById("bio-text").value.trim();
      const nuevaAvatar = document.querySelector('input[name="avatar"]:checked').value;

      const updatedUser = { ...user, name: newName, email: newEmail, avatar: nuevaAvatar };
      localStorage.setItem("bamActivo", JSON.stringify(updatedUser));
      localStorage.setItem(`bamBio_${newEmail}`, nuevaBio);

      const usuarios = JSON.parse(localStorage.getItem("bamUsers")) || [];
      const index = usuarios.findIndex(u => u.email === user.email);
      if (index !== -1) {
        usuarios[index] = updatedUser;
        localStorage.setItem("bamUsers", JSON.stringify(usuarios));
      }

      alert("Perfil actualizado ✨");
      window.location.reload();
    });
  });

  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("bamActivo");
    alert("Sesión cerrada");
    window.location.href = "../index.html";
  });

  // 📚 Sección de biblioteca
  boxBiblioteca.innerHTML = `
    <h3>📚 Mi Biblioteca</h3>
    <ul class="biblioteca-links">
      <li><a href="favoritos.html">⭐ Ver mis favoritos</a></li>
      <li><a href="lectura.html">📖 Mi lista de lectura</a></li>
      <li><a href="../index.html">← Volver al inicio</a></li>
    </ul>
    <div id="lectura-historial"></div>
  `;

  // 📖 Historial de lectura
  const historial = JSON.parse(localStorage.getItem("bamHistorialLectura")) || {};
  const lecturas = historial[user.email] || [];

  if (lecturas.length === 0) {
    document.getElementById("lectura-historial").innerHTML = "<p>📘 No has leído ningún capítulo aún.</p>";
  } else {
    fetch("http://localhost:3000/mangas")
      .then(res => res.json())
      .then(mangas => {
        const historialBox = document.createElement("div");
        historialBox.innerHTML = `<h4 style="margin-top:1.2rem;">📖 Historial de lectura</h4><p>Has leído <strong>${lecturas.length}</strong> capítulo(s):</p>`;
        const lista = document.createElement("ul");
        lista.style.paddingLeft = "1.2rem";

        lecturas.forEach(item => {
          const [mangaId, capId] = item.split("-").map(Number);
          const manga = mangas.find(m => m.id === mangaId);
          if (manga && manga.capitulos[capId]) {
            const li = document.createElement("li");
            li.textContent = `${manga.titulo} — ${manga.capitulos[capId].titulo}`;
            lista.appendChild(li);
          }
        });

        historialBox.appendChild(lista);
        document.getElementById("lectura-historial").appendChild(historialBox);
      });
  }

  // ⭐ Vista previa de favoritos
  const favoritos = JSON.parse(localStorage.getItem("bamFavoritos")) || [];

  if (favoritos.length > 0) {
    fetch("http://localhost:3000/mangas")
      .then(res => res.json())
      .then(mangas => {
        const favContainer = document.createElement("div");
        favContainer.innerHTML = `<h4 style="margin-top:1rem;">⭐ Tus favoritos (${favoritos.length})</h4>`;
        const grid = document.createElement("div");
        grid.style = "display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;";

        favoritos.forEach(id => {
          const manga = mangas.find(m => m.id === id);
          if (manga) {
            const card = document.createElement("a");
            card.href = `manga.html?id=${manga.id}`;
            card.style = "text-align: center; width: 120px;";
            card.innerHTML = `
              <img src="${manga.imagen}" alt="${manga.titulo}" style="width: 100%; border-radius: 6px;" />
              <p style="margin-top: 0.3rem; font-size: 0.85rem;">${manga.titulo}</p>
            `;
            grid.appendChild(card);
          }
        });

        favContainer.appendChild(grid);
        boxBiblioteca.appendChild(favContainer);
      });
  }

  // 📖 Vista previa de mangas con lectura
  if (lecturas.length > 0) {
    fetch("http://localhost:3000/mangas")
      .then(res => res.json())
      .then(mangas => {
        const lecturaBox = document.createElement("div");
        lecturaBox.innerHTML = `<h4 style="margin-top:1rem;">📖 Lecturas recientes (${lecturas.length})</h4>`;
        const grid = document.createElement("div");
        grid.style = "display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;";

        const vistos = new Set();
        lecturas.forEach(item => {
          const [mangaId] = item.split("-").map(Number);
          if (vistos.has(mangaId)) return;
          vistos.add(mangaId);
          const manga = mangas.find(m => m.id === mangaId);
          if (manga) {
            const card = document.createElement("a");
            card.href = `manga.html?id=${manga.id}`;
            card.style = "text-align: center; width: 120px;";
            card.innerHTML = `
              <img src="${manga.imagen}" alt="${manga.titulo}" style="width: 100%; border-radius: 6px;" />
              <p style="margin-top: 0.3rem; font-size: 0.85rem;">${manga.titulo}</p>
            `;
                        grid.appendChild(card);
          }
        });

        lecturaBox.appendChild(grid);
        boxBiblioteca.appendChild(lecturaBox);
      });
  }
} else {
  boxPersonal.innerHTML = `<p style="text-align: center;">No hay sesión activa. <a href="login.html" style="color: #f47521; font-weight: bold;">Iniciar sesión</a></p>`;
}

// 💬 Comentarios
document.getElementById("comentario-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const texto = document.getElementById("comentario-texto").value.trim();
  const usuario = JSON.parse(localStorage.getItem("bamActivo"));
  if (!usuario || !texto) return;

  const nuevoComentario = {
    nombre: usuario.name,
    mensaje: texto,
    fecha: new Date().toLocaleDateString()
  };

  const comentarios = JSON.parse(localStorage.getItem("bamComentarios")) || [];
  comentarios.push(nuevoComentario);
  localStorage.setItem("bamComentarios", JSON.stringify(comentarios));

  document.getElementById("comentario-texto").value = "";
  mostrarComentarios();
});

function mostrarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem("bamComentarios")) || [];
  const lista = document.getElementById("comentarios-lista");
  lista.innerHTML = "";

  if (comentarios.length === 0) {
    lista.innerHTML = "<p>No hay comentarios todavía.</p>";
    return;
  }

  comentarios.slice().reverse().forEach(com => {
    const div = document.createElement("div");
    div.style = "margin-bottom: 1rem; padding: 0.5rem; border-bottom: 1px solid #ccc;";
    div.innerHTML = `
      <strong>${com.nombre}</strong> 
      <span style="color: #999;">(${com.fecha})</span><br>
      <p style="margin: 0.5rem 0;">${com.mensaje}</p>
    `;
    lista.appendChild(div);
  });
}

mostrarComentarios();
