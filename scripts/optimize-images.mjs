#!/usr/bin/env node
/**
 * Procesa imágenes de origen y las deja listas para `public/images/`.
 *
 * Sin CMS no hay CDN que redimensione al vuelo, así que este paso reemplaza lo
 * que hacía Sanity: bajar el peso antes de que la imagen entre al repositorio.
 * `next/image` se encarga después del AVIF y del srcset.
 *
 * Uso:
 *   npm run images -- <origen> <destino> [--max 1800]
 *
 *   npm run images -- ~/Desktop/render.jpg reserva/g-7.jpg
 *   npm run images -- ~/Desktop/renders/ eden/ --max 2400
 *
 * Imprime el `ImageRef` con las dimensiones reales para pegar en `content/`,
 * que es el paso que siempre se olvida y que provoca CLS. §17.2
 */

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const PUBLIC_IMAGES = path.join(process.cwd(), "public", "images");

// §17.1 — presupuesto duro. Por encima de esto la imagen entra al repo, pero
// avisamos: en 4G cada 100 KB de más son décimas de segundo de LCP.
const AVISO_KB = 400;

function parseArgs(argv) {
  const positional = [];
  let max = 1800;

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--max") {
      max = Number(argv[++i]);
      if (!Number.isFinite(max) || max <= 0) {
        throw new Error("--max debe ser un número de píxeles.");
      }
    } else {
      positional.push(argv[i]);
    }
  }

  const [origen, destino] = positional;
  if (!origen || !destino) {
    throw new Error(
      "Faltan argumentos.\n" +
        "  npm run images -- <origen> <destino> [--max 1800]",
    );
  }

  return { origen, destino, max };
}

const ENTRADAS_VALIDAS = /\.(jpe?g|png|webp|tiff?|avif)$/i;

async function listarOrigenes(origen) {
  const info = await stat(origen).catch(() => null);
  if (!info) throw new Error(`No existe: ${origen}`);

  if (info.isFile()) return [origen];

  const nombres = await readdir(origen);
  return nombres
    .filter((n) => ENTRADAS_VALIDAS.test(n))
    .sort()
    .map((n) => path.join(origen, n));
}

async function procesar(src, destRel, max) {
  const salida = path.join(PUBLIC_IMAGES, destRel);
  await mkdir(path.dirname(salida), { recursive: true });

  const imagen = sharp(src).rotate(); // respeta la orientación EXIF
  const meta = await imagen.metadata();

  const buffer = await imagen
    .resize({ width: max, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });

  await writeFile(salida, buffer.data);

  const kb = Math.round(buffer.data.length / 1024);
  const { width, height } = buffer.info;

  return { destRel, width, height, kb, origenAncho: meta.width };
}

async function main() {
  const { origen, destino, max } = parseArgs(process.argv.slice(2));
  const fuentes = await listarOrigenes(origen);

  if (fuentes.length === 0) {
    console.error("No se encontró ninguna imagen procesable en el origen.");
    process.exitCode = 1;
    return;
  }

  const esCarpetaDestino = destino.endsWith("/") || fuentes.length > 1;
  const resultados = [];
  const usados = new Map();

  for (const [i, src] of fuentes.entries()) {
    const destRel = esCarpetaDestino
      ? path.join(
          destino,
          `${path.basename(src, path.extname(src)).toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`,
        )
      : destino;

    // Dos originales distintos pueden dar el mismo nombre al normalizar
    // («Exterior N°1.jpg» y «Exterior N°1.png»). Sin este control, el segundo
    // pisaba al primero sin decir nada.
    if (usados.has(destRel)) {
      throw new Error(
        `Choque de nombres en «${destRel}»:\n` +
          `  ${usados.get(destRel)}\n  ${src}\n` +
          "Renombra uno de los originales o procésalos por separado.",
      );
    }
    usados.set(destRel, src);

    resultados.push(await procesar(src, destRel, max));
    if (fuentes.length > 1) process.stdout.write(`  ${i + 1}/${fuentes.length}\r`);
  }

  console.log("\nProcesadas:\n");
  for (const r of resultados) {
    const alerta = r.kb > AVISO_KB ? `  ⚠ supera ${AVISO_KB} KB` : "";
    console.log(
      `  ${r.destRel.padEnd(32)} ${r.width}×${r.height}  ${r.kb} KB${alerta}`,
    );
    if (r.origenAncho && r.origenAncho < max) {
      console.log(
        `  ${"".padEnd(32)} el original medía ${r.origenAncho}px: no se amplió`,
      );
    }
  }

  console.log("\nPara pegar en content/:\n");
  for (const r of resultados) {
    console.log(`{
  src: "/images/${r.destRel}",
  alt: "", // obligatorio y descriptivo — §18
  width: ${r.width},
  height: ${r.height},
},`);
  }
}

main().catch((error) => {
  console.error(`\n${error.message}\n`);
  process.exitCode = 1;
});
