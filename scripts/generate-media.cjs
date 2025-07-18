#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const MEDIA_DIR = path.resolve(__dirname, '../files');// your local cloned folder
const CDN_BASE  = 'https://cdn.jsdelivr.net/gh/nammakaraikal/nkstorage@v1.0/files';

(async () => {
  console.log('📂  Scanning:', MEDIA_DIR);

  let files = await fs.readdir(MEDIA_DIR);
  files = files
    .filter(f => /\.(jpe?g|png|mp4)$/i.test(f))
    .sort();

  const playlist = files.map(name => {
    const type = /\.mp4$/i.test(name) ? 'video' : 'image';
    return {
      type,
      title: name.replace(/\..+$/, '').replace(/[-_]/g, ' '),
      url: `${CDN_BASE}/${name}`
    };
  });

  const outputPath = path.join(MEDIA_DIR, 'media.json');
  await fs.writeFile(outputPath, JSON.stringify(playlist, null, 2));
  console.log(`✅  Generated: ${outputPath} (${playlist.length} items)`);
})();
