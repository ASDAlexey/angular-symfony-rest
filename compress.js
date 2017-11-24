const brotli = require('brotli');
const fs = require('fs');

const brotliSettings = {
  extension: 'br',
  skipLarger: true,
  mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 11, // 0 - 11,
  lgwin: 12 // default
};

function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  return stats.size;
}

const round = (n) => {
  return Math.round(n * 100) / 100
};

const toKb = (n) => {
  return n * 0.00097656;
};

const getPrettyOut = (path, basic, after) => {
  return `${path}: ${round(toKb(basic))}Kb -> ${round(toKb(after))}Kb(${round((basic - after) / basic * 100)}%)`;
};

fs.readdirSync('dist/').forEach(file => {
  if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
    const result = brotli.compress(fs.readFileSync('dist/' + file), brotliSettings);
    fs.writeFileSync('dist/' + file + '.br', result);
    const basicSize = getFilesizeInBytes(`dist/${file}`);
    const sizeAfterCompression = getFilesizeInBytes(`dist/${file}.br`);
    console.log('\'\x1b[36m%s\x1b[0m\'', getPrettyOut(`dist/${file}.br`, basicSize, sizeAfterCompression));
  }
});
