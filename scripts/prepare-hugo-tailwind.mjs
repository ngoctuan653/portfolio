import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

if (process.platform === 'win32') {
  const wrapperUrl = new URL('../node_modules/.bin/tailwindcss.CMD', import.meta.url);
  const wrapperPath = fileURLToPath(wrapperUrl);
  const marker = '@REM %~dp0\\..\\@tailwindcss\\cli\\dist\\index.mjs\r\n';
  const oldMarker = '@REM ..\\@tailwindcss\\cli\\dist\\index.mjs\r\n';
  const wrapper = await readFile(wrapperPath, 'utf8');
  const normalizedWrapper = wrapper.startsWith(oldMarker)
    ? wrapper.slice(oldMarker.length)
    : wrapper;

  // Hugo resolves the first Node entry in a Windows npm wrapper. pnpm places
  // its virtual-store NODE_PATH first, so add the stable package entry first.
  if (!normalizedWrapper.startsWith(marker)) {
    await writeFile(wrapperPath, marker + normalizedWrapper, 'utf8');
  }
}
