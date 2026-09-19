// Copia los assets de la PWA (que viven en la raiz para que GitHub Pages
// los siga sirviendo) a www/, que es lo que Capacitor empaqueta en la app.
import { mkdir, rm, copyFile } from 'node:fs/promises';

const ASSETS = ['index.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

await rm('www', { recursive: true, force: true });
await mkdir('www', { recursive: true });
for (const f of ASSETS) await copyFile(f, `www/${f}`);

console.log(`www/ generado con ${ASSETS.length} ficheros`);
