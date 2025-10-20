import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';
fs.rmSync(dist, {recursive: true, force: true});
fs.mkdirSync(dist, {recursive: true});

for (const f of ['manifest.json', 'popup.html', 'popup.js']) {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join
  (dist, f));
}

const zipPath = path.join(dist, 'extension.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: {level: 9}});

await  new Promise((res, rej) => {
  output.on('close', res);
  archive.on('error', rej);
  archive.pipe(output);
  archive.glob('**/*', {cwd: dist, ignore:
  ['extension.zip']});
  archive.finalize();
});

console.log("dist/ pronto e extensão gerada com sucesso!")
