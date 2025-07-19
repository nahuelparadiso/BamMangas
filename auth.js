// 📝 Registro de usuario con validación
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    const avatarInput = document.getElementById("avatar");
    const avatar = avatarInput ? avatarInput.value.trim() : "";

    if (!name || !email || pass.length < 6) {
      alert("Completá todos los campos correctamente");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("bamUsers")) || [];

    const emailExistente = usuarios.find(u => u.email === email);
    if (emailExistente) {
      alert("Ese email ya está registrado");
      return;
    }

    const nuevoUsuario = { name, email, pass, avatar };
    usuarios.push(nuevoUsuario);

    localStorage.setItem("bamUsers", JSON.stringify(usuarios));
    localStorage.setItem("bamActivo", JSON.stringify(nuevoUsuario));

    alert(`✅ Registro exitoso. ¡Bienvenido, ${name}!`);
    window.location.href = "../index.html";
  });
}

// 🔐 Login de usuario con validación
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("bamUsers")) || [];

    const usuarioValido = usuarios.find(
      user => user.email === email && user.pass === pass
    );

    if (usuarioValido) {
      localStorage.setItem("bamActivo", JSON.stringify(usuarioValido));
      alert(`🔓 ¡Bienvenido de nuevo, ${usuarioValido.name}!`);
      window.location.href = "../index.html";
    } else {
      alert("Email o contraseña incorrectos");
    }
  });
}
