# 📚 BamMangas

BamMangas es una aplicación web creada con HTML, CSS y JavaScript para mostrar una galería de mangas destacados. Incluye funcionalidades dinámicas, experiencia de usuario personalizada y un sistema de usuarios simple pero completo sin backend.

---

## 🚀 Funcionalidades principales

- 🖼️ Visualización de mangas destacados con imagen, título y género
- 🔍 Vista de detalles por manga al hacer clic
- 📦 Carga dinámica desde un archivo `mangas.json`
- 🔐 Sistema de usuarios con:
  - Registro y login
  - Sesión persistente con saludo personalizado
  - Redirección automática si no hay sesión
  - Perfil de usuario con edición de nombre y email
  - Botón de cierre de sesión con recarga

---

## 🧱 Estructura del proyecto

BamMangas/ ├── index.html ├── style.css ├── app.js ├── manga.js ├── auth.js ├── data/ │ └── mangas.json ├── assets/ │ └── img/ │ ├── onepiece.jpg │ ├── naruto.jpg │ ├── aot.jpg │ └── jujutsu.jpg └── pages/ ├── manga.html ├── login.html ├── register.html └── perfil.html


---

## 🧠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript Vanilla
- LocalStorage (para simular persistencia de datos)
- Live Server para entorno local

---

## 💻 ¿Cómo ejecutar?

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/nahuelparadiso/BamMangas.git

2. Abrí la carpeta en VSCode

3. Usá Live Server o cualquier servidor local:
npx live-server

4. Navegá a http://localhost:8080 o el puerto correspondiente

👤 Sistema de usuario
Funciona 100% en el navegador usando localStorage:

Acción	Comportamiento
Registro	Crea un usuario con nombre, email y contraseña (validación incluida)
Login	Inicia sesión si los datos coinciden
Perfil	Muestra los datos y permite editarlos
Cierre de sesión	Borra la sesión y recarga la página
Seguridad	Redirección automática si se accede a perfil.html sin sesión activa

📦 Mejoras futuras (opcional)
Buscador por título o género
Favoritos guardados por usuario
Comentarios o reseñas por manga
Integración con backend (Python + Flask)

🧑‍💻 Autor
Nahuel Paradiso
