const user = JSON.parse(localStorage.getItem("bamUser"));
const bio = localStorage.getItem("bamBio") || "";
const perfilDiv = document.getElementById("perfil-container");

if (user) {
  const avatarURL = user.avatar || "../assets/img/avatar1.jpg";

  perfilDiv.innerHTML = `
    <div style="text-align: center;">
      <img id="avatar-img" src="${avatarURL}" alt="avatar"
        style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 8px rgba(0,0,0,0.1); margin-bottom: 1rem;" />

      <label><strong>Elegí tu avatar:</strong></label><br><br>

      <div id="avatar-options" style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
        ${[1, 2, 3, 4, 5].map(num => `
          <label>
            <input type="radio" name="avatar" value="../assets/img/avatar${num}.jpg" ${user.avatar === `../assets/img/avatar${num}.jpg` ? 'checked' : ''}>
            <img src="../assets/img/avatar${num}.jpg" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #ccc;" />
          </label>
        `).join('')}
      </div>

      <form id="edit-form">
        <label>Nombre:</label><br>
        <input type="text" id="edit-name" value="${user.name}" required><br><br>

        <label>Email:</label><br>
        <input type="email" id="edit-email" value="${user.email}" required><br><br>

        <label><strong>📝 Tu biografía:</strong></label><br>
        <textarea id="bio-text" rows="4" style="width: 100%; padding: 0.5rem;">${bio}</textarea><br>

        <button type="submit" style="margin-top: 1rem;">💾 Guardar cambios</button>
      </form>

      <hr style="margin: 2rem 0;" />
      <a href="favoritos.html" style="display: block; margin-bottom: 1rem; color: #f47521; font-weight: bold;">⭐ Ver mis favoritos</a>
      <a href="lectura.html" style="display: block; margin-bottom: 1rem; color: #f47521; font-weight: bold;">📖 Ver mi lista de lectura</a>
      <a href="../index.html" style="display: block; margin-bottom: 1rem; color: #f47521; font-weight: bold;">← Volver al inicio</a>
      <button onclick="cerrarSesion()" style="
        background-color: #f47521;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
      ">Cerrar sesión</button>
    </div>
  `;

  document.querySelectorAll('input[name="avatar"]').forEach(radio => {
    radio.addEventListener("change", () => {
      const nueva = radio.value;
      const avatarImg = document.getElementById("avatar-img");
      if (avatarImg) avatarImg.src = nueva;
    });
  });

  document.getElementById("edit-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newName = document.getElementById("edit-name").value.trim();
    const newEmail = document.getElementById("edit-email").value.trim();
    const nuevaBio = document.getElementById("bio-text").value;
    const nuevaAvatar = document.querySelector('input[name="avatar"]:checked').value;

    const updatedUser = { ...user, name: newName, email: newEmail, avatar: nuevaAvatar };
    localStorage.setItem("bamUser", JSON.stringify(updatedUser));
    localStorage.setItem("bamBio", nuevaBio);

    alert("Perfil actualizado ✨");
  });

} else {
  perfilDiv.innerHTML = `
    <p>No hay sesión activa. <a href="login.html" style="color: #f47521; font-weight: bold;">Iniciar sesión</a></p>
  `;
}

function cerrarSesion() {
  localStorage.removeItem("bamUser");
  alert("Sesión cerrada");
  window.location.href = "../index.html";
}
