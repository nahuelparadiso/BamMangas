# 📚 BamMangas

**BamMangas** es una aplicación web desarrollada con **HTML, CSS y JavaScript** puro, inspirada en el estilo visual de Crunchyroll. Está pensada como proyecto personal demostrativo, sin fines comerciales, con foco en experiencia de usuario, interacción y diseño.

Este sitio no será distribuido públicamente y su objetivo es mostrar mis capacidades como desarrollador frontend.

---

## 🚀 Funcionalidades principales

- 🖼️ Tarjetas de manga con portada, título estilizado y descripción oculta (aparece al pasar el cursor)
- 🔍 Filtro inteligente por género extraído dinámicamente desde `mangas.json`
- 🔐 Sistema de usuarios completo:
  - Registro, login, edición de perfil
  - Sesión persistente con `localStorage`
  - Saludo personalizado en el header
  - Cierre de sesión dinámico
- ⭐ Marcado de favoritos por usuario
- 📖 Lista de lectura personalizada por sesión
- 📦 Vista detallada del manga con sinopsis narrativa expandida
- 📖 Capítulo demo exclusivo por manga (generado narrativamente)
- 🌓 Modo claro/oscuro con transición visual
- 📱 Interfaz completamente responsive

---

## 🧑‍🎨 Detalles visuales y diseño aplicado

El sitio presenta una estética cuidada, moderna y adaptable:

| Componente             | Estilo aplicado                                              |
|------------------------|--------------------------------------------------------------|
| Tarjetas de manga      | Fondo suave, sombra, hover interactivo, descripción dinámica |
| Título de manga        | Mayúsculas estilizadas, color destacado                      |
| Header y navegación    | Espaciado, colores vivos, botón de cambio de tema            |
| Formulario login       | Layout centrado, inputs estilizados, feedback visual         |
| Perfil de usuario      | Avatar con vista previa + edición de datos                   |
| Detalle de manga       | Imagen ampliada + sinopsis narrativa destacada               |
| Capítulo demo          | Lectura narrativa con estilo editorial                       |
| Modo oscuro            | Aplicado en toda la interfaz 📘                              |
| Responsive             | Layout adaptable a escritorio y móvil 📱                     |

---

## 🧠 Tecnologías utilizadas

- HTML5 semántico
- CSS3 modular + media queries
- JavaScript Vanilla
- `localStorage` para manejo de sesión, lectura y favoritos
- Live Server para entorno local

---

## 💻 ¿Cómo ejecutar?

```bash
git clone https://github.com/nahuelparadiso/BamMangas.git
cd BamMangas
npx live-server
👉 Abrir en: http://localhost:8080

📖 Capítulos de lectura narrativos
Cada manga incluye ahora un capítulo de muestra original escrito especialmente para el proyecto. Estos capítulos fueron diseñados como previews ficticias, inspiradas en el estilo de cada obra, pero respetando totalmente los derechos de autor.

✍️ Textos completamente originales, sin copiar escenas reales

📘 Se muestran dinámicamente desde el archivo mangas.json

🔄 Integración automática con la vista manga.html

🌓 Compatible con modo claro/oscuro y lectura fluida

🧠 Sistema escalable para más capítulos a futuro

Esta mejora transforma BamMangas en una experiencia narrativa interactiva, ideal para demostrar creatividad, manejo de datos y diseño de interfaz.

👨‍💻 Autor
Nahuel Paradiso Desarrollador Frontend | Proyecto de Portfolio

📜 Licencia y reconocimiento de derechos
Este proyecto fue creado con fines educativos y demostrativos. BamMangas no tiene fines comerciales ni será distribuido públicamente.

Todas las obras de manga presentadas pertenecen a sus respectivos autores y editoriales. Este sitio no posee derechos sobre el contenido original y respeta la propiedad intelectual.

Los capítulos de muestra incluidos fueron redactados de forma original, sin reproducir escenas oficiales, y se utilizan únicamente como parte de un portfolio personal.
