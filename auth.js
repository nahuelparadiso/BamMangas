// Registro con validación de email duplicado
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!name || !email || pass.length < 6) {
      alert("Completá todos los campos correctamente");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("bamUser"));
    if (existingUser && existingUser.email === email) {
      alert("Ese email ya está registrado");
      return;
    }

    const user = { name, email, pass };
    localStorage.setItem("bamUser", JSON.stringify(user));
    alert("Registro exitoso");
    window.location.href = "login.html";
  });
}


// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    const savedUser = JSON.parse(localStorage.getItem("bamUser"));
    if (savedUser && email === savedUser.email && pass === savedUser.pass) {
      alert(`¡Bienvenido, ${savedUser.name}!`);
      window.location.href = "../index.html";
    } else {
      alert("Datos incorrectos");
    }
  });
}
