# 📚 BamMangas

**BamMangas** es una aplicación web creada con HTML, CSS y JavaScript para mostrar una galería visual de mangas destacados. Incluye sistema de usuarios, fichas coleccionables, favoritos, lista de lectura, filtros por género y experiencia personalizada sin necesidad de backend.

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

## 👤 Perfil de Usuario – Novedades

Se mejoró la sección de perfil para ofrecer una experiencia más completa y personalizada:

- 🖼️ **Selección de avatar personalizada**  
  El usuario puede elegir entre 5 avatares visuales ubicados en `/assets/img/`. El cambio se refleja al instante.

- ✏️ **Edición del perfil**  
  Formulario para modificar nombre, email y biografía. Todo se guarda en `localStorage`.

- 🔄 **Actualización dinámica**  
  El avatar se actualiza en tiempo real al seleccionar uno nuevo.

- 🔐 **Persistencia**  
  Todos los datos del perfil se conservan entre sesiones.

- 🚪 **Cierre de sesión**  
  Elimina los datos locales y redirige al inicio.

- 🛠️ **Corrección de rutas relativas**  
  Las imágenes se cargan correctamente desde `pages/perfil.html` gracias al ajuste: `../assets/img/avatarX.jpg`.



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
⭐ Favoritos: se marcan con una estrellita desde el index

📖 Lista de lectura: se marca desde la página de detalle manga.html

📂 Vista personal: favoritos.html y lectura.html muestran solo los mangas marcados

🧑 Sesión requerida: funciones disponibles solo si hay sesión activa

📘 Filtros inteligentes
Búsqueda por género desde el menú desplegable

Menú generado automáticamente según los géneros disponibles en mangas.json

Actualizado cada vez que se cargan nuevos mangas

👤 Autor
Nahuel Paradiso

