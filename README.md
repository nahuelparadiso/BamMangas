# 📚 BamMangas

**BamMangas** es una aplicación web hecha con **HTML, CSS y JavaScript**, pensada para brindar una experiencia visual estilo Crunchyroll, totalmente personalizada desde el navegador. Cuenta con sistema de usuario, fichas coleccionables, favoritos, lista de lectura, filtros inteligentes, modo claro/oscuro y una interfaz responsive sin necesidad de backend.

---

## 🚀 Funcionalidades principales

- 🖼️ Galería visual con imagen, título, género y descripción
- 🔎 Filtro inteligente por género generado automáticamente desde `mangas.json`
- 🔐 Sistema de usuarios:
  - Registro, login, perfil editable
  - Sesión persistente con `localStorage`
  - Saludo personalizado en el header
  - Cierre de sesión visual y redirección automática
- ⭐ Favoritos por usuario (marcado desde el index)
- 📖 Lista de lectura ("Quiero leer") personalizada
- 📦 Vista detallada del manga con sinopsis extendida
- 🔁 Interfaz responsive para dispositivos móviles y escritorio

---

## 👤 Perfil de usuario – actualizado

La sección de perfil fue rediseñada para brindar una experiencia cómoda y visualmente integrada:

- 🖼️ Selección de avatar (5 opciones visuales) con actualización en tiempo real  
- ✏️ Formulario editable para nombre, email y biografía  
- 💾 Persistencia local entre sesiones con `localStorage`  
- 🔓 Cierre de sesión dinámico desde botón  
- 📂 Acceso directo a favoritos y lista de lectura desde el perfil  
- 🌗 Compatible con modo claro/oscuro  
- 📱 Responsive con layout centrado y estilizado  

---

## 🎨 Estilo visual

BamMangas se destaca por un diseño profesional, accesible y coherente en todo el sitio:

| Elemento             | Estética aplicada                          |
|----------------------|--------------------------------------------|
| Tarjetas de manga    | Fichas con imagen, sombra, hover sutil     |
| Header y navegación  | Diseño moderno, espaciado, colores vivos   |
| Botón de tema        | Cambia entre claro/oscuro con animación    |
| Formularios login/registro | Centrados, legibles, visualmente cómodos |
| Perfil               | Avatar, inputs y botones con coherencia total |
| Responsive           | Layout flexible, adaptado a pantallas pequeñas |

Modo oscuro integrado para toda la interfaz. 🎨

---

## 🧠 Tecnologías utilizadas

- HTML5
- CSS3 con estilo modular y responsivo
- JavaScript Vanilla
- `localStorage` para persistencia de sesión y datos
- Live Server para entorno local

---

## 💻 ¿Cómo ejecutar?

```bash
git clone https://github.com/nahuelparadiso/BamMangas.git
cd BamMangas
npx live-server

Abrir en: http://localhost:8080

📘 Extras funcionales
📦 Sistema de favoritos y lectura por usuario

📂 Vistas dedicadas: favoritos.html y lectura.html

🔎 Filtro por género dinámico desde menú desplegable

🔁 Menú generado automáticamente desde los datos en mangas.json

🧑 Autor
Nahuel Paradiso
