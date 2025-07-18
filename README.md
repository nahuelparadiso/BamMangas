# 📚 BamMangas

BamMangas es una aplicación web creada con HTML, CSS y JavaScript para mostrar una galería visual de mangas destacados. Incluye sistema de usuarios, fichas coleccionables, favoritos, lista de lectura, filtros por género y experiencia personalizada sin necesidad de backend.

---

## 🚀 Funcionalidades principales

- 🖼️ Galería visual estilo Crunchyroll con imagen, título, género y descripción
- 🔎 Filtro por género generado automáticamente desde el JSON
- 🔐 Sistema de usuarios con:
  - Registro, login y perfil editable
  - Sesión persistente en `localStorage`
  - Saludo personalizado en el header
  - Cierre de sesión y redirección automática
- ⭐ Marcar favoritos (guardados en navegador)
- 📖 Lista de lectura ("Quiero leer") por usuario
- 📦 Detalle de manga con sinopsis extendida
- 🔁 Vista responsive adaptada para móvil y escritorio

---

## 🧱 Estructura del proyecto

BamMangas/ ├── index.html ├── style.css ├── app.js ├── manga.js ├── lectura.js ├── favoritos.js ├── auth.js ├── data/ │ └── mangas.json ├── assets/ │ └── img/ │ ├── onepiece.jpg │ ├── naruto.jpg │ ├── aot.jpg │ ├── jujutsu.jpg │ └── ...otras imágenes └── pages/ ├── manga.html ├── login.html ├── register.html ├── perfil.html ├── lectura.html └── favoritos.html


---

## 🎨 Estilo visual

Inspirado en la estética moderna de Crunchyroll:

- ✅ Tarjetas estilo ficha coleccionable
- ✅ Hover con descripción
- ✅ Etiquetas de género con color destacado
- ✅ Colores suaves y naranja como primario (`#f47521`)
- ✅ Responsive con grid adaptable

---

## 🧠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- `localStorage` para persistencia
- Live Server para entorno local

---

## 💻 ¿Cómo ejecutar?

```bash
git clone https://github.com/nahuelparadiso/BamMangas.git
cd BamMangas
npx live-server

Luego abrir en: http://localhost:8080

📦 Sistema de favoritos y lectura
⭐ Favoritos	: Se marcan con una estrellita desde el index
📖 Lista de lectura	: Se marca desde la página de detalle manga.html
📂 Vista personal : favoritos.html y lectura.html muestran solo los mangas marcados
🧑 Sesión requerida	: Las funciones están disponibles solo si hay sesión activa

📘 Filtros inteligentes
Búsqueda por género desde el menú desplegable

Menú generado automáticamente según los géneros disponibles en mangas.json

Actualizado cada vez que se cargan nuevos mangas

👤 Autor
Nahuel Paradiso

FotoWeb:

