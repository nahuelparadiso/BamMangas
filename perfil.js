const user = JSON.parse(localStorage.getItem("bamUser"));
const bio = localStorage.getItem("bamBio") || "";
const avatarURL = user?.avatar || "../assets/img/avatar1.jpg";

const boxPersonal = document.getElementById("perfil-personal");
const boxBiblioteca = document.getElementById("perfil-biblioteca");

if (user) {
  // 🧑‍🎨 Panel izquierdo: Personalización
  boxPersonal.innerHTML = `
    <div class="perfil-box">
      <img id="avatar-img" src="${avatarURL}" alt="avatar" class="perfil-avatar" />

      <label class="avatar-label">Elegí tu avatar:</label>
      <div id="avatar-options" class="avatar-options">
        ${[1, 2, 3, 4, 5].map(num => `
          <label>
            <input type="radio" name="avatar" value="../assets/img/avatar${num}.jpg"
              ${user.avatar === `../assets/img/avatar${num}.jpg` ? 'checked' : ''}>
            <img src="../assets/img/avatar${num}.jpg" class="avatar-thumb" />
          </label>
        `).join('')}
      </div>

      <form id="edit-form">
        <label>🙋 Nombre:</label>
        <input type="text" id="edit-name" value="${user.name}" required />

        <label>📧 Email:</label>
        <input type="email" id="edit-email" value="${user.email}" required />

        <label>📝 Biografía:</label>
        <textarea id="bio-text" rows="4">${bio}</textarea>

        <div class="perfil-buttons">
          <button type="submit">💾 Guardar cambios</button>
        </div>
      </form>

      <button type="button" id="cerrar-sesion" style="
        background-color: crimson;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        margin-top: 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
      ">🔓 Cerrar sesión</button>
    </div>
  `;

  // 🧭 Avatar en tiempo real
  document.querySelectorAll('input[name="avatar"]').forEach(radio => {
    radio.addEventListener("change", () => {
      document.getElementById("avatar-img").src = radio.value;
    });
  });

  // 💾 Guardar edición
  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newName = document.getElementById("edit-name").value.trim();
    const newEmail = document.getElementById("edit-email").value.trim();
    const nuevaBio = document.getElementById("bio-text").value.trim();
    const nuevaAvatar = document.querySelector('input[name="avatar"]:checked').value;

    const updatedUser = { ...user, name: newName, email: newEmail, avatar: nuevaAvatar };
    localStorage.setItem("bamUser", JSON.stringify(updatedUser));
    localStorage.setItem("bamBio", nuevaBio);
    alert("Perfil actualizado ✨");
  });

  // 🚪 Cerrar sesión
  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("bamUser");
    alert("Sesión cerrada");
    window.location.href = "../index.html";
  });

  // 📚 Panel derecho: Biblioteca lectora
  boxBiblioteca.innerHTML = `
    <h3>📚 Mi Biblioteca</h3>
    <ul class="biblioteca-links">
      <li><a href="favoritos.html">⭐ Ver mis favoritos</a></li>
      <li><a href="lectura.html">📖 Mi lista de lectura</a></li>
      <li><a href="../index.html">← Volver al inicio</a></li>
    </ul>
    <div id="lectura-historial"></div>
  `;

  // 📖 Historial de capítulos leídos
  const historial = JSON.parse(localStorage.getItem("bamHistorialLectura")) || {};
  const lecturas = historial[user.name] || [];

  if (lecturas.length === 0) {
    document.getElementById("lectura-historial").innerHTML = "<p>📘 No has leído ningún capítulo aún.</p>";
  } else {
    fetch("../data/mangas.json")
      .then(res => res.json())
      .then(mangas => {
        const historialBox = document.createElement("div");
        historialBox.innerHTML = `<h4 style="margin-top: 1.2rem;">📖 Historial de lectura</h4><p>Has leído <strong>${lecturas.length}</strong> capítulo(s):</p>`;
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

} else {
  boxPersonal.innerHTML = `
    <p style="text-align: center;">
      No hay sesión activa. <a href="login.html" style="color: #f47521; font-weight: bold;">Iniciar sesión</a>
    </p>
  `;
}

// 💬 Comentarios de usuarios
document.getElementById("comentario-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const texto = document.getElementById("comentario-texto").value.trim();
  const user = JSON.parse(localStorage.getItem("bamUser"));
  if (!user || !texto) return;

  const nuevoComentario = {
    nombre: user.name,
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
      <strong>${com.nombre}</strong> <span style="color: #999;">(${com.fecha})</span><br>
      <p style="margin: 0.5rem 0;">${com.mensaje}</p>
    `;
    lista.appendChild(div);
  });
}

// Mostrar comentarios al cargar
mostrarComentarios();
