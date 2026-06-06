import fs from "node:fs";
import path from "node:path";

export type Chapter = {
  /** Nombre del archivo, p. ej. "01-my-english-notebook.html" */
  file: string;
  /** Identificador para la URL, p. ej. "01-my-english-notebook" */
  slug: string;
  /** Título mostrado: el <title> interno del HTML, o el nombre del archivo si no lo tiene */
  title: string;
};

const CHAPTERS_DIR = path.join(process.cwd(), "public", "chapters");

/** Extrae el contenido de <title> del HTML, si existe. */
function extractTitle(html: string): string | null {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!match) return null;
  const title = match[1].trim();
  return title.length > 0 ? title : null;
}

/** Convierte un nombre de archivo en un título legible de respaldo. */
function fileToTitle(file: string): string {
  return file
    .replace(/\.html?$/i, "")
    .replace(/^\d+[-_\s]*/, "") // quita prefijo numérico de orden
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Lee la carpeta public/chapters y devuelve los capítulos ordenados
 * alfabéticamente por nombre de archivo. Se ejecuta en build (server).
 */
export function getChapters(): Chapter[] {
  let files: string[] = [];
  try {
    files = fs.readdirSync(CHAPTERS_DIR);
  } catch {
    return [];
  }

  return files
    .filter((f) => /\.html?$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const html = fs.readFileSync(path.join(CHAPTERS_DIR, file), "utf8");
      const title = extractTitle(html) ?? fileToTitle(file);
      return {
        file,
        slug: file.replace(/\.html?$/i, ""),
        title,
      };
    });
}
