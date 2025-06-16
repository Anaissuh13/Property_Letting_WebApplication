//this file was created to generate the SQL insert statements for the property_images table
// it reads the images from the public/images folder and generates the SQL insert statements
const fs = require('fs');
const path = require('path');

// adjust if your public folder is elsewhere
const IMAGES_ROOT = path.join(__dirname, '../public/images');

// find all numeric sub-folders (1,2,3…6)
const folders = fs.readdirSync(IMAGES_ROOT)
  .filter(fn => fs.statSync(path.join(IMAGES_ROOT, fn)).isDirectory())
  .filter(fn => /^\d+$/.test(fn));

let rows = [];

folders.forEach(folder => {
  const folderPath = path.join(IMAGES_ROOT, folder);
  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(jpe?g|png|webp)$/i.test(f));

  files.forEach(filename => {
    // property_id = the folder name, filename stored as e.g. "3/5.jpg"
    rows.push(`(${folder}, '${folder}/${filename}')`);
  });
});

if (!rows.length) {
  console.error('No images found!');
  process.exit(1);
}

const sql = `INSERT INTO property_images (property_id, filename) VALUES\n${rows.join(',\n')};\n`;
console.log(sql);
