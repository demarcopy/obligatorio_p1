# Carreras Callejeras

## Descripción
Este proyecto es una aplicación web desarrollada para la gestión de carreras callejeras, permitiendo el registro de carreras, corredores, patrocinadores e inscripciones, así como la visualización de estadísticas y mapas interactivos. Forma parte del primer obligatorio de la materia Programación 1 (ORT Uruguay, 2025).

## Autores
- Rodrigo Demarco (Nro 354653) - [LinkedIn](https://www.linkedin.com/in/rodrigo-demarco/)
- Bruno Dorta (Nro 367324) - [ORT Uruguay](https://www.ort.edu.uy/)

## Estructura del proyecto
```
obligatorio_p1/
├── css/
│   └── estilos.css
├── img/
│   └── img1.jpg
├── index.html
├── js/
│   ├── app.js
│   └── clases.js
```

## Tecnologías y dependencias
- HTML5, CSS3 y JavaScript puro (sin frameworks)
- [Google Charts](https://developers.google.com/chart) para visualización de mapas
- [jsPDF](https://github.com/parallax/jsPDF) para generación de comprobantes en PDF

Las librerías externas se cargan mediante CDN en el archivo `index.html`, por lo que no es necesario instalar dependencias adicionales.

## Uso y ejecución
1. **Clonar el repositorio:**
   ```
   git clone https://github.com/usuario/obligatorio_p1.git
   ```
2. **Abrir el archivo `index.html`** en un navegador web moderno (recomendado: Chrome, Firefox, Edge).
3. **Interfaz:**
   - Registrar carreras, corredores y patrocinadores mediante los formularios.
   - Inscribir corredores en carreras.
   - Visualizar estadísticas generales y mapas interactivos por departamento.
   - Descargar comprobantes de inscripción en PDF.

## Notas
- No requiere backend ni base de datos: toda la lógica y almacenamiento es en memoria (mientras la página esté abierta).
- El diseño es responsive y amigable para el usuario.

## Licencia
Uso académico. Para más información, contactar a los autores.
