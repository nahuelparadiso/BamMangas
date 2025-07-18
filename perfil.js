const user = JSON.parse(localStorage.getItem("bamUser"));
const bio = localStorage.getItem("bamBio") || "";
const perfilDiv = document.getElementById("perfil-container");

if (user) {
  const avatarURL = user.avatar || "../assets/img/avatar1.jpg";

  perfilDiv.innerHTML = `
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
          <button type="button" id="cerrar-sesion">🔓 Cerrar sesión</button>
        </div>
      </form>

      <hr />
      <div class="perfil-links">
        <a href="favoritos.html">⭐ Ver mis favoritos</a>
        <a href="lectura.html">📖 Mi lista de lectura</a>
        <a href="../index.html">← Volver al inicio</a>
      </div>
    </div>
  `;

  // 💬 Avatar en tiempo real
  document.querySelectorAll('input[name="avatar"]').forEach(radio => {
    radio.addEventListener("change", () => {
      document.getElementById("avatar-img").src = radio.value;
    });
  });

  // 📝 Guardar edición
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

} else {
  perfilDiv.innerHTML = `
    <p style="text-align: center;">
      No hay sesión activa. <a href="login.html" style="color: #f47521; font-weight: bold;">Iniciar sesión</a>
    </p>
  `;
}
