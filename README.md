# English Notebook

App Next.js para visualizar el cuadernillo de inglés de Laura, capítulo a capítulo.
Cada capítulo es un archivo HTML autónomo que se muestra dentro de un `<iframe>`.

## Cómo añadir un capítulo nuevo

1. Guarda el HTML que genere Claude en la carpeta **`public/chapters/`**.
2. Nómbralo con un prefijo numérico para controlar el orden, por ejemplo:
   - `01-my-english-notebook.html`
   - `02-past-tenses.html`
   - `03-phrasal-verbs.html`
3. El nombre del capítulo que se muestra es el `<title>` interno del HTML
   (si no tiene, se usa el nombre del archivo).
4. Vuelve a desplegar (o reinicia `npm run dev` en local) y aparecerá en la lista.

> Los capítulos se leen en tiempo de *build*, por eso hay que volver a desplegar
> cada vez que se añade uno nuevo.

## Desarrollo local

```bash
npm install
npm run dev      # http://localhost:3000
```

## Navegación

- **Barra lateral**: lista de todos los capítulos.
- **Anterior / Siguiente**: en la barra superior (también con las flechas ← → del teclado).
- Se recuerda el último capítulo visto (localStorage).

## Despliegue en Vercel

El proyecto es un Next.js estándar. En Vercel:

1. Importa el repositorio.
2. Framework: **Next.js** (detección automática).
3. Deploy. No necesita variables de entorno.

Cada `git push` con un capítulo nuevo en `public/chapters/` genera un despliegue
actualizado automáticamente.
