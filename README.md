# 📚 BamMangas

**BamMangas** es una aplicación web desarrollada con **HTML, CSS y JavaScript puro**, inspirada en el estilo editorial de Crunchyroll.  
Funciona como una biblioteca digital de mangas con exploración narrativa, sistema de usuario y experiencia visual cuidada.

Este proyecto forma parte de mi portfolio personal como **desarrollador frontend**, con foco en experiencia de usuario, navegación intuitiva y diseño responsivo.

> ⚠️ Proyecto demostrativo. No posee fines comerciales ni de distribución.

---

## 🧪 Capturas del proyecto
<img width="1920" height="1080" alt="foto 1" src="https://github.com/user-attachments/assets/8dcb09a5-5dcc-4dc6-9b8c-3400c5a8cfbd" />
<img width="1920" height="1080" alt="foto2" src="https://github.com/user-attachments/assets/7c329ced-2812-4416-8cd8-064b07aa9a20" />
<img width="1920" height="1080" alt="foto 3" src="https://github.com/user-attachments/assets/dd044965-1917-4187-b0ae-c9260a409a97" />
<img width="1920" height="1080" alt="foto 4" src="https://github.com/user-attachments/assets/80638229-d417-4d19-a195-f510ba3ee5ce" />
<img width="1920" height="1080" alt="foto 5" src="https://github.com/user-attachments/assets/1c5b0bd9-c8c4-488e-8e70-934a8d40e10e" />



## 🎯 Funcionalidades principales

- 🖼️ Catálogo interactivo con tarjetas de manga, portada y descripción  
- 🔍 Filtro dinámico por género extraído desde API local  
- ⭐ Sistema de favoritos con confirmación visual en tiempo real  
- 📖 Lista de lectura persistente por sesión  
- 👤 Perfil editable con avatar personalizado, biografía y datos sincronizados  
- 📘 Capítulos narrativos extendidos por manga en estructura JSON enriquecida  
- 🌓 Modo claro/oscuro con transición suave y configuración persistente  
- 🔁 Navegación entre vistas con íconos sincronizados y acceso fluido  
- 💬 Reseñas y comentarios visibles con nombre y fecha del usuario  
- 📱 Interfaz responsive adaptada a móviles, tablets y escritorio  

---

## 🌐 API local simulada con `json-server`

BamMangas utiliza una API local para servir todo su contenido de manera dinámica:

- `db.json` validado con mangas, géneros, capítulos y metadatos  
- Cada manga incluye:  
  - `descripcion` editorial  
  - `historiaResumida` para vista rápida  
  - `capitulos[]` con contenido narrativo extendido  
- Integración vía `fetch` en todas las vistas  
- Estructura RESTful simulada:  
  - `GET /mangas`  
  - `GET /mangas?id=X`  

> Ejecutar con: `json-server --watch db.json`

---

## 📦 Actualizaciones del proyecto

### v1.1.0  
- 🎮 Mejora visual estilo Steam aplicada al perfil  
- 🔁 Avatar sincronizado dinámicamente en todas vistas  
- 🧼 Pulido de botones, enlaces e interacción  

### v1.2.0  
- 📘 Capítulo 2 narrativo original por manga  
- ✨ Contenido integrado al array `capitulos[]` sin modificar frontend  

### v1.3.0  
- 💬 BamTalk: sistema de chat global con usuarios simulados  
- ⏳ Envío limitado cada 5s + scroll automático  
- 👤 Mensajes vinculados al nombre del usuario  

### v1.4.0  
- ⭐ Vista previa automática de favoritos en perfil del usuario  
- 📖 Miniaturas visuales de mangas con lectura reciente  
- 📘 Historial de capítulos leídos integrado en la biblioteca  
- 🧠 Confirmación visual al añadir/eliminar favoritos  
- 🔧 Refactorización completa de `perfil.js` para modularidad  
- 🪄 Interacción intuitiva y presentación profesional en el dashboard  
- 🌐 Migración de contenido a API local con estructura REST

---

Mejoras futuras: acomodar el css en varios archivos de una manera más profesional y clara para todo aquel que deba retocar codigo.

## 🧠 Tecnologías utilizadas

| Herramienta        | Aplicación |
|--------------------|------------|
| **HTML5**          | Estructura semántica  
| **CSS3**           | Estilo modular + modo oscuro  
| **JavaScript Vanilla** | Lógica de navegación, filtros, persistencia  
| `localStorage`     | Favoritos, sesión, lectura, comentarios  
| `json-server`      | API local simulada con REST  
| Git + GitHub       | Control de versiones  
| Live Server        | Desarrollo local sin servidor externo  

---

## 💻 Cómo ejecutar el proyecto

```bash
git clone https://github.com/nahuelparadiso/BamMangas.git
cd BamMangas
npx live-server
🔗 Abrí en: http://localhost:8080

📦 API local: En otra terminal, ejecutá:
json-server --watch db.json

---

👨‍💻 Autor
Nahuel Paradiso Frontend Developer con foco en diseño UX/UI y desarrollo web interactivo. 📍 Proyecto creado para portfolio personal y aprendizaje técnico.

📜 Licencia y créditos
Este proyecto fue creado con fines educativos y demostrativos. No contiene contenido original ni reproducción comercial. Todas las obras referenciadas pertenecen a sus respectivos autores/editoriales.
