// Comprueba que la version coincide en los tres sitios donde vive.
// Sin esto es facil subir index.html y dejar sw.js con la caché vieja, que
// es justo lo que hace que una version nueva no llegue al movil.
//   node scripts/check-version.mjs
import { readFileSync } from 'node:fs';

const leer = (f, re, quien) => {
  const m = readFileSync(new URL('../' + f, import.meta.url), 'utf8').match(re);
  if (!m) throw new Error(`No encuentro la version en ${f} (${quien})`);
  return m[1];
};

const encontradas = {
  'package.json': leer('package.json', /"version":\s*"([\d.]+?)(?:\.0)?"/, 'campo version'),
  'index.html':   leer('index.html',   /const APP_VERSION = '([\d.]+)'/,   'APP_VERSION'),
  'sw.js':        leer('sw.js',        /const CACHE = 'finanzas-([\d.]+)'/, 'nombre de cache'),
};

const valores = [...new Set(Object.values(encontradas))];
if (valores.length !== 1) {
  console.error('Las versiones NO coinciden:');
  for (const [f, v] of Object.entries(encontradas)) console.error(`  ${f.padEnd(14)} ${v}`);
  process.exit(1);
}
console.log(`version ${valores[0]} coherente en los 3 ficheros`);
