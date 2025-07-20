let ultimoEnvio = 0;

function renderMensaje(m) {
  const div = document.createElement("div");
  div.classList.add("mensaje");
  div.innerHTML = `<strong>${m.usuario}:</strong> ${m.mensaje}`;
  const chatBox = document.getElementById("mensajes");
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-chat");
  const input = document.getElementById("input-chat");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ahora = Date.now();
    const espera = 5000;
    const diferencia = ahora - ultimoEnvio;

    if (diferencia < espera) {
      alert(`Esperá ${(espera - diferencia) / 1000} segundos antes de enviar otro mensaje.`);
      return;
    }

    const texto = input.value.trim();
    if (texto === "") return;

    const usuario = JSON.parse(localStorage.getItem("bamActivo"))?.nombre || "Anónimo";
    const nuevoMensaje = {
      usuario: usuario,
      mensaje: texto,
      timestamp: new Date().toISOString()
    };

    renderMensaje(nuevoMensaje);
    input.value = "";
    ultimoEnvio = ahora;
  });
});

// 💬 Simulación de mensajes ficticios
function generarMensajeFicticio() {
  const nombres = ["MangaLover87", "NeoShonen", "ShadowSenpai"];
  const frases = [
    "¡Este modo oscuro está tremendo!",
    "Quiero ver más mangas nuevos.",
    "¿Quién está en línea ahora?"
  ];

  const mensaje = {
    usuario: nombres[Math.floor(Math.random() * nombres.length)],
    mensaje: frases[Math.floor(Math.random() * frases.length)],
    timestamp: new Date().toISOString()
  };

  renderMensaje(mensaje);
}

// 🔁 Intervalo de simulación
setInterval(() => {
  generarMensajeFicticio();
}, 5000);
